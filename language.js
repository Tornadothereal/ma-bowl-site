/* ============================================================
   MA Bowl — Language switcher
   Default language: German (de)
   Available in the menu: en, ar, fr, zh, es, ru
   ============================================================ */

const LANG_META = {
    de: { flag: "🇩🇪", label: "Deutsch", dir: "ltr" },
    en: { flag: "🇬🇧", label: "English", dir: "ltr" },
    ar: { flag: "🇸🇦", label: "العربية", dir: "rtl" },
    fr: { flag: "🇫🇷", label: "Français", dir: "ltr" },
    zh: { flag: "🇨🇳", label: "中文", dir: "ltr" },
    es: { flag: "🇪🇸", label: "Español", dir: "ltr" },
    ru: { flag: "🇷🇺", label: "Русский", dir: "ltr" }
};

const TRANSLATIONS = {

    de: {
        nav_home: "Startseite",
        nav_menu: "Menü",
        nav_gallery: "Galerie",
        nav_about: "Über uns",
        nav_contact: "Kontakt",

        hero_tag: "Frische Açaí Bowls",
        hero_title1: "Gesunde Energie",
        hero_title2: "In jeder Bowl",
        hero_desc: "Bei MA Bowl bieten wir köstliche, hausgemachte Açaí Bowls aus Gronau an. Wähle aus unseren fünf Signature Bowls oder gestalte deine eigene Bowl mit frischem Obst und Toppings.",
        hero_btn: "Zum Menü",

        stat_followers: "Follower",
        stat_bowls: "Signature Bowls",
        stat_fresh: "Frisch",
        stat_customers: "Kunden",

        products_tag: "Signature Bowls",
        products_title: "Wähle deinen Lieblingsgeschmack",
        swipe_hint: "Wische, um weitere Bowls zu sehen",
        products_loading: "Produkte werden geladen…",
        product6_title: "GESTALTE DEINE EIGENE BOWL",
        product6_price: "€7 + €0,50 Toppings",

        statement_tag: "MA Bowl Erlebnis",
        statement_line1: "Frisch zubereitet.",
        statement_line2: "Schön serviert.",

        about_tag: "Warum MA Bowl",
        about_title: "Mehr als nur Açaí Bowls",
        about_desc: "Jede Bowl wird mit erstklassigen Zutaten, frischem Obst und sorgfältig ausgewählten Toppings zubereitet, um dir das perfekte Erlebnis zu bieten.",
        feature1: "Frische Zutaten",
        feature2: "Premium-Qualität",
        feature3: "Einzigartiges Erlebnis",

        reviews_tag: "Kundenbewertungen",
        reviews_title: "Was unsere Kunden sagen",
        review1: "Die beste Açaí Bowl, die ich je probiert habe. Frische Zutaten und ein fantastischer Geschmack.",
        review2: "Perfekte Balance zwischen Früchten und Toppings. Ich komme auf jeden Fall wieder.",
        review3: "Wunderschöne Präsentation und Premium-Qualität. Sehr empfehlenswert.",

        footer_desc: "Premium Açaí Bowls, zubereitet mit frischen Zutaten und unvergesslichen Aromen.",
        footer_nav: "Navigation",
        footer_location: "Standort",
        footer_availability: "Verfügbarkeit",
        footer_availability_text: "Der Verkauf findet nur statt, wenn wir eine Story auf Instagram veröffentlichen. Gibt es keine Story, findet an diesem Tag kein Verkauf statt.",
        footer_copy: "© 2026 MA Bowl. Alle Rechte vorbehalten.",
        location_tag: "Standort",
        location_title: "Besuche MA Bowl",
        location_directions: "Route planen"
    },

    en: {
        nav_home: "Home",
        nav_menu: "Menu",
        nav_gallery: "Gallery",
        nav_about: "About",
        nav_contact: "Contact",

        hero_tag: "Fresh Açaí Bowls",
        hero_title1: "Healthy Energy",
        hero_title2: "In Every Bowl",
        hero_desc: "At MA Bowl, we offer delicious, homemade açaí bowls from Gronau. Choose from our five signature bowls or create your own bowl with fresh fruit and toppings.",
        hero_btn: "View Menu",

        stat_followers: "Followers",
        stat_bowls: "Signature Bowls",
        stat_fresh: "Fresh",
        stat_customers: "Customers",

        products_tag: "Signature Bowls",
        products_title: "Choose Your Favorite Flavor",
        swipe_hint: "Swipe to see more bowls",
        products_loading: "Loading products…",
        product6_title: "CREATE YOUR OWN BOWL",
        product6_price: "€7 + €0.50 Toppings",

        statement_tag: "MA Bowl Experience",
        statement_line1: "Crafted Fresh.",
        statement_line2: "Served Beautifully.",

        about_tag: "Why MA Bowl",
        about_title: "More Than Just Açaí Bowls",
        about_desc: "Every bowl is crafted with premium ingredients, fresh fruits and carefully selected toppings to deliver the perfect experience.",
        feature1: "Fresh Ingredients",
        feature2: "Premium Quality",
        feature3: "Unique Experience",

        reviews_tag: "Customer Reviews",
        reviews_title: "What People Say",
        review1: "The best açaí bowl I've ever tried. Fresh ingredients and amazing taste.",
        review2: "Perfect balance between fruits and toppings. Definitely coming back.",
        review3: "Beautiful presentation and premium quality. Highly recommended.",

        footer_desc: "Premium Açaí Bowls crafted with fresh ingredients and unforgettable flavors.",
        footer_nav: "Navigation",
        footer_location: "Location",
        footer_availability: "Availability",
        footer_availability_text: "Sales only happen when we post a Story on Instagram. If there's no Story, there's no sale that day.",
        footer_copy: "© 2026 MA Bowl. All Rights Reserved.",
        location_tag: "Find Us",
        location_title: "Visit MA Bowl",
        location_directions: "Get Directions"
    },

    ar: {
        nav_home: "الرئيسية",
        nav_menu: "القائمة",
        nav_gallery: "المعرض",
        nav_about: "من نحن",
        nav_contact: "تواصل معنا",

        hero_tag: "أطباق أساي الطازجة",
        hero_title1: "طاقة صحية",
        hero_title2: "في كل طبق",
        hero_desc: "في MA Bowl، نقدم أطباق أساي شهية ومصنوعة منزلياً من غرونو. اختر من بين خمسة أطباق مميزة أو صمم طبقك الخاص بفواكه طازجة وإضافات متنوعة.",
        hero_btn: "عرض القائمة",

        stat_followers: "متابع",
        stat_bowls: "أطباق مميزة",
        stat_fresh: "طازج",
        stat_customers: "عميل",

        products_tag: "أطباقنا المميزة",
        products_title: "اختر نكهتك المفضلة",
        swipe_hint: "مرر لرؤية المزيد من الأطباق",
        products_loading: "جارِ تحميل المنتجات…",
        product6_title: "صمم طبقك الخاص",
        product6_price: "€7 + €0.50 إضافات",

        statement_tag: "تجربة MA Bowl",
        statement_line1: "طازج دائماً.",
        statement_line2: "يُقدَّم بأناقة.",

        about_tag: "لماذا MA Bowl",
        about_title: "أكثر من مجرد أطباق أساي",
        about_desc: "كل طبق يُحضَّر بمكونات فاخرة وفواكه طازجة وإضافات مختارة بعناية لمنحك تجربة مثالية.",
        feature1: "مكونات طازجة",
        feature2: "جودة فاخرة",
        feature3: "تجربة فريدة",

        reviews_tag: "آراء العملاء",
        reviews_title: "ماذا يقول عملاؤنا",
        review1: "أفضل طبق أساي جربته على الإطلاق. مكونات طازجة ومذاق رائع.",
        review2: "توازن مثالي بين الفواكه والإضافات. سأعود بالتأكيد.",
        review3: "تقديم جميل وجودة فاخرة. أنصح به بشدة.",

        footer_desc: "أطباق أساي فاخرة مُحضَّرة بمكونات طازجة ونكهات لا تُنسى.",
        footer_nav: "التنقل",
        footer_location: "الموقع",
        footer_availability: "التوفر",
        footer_availability_text: "البيع يتم فقط عند نشر ستوري على انستغرام. إذا لم يتم نشر ستوري، فلا يوجد بيع في ذلك اليوم.",
        footer_copy: "© 2026 MA Bowl. جميع الحقوق محفوظة.",
        location_tag: "موقعنا",
        location_title: "زوروا MA Bowl",
        location_directions: "احصل على الاتجاهات"
    },

    fr: {
        nav_home: "Accueil",
        nav_menu: "Menu",
        nav_gallery: "Galerie",
        nav_about: "À propos",
        nav_contact: "Contact",

        hero_tag: "Bowls Açaí Frais",
        hero_title1: "Énergie Saine",
        hero_title2: "Dans Chaque Bowl",
        hero_desc: "Chez MA Bowl, nous proposons de délicieux bowls açaí faits maison à Gronau. Choisissez parmi nos cinq bowls signature ou composez le vôtre avec des fruits frais et des garnitures.",
        hero_btn: "Voir le Menu",

        stat_followers: "Abonnés",
        stat_bowls: "Bowls Signature",
        stat_fresh: "Frais",
        stat_customers: "Clients",

        products_tag: "Bowls Signature",
        products_title: "Choisissez Votre Saveur Préférée",
        swipe_hint: "Glissez pour voir plus de bowls",
        products_loading: "Chargement des produits…",
        product6_title: "COMPOSEZ VOTRE BOWL",
        product6_price: "€7 + €0,50 Garnitures",

        statement_tag: "L'Expérience MA Bowl",
        statement_line1: "Préparé Frais.",
        statement_line2: "Servi avec Style.",

        about_tag: "Pourquoi MA Bowl",
        about_title: "Bien Plus que des Bowls Açaí",
        about_desc: "Chaque bowl est préparé avec des ingrédients premium, des fruits frais et des garnitures soigneusement sélectionnées pour une expérience parfaite.",
        feature1: "Ingrédients Frais",
        feature2: "Qualité Premium",
        feature3: "Expérience Unique",

        reviews_tag: "Avis Clients",
        reviews_title: "Ce Que Disent Nos Clients",
        review1: "Le meilleur bowl açaí que j'aie jamais goûté. Ingrédients frais et goût incroyable.",
        review2: "Équilibre parfait entre fruits et garnitures. Je reviendrai sans hésiter.",
        review3: "Belle présentation et qualité premium. Fortement recommandé.",

        footer_desc: "Des bowls açaí premium préparés avec des ingrédients frais et des saveurs inoubliables.",
        footer_nav: "Navigation",
        footer_location: "Emplacement",
        footer_availability: "Disponibilité",
        footer_availability_text: "La vente n'a lieu que lorsque nous publions une Story sur Instagram. S'il n'y a pas de Story, il n'y a pas de vente ce jour-là.",
        footer_copy: "© 2026 MA Bowl. Tous droits réservés.",
        location_tag: "Nous Trouver",
        location_title: "Visitez MA Bowl",
        location_directions: "Itinéraire"
    },

    zh: {
        nav_home: "首页",
        nav_menu: "菜单",
        nav_gallery: "图库",
        nav_about: "关于我们",
        nav_contact: "联系我们",

        hero_tag: "新鲜巴西莓碗",
        hero_title1: "健康能量",
        hero_title2: "尽在每一碗",
        hero_desc: "在 MA Bowl，我们提供来自格罗瑙的美味自制巴西莓碗。您可以从五款招牌碗中选择，也可以用新鲜水果和配料打造属于自己的碗。",
        hero_btn: "查看菜单",

        stat_followers: "粉丝",
        stat_bowls: "招牌碗",
        stat_fresh: "新鲜",
        stat_customers: "顾客",

        products_tag: "招牌碗",
        products_title: "选择您喜爱的口味",
        swipe_hint: "左右滑动查看更多碗",
        products_loading: "正在加载产品…",
        product6_title: "打造专属碗",
        product6_price: "€7 + €0.50 配料",

        statement_tag: "MA Bowl 体验",
        statement_line1: "新鲜制作。",
        statement_line2: "精美呈现。",

        about_tag: "为何选择 MA Bowl",
        about_title: "不止是巴西莓碗",
        about_desc: "每一碗都选用优质食材、新鲜水果和精心挑选的配料制作，为您带来完美体验。",
        feature1: "新鲜食材",
        feature2: "优质品质",
        feature3: "独特体验",

        reviews_tag: "顾客评价",
        reviews_title: "顾客怎么说",
        review1: "我吃过最好吃的巴西莓碗。食材新鲜，味道惊艳。",
        review2: "水果与配料搭配得恰到好处，我一定会再来。",
        review3: "摆盘精美，品质上乘，强烈推荐。",

        footer_desc: "优质巴西莓碗，选用新鲜食材，风味难忘。",
        footer_nav: "导航",
        footer_location: "位置",
        footer_availability: "供应情况",
        footer_availability_text: "只有当我们在 Instagram 上发布 Story 时才会进行销售。如果没有发布 Story，当天则不进行销售。",
        footer_copy: "© 2026 MA Bowl. 保留所有权利。",
        location_tag: "我们的位置",
        location_title: "拜访 MA Bowl",
        location_directions: "获取路线"
    },

    es: {
        nav_home: "Inicio",
        nav_menu: "Menú",
        nav_gallery: "Galería",
        nav_about: "Nosotros",
        nav_contact: "Contacto",

        hero_tag: "Bowls de Açaí Frescos",
        hero_title1: "Energía Saludable",
        hero_title2: "En Cada Bowl",
        hero_desc: "En MA Bowl ofrecemos deliciosos bowls de açaí caseros desde Gronau. Elige entre nuestros cinco bowls exclusivos o crea el tuyo propio con fruta fresca y toppings.",
        hero_btn: "Ver Menú",

        stat_followers: "Seguidores",
        stat_bowls: "Bowls Exclusivos",
        stat_fresh: "Frescura",
        stat_customers: "Clientes",

        products_tag: "Bowls Exclusivos",
        products_title: "Elige Tu Sabor Favorito",
        swipe_hint: "Desliza para ver más bowls",
        products_loading: "Cargando productos…",
        product6_title: "CREA TU PROPIO BOWL",
        product6_price: "€7 + €0,50 Toppings",

        statement_tag: "La Experiencia MA Bowl",
        statement_line1: "Preparado Fresco.",
        statement_line2: "Servido con Estilo.",

        about_tag: "Por Qué MA Bowl",
        about_title: "Mucho Más que Bowls de Açaí",
        about_desc: "Cada bowl se prepara con ingredientes premium, frutas frescas y toppings cuidadosamente seleccionados para ofrecerte la experiencia perfecta.",
        feature1: "Ingredientes Frescos",
        feature2: "Calidad Premium",
        feature3: "Experiencia Única",

        reviews_tag: "Reseñas de Clientes",
        reviews_title: "Lo Que Dicen Nuestros Clientes",
        review1: "El mejor bowl de açaí que he probado. Ingredientes frescos y un sabor increíble.",
        review2: "Equilibrio perfecto entre frutas y toppings. Sin duda volveré.",
        review3: "Presentación hermosa y calidad premium. Muy recomendable.",

        footer_desc: "Bowls de açaí premium elaborados con ingredientes frescos y sabores inolvidables.",
        footer_nav: "Navegación",
        footer_location: "Ubicación",
        footer_availability: "Disponibilidad",
        footer_availability_text: "Las ventas solo se realizan cuando publicamos una Story en Instagram. Si no hay Story, no hay venta ese día.",
        footer_copy: "© 2026 MA Bowl. Todos los derechos reservados.",
        location_tag: "Encuéntranos",
        location_title: "Visita MA Bowl",
        location_directions: "Cómo Llegar"
    },

    ru: {
        nav_home: "Главная",
        nav_menu: "Меню",
        nav_gallery: "Галерея",
        nav_about: "О нас",
        nav_contact: "Контакты",

        hero_tag: "Свежие боулы Асаи",
        hero_title1: "Здоровая Энергия",
        hero_title2: "В Каждой Пиале",
        hero_desc: "В MA Bowl мы предлагаем вкусные домашние боулы асаи из Гронау. Выберите один из пяти фирменных боулов или создайте свой собственный со свежими фруктами и топпингами.",
        hero_btn: "Смотреть Меню",

        stat_followers: "Подписчиков",
        stat_bowls: "Фирменных боулов",
        stat_fresh: "Свежести",
        stat_customers: "Клиентов",

        products_tag: "Фирменные боулы",
        products_title: "Выберите Свой Любимый Вкус",
        swipe_hint: "Листайте, чтобы увидеть больше боулов",
        products_loading: "Загрузка продуктов…",
        product6_title: "СОЗДАЙ СВОЙ БОУЛ",
        product6_price: "€7 + €0,50 топпинги",

        statement_tag: "Опыт MA Bowl",
        statement_line1: "Свежеприготовлено.",
        statement_line2: "Красиво подано.",

        about_tag: "Почему MA Bowl",
        about_title: "Больше, чем просто боулы Асаи",
        about_desc: "Каждый боул готовится из premium-ингредиентов, свежих фруктов и тщательно подобранных топпингов, чтобы подарить вам идеальные впечатления.",
        feature1: "Свежие ингредиенты",
        feature2: "Премиум качество",
        feature3: "Уникальный опыт",

        reviews_tag: "Отзывы клиентов",
        reviews_title: "Что Говорят Наши Клиенты",
        review1: "Лучший боул асаи, который я пробовал. Свежие ингредиенты и потрясающий вкус.",
        review2: "Идеальный баланс фруктов и топпингов. Обязательно вернусь снова.",
        review3: "Красивая подача и премиальное качество. Очень рекомендую.",

        footer_desc: "Премиальные боулы асаи из свежих ингредиентов с незабываемым вкусом.",
        footer_nav: "Навигация",
        footer_location: "Расположение",
        footer_availability: "Наличие",
        footer_availability_text: "Продажа происходит только тогда, когда мы публикуем Stories в Instagram. Если Stories нет — продажи в этот день не будет.",
        footer_copy: "© 2026 MA Bowl. Все права защищены.",
        location_tag: "Наше расположение",
        location_title: "Посетите MA Bowl",
        location_directions: "Проложить маршрут"
    }
};

