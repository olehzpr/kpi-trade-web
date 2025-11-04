import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file provided", { status: 400 });
    }

    // Upload to UploadThing
    const response = await utapi.uploadFiles(file);

    if (response.error) {
      throw new Error(response.error.message);
    }

    return new Response(
      JSON.stringify({
        url: response.data.url,
        key: response.data.key,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response("Upload failed", { status: 500 });
  }
}
