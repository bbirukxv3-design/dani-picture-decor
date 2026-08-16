// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, service, packageType, date, time } = body;

    // 1. ለደንበኛው ውብ የሆነውን የቀጠሮ ማረጋገጫ ኢሜይል መላክ
    const customerEmail = await resend.emails.send({
      from: "Dani Photo & Decor <onboarding@resend.dev>",
      to: [email],
      subject: "✨ የቀጠሮ ማረጋገጫ — ዳኒ ፎቶ & ዲኮር",
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 16px; border: 1px solid #334155;">
          <h2 style="color: #fbbf24; text-align: center; margin-bottom: 24px;">ዳኒ ፎቶ & ዲኮር</h2>
          
          <p style="font-size: 16px; line-height: 1.5;">ሰላም <strong>${name}</strong> 👋,</p>
          <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
            በዳኒ ፎቶ & ዲኮር ቀጠሮ ስለያዙ እናመሰግናለን! የቀጠሮዎ መረጃ በተሳካ ሁኔታ ተመዝግቧል።
          </p>
          
          <div style="background-color: #1e293b; padding: 16px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #fbbf24;">
            <h3 style="margin-top: 0; color: #fbbf24; font-size: 15px;">የቀጠሮ ዝርዝር፦</h3>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 1.8;">
              <li>📌 <strong>የአገልግሎት ዓይነት፦</strong> ${service}</li>
              <li>📦 <strong>የፓኬጅ ዓይነት፦</strong> ${packageType}</li>
              <li>📅 <strong>ቀን፦</strong> ${date}</li>
              <li>⏰ <strong>ሰዓት፦</strong> ${time}</li>
            </ul>
          </div>

          <p style="font-size: 13px; color: #94a3b8; text-align: center; margin-top: 30px;">
            በአጭር ጊዜ ውስጥ በስልክ ደውለን ቀጠሮውን እናረግጣለን። መልካም ጊዜ!
          </p>
        </div>
      `,
    });

    // 2. ለአስተዳዳሪው (ለአንተ) ወዲያውኑ የማሳወቂያ ኢሜይል መላክ
    const adminEmail = await resend.emails.send({
      from: "Dani Booking System <onboarding@resend.dev>",
      to: ["daniphoto@gmail.com"], // 👈 እዚህ ጋር የራስዎን ትክክለኛ ኢሜይል ያስገቡ
      subject: `🔔 አዲስ ቀጠሮ ተይዟል! - ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 16px; border: 1px solid #334155;">
          <h2 style="color: #fbbf24; text-align: center; margin-bottom: 24px;">🔔 አዲስ የደንበኛ ቀጠሮ!</h2>
          
          <p style="font-size: 16px; line-height: 1.5;">ሰላም ዳኒ 👋,</p>
          <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
            በድረ-ገጽዎ አዲስ ቀጠሮ ተይዟል፤ የደንበኛው ዝርዝር መረጃ ከዚህ በታች ተመልክቷል፦
          </p>
          
          <div style="background-color: #1e293b; padding: 16px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #fbbf24;">
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 1.8;">
              <li>👤 <strong>ደንበኛ፦</strong> ${name}</li>
              <li>✉️ <strong>ኢሜይል፦</strong> ${email}</li>
              <li>📌 <strong>አገልግሎት፦</strong> ${service}</li>
              <li>📦 <strong>ፓኬጅ፦</strong> ${packageType}</li>
              <li>📅 <strong>ቀን፦</strong> ${date}</li>
              <li>⏰ <strong>ሰዓት፦</strong> ${time}</li>
            </ul>
          </div>

          <p style="font-size: 13px; color: #94a3b8; text-align: center; margin-top: 30px;">
            እባክዎ ደንበኛውን በአስቸኳይ ያነጋግሩ።
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, customerEmail, adminEmail });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}