// German is always the default language on every page load.
// Language switches only apply for the current visit/page view.
let currentLang = "de";

function applyLanguage(lang) {

    if (!TRANSLATIONS[lang]) return;

    currentLang = lang;

    const dict = TRANSLATIONS[lang];
    const meta = LANG_META[lang];

    // Update every element carrying a data-i18n key
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.dataset.i18n;
        if (dict[key] !== undefined) {
            el.textContent = dict[key];
        }
    });

    // Update <html> lang & direction
    const htmlEl = document.getElementById("html") || document.documentElement;
    htmlEl.setAttribute("lang", lang);
    htmlEl.setAttribute("dir", meta.dir);

    // Update the language button label
    const langBtn = document.getElementById("languageBtn");
    if (langBtn) {
        langBtn.innerHTML =
            `<span class="lang-flag">${meta.flag}</span>` +
            `<span class="lang-label"> ${meta.label}</span>` +
            `<span class="lang-caret"> ▼</span>`;
    }

    // Products are now fetched dynamically from the dashboard's API —
    // products-dynamic.js owns their rendering and re-renders their
    // text (name/description/price) whenever the language changes.
    if (window.MA_BOWL_PRODUCTS && typeof window.MA_BOWL_PRODUCTS.setLanguage === "function") {
        window.MA_BOWL_PRODUCTS.setLanguage(lang);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    // Apply saved / default language on load
    applyLanguage(currentLang);

    const languageBtn = document.getElementById("languageBtn");
    const languageMenu = document.getElementById("languageMenu");

    if (languageBtn && languageMenu) {

        languageBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            languageMenu.classList.toggle("show");
        });

        languageMenu.querySelectorAll("button[data-lang]").forEach(btn => {
            btn.addEventListener("click", () => {
                applyLanguage(btn.dataset.lang);
                languageMenu.classList.remove("show");
            });
        });

        document.addEventListener("click", () => {
            languageMenu.classList.remove("show");
        });
    }

});