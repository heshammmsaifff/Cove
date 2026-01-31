import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, message } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatIdsRaw = process.env.TELEGRAM_CHAT_ID || "";
    const chatIds = chatIdsRaw
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");

    if (!botToken || chatIds.length === 0) {
      return NextResponse.json(
        { success: false, error: "Server Configuration Error" },
        { status: 500 },
      );
    }

    let header = "GUEST FEEDBACK";
    let finalMessage = message || "";
    let tableInfo = "TABLE: unknown!\n"; // القيمة الافتراضية

    // منطق الفلترة المطور
    if (finalMessage.includes("SUBSCRIPTION_REQUEST:")) {
      header = "NEW OFFERS SUBSCRIPTION";
      tableInfo = ""; // لا تظهر الطاولة في الاشتراكات

      // استخراج الرقم فقط سواء بوجود TABLE_ID أو بدونه
      if (finalMessage.includes("|")) {
        const parts = finalMessage.split("|");
        const subPart = parts.find((p) => p.includes("SUBSCRIPTION_REQUEST:"));
        finalMessage = subPart
          ? subPart.replace("SUBSCRIPTION_REQUEST: ", "Phone: ").trim()
          : finalMessage;
      } else {
        finalMessage = finalMessage
          .replace("SUBSCRIPTION_REQUEST: ", "Phone: ")
          .trim();
      }
    } else if (finalMessage.includes("TABLE_ID:")) {
      const parts = finalMessage.split(" | ");
      const tablePart = parts[0] || "";
      const contentPart = parts[1] || "";

      const tableId = tablePart.replace("TABLE_ID: ", "").trim();
      tableInfo = `TABLE: ${tableId}\n`;
      finalMessage = contentPart.replace("COMMENT: ", "").trim();
    }

    // تنسيق الرسالة النهائي (نظيف تماماً من الإيموجي)
    const telegramText = `${header}\n\n${tableInfo}Name: ${name || "Anonymous"}\nDetails: ${finalMessage}`;

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
    const successCount = results.filter((res) => res.ok).length;

    if (successCount === 0) {
      throw new Error("Telegram API failed");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API ERROR:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
