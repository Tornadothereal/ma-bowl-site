(function () {

  const API_URL = "/api/ma-bowl-data";
  const TOKEN_KEY = "ma_bowl_admin_token";

  const I18N = {
    de: {
      loginSubtitle: "Bitte melde dich an, um Produkte zu verwalten",
      passwordLabel: "Passwort",
      passwordPlaceholder: "Passwort eingeben",
      loginBtn: "Anmelden",
      wrongPassword: "Falsches Passwort",
      dashboardWord: "· Dashboard",
      logout: "Abmelden",
      addProductBtn: "+ Neues Produkt",
      chooseTitle: "Was möchtest du hinzufügen?",
      chooseSubtitle: "Wähle, ob du ein Produkt zu einer bestehenden Sektion hinzufügen oder eine neue Sektion erstellen möchtest.",
      choiceProduct: "Neues Produkt",
      choiceProductDesc: "Zu einer bestehenden Sektion hinzufügen",
      choiceSection: "Neue Sektion",
      choiceSectionDesc: "z. B. Eis, Säfte, Snacks …",
      newSectionTitle: "Neue Sektion erstellen",
      sectionNameDe: "Name (Deutsch)",
      sectionNameAr: "Name (Arabisch)",
      sectionIcon: "Symbol (Emoji, optional)",
      continue: "Weiter",
      cancel: "Abbrechen",
      back: "Zurück",
      section: "Sektion",
      image: "Produktbild",
      uploadImage: "Bild hochladen",
      nameDe: "Name (Deutsch)",
      nameAr: "Name (Arabisch)",
      price: "Preis",
      pricePlaceholder: "z. B. €7",
      descDe: "Beschreibung (Deutsch)",
      descAr: "Beschreibung (Arabisch)",
      visible: "Sichtbar auf der Website",
      save: "Speichern",
      edit: "Bearbeiten",
      delete: "Löschen",
      show: "Einblenden",
      hide: "Ausblenden",
      hiddenBadge: "Ausgeblendet",
      deleteTitle: "Produkt löschen?",
      deleteText: "Diese Aktion kann nicht rückgängig gemacht werden.",
      deleteConfirm: "Endgültig löschen",
      deleteSectionTitle: "Sektion löschen?",
      deleteSectionText: "Alle Produkte in dieser Sektion werden ebenfalls gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
      noProducts: "Noch keine Produkte in dieser Sektion",
      requiredError: "Bitte fülle alle Pflichtfelder aus",
      langOtherNote: "Für die anderen Sprachen der Website (EN, FR, ZH, ES, RU) wird automatisch der deutsche Text verwendet, bis eigene Übersetzungen ergänzt werden.",
      savedToast: "Gespeichert ✓",
      deletedToast: "Gelöscht",
      productFormTitleAdd: "Neues Produkt",
      productFormTitleEdit: "Produkt bearbeiten",
      networkError: "Verbindung zum Server fehlgeschlagen",
    },
    ar: {
      loginSubtitle: "الرجاء تسجيل الدخول لإدارة المنتجات",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      loginBtn: "تسجيل الدخول",
      wrongPassword: "كلمة المرور غير صحيحة",
      dashboardWord: "· لوحة التحكم",
      logout: "تسجيل الخروج",
      addProductBtn: "+ منتج جديد",
      chooseTitle: "ماذا تريد أن تضيف؟",
      chooseSubtitle: "اختر إن كنت تريد إضافة منتج لسكشن موجودة أو إنشاء سكشن جديدة.",
      choiceProduct: "منتج جديد",
      choiceProductDesc: "إضافة إلى سكشن موجودة",
      choiceSection: "سكشن جديدة",
      choiceSectionDesc: "مثلاً: مثلجات، عصائر، سناكس …",
      newSectionTitle: "إنشاء سكشن جديدة",
      sectionNameDe: "الاسم (بالألمانية)",
      sectionNameAr: "الاسم (بالعربية)",
      sectionIcon: "أيقونة (إيموجي، اختياري)",
      continue: "متابعة",
      cancel: "إلغاء",
      back: "رجوع",
      section: "السكشن",
      image: "صورة المنتج",
      uploadImage: "رفع صورة",
      nameDe: "الاسم (بالألمانية)",
      nameAr: "الاسم (بالعربية)",
      price: "السعر",
      pricePlaceholder: "مثال: €7",
      descDe: "الوصف (بالألمانية)",
      descAr: "الوصف (بالعربية)",
      visible: "ظاهر في الموقع",
      save: "حفظ",
      edit: "تعديل",
      delete: "حذف",
      show: "إظهار",
      hide: "إخفاء",
      hiddenBadge: "مخفي",
      deleteTitle: "حذف المنتج؟",
      deleteText: "لا يمكن التراجع عن هذا الإجراء.",
      deleteConfirm: "حذف نهائي",
      deleteSectionTitle: "حذف السكشن؟",
      deleteSectionText: "سيتم حذف جميع منتجات هذه السكشن أيضاً. لا يمكن التراجع عن هذا الإجراء.",
      noProducts: "لا توجد منتجات في هذه السكشن بعد",
      requiredError: "الرجاء تعبئة جميع الحقول المطلوبة",
      langOtherNote: "بالنسبة للغات الأخرى في الموقع (EN, FR, ZH, ES, RU) سيتم استخدام النص الألماني تلقائياً حتى تتم إضافة ترجمات خاصة بها.",
      savedToast: "تم الحفظ ✓",
      deletedToast: "تم الحذف",
      productFormTitleAdd: "منتج جديد",
      productFormTitleEdit: "تعديل المنتج",
      networkError: "فشل الاتصال بالسيرفر",
    },
  };

  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  const $ = (sel) => document.querySelector(sel);
  const htmlEl = document.getElementById("dashHtml") || document.documentElement;

  let state = {
    lang: "de",
    adminToken: sessionStorage.getItem(TOKEN_KEY) || "",
    activeSectionId: null,
    data: { sections: [], products: [] },
    editingProductId: null,
    pendingNewSectionThenProduct: false,
  };

  function t(key) { return I18N[state.lang][key] || key; }

  function applyLangToDOM() {
    htmlEl.setAttribute("dir", state.lang === "ar" ? "rtl" : "ltr");
    htmlEl.setAttribute("lang", state.lang);
    document.querySelectorAll("[data-t]").forEach((el) => { el.textContent = t(el.dataset.t); });
    document.querySelectorAll("[data-t-ph]").forEach((el) => { el.placeholder = t(el.dataset.tPh); });
    document.querySelectorAll(".mb-lang-pill").forEach((el) => { el.classList.toggle("active", el.dataset.lang === state.lang); });
  }

  function toast(msg) {
    const el = $("#mbToast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), 1800);
  }

  function escapeHtml(str) {
    const d = document.createElement("div");
    d.textContent = str || "";
    return d.innerHTML;
  }

  /* ---------- API ---------- */
  async function apiGet() {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("GET failed");
    return res.json();
  }

  async function apiVerify(token) {
    const res = await fetch(`${API_URL}?action=verify`, {
      method: "POST",
      headers: { "x-admin-token": token, "Content-Type": "application/json" },
      body: "{}",
    });
    return res.ok;
  }

  async function apiSave(resource, item) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "x-admin-token": state.adminToken, "Content-Type": "application/json" },
      body: JSON.stringify({ resource, item }),
    });
    if (!res.ok) throw new Error("save failed");
    return res.json();
  }

  async function apiDelete(resource, id) {
    const res = await fetch(`${API_URL}?resource=${encodeURIComponent(resource)}&id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "x-admin-token": state.adminToken },
    });
    if (!res.ok) throw new Error("delete failed");
    return res.json();
  }

  async function loadData() {
    try {
      state.data = await apiGet();
    } catch (e) {
      state.data = { sections: [], products: [] };
      toast(t("networkError"));
    }
    if (state.data.sections && state.data.sections.length) {
      state.activeSectionId = state.data.sections[0].id;
    }
  }

  /* ---------- RENDER ---------- */
  function renderTabs() {
    const wrap = $("#mbTabsRow");
    wrap.innerHTML = "";
    (state.data.sections || []).forEach((sec) => {
      const btn = document.createElement("button");
      btn.className = "mb-tab" + (sec.id === state.activeSectionId ? " active" : "");
      const nameLabel = state.lang === "ar" ? (sec.name_ar || sec.name_de) : sec.name_de;
      btn.innerHTML = `<span>${sec.icon || "🍽️"} ${escapeHtml(nameLabel)}</span>`;
      btn.addEventListener("click", () => { state.activeSectionId = sec.id; render(); });
      if (state.data.sections.length > 1) {
        const del = document.createElement("span");
        del.className = "mb-tab-del";
        del.textContent = "✕";
        del.addEventListener("click", (e) => { e.stopPropagation(); openDeleteSection(sec.id); });
        btn.appendChild(del);
      }
      wrap.appendChild(btn);
    });
    const addBtn = document.createElement("button");
    addBtn.className = "mb-tab-add";
    addBtn.textContent = "+";
    addBtn.addEventListener("click", () => openNewSectionModal(false));
    wrap.appendChild(addBtn);
  }

  function renderGrid() {
    const sec = (state.data.sections || []).find((s) => s.id === state.activeSectionId);
    $("#mbActiveSectionTitle").textContent = sec ? (state.lang === "ar" ? (sec.name_ar || sec.name_de) : sec.name_de) : "";

    const grid = $("#mbGrid");
    grid.innerHTML = "";
    const products = (state.data.products || []).filter((p) => p.sectionId === state.activeSectionId);

    if (!products.length) {
      grid.innerHTML = `<div class="mb-empty" style="grid-column:1/-1;">${t("noProducts")}</div>`;
      return;
    }

    products.forEach((p) => {
      const card = document.createElement("div");
      card.className = "mb-card" + (!p.visible ? " mb-hidden-item" : "");
      const name = state.lang === "ar" ? (p.name_ar || p.name_de) : p.name_de;
      const desc = state.lang === "ar" ? (p.desc_ar || p.desc_de) : p.desc_de;

      card.innerHTML = `
        <div class="mb-card-img" style="${p.image ? `background-image:url('${p.image}')` : ""}">
          ${!p.image ? "🥣" : ""}
          ${!p.visible ? `<span class="mb-hidden-tag">${t("hiddenBadge")}</span>` : ""}
        </div>
        <div class="mb-card-body">
          <h3>${escapeHtml(name)}</h3>
          <p>${escapeHtml(desc)}</p>
          <div class="mb-card-price">${escapeHtml(p.price)}</div>
          <div class="mb-card-actions">
            <button class="mb-toggle-vis-action">${p.visible ? "🙈 " + t("hide") : "👁 " + t("show")}</button>
            <button class="mb-edit-action">✏️ ${t("edit")}</button>
            <button class="mb-del-action">🗑️ ${t("delete")}</button>
          </div>
        </div>
      `;

      card.querySelector(".mb-toggle-vis-action").addEventListener("click", async () => {
        try {
          await apiSave("product", { id: p.id, visible: !p.visible });
          await loadData();
          render();
          toast(t("savedToast"));
        } catch (e) { toast(t("networkError")); }
      });
      card.querySelector(".mb-edit-action").addEventListener("click", () => openProductModal(p.id));
      card.querySelector(".mb-del-action").addEventListener("click", () => openDeleteProduct(p.id));

      grid.appendChild(card);
    });
  }

  function render() {
    applyLangToDOM();
    renderTabs();
    renderGrid();
  }

  /* ---------- CHOICE MODAL ---------- */
  function openChoiceModal() { $("#mbChoiceOverlay").classList.add("show"); }
  function closeChoiceModal() { $("#mbChoiceOverlay").classList.remove("show"); }

  /* ---------- NEW SECTION MODAL ---------- */
  function openNewSectionModal(thenProduct) {
    state.pendingNewSectionThenProduct = thenProduct;
    $("#mbSectionNameDe").value = "";
    $("#mbSectionNameAr").value = "";
    $("#mbSectionIcon").value = "";
    $("#mbSectionError").textContent = "";
    closeChoiceModal();
    $("#mbSectionOverlay").classList.add("show");
  }
  function closeSectionModal() { $("#mbSectionOverlay").classList.remove("show"); }

  async function submitNewSection() {
    const nameDe = $("#mbSectionNameDe").value.trim();
    const nameAr = $("#mbSectionNameAr").value.trim();
    const icon = $("#mbSectionIcon").value.trim();
    if (!nameDe || !nameAr) { $("#mbSectionError").textContent = t("requiredError"); return; }

    try {
      const newSec = { id: uid(), name_de: nameDe, name_ar: nameAr, icon: icon || "🍽️" };
      await apiSave("section", newSec);
      await loadData();
      state.activeSectionId = newSec.id;
      closeSectionModal();
      render();
      toast(t("savedToast"));
      if (state.pendingNewSectionThenProduct) openProductModal(null);
    } catch (e) {
      $("#mbSectionError").textContent = t("networkError");
    }
  }

  /* ---------- DELETE SECTION ---------- */
  let sectionPendingDelete = null;
  function openDeleteSection(id) { sectionPendingDelete = id; $("#mbDeleteSectionOverlay").classList.add("show"); }
  async function confirmDeleteSection() {
    if (!sectionPendingDelete) return;
    try {
      await apiDelete("section", sectionPendingDelete);
      await loadData();
      if (!state.data.sections.find((s) => s.id === state.activeSectionId)) {
        state.activeSectionId = state.data.sections.length ? state.data.sections[0].id : null;
      }
      sectionPendingDelete = null;
      $("#mbDeleteSectionOverlay").classList.remove("show");
      render();
      toast(t("deletedToast"));
    } catch (e) { toast(t("networkError")); }
  }

  /* ---------- PRODUCT MODAL ---------- */
  let currentImageData = "";

  function fillSectionSelect(selectedId) {
    const sel = $("#mbProductSection");
    sel.innerHTML = "";
    (state.data.sections || []).forEach((s) => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = state.lang === "ar" ? (s.name_ar || s.name_de) : s.name_de;
      if (s.id === selectedId) opt.selected = true;
      sel.appendChild(opt);
    });
  }

  function openProductModal(productId) {
    state.editingProductId = productId;
    closeChoiceModal();
    $("#mbProductError").textContent = "";
    fillSectionSelect(productId ? state.data.products.find((p) => p.id === productId).sectionId : state.activeSectionId);

    if (productId) {
      const p = state.data.products.find((pp) => pp.id === productId);
      $("#mbProductModalTitle").textContent = t("productFormTitleEdit");
      $("#mbProductNameDe").value = p.name_de || "";
      $("#mbProductNameAr").value = p.name_ar || "";
      $("#mbProductPrice").value = p.price || "";
      $("#mbProductDescDe").value = p.desc_de || "";
      $("#mbProductDescAr").value = p.desc_ar || "";
      currentImageData = p.image || "";
      $("#mbVisibleSwitch").classList.toggle("on", !!p.visible);
      if (currentImageData) {
        $("#mbImagePreview").src = currentImageData;
        $("#mbImagePreview").style.display = "block";
      } else {
        $("#mbImagePreview").style.display = "none";
      }
    } else {
      $("#mbProductModalTitle").textContent = t("productFormTitleAdd");
      $("#mbProductNameDe").value = "";
      $("#mbProductNameAr").value = "";
      $("#mbProductPrice").value = "";
      $("#mbProductDescDe").value = "";
      $("#mbProductDescAr").value = "";
      currentImageData = "";
      $("#mbImagePreview").style.display = "none";
      $("#mbVisibleSwitch").classList.add("on");
    }
    $("#mbProductOverlay").classList.add("show");
  }

  function closeProductModal() { $("#mbProductOverlay").classList.remove("show"); }

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxW = 640;
          const scale = Math.min(1, maxW / img.width);
          const canvas = document.createElement("canvas");
          canvas.width = img.width * scale;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.75));
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function submitProduct() {
    const nameDe = $("#mbProductNameDe").value.trim();
    const nameAr = $("#mbProductNameAr").value.trim();
    const price = $("#mbProductPrice").value.trim();
    const descDe = $("#mbProductDescDe").value.trim();
    const descAr = $("#mbProductDescAr").value.trim();
    const sectionId = $("#mbProductSection").value;
    const visible = $("#mbVisibleSwitch").classList.contains("on");

    if (!nameDe || !nameAr || !price) { $("#mbProductError").textContent = t("requiredError"); return; }

    const item = {
      id: state.editingProductId || undefined,
      sectionId, visible, price,
      name_de: nameDe, name_ar: nameAr, desc_de: descDe, desc_ar: descAr,
      image: currentImageData,
    };

    try {
      await apiSave("product", item);
      await loadData();
      state.activeSectionId = sectionId;
      closeProductModal();
      render();
      toast(t("savedToast"));
    } catch (e) {
      $("#mbProductError").textContent = t("networkError");
    }
  }

  /* ---------- DELETE PRODUCT ---------- */
  let productPendingDelete = null;
  function openDeleteProduct(id) { productPendingDelete = id; $("#mbDeleteOverlay").classList.add("show"); }
  async function confirmDeleteProduct() {
    if (!productPendingDelete) return;
    try {
      await apiDelete("product", productPendingDelete);
      await loadData();
      productPendingDelete = null;
      $("#mbDeleteOverlay").classList.remove("show");
      render();
      toast(t("deletedToast"));
    } catch (e) { toast(t("networkError")); }
  }

  /* ---------- EVENTS ---------- */
  function setupEvents() {
    document.querySelectorAll(".mb-lang-pill").forEach((el) => {
      el.addEventListener("click", () => {
        state.lang = el.dataset.lang;
        applyLangToDOM();
        if ($("#mbApp").style.display !== "none" && $("#mbApp").style.display !== "") render();
      });
    });

    $("#mbLangBtn").addEventListener("click", () => { state.lang = state.lang === "de" ? "ar" : "de"; render(); });

    $("#mbLoginBtn").addEventListener("click", doLogin);
    $("#mbPasswordInput").addEventListener("keydown", (e) => { if (e.key === "Enter") doLogin(); });

    $("#mbLogoutBtn").addEventListener("click", () => {
      sessionStorage.removeItem(TOKEN_KEY);
      state.adminToken = "";
      $("#mbApp").style.display = "none";
      $("#mbLoginScreen").style.display = "flex";
      $("#mbPasswordInput").value = "";
    });

    $("#mbAddProductBtn").addEventListener("click", openChoiceModal);
    $("#mbChoiceCancel").addEventListener("click", closeChoiceModal);
    $("#mbChoiceProduct").addEventListener("click", () => { closeChoiceModal(); openProductModal(null); });
    $("#mbChoiceSection").addEventListener("click", () => openNewSectionModal(true));

    $("#mbSectionBack").addEventListener("click", closeSectionModal);
    $("#mbSectionContinue").addEventListener("click", submitNewSection);

    $("#mbDeleteSectionCancel").addEventListener("click", () => { sectionPendingDelete = null; $("#mbDeleteSectionOverlay").classList.remove("show"); });
    $("#mbDeleteSectionConfirm").addEventListener("click", confirmDeleteSection);

    $("#mbProductCancel").addEventListener("click", closeProductModal);
    $("#mbProductSave").addEventListener("click", submitProduct);

    $("#mbVisibleSwitch").addEventListener("click", () => { $("#mbVisibleSwitch").classList.toggle("on"); });

    $("#mbImageInput").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        currentImageData = await compressImage(file);
        $("#mbImagePreview").src = currentImageData;
        $("#mbImagePreview").style.display = "block";
      } catch (err) { console.error(err); }
    });

    $("#mbDeleteCancel").addEventListener("click", () => { productPendingDelete = null; $("#mbDeleteOverlay").classList.remove("show"); });
    $("#mbDeleteConfirm").addEventListener("click", confirmDeleteProduct);

    document.querySelectorAll(".mb-overlay").forEach((ov) => {
      ov.addEventListener("click", (e) => { if (e.target === ov) ov.classList.remove("show"); });
    });
  }

  async function enterApp() {
    $("#mbLoginScreen").style.display = "none";
    $("#mbApp").style.display = "block";
    await loadData();
    render();
  }

  async function doLogin() {
    const val = $("#mbPasswordInput").value;
    if (!val) return;
    $("#mbLoginBtn").disabled = true;
    const ok = await apiVerify(val).catch(() => false);
    $("#mbLoginBtn").disabled = false;
    if (ok) {
      state.adminToken = val;
      sessionStorage.setItem(TOKEN_KEY, val);
      enterApp();
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
      $("#mbLoginError").textContent = t("wrongPassword");
    }
  }

  async function init() {
    setupEvents();
    applyLangToDOM();
    $("#mbLoading").style.display = "none";

    if (state.adminToken) {
      const ok = await apiVerify(state.adminToken).catch(() => false);
      if (ok) { enterApp(); return; }
      sessionStorage.removeItem(TOKEN_KEY);
      state.adminToken = "";
    }
    $("#mbLoginScreen").style.display = "flex";
  }

  init();

})();
