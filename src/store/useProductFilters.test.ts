import { renderHook, act } from "@testing-library/react";
import { useProductFilters } from "./useProductFilters";

describe("useProductFilters", () => {
  it("initializes with default values", () => {
    const { result } = renderHook(() => useProductFilters());

    expect(result.current.sort).toBe("createdAt,asc");
    expect(result.current.categoryId).toBeUndefined();
    expect(result.current.sortBy).toBeUndefined();
    expect(result.current.minPrice).toBeUndefined();
    expect(result.current.maxPrice).toBeUndefined();
    expect(result.current.name).toBeUndefined();
  });

  it("updates filters using setFilters", () => {
    const { result } = renderHook(() => useProductFilters());

    act(() => {
      result.current.setFilters({
        categoryId: 1,
        minPrice: 50,
        maxPrice: 200,
      });
    });

    expect(result.current.categoryId).toBe(1);
    expect(result.current.minPrice).toBe(50);
    expect(result.current.maxPrice).toBe(200);
    expect(result.current.sort).toBe("createdAt,asc"); // Original value preserved
  });

  it("updates single filter without affecting others", () => {
    const { result } = renderHook(() => useProductFilters());

    act(() => {
      result.current.setFilters({ categoryId: 1 });
    });

    expect(result.current.categoryId).toBe(1);

    act(() => {
      result.current.setFilters({ minPrice: 100 });
    });

    expect(result.current.categoryId).toBe(1);
    expect(result.current.minPrice).toBe(100);
  });

  it("overwrites existing filter values", () => {
    const { result } = renderHook(() => useProductFilters());

    act(() => {
      result.current.setFilters({ categoryId: 1 });
    });

    expect(result.current.categoryId).toBe(1);

    act(() => {
      result.current.setFilters({ categoryId: 2 });
    });

    expect(result.current.categoryId).toBe(2);
  });

  it("handles multiple filter updates", () => {
    const { result } = renderHook(() => useProductFilters());

    act(() => {
      result.current.setFilters({
        categoryId: 1,
        sortBy: "price",
        minPrice: 50,
        maxPrice: 200,
        name: "test",
        sort: "price,desc",
      });
    });

    expect(result.current.categoryId).toBe(1);
    expect(result.current.sortBy).toBe("price");
    expect(result.current.minPrice).toBe(50);
    expect(result.current.maxPrice).toBe(200);
    expect(result.current.name).toBe("test");
    expect(result.current.sort).toBe("price,desc");
  });

  it("can clear filters by setting to undefined", () => {
    const { result } = renderHook(() => useProductFilters());

    act(() => {
      result.current.setFilters({
        categoryId: 1,
        minPrice: 50,
      });
    });

    expect(result.current.categoryId).toBe(1);
    expect(result.current.minPrice).toBe(50);

    act(() => {
      result.current.setFilters({
        categoryId: undefined,
        minPrice: undefined,
      });
    });

    expect(result.current.categoryId).toBeUndefined();
    expect(result.current.minPrice).toBeUndefined();
  });

  it("persists state across multiple hook instances", () => {
    const { result: result1 } = renderHook(() => useProductFilters());

    act(() => {
      result1.current.setFilters({ categoryId: 5 });
    });

    const { result: result2 } = renderHook(() => useProductFilters());

    expect(result2.current.categoryId).toBe(5);
  });
});
