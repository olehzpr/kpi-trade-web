import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "@/hooks/products/useProducts";
import {
  getProducts,
  getProduct,
  createProduct,
} from "@/services/api/products/api";
import { TestWrapper } from "@/test-utils/test-wrapper";
import {
  mockProducts,
  mockProduct,
  createMockProductsResponse,
} from "@/test-utils/mocks";
import { useProductFilters } from "@/store/useProductFilters";

jest.mock("@/services/api/products/api");

const mockedGetProducts = getProducts as jest.MockedFunction<
  typeof getProducts
>;
const mockedGetProduct = getProduct as jest.MockedFunction<typeof getProduct>;
const mockedCreateProduct = createProduct as jest.MockedFunction<
  typeof createProduct
>;

describe("Products Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useProductFilters.setState({
      categoryId: undefined,
      sortBy: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      name: undefined,
      sort: "createdAt,asc",
    });
  });

  describe("Product Listing Flow", () => {
    it("fetches and displays products", async () => {
      const mockResponse = createMockProductsResponse(mockProducts, 0, 10);

      mockedGetProducts.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useProducts(), {
        wrapper: TestWrapper,
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(result.current.data?.content).toHaveLength(2);
    });

    it("handles empty product list", async () => {
      const mockResponse = createMockProductsResponse([], 0, 10);

      mockedGetProducts.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useProducts(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data?.content).toHaveLength(0);
    });
  });

  describe("Product Filtering Flow", () => {
    it("filters products by category", async () => {
      const mockResponse = createMockProductsResponse([mockProduct], 0, 10);

      mockedGetProducts.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useProducts({ categoryId: 1 }), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedGetProducts).toHaveBeenCalledWith(
        expect.objectContaining({ categoryId: 1 })
      );
      expect(result.current.data).toEqual(mockResponse);
    });

    it("filters products by price range", async () => {
      const mockResponse = createMockProductsResponse([mockProduct], 0, 10);

      mockedGetProducts.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(
        () => useProducts({ minPrice: 50, maxPrice: 200 }),
        { wrapper: TestWrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedGetProducts).toHaveBeenCalledWith(
        expect.objectContaining({ minPrice: 50, maxPrice: 200 })
      );
      expect(result.current.data).toEqual(mockResponse);
    });

    it("filters products by name search", async () => {
      const mockResponse = createMockProductsResponse([mockProduct], 0, 10);

      mockedGetProducts.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useProducts({ name: "test" }), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedGetProducts).toHaveBeenCalledWith(
        expect.objectContaining({ name: "test" })
      );
      expect(result.current.data).toEqual(mockResponse);
    });

    it("combines multiple filters", async () => {
      const mockResponse = createMockProductsResponse([mockProduct], 0, 10);

      mockedGetProducts.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(
        () =>
          useProducts({
            categoryId: 1,
            minPrice: 50,
            maxPrice: 200,
            name: "test",
          }),
        { wrapper: TestWrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedGetProducts).toHaveBeenCalledWith(
        expect.objectContaining({
          categoryId: 1,
          minPrice: 50,
          maxPrice: 200,
          name: "test",
        })
      );
      expect(result.current.data).toEqual(mockResponse);
    });
  });

  describe("Product Detail Flow", () => {
    it("fetches single product details", async () => {
      mockedGetProduct.mockResolvedValueOnce(mockProduct);

      const productId = 1;
      const product = await getProduct(productId);

      expect(product).toEqual(mockProduct);
      expect(mockedGetProduct).toHaveBeenCalledWith(productId);
    });

    it("handles product not found", async () => {
      mockedGetProduct.mockRejectedValueOnce(new Error("Product not found"));

      await expect(getProduct(999)).rejects.toThrow("Product not found");
    });
  });

  describe("Product Creation Flow", () => {
    it("creates product successfully", async () => {
      const newProductDto = {
        product: {
          name: "New Product",
          description: "New product description",
          price: 150,
          categoryId: 1,
        },
        images: ["https://example.com/image.jpg"],
      };

      const createdProduct = {
        ...mockProduct,
        ...newProductDto.product,
      };

      mockedCreateProduct.mockResolvedValueOnce(createdProduct);

      const result = await createProduct(newProductDto);

      expect(result).toEqual(createdProduct);
      expect(mockedCreateProduct).toHaveBeenCalledWith(newProductDto);
    });

    it("validates product data on creation", async () => {
      const invalidProductDto = {
        product: {
          name: "AB", // Too short
          description: "Short", // Too short
          price: -10, // Negative price
          categoryId: 1,
        },
        images: [],
      };

      mockedCreateProduct.mockRejectedValueOnce(new Error("Validation error"));

      await expect(createProduct(invalidProductDto)).rejects.toThrow(
        "Validation error"
      );
    });
  });

  describe("Pagination Flow", () => {
    it("handles paginated product list", async () => {
      const page1Response = createMockProductsResponse(
        [mockProducts[0]],
        0,
        1
      );
      const page2Response = createMockProductsResponse(
        [mockProducts[1]],
        1,
        1
      );

      // Fetch first page
      mockedGetProducts.mockResolvedValueOnce(page1Response);
      const { result: result1 } = renderHook(
        () => useProducts({ page: 0, size: 1 }),
        { wrapper: TestWrapper }
      );

      await waitFor(() => {
        expect(result1.current.isSuccess).toBe(true);
      });

      expect(result1.current.data).toEqual(page1Response);
      expect(result1.current.data?.number).toBe(0);

      // Fetch second page
      mockedGetProducts.mockResolvedValueOnce(page2Response);
      const { result: result2 } = renderHook(
        () => useProducts({ page: 1, size: 1 }),
        { wrapper: TestWrapper }
      );

      await waitFor(() => {
        expect(result2.current.isSuccess).toBe(true);
      });

      expect(result2.current.data).toEqual(page2Response);
      expect(result2.current.data?.number).toBe(1);
    });
  });

  describe("Sorting Flow", () => {
    it("sorts products by price ascending", async () => {
      const mockResponse = createMockProductsResponse(mockProducts, 0, 10);

      mockedGetProducts.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useProducts({ sort: "price,asc" }), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedGetProducts).toHaveBeenCalledWith(
        expect.objectContaining({ sort: "price,asc" })
      );
    });

    it("sorts products by price descending", async () => {
      const mockResponse = createMockProductsResponse(mockProducts, 0, 10);

      mockedGetProducts.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useProducts({ sort: "price,desc" }), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedGetProducts).toHaveBeenCalledWith(
        expect.objectContaining({ sort: "price,desc" })
      );
    });

    it("sorts products by creation date", async () => {
      const mockResponse = createMockProductsResponse(mockProducts, 0, 10);

      mockedGetProducts.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(
        () => useProducts({ sort: "createdAt,desc" }),
        { wrapper: TestWrapper }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockedGetProducts).toHaveBeenCalledWith(
        expect.objectContaining({ sort: "createdAt,desc" })
      );
    });
  });

  describe("Error Handling Flow", () => {
    it("handles network errors gracefully", async () => {
      mockedGetProducts.mockRejectedValueOnce(new Error("Network error"));

      const { result } = renderHook(() => useProducts(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeTruthy();
      expect(result.current.data).toBeUndefined();
    });

    it("handles server errors", async () => {
      mockedGetProducts.mockRejectedValueOnce(
        new Error("Internal server error")
      );

      const { result } = renderHook(() => useProducts(), {
        wrapper: TestWrapper,
      });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeTruthy();
    });

    it("handles validation errors during product creation", async () => {
      const invalidDto = {
        product: {
          name: "",
          description: "",
          price: 0,
          categoryId: 0,
        },
        images: [],
      };

      mockedCreateProduct.mockRejectedValueOnce(new Error("Validation failed"));

      await expect(createProduct(invalidDto)).rejects.toThrow(
        "Validation failed"
      );
    });
  });
});
