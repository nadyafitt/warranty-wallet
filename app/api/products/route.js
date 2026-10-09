
import { NextResponse } from "next/server";

function detectBrand(title) {
  const brands = [
    "Russell Hobbs",
    "Harman Kardon",
    "Samsung",
    "Panasonic",
    "Electrolux",
    "Motorola",
    "OnePlus",
    "Xiaomi",
    "Realme",
    "Huawei",
    "Philips",
    "Toshiba",
    "Hisense",
    "Hitachi",
    "Pensonic",
    "Cornell",
    "Midea",
    "Khind",
    "Sharp",
    "Bosch",
    "Haier",
    "Tefal",
    "Dyson",
    "Kenwood",
    "Apple",
    "Google",
    "Nokia",
    "Honor",
    "Oppo",
    "Vivo",
    "Sony",
    "Acer",
    "Asus",
    "Dell",
    "Lenovo",
    "HP",
    "LG",
    "JBL",
    "Bose",
    "Cuckoo",
  ];

  const normalizedTitle = String(title || "").toLowerCase();

  return (
    brands.find((brand) =>
      normalizedTitle.includes(brand.toLowerCase())
    ) || ""
  );
}

function detectCategory(query, title) {
  const text = `${query} ${title}`.toLowerCase();

  const applianceKeywords = [
    "rice cooker",
    "pressure cooker",
    "slow cooker",
    "air fryer",
    "electric cooker",
    "induction cooker",
    "microwave",
    "refrigerator",
    "fridge",
    "washing machine",
    "dishwasher",
    "kettle",
    "blender",
    "toaster",
    "vacuum",
    "water dispenser",
    "appliance",
  ];

  const furnitureKeywords = [
    "sofa",
    "office chair",
    "dining chair",
    "desk",
    "dining table",
    "wardrobe",
    "bookshelf",
    "bed frame",
    "cabinet",
    "furniture",
  ];

  const electronicsKeywords = [
    "phone",
    "smartphone",
    "mobile",
    "galaxy",
    "iphone",
    "tablet",
    "ipad",
    "laptop",
    "computer",
    "headphone",
    "earbuds",
    "television",
    "tv",
    "monitor",
    "camera",
    "smartwatch",
    "speaker",
    "playstation",
    "electronics",
  ];

  if (
    applianceKeywords.some((word) => text.includes(word))
  ) {
    return "Appliances";
  }

  if (
    furnitureKeywords.some((word) => text.includes(word))
  ) {
    return "Furniture";
  }

  if (
    electronicsKeywords.some((word) => text.includes(word))
  ) {
    return "Electronics";
  }

  return "Others";
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json(
      { error: "Enter at least 2 characters to search." },
      { status: 400 }
    );
  }

  if (query.length > 100) {
    return NextResponse.json(
      { error: "Search term is too long." },
      { status: 400 }
    );
  }

  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Product search API key is not configured." },
      { status: 500 }
    );
  }

  try {
    const apiUrl = new URL("https://serpapi.com/search.json");

    apiUrl.searchParams.set("engine", "google_shopping");
    apiUrl.searchParams.set("q", query);
    apiUrl.searchParams.set("api_key", apiKey);
    apiUrl.searchParams.set("gl", "my");
    apiUrl.searchParams.set("hl", "en");

    const response = await fetch(apiUrl, {
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error(
        "SerpApi product search failed:",
        data.error || response.status
      );

      return NextResponse.json(
        {
          error:
            response.status === 429
              ? "Product search limit reached. Please try again later."
              : "Unable to retrieve shopping results.",
        },
        {
          status: response.status === 429 ? 429 : 502,
        }
      );
    }

    const products = (data.shopping_results || [])
      .slice(0, 8)
      .map((item, index) => ({
        id: String(
          item.product_id ||
          `${item.title || "product"}-${index}`
        ),
        name: item.title || "",
        brand: detectBrand(item.title),
        category: detectCategory(query, item.title || ""),
        image: item.thumbnail || "",
      }))
      .filter((product) => product.name);

    return NextResponse.json({ products });
  } catch (error) {
    console.error("SerpApi request failed:", error);

    return NextResponse.json(
      { error: "Unable to search products right now." },
      { status: 502 }
    );
  }
}