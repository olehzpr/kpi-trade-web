import { ProductsApiResponse } from "@/types/product";

export const getProducts = async () => {
  // const res = await api.get<ProductsApiResponse>("/products");
  // return res.data;
  await new Promise((resolve) => setTimeout(resolve, 1000)); // TODO: remove api mock
  return mockProductsApiResponse;
};

export const getProduct = async (id: number) => {
  // const res = await api.get<ProductWithDetails>(`/products/${id}`);
  // return res.data;
  await new Promise((resolve) => setTimeout(resolve, 1000)); // TODO: remove api mock
  return mockProductsApiResponse.content.find(
    (product) => product.id === id.toString()
  );
};

// mock response
export const mockProductsApiResponse: ProductsApiResponse = {
  totalPages: 5,
  totalElements: 25,
  pageable: {
    pageNumber: 0,
    pageSize: 5,
    offset: 0,
    sort: {
      sorted: true,
      empty: false,
      unsorted: false,
    },
    unpaged: false,
    paged: true,
  },
  first: true,
  last: false,
  size: 5,
  content: [
    {
      id: "1",
      name: "Vintage Leather Jacket",
      description:
        "Authentic vintage leather jacket in excellent condition. Size M, dark brown color.",
      price: 12500,
      seller: {
        id: 101,
        telegramId: "user123",
        telegramUsername: "vintagefinder",
        phone: "+1234567890",
        instagram: "vintage_finds",
      },
      category: {
        id: 3,
        name: "Clothing",
      },
      images: [
        {
          id: 1001,
          url: "https://picsum.photos/1000",
        },
        {
          id: 1002,
          url: "https://picsum.photos/1000",
        },
      ],
      createdAt: "2025-03-20T14:30:45.123Z",
      updatedAt: "2025-03-25T09:15:22.456Z",
      statistics: {
        viewCount: 243,
        uniqueViewCount: 178,
        timeOnPage: 87,
      },
      favorite: true,
    },
    {
      id: "2",
      name: "iPhone 15 Pro Max",
      description:
        "Barely used iPhone 15 Pro Max, 256GB, Titanium finish. Includes original box and accessories.",
      price: 89900,
      seller: {
        id: 102,
        telegramId: "user456",
        telegramUsername: "techdeals",
        phone: "+9876543210",
        instagram: "tech_marketplace",
      },
      category: {
        id: 1,
        name: "Electronics",
      },
      images: [
        {
          id: 2001,
          url: "https://picsum.photos/1000",
        },
        {
          id: 2002,
          url: "https://picsum.photos/1000",
        },
        {
          id: 2003,
          url: "https://picsum.photos/1000",
        },
      ],
      createdAt: "2025-04-01T08:45:12.789Z",
      updatedAt: "2025-04-01T08:45:12.789Z",
      statistics: {
        viewCount: 567,
        uniqueViewCount: 432,
        timeOnPage: 120,
      },
      favorite: false,
    },
    {
      id: "3",
      name: "Handmade Ceramic Vase Set",
      description:
        "Set of 3 handmade ceramic vases in various sizes. Perfect for modern home decor.",
      price: 5900,
      seller: {
        id: 103,
        telegramId: "user789",
        telegramUsername: "artisancrafts",
        phone: "+1122334455",
        instagram: "ceramic_studio",
      },
      category: {
        id: 4,
        name: "Home & Garden",
      },
      images: [
        {
          id: 3001,
          url: "https://picsum.photos/1000",
        },
      ],
      createdAt: "2025-03-15T16:20:33.555Z",
      updatedAt: "2025-03-28T11:10:45.123Z",
      statistics: {
        viewCount: 189,
        uniqueViewCount: 145,
        timeOnPage: 65,
      },
      favorite: true,
    },
    {
      id: "4",
      name: "Mountain Bike - Trek Marlin 7",
      description:
        "2024 Trek Marlin 7 mountain bike, size L. Ridden only a few times, in perfect condition.",
      price: 79500,
      seller: {
        id: 104,
        telegramId: "user101",
        telegramUsername: "bikeenthusiast",
        phone: "+5544332211",
        instagram: "cycle_life",
      },
      category: {
        id: 5,
        name: "Sports & Outdoors",
      },
      images: [
        {
          id: 4001,
          url: "https://picsum.photos/1000",
        },
        {
          id: 4002,
          url: "https://picsum.photos/1000",
        },
        {
          id: 4003,
          url: "https://picsum.photos/1000",
        },
        {
          id: 4004,
          url: "https://picsum.photos/1000",
        },
      ],
      createdAt: "2025-04-03T15:40:22.789Z",
      updatedAt: "2025-04-05T09:30:15.456Z",
      statistics: {
        viewCount: 321,
        uniqueViewCount: 245,
        timeOnPage: 110,
      },
      favorite: false,
    },
    {
      id: "5",
      name: "Vintage Record Collection",
      description:
        "Collection of 50+ vinyl records from the 70s and 80s. Various genres including rock, jazz, and blues.",
      price: 35000,
      seller: {
        id: 105,
        telegramId: "user202",
        telegramUsername: "vinylcollector",
        phone: "+6677889900",
        instagram: "vinyl_treasures",
      },
      category: {
        id: 2,
        name: "Music & Entertainment",
      },
      images: [
        {
          id: 5001,
          url: "https://picsum.photos/1000",
        },
        {
          id: 5002,
          url: "https://picsum.photos/1000",
        },
      ],
      createdAt: "2025-03-28T12:15:30.123Z",
      updatedAt: "2025-04-02T14:20:45.789Z",
      statistics: {
        viewCount: 278,
        uniqueViewCount: 198,
        timeOnPage: 95,
      },
      favorite: true,
    },
  ],
  number: 0,
  sort: {
    sorted: true,
    empty: false,
    unsorted: false,
  },
  numberOfElements: 5,
  empty: false,
};
