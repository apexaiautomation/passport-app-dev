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

    export async function handler(event) {
  try {
    const apiKey = process.env.REMOVE_BG_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        body: "API key missing"
      };
    }

    const { image } = JSON.parse(event.body);

    // 🔥 FIX: Use URLSearchParams (not JSON, not FormData)
    const formData = new URLSearchParams();
    formData.append("image_file_b64", image);
    formData.append("size", "auto");

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey
      },
      body: formData
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Remove.bg error:", text);

      return {
        statusCode: 500,
        body: text
      };
    }

    const buffer = await response.arrayBuffer();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/png"
      },
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true
    };

  } catch (err) {
    console.error("Function crash:", err);

    return {
      statusCode: 500,
      body: err.message
    };
  }
}