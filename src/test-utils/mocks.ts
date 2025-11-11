import { User } from "@/types/auth/user";
import { ProductWithDetails } from "@/types/products/product";
import { ProductsResponse } from "@/services/api/products/responses";

export const mockUser: User = {
  id: 1,
  telegramId: "123456789",
  telegramUsername: "testuser",
  phone: "+380123456789",
  instagram: "testuser",
};

export const mockProduct: ProductWithDetails = {
  id: 1,
  name: "Test Product",
  description: "Test product description",
  price: 100,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-01T00:00:00Z",
  images: [
    {
      id: 1,
      url: "https://example.com/image.jpg",
    },
  ],
  seller: {
    id: 1,
    telegramId: "987654321",
    telegramUsername: "seller",
    phone: "+380987654321",
    instagram: "seller",
  },
  category: {
    id: 1,
    name: "Electronics",
  },
  statistics: {
    viewCount: 10,
    uniqueViewCount: 5,
    timeOnPage: 60,
  },
  favorite: false,
};

export const mockProducts = [
  mockProduct,
  {
    ...mockProduct,
    id: 2,
    name: "Test Product 2",
    price: 200,
  },
];

export const createMockProductsResponse = (
  content: ProductWithDetails[] = mockProducts,
  page: number = 0,
  size: number = 10
): ProductsResponse => ({
  content,
  totalElements: content.length,
  totalPages: Math.ceil(content.length / size),
  number: page,
  size,
  empty: content.length === 0,
  first: page === 0,
  last: page === Math.ceil(content.length / size) - 1,
  numberOfElements: content.length,
  sort: {
    sorted: true,
    empty: false,
    unsorted: false,
  },
  pageable: {
    pageNumber: page,
    pageSize: size,
    offset: page * size,
    sort: {
      sorted: true,
      empty: false,
      unsorted: false,
    },
    unpaged: false,
    paged: true,
  },
});

export const mockCategories = [
  { id: 1, name: "Electronics" },
  { id: 2, name: "Books" },
  { id: 3, name: "Clothing" },
];

export const mockAuthResponse = {
  accessToken: "mock-access-token",
};

export const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" });
