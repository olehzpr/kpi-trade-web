import { getProduct, getProducts } from "@/services/api/products/api";

describe("Products API Integration", () => {
  it("fetches and validates products without throwing errors", async () => {
    await expect(getProducts()).resolves.not.toThrow();
  });

  it("fetches and validates single product without throwing errors", async () => {
    const testProductId = 1;
    await expect(getProduct(testProductId)).resolves.not.toThrow();
  });

  it("throws error when product does not exist", async () => {
    const testProductId = -1;
    await expect(getProduct(testProductId)).rejects.toThrow(Error);
  });
});
