// netlify/functions/ma-bowl-data.js
//
// API لبيانات منتجات MA Bowl (السكاشن + المنتجات).
// يستخدم Netlify Blobs للتخزين (بدون أي خدمة خارجية زي Firebase).
//
// نفس فكرة movies.mjs / reviews.js بمشروع Tornado:
// - GET بدون توثيق: يرجّع كل البيانات (الموقع نفسه يقرأ منها).
// - POST / DELETE: تتطلب هيدر x-admin-token يطابق متغيّر البيئة ADMIN_TOKEN
//   (اضبطه من Netlify: Site settings → Environment variables → ADMIN_TOKEN).
// - POST مع ?action=verify: تستخدمها لوحة التحكم للتحقق من كلمة السر عند الدخول.

import { getStore } from "@netlify/blobs";

const STORE_NAME = "ma_bowl";
const KEY = "data";

function randomId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, x-admin-token",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    },
  });
}

function isAuthorized(req) {
  const token = req.headers.get("x-admin-token");
  const expected = process.env.ADMIN_TOKEN;
  return Boolean(expected) && Boolean(token) && token === expected;
}

// البيانات الافتراضية أول مرة يشتغل فيها الموقع (قبل أي إضافة من لوحة التحكم)
function seedData() {
  return {
    sections: [
      { id: "signature", name_de: "Signature Bowls", name_ar: "أطباق مميزة", icon: "🥣" },
    ],
    products: [
      {
        id: "p1", sectionId: "signature", image: "", visible: true, price: "€7",
        name_de: "MA-PEANUT BOWL", name_ar: "MA-PEANUT BOWL",
        desc_de: "Cremiger Erdnussgeschmack mit Premium-Toppings.",
        desc_ar: "نكهة فول سوداني كريمية مع إضافات فاخرة.",
      },
      {
        id: "p2", sectionId: "signature", image: "", visible: true, price: "€7",
        name_de: "MA-NUTELLA BOWL", name_ar: "MA-NUTELLA BOWL",
        desc_de: "Intensiver Nutella-Geschmack mit köstlichen Früchten.",
        desc_ar: "طعم نوتيلا الغني مع فواكه لذيذة.",
      },
      {
        id: "p3", sectionId: "signature", image: "", visible: true, price: "€7",
        name_de: "MA-LOTUS BOWL", name_ar: "MA-LOTUS BOWL",
        desc_de: "Lotus-Creme kombiniert mit frischen Zutaten.",
        desc_ar: "كريمة اللوتس ممزوجة بمكونات طازجة.",
      },
      {
        id: "p4", sectionId: "signature", image: "", visible: true, price: "€7",
        name_de: "MA-PISTACHIO BOWL", name_ar: "MA-PISTACHIO BOWL",
        desc_de: "Premium-Pistazien-Erlebnis in jedem Bissen.",
        desc_ar: "تجربة فستق فاخرة في كل قضمة.",
      },
      {
        id: "p5", sectionId: "signature", image: "", visible: true, price: "€7",
        name_de: "MA-OCEAN", name_ar: "MA-OCEAN",
        desc_de: "Eine erfrischende Signature Bowl voller Geschmack.",
        desc_ar: "طبق مميز منعش مليء بالنكهة.",
      },
      {
        id: "p6", sectionId: "signature", image: "", visible: true, price: "€7 + €0,50",
        name_de: "GESTALTE DEINE EIGENE BOWL", name_ar: "صمم طبقك الخاص",
        desc_de: "Gestalte deine eigene Bowl mit extra Toppings.",
        desc_ar: "صمم طبقك الخاص بإضافات إضافية.",
      },
    ],
  };
}

export default async (req) => {
  const store = getStore(STORE_NAME);
  const url = new URL(req.url);

  if (req.method === "OPTIONS") {
    return json({ ok: true });
  }

  // ─── قراءة البيانات (عام، يستخدمه الموقع نفسه) ───
  if (req.method === "GET") {
    let data = await store.get(KEY, { type: "json" });
    if (!data) {
      data = seedData();
      await store.setJSON(KEY, data);
    }
    return json(data);
  }

  // ─── التحقق من كلمة السر عند دخول لوحة التحكم ───
  if (req.method === "POST" && url.searchParams.get("action") === "verify") {
    if (isAuthorized(req)) return json({ ok: true });
    return json({ error: "unauthorized" }, 401);
  }

  // ─── إضافة / تعديل سكشن أو منتج (يتطلب توثيق) ───
  if (req.method === "POST") {
    if (!isAuthorized(req)) return json({ error: "unauthorized" }, 401);

    let body;
    try {
      body = await req.json();
    } catch (e) {
      return json({ error: "invalid body" }, 400);
    }

    const { resource, item } = body;
    if (!resource || !item) return json({ error: "resource and item required" }, 400);

    let data = (await store.get(KEY, { type: "json" })) || seedData();

    if (resource === "section") {
      const idx = item.id ? data.sections.findIndex((s) => s.id === item.id) : -1;
      if (idx > -1) {
        data.sections[idx] = { ...data.sections[idx], ...item };
      } else {
        item.id = item.id || randomId();
        data.sections.push(item);
      }
    } else if (resource === "product") {
      const idx = item.id ? data.products.findIndex((p) => p.id === item.id) : -1;
      if (idx > -1) {
        data.products[idx] = { ...data.products[idx], ...item };
      } else {
        item.id = item.id || randomId();
        data.products.push(item);
      }
    } else {
      return json({ error: "invalid resource" }, 400);
    }

    await store.setJSON(KEY, data);
    return json({ ok: true, data });
  }

  // ─── حذف سكشن أو منتج نهائيًا (يتطلب توثيق) ───
  if (req.method === "DELETE") {
    if (!isAuthorized(req)) return json({ error: "unauthorized" }, 401);

    const resource = url.searchParams.get("resource");
    const id = url.searchParams.get("id");
    if (!resource || !id) return json({ error: "resource and id required" }, 400);

    let data = (await store.get(KEY, { type: "json" })) || seedData();

    if (resource === "section") {
      data.sections = data.sections.filter((s) => s.id !== id);
      data.products = data.products.filter((p) => p.sectionId !== id);
    } else if (resource === "product") {
      data.products = data.products.filter((p) => p.id !== id);
    } else {
      return json({ error: "invalid resource" }, 400);
    }

    await store.setJSON(KEY, data);
    return json({ ok: true, data });
  }

  return json({ error: "Method not allowed" }, 405);
};

export const config = { path: "/api/ma-bowl-data" };
