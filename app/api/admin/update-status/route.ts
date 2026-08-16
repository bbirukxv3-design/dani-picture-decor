import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

// ይህ ፋይል ሙሉ በሙሉ በሰርቨር ላይ ብቻ (Dynamic) እንዲሰራ ማድረግ
export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { id, status, name, email, service, date, time, reason } = await req.json();

    // 1. Supabase ላይ የቀጠሮውን ስታተስ (Status) ማዘመን
    const { error: dbError } = await supabase
      .from("bookings")
      .update({ status: status })
      .eq("id", id);

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // 2. ቀጠሮው ሲቀበል ወይም ሲሰረዝ የሚላከው የኢሜይል መልእክት
    const isApproved = status === "ተቀብለናል";
    const subject = isApproved
      ? "🎉 ቀጠሮዎ ጸድቋል! - ዳኒ ፎቶ & ዲኮር"
      : "👀 ስለ ቀጠሮዎ የተሰጠ መረጃ - ዳኒ ፎቶ & ዲኮር";

    const accentColor = isApproved ? "#10b981" : "#ef4444"; // Green for approved, Red for rejected

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 16px; border: 1px solid #334155;">
        <h2 style="color: #fbbf24; text-align: center; margin-bottom: 24px;">ዳኒ ፎቶ & ዲኮር</h2>
        
        <h3 style="color: ${accentColor}; text-align: center; margin-top: 0; margin-bottom: 20px; font-size: 20px;">
          ${isApproved ? "✨ ቀጠሮዎ ጸድቋል!" : "❌ ቀጠሮዎ ተሰርዟል"}
        </h3>

        <p style="font-size: 16px; line-height: 1.5;">ሰላም <strong>${name}</strong> 👋,</p>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
          በ<strong>ዳኒ ፎቶ & ዲኮር</strong> ያስያዙትን ቀጠሮ በተመለከተ የተሰጠው ውሳኔ ከዚህ በታች ተመልክቷል፦
        </p>
        
        <div style="background-color: #1e293b; padding: 16px; border-radius: 12px; margin: 20px 0; border-left: 4px solid ${accentColor};">
          <h4 style="margin-top: 0; color: #fbbf24; font-size: 15px;">የቀጠሮ ዝርዝር መረጃ፦</h4>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; line-height: 1.8;">
            <li>📌 <strong>የቀጠሮ ሁኔታ፦</strong> <span style="color: ${accentColor}; font-weight: bold;">${status}</span></li>
            <li>🛠️ <strong>አገልግሎት፦</strong> ${service}</li>
            <li>📅 <strong>ቀን፦</strong> ${date}</li>
            <li>⏰ <strong>ሰዓት፦</strong> ${time}</li>
            ${reason ? `<li style="color: #fca5a5; margin-top: 8px;">⚠️ <strong>ማስታወሻ / ምክንያት፦</strong> ${reason}</li>` : ''}
          </ul>
        </div>

        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6; text-align: center; margin: 20px 0;">
          ${
            isApproved
              ? "ቀጠሮዎ በተሳካ ሁኔታ ተረጋግጧል! በተቆረጠው ቀን እና ሰዓት በጉጉት እንጠብቅዎታለን።"
              : "ስለተፈጠረው እክል እናዝናለን። በአሁኑ ወቅት በተመረጠው ሰዓት ማስተናገድ ስላልቻልን ቀጠሮዎ ተሰርዟል። በሌላ ጊዜ እንደምናስተናግድዎ ተስፋ እናደርጋለን።"
          }
        </p>

        <p style="font-size: 13px; color: #94a3b8; text-align: center; margin-top: 30px;">
          እናመሰግናለን!<br/><strong>ዳኒ ፎቶ & ዲኮር</strong>
        </p>
      </div>
    `;

    // 3. በ Resend ለደንበኛው ኢሜይል መላክ
    await resend.emails.send({
      from: "Dani Photo & Decor <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "Status updated & Email sent!" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "ስህተት ተፈጥሯል";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}