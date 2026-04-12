export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: "Method Not Allowed"
      };
    }

    const { image } = JSON.parse(event.body || "{}");

    if (!image) {
      return {
        statusCode: 400,
        body: "No image data received"
      };
    }

    const body = new URLSearchParams();
    body.append("image_file_b64", image);
    body.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_API_KEY
      },
      body
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: errorText
      };
    }

    const buffer = await response.arrayBuffer();

    return {
      statusCode: 200,
      isBase64Encoded: true,
      headers: {
        "Content-Type": "image/png"
      },
      body: Buffer.from(buffer).toString("base64")
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error.message || "Server error"
    };
  }
}