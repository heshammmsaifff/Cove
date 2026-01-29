import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, message } = await request.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;

    // قراءة المعرفات وتحويلها إلى مصفوفة (Array)
    // يتوقع أن يكون التنسيق في .env كالتالي: ID1,ID2,ID3
    const chatIdsRaw = process.env.TELEGRAM_CHAT_ID || "";
    const chatIds = chatIdsRaw
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");

    if (chatIds.length === 0) {
      throw new Error("No Chat IDs found in environment variables");
    }

    const telegramText = `🔔 *New Guest Comment*\n\n👤 *Name:* ${name}\n💬 *Message:* ${message}`;

    // إعداد وعود الإرسال لجميع المعرفات في وقت واحد
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

    // تنفيذ جميع الطلبات وانتظار النتائج
    const results = await Promise.all(sendPromises);

    // التأكد من أن طلباً واحداً على الأقل نجح
    const anySuccess = results.some((res) => res.ok);

    if (!anySuccess) {
      throw new Error("Failed to send message to any of the Telegram IDs");
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
