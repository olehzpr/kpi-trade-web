import { uploadImage } from "./uploadImage";
import { mockFile } from "@/test-utils/mocks";

global.fetch = jest.fn();

describe("uploadImage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uploads image successfully", async () => {
    const mockUrl = "https://example.com/uploaded-image.jpg";
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ url: mockUrl }),
    });

    const result = await uploadImage(mockFile);

    expect(result).toBe(mockUrl);
    expect(global.fetch).toHaveBeenCalledWith(
      "/api/uploadthing",
      expect.objectContaining({
        method: "POST",
        body: expect.any(FormData),
      })
    );
  });

  it("handles fileUrl property", async () => {
    const mockUrl = "https://example.com/uploaded-image.jpg";
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ fileUrl: mockUrl }),
    });

    const result = await uploadImage(mockFile);

    expect(result).toBe(mockUrl);
  });

  it("returns empty string if no url in response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    const result = await uploadImage(mockFile);

    expect(result).toBe("");
  });

  it("throws error when upload fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(uploadImage(mockFile)).rejects.toThrow("Upload failed");
  });

  it("throws error when fetch fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error")
    );

    await expect(uploadImage(mockFile)).rejects.toThrow("Network error");
  });
});
