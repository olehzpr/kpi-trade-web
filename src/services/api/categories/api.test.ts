import { getCategories } from "./api";

describe("Categories API Integration", () => {
  it("fetches and validates categories without throwing errors", async () => {
    await expect(getCategories()).resolves.not.toThrow();
  });
});
