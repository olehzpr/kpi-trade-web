import { getProducts, getProduct, createProduct } from "./api";
import { api } from "@/lib/api";
import {
  mockProduct,
  mockProducts,
  createMockProductsResponse,
} from "@/test-utils/mocks";

jest.mock("@/lib/api");

const mockedApi = api as jest.Mocked<typeof api>;

describe("Products API (Unit)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("fetches products with default params", async () => {
      const mockResponse = createMockProductsResponse(mockProducts, 0, 10);

      mockedApi.get.mockResolvedValueOnce({
        data: mockResponse,
      });

      const result = await getProducts();

      expect(result).toEqual(mockResponse);
      expect(mockedApi.get).toHaveBeenCalledWith("/products", { params: {} });
    });

    it("fetches products with filter params", async () => {
      const mockResponse = createMockProductsResponse(mockProducts, 0, 20);

      mockedApi.get.mockResolvedValueOnce({
        data: mockResponse,
      });

      const params = {
        categoryId: 1,
        minPrice: 50,
        maxPrice: 200,
        name: "test",
        page: 0,
        size: 20,
      };

      const result = await getProducts(params);

      expect(result).toEqual(mockResponse);
      expect(mockedApi.get).toHaveBeenCalledWith("/products", { params });
    });

    it("handles sorting params", async () => {
      const mockResponse = createMockProductsResponse(mockProducts, 0, 10);

      mockedApi.get.mockResolvedValueOnce({
        data: mockResponse,
      });

      const params = {
        sort: "price,desc",
      };

      const result = await getProducts(params);

      expect(mockedApi.get).toHaveBeenCalledWith("/products", { params });
    });

    it("throws error when request fails", async () => {
      mockedApi.get.mockRejectedValueOnce(new Error("Network error"));

      await expect(getProducts()).rejects.toThrow("Network error");
    });

    it("throws error when response validation fails", async () => {
      mockedApi.get.mockResolvedValueOnce({
        data: { invalid: "data" },
      });

      await expect(getProducts()).rejects.toThrow();
    });
  });

  describe("getProduct", () => {
    it("fetches single product successfully", async () => {
      mockedApi.get.mockResolvedValueOnce({
        data: mockProduct,
      });

      const result = await getProduct(1);

      expect(result).toEqual(mockProduct);
      expect(mockedApi.get).toHaveBeenCalledWith("/products/1");
    });

    it("throws error when product not found", async () => {
      mockedApi.get.mockRejectedValueOnce(new Error("Product not found"));

      await expect(getProduct(999)).rejects.toThrow("Product not found");
    });

    it("throws error when response validation fails", async () => {
      mockedApi.get.mockResolvedValueOnce({
        data: { invalid: "data" },
      });

      await expect(getProduct(1)).rejects.toThrow();
    });
  });

  describe("createProduct", () => {
    const productDto = {
      product: {
        name: "New Product",
        description: "New product description",
        price: 150,
        categoryId: 1,
      },
      images: ["https://example.com/image.jpg"],
    };

    it("creates product successfully", async () => {
      const createdProduct = { ...mockProduct, ...productDto.product };
      mockedApi.post.mockResolvedValueOnce({
        data: createdProduct,
      });

      const result = await createProduct(productDto);

      expect(result).toEqual(createdProduct);
      expect(mockedApi.post).toHaveBeenCalledWith("/products", productDto);
    });

    it("throws error when creation fails", async () => {
      mockedApi.post.mockRejectedValueOnce(
        new Error("Validation error")
      );

      await expect(createProduct(productDto)).rejects.toThrow(
        "Validation error"
      );
    });

    it("handles server errors", async () => {
      mockedApi.post.mockRejectedValueOnce(
        new Error("Internal server error")
      );

      await expect(createProduct(productDto)).rejects.toThrow(
        "Internal server error"
      );
    });
  });
});
