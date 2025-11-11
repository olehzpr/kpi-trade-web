import { renderHook, waitFor } from "@testing-library/react";
import { useProducts } from "./useProducts";
import { getProducts } from "@/services/api/products/api";
import { TestWrapper } from "@/test-utils/test-wrapper";
import { mockProducts, createMockProductsResponse } from "@/test-utils/mocks";

jest.mock("@/services/api/products/api");

const mockedGetProducts = getProducts as jest.MockedFunction<
  typeof getProducts
>;

describe("useProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches products successfully", async () => {
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
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("fetches products with filter params", async () => {
    const mockResponse = createMockProductsResponse(mockProducts, 0, 10);

    mockedGetProducts.mockResolvedValueOnce(mockResponse);

    const params = {
      categoryId: 1,
      minPrice: 50,
      maxPrice: 200,
    };

    const { result } = renderHook(() => useProducts(params), {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockedGetProducts).toHaveBeenCalledWith(params);
    expect(result.current.data).toEqual(mockResponse);
  });

  it("handles errors correctly", async () => {
    const error = new Error("Failed to fetch products");
    mockedGetProducts.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useProducts(), {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("uses correct query key", async () => {
    const mockResponse = {
      content: mockProducts,
      totalElements: 2,
      totalPages: 1,
      number: 0,
      size: 10,
    };

    mockedGetProducts.mockResolvedValueOnce(mockResponse);

    const params = { categoryId: 1, name: "test" };

    const { result } = renderHook(() => useProducts(params), {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Query key should include params for proper cache invalidation
    expect(mockedGetProducts).toHaveBeenCalledWith(params);
  });

  it("handles empty params", async () => {
    const mockResponse = createMockProductsResponse([], 0, 10);

    mockedGetProducts.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useProducts({}), {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockResponse);
    expect(mockedGetProducts).toHaveBeenCalledWith({});
  });

  it("handles undefined params", async () => {
    const mockResponse = createMockProductsResponse(mockProducts, 0, 10);

    mockedGetProducts.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useProducts(undefined), {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockResponse);
    expect(mockedGetProducts).toHaveBeenCalledWith(undefined);
  });
});
