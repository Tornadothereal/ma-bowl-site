/* ============================================================
   MA Bowl — Dynamic products renderer
   Fetches sections + products from the dashboard's API
   (netlify/functions/ma-bowl-data.js) and renders them into
   #productsDynamicRoot, reusing the exact same CSS classes as
   the original static markup (product-list / product-item /
   product-showcase / product-mobile-desc ...) so desktop split
   view + mobile swipe cards keep working without any CSS changes.

   Also exposes window.MA_BOWL_PRODUCTS.setLanguage(lang) so
   language.js can ask it to re-render text when the language
   switches (name/description/price only — images don't change).
   ============================================================ */

(function () {

    const API_URL = "/api/ma-bowl-data";

    let cachedData = { sections: [], products: [] };
    let currentRenderLang = "de";

    function escapeHtml(str) {
        const d = document.createElement("div");
        d.textContent = str || "";
        return d.innerHTML;
    }

    function textFor(entity, field, lang) {
        // field is "name" or "desc". Falls back to German if the language
        // isn't Arabic/German (dashboard currently only captures de/ar).
        const key = lang === "ar" ? `${field}_ar` : `${field}_de`;
        return entity[key] || entity[`${field}_de`] || "";
    }

    function buildSectionBlock(section, products, lang) {
        const wrap = document.createElement("div");
        wrap.className = "product-category-block";
        wrap.dataset.sectionId = section.id;

        const heading = document.createElement("h3");
        heading.className = "category-title";
        heading.textContent = `${section.icon || "🍽️"} ${lang === "ar" ? (section.name_ar || section.name_de) : section.name_de}`;
        wrap.appendChild(heading);

        if (!products.length) {
            const empty = document.createElement("p");
            empty.className = "category-empty";
            empty.textContent = lang === "ar" ? "لا توجد منتجات هنا حالياً." : "Aktuell keine Produkte in dieser Kategorie.";
            wrap.appendChild(empty);
            return wrap;
        }

        const container = document.createElement("div");
        container.className = "products-container";

        const list = document.createElement("div");
        list.className = "product-list";

        const showcase = document.createElement("div");
        showcase.className = "product-showcase";
        showcase.innerHTML = `
            <img src="" alt="Product" class="showcase-img">
            <div class="showcase-info">
                <h3 class="showcase-title"></h3>
                <p class="showcase-desc"></p>
                <div class="showcase-price"></div>
            </div>
        `;

        function updateShowcase(product) {
            const img = showcase.querySelector(".showcase-img");
            const title = showcase.querySelector(".showcase-title");
            const desc = showcase.querySelector(".showcase-desc");
            const price = showcase.querySelector(".showcase-price");
            img.style.opacity = "0";
            img.style.transform = "scale(.95)";
            setTimeout(() => {
                img.src = product.image || "";
                title.textContent = textFor(product, "name", currentRenderLang);
                desc.textContent = textFor(product, "desc", currentRenderLang);
                price.textContent = product.price || "";
                img.style.opacity = "1";
                img.style.transform = "scale(1)";
            }, 150);
        }

        products.forEach((product, idx) => {
            const item = document.createElement("div");
            item.className = "product-item" + (idx === 0 ? " active" : "");
            item.dataset.productId = product.id;

            const img = document.createElement("img");
            img.className = "product-thumb";
            img.src = product.image || "";
            img.alt = "";
            item.appendChild(img);

            const details = document.createElement("div");
            details.className = "product-details";
            details.innerHTML = `
                <h3 class="item-name"></h3>
                <p class="product-mobile-desc item-desc"></p>
                <span class="price item-price"></span>
            `;
            item.appendChild(details);

            item.addEventListener("click", () => {
                list.querySelectorAll(".product-item").forEach(el => el.classList.remove("active"));
                item.classList.add("active");
                updateShowcase(product);
            });

            list.appendChild(item);
        });

        container.appendChild(list);
        container.appendChild(showcase);
        wrap.appendChild(container);

        // initial showcase + text fill happens in applyTextForBlock() below
        wrap._products = products;
        wrap._updateShowcase = updateShowcase;

        return wrap;
    }

    function applyTextForBlock(wrap, lang) {
        const products = wrap._products || [];
        const list = wrap.querySelector(".product-list");
        if (!list) return;

        list.querySelectorAll(".product-item").forEach((item, idx) => {
            const product = products[idx];
            if (!product) return;
            item.querySelector(".item-name").textContent = textFor(product, "name", lang);
            item.querySelector(".item-desc").textContent = textFor(product, "desc", lang);
            item.querySelector(".item-price").textContent = product.price || "";
        });

        const activeIdx = Array.from(list.querySelectorAll(".product-item")).findIndex(el => el.classList.contains("active"));
        const activeProduct = products[activeIdx > -1 ? activeIdx : 0];
        if (activeProduct && wrap._updateShowcase) {
            wrap._updateShowcase(activeProduct);
        }

        const heading = wrap.querySelector(".category-title");
        // section name text is re-set from render(), not here, to keep icon in sync
    }

    function staggerShowItems(root) {
        const items = root.querySelectorAll(".product-item");
        items.forEach((item, index) => {
            setTimeout(() => item.classList.add("show"), index * 100);
        });
    }

    function render() {
        const root = document.getElementById("productsDynamicRoot");
        if (!root) return;

        const lang = (typeof currentLang !== "undefined") ? currentLang : "de";
        currentRenderLang = lang;

        root.innerHTML = "";

        const visibleSections = cachedData.sections || [];
        if (!visibleSections.length) {
            root.innerHTML = `<p class="products-loading">${lang === "ar" ? "لا توجد منتجات بعد." : "Noch keine Produkte."}</p>`;
            return;
        }

        visibleSections.forEach(section => {
            const products = (cachedData.products || []).filter(p => p.sectionId === section.id && p.visible);
            const block = buildSectionBlock(section, products, lang);
            root.appendChild(block);
            applyTextForBlock(block, lang);
        });

        staggerShowItems(root);
    }

    async function fetchData() {
        try {
            const res = await fetch(API_URL, { cache: "no-store" });
            if (!res.ok) throw new Error("bad response");
            cachedData = await res.json();
        } catch (e) {
            console.error("MA Bowl: failed to load products", e);
            cachedData = { sections: [], products: [] };
            const root = document.getElementById("productsDynamicRoot");
            if (root) {
                root.innerHTML = `<p class="products-loading">Produkte konnten nicht geladen werden.</p>`;
            }
            return;
        }
        render();
    }

    window.MA_BOWL_PRODUCTS = {
        setLanguage(lang) {
            currentRenderLang = lang;
            render();
        },
        reload: fetchData
    };

    document.addEventListener("DOMContentLoaded", fetchData);

})();
