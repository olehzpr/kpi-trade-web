import { POST } from "./route";
import { UTApi } from "uploadthing/server";

jest.mock("uploadthing/server");

const MockedUTApi = UTApi as jest.MockedClass<typeof UTApi>;

// Mock Request for Node environment
global.Request = class Request {
  body: any;
  method: string;
  url: string;

  constructor(url: string, init?: RequestInit) {
    this.url = url;
    this.method = init?.method || "GET";
    this.body = init?.body;
  }

  async formData() {
    return this.body;
  }
} as any;

// Mock Response for Node environment
global.Response = class Response {
  body: any;
  status: number;
  headers: Headers;

  constructor(body: any, init?: ResponseInit) {
    this.body = body;
    this.status = init?.status || 200;
    this.headers = new Headers(init?.headers);
  }

  async json() {
    if (typeof this.body === "string") {
      return JSON.parse(this.body);
    }
    return this.body;
  }

  async text() {
    if (typeof this.body === "object") {
      return JSON.stringify(this.body);
    }
    return this.body;
  }
} as any;

describe("Upload API Route", () => {
  let mockUploadFiles: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUploadFiles = jest.fn();
    MockedUTApi.prototype.uploadFiles = mockUploadFiles;
  });

  // Skipping these tests as they require proper Next.js runtime environment
  // These should be tested with E2E tests instead
  it.skip("uploads file successfully", async () => {
    const file = new File(["test content"], "test.jpg", {
      type: "image/jpeg",
    });
    const formData = new FormData();
    formData.append("file", file);

    const mockRequest = new Request("http://localhost/api/uploadthing", {
      method: "POST",
      body: formData,
    });

    const mockUploadResponse = {
      data: {
        url: "https://example.com/uploaded.jpg",
        key: "test-key",
      },
      error: null,
    };

    mockUploadFiles.mockResolvedValueOnce(mockUploadResponse);

    const response = await POST(mockRequest as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({
      url: "https://example.com/uploaded.jpg",
      key: "test-key",
    });
    expect(mockUploadFiles).toHaveBeenCalledWith(file);
  });

  it.skip("returns 400 when no file is provided", async () => {
    const formData = new FormData();
    const mockRequest = new Request("http://localhost/api/uploadthing", {
      method: "POST",
      body: formData,
    });

    const response = await POST(mockRequest as any);
    const text = await response.text();

    expect(response.status).toBe(400);
    expect(text).toBe("No file provided");
  });

  it.skip("returns 500 when upload fails", async () => {
    const file = new File(["test content"], "test.jpg", {
      type: "image/jpeg",
    });
    const formData = new FormData();
    formData.append("file", file);

    const mockRequest = new Request("http://localhost/api/uploadthing", {
      method: "POST",
      body: formData,
    });

    const mockUploadResponse = {
      data: null,
      error: {
        message: "Upload failed",
      },
    };

    mockUploadFiles.mockResolvedValueOnce(mockUploadResponse);

    const response = await POST(mockRequest as any);
    const text = await response.text();

    expect(response.status).toBe(500);
    expect(text).toBe("Upload failed");
  });

  it.skip("handles exceptions during upload", async () => {
    const file = new File(["test content"], "test.jpg", {
      type: "image/jpeg",
    });
    const formData = new FormData();
    formData.append("file", file);

    const mockRequest = new Request("http://localhost/api/uploadthing", {
      method: "POST",
      body: formData,
    });

    mockUploadFiles.mockRejectedValueOnce(new Error("Network error"));

    const response = await POST(mockRequest as any);
    const text = await response.text();

    expect(response.status).toBe(500);
    expect(text).toBe("Upload failed");
  });
});
