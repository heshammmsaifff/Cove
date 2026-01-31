import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, message } = await request.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatIdsRaw = process.env.TELEGRAM_CHAT_ID || "";
    const chatIds = chatIdsRaw
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");

    if (chatIds.length === 0) {
      throw new Error("No Chat IDs found in environment variables");
    }

    let header = "💬 *New Guest Comment*";
    let finalMessage = message;

    if (message.includes("SUBSCRIPTION_REQUEST:")) {
      header = "🎁 *NEW OFFERS SUBSCRIPTION*";
      finalMessage = message.replace("SUBSCRIPTION_REQUEST:", "Phone Number:");
    }
    // --------------------------------------

    const telegramText = `${header}\n\n *Name:* ${name}\n *Details:* ${finalMessage}`;

    const sendPromises = chatIds.map((id) =>
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: id,
          text: telegramText,
          parse_mode: "Markdown",
        }),
      }),
    );

    const results = await Promise.all(sendPromises);
    const anySuccess = results.some((res) => res.ok);

    if (!anySuccess) {
      throw new Error("Failed to send message to Telegram");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Telegram Route Error:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
