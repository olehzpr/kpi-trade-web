import { createProductFormSchema } from "./createProductFormSchema";

describe("createProductFormSchema", () => {
  const file = new File(["test"], "test.jpg", { type: "image/jpeg" });
  const validFile = {
    0: file,
    length: 1,
    item: () => null,
    *[Symbol.iterator]() {
      yield file;
    },
  } as unknown as FileList;

  it("validates correct form data", () => {
    const validData = {
      title: "Test Product",
      description: "This is a test product description",
      price: 100,
      telegram: "@testuser",
      instagram: "testuser",
      phone: "+380123456789",
      image: validFile,
    };

    const result = createProductFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("validates form data without optional fields", () => {
    const validData = {
      title: "Test Product",
      description: "This is a test product description",
      price: 100,
      image: validFile,
    };

    const result = createProductFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  describe("title validation", () => {
    it("rejects title shorter than 3 characters", () => {
      const data = {
        title: "AB",
        description: "Valid description",
        price: 100,
        image: validFile,
      };

      const result = createProductFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe(
          "Назва має бути принаймні 3 символи."
        );
      }
    });

    it("accepts title with exactly 3 characters", () => {
      const data = {
        title: "ABC",
        description: "Valid description",
        price: 100,
        image: validFile,
      };

      const result = createProductFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("description validation", () => {
    it("rejects description shorter than 10 characters", () => {
      const data = {
        title: "Valid Title",
        description: "Short",
        price: 100,
        image: validFile,
      };

      const result = createProductFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe(
          "Опис має бути принаймні 10 символів."
        );
      }
    });

    it("accepts description with exactly 10 characters", () => {
      const data = {
        title: "Valid Title",
        description: "1234567890",
        price: 100,
        image: validFile,
      };

      const result = createProductFormSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("price validation", () => {
    it("rejects negative price", () => {
      const data = {
        title: "Valid Title",
        description: "Valid description",
        price: -10,
        image: validFile,
      };

      const result = createProductFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe(
          "Ціна має бути більшою за 0."
        );
      }
    });

    it("rejects zero price", () => {
      const data = {
        title: "Valid Title",
        description: "Valid description",
        price: 0,
        image: validFile,
      };

      const result = createProductFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("coerces string to number", () => {
      const data = {
        title: "Valid Title",
        description: "Valid description",
        price: "100" as any,
        image: validFile,
      };

      const result = createProductFormSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(typeof result.data.price).toBe("number");
        expect(result.data.price).toBe(100);
      }
    });

    it("rejects non-numeric string", () => {
      const data = {
        title: "Valid Title",
        description: "Valid description",
        price: "not a number" as any,
        image: validFile,
      };

      const result = createProductFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe(
          "Будь ласка, введіть число."
        );
      }
    });
  });

  describe("image validation", () => {
    it("rejects missing image", () => {
      const data = {
        title: "Valid Title",
        description: "Valid description",
        price: 100,
      };

      const result = createProductFormSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("rejects empty FileList", () => {
      const emptyFileList = { length: 0 } as FileList;
      const data = {
        title: "Valid Title",
        description: "Valid description",
        price: 100,
        image: emptyFileList,
      };

      const result = createProductFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe(
          "Зображення є обов'язковим."
        );
      }
    });

    it("rejects non-image file", () => {
      const pdf = new File(["test"], "test.pdf", { type: "application/pdf" });
      const pdfFile = {
        0: pdf,
        length: 1,
        item: () => null,
        *[Symbol.iterator]() {
          yield pdf;
        },
      } as unknown as FileList;
      const data = {
        title: "Valid Title",
        description: "Valid description",
        price: 100,
        image: pdfFile,
      };

      const result = createProductFormSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe(
          "Файл має бути зображенням."
        );
      }
    });
  });
});
