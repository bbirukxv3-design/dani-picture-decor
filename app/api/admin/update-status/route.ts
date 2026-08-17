import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const {
      id,
      status,
      name,
      email,
      service,
      date,
      time,
      reason,
    } = await req.json();

    const { error: dbError } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (dbError) {
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      );
    }

    const isApproved = status === "ተቀብለናል";

    const subject = isApproved
      ? "🎉 ቀጠሮዎ ጸድቋል! - ዳኒ ፎቶ & ዲኮር"
      : "👀 ስለ ቀጠሮዎ የተሰጠ መረጃ - ዳኒ ፎቶ & ዲኮር";

    const accentColor = isApproved ? "#10b981" : "#ef4444";

    const htmlContent = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;background:#0f172a;color:#f8fafc;border-radius:16px">
        <h2 style="color:#fbbf24;text-align:center">
          ዳኒ ፎቶ & ዲኮር
        </h2>

        <h3 style="color:${accentColor};text-align:center">
          ${isApproved ? "✨ ቀጠሮዎ ጸድቋል!" : "❌ ቀጠሮዎ ተሰርዟል"}
        </h3>

        <p>ሰላም <strong>${name}</strong> 👋</p>

        <p>
          በዳኒ ፎቶ & ዲኮር ያስያዙትን ቀጠሮ በተመለከተ
          የተሰጠው ውሳኔ፦
        </p>

        <div style="background:#1e293b;padding:16px;border-radius:12px">
          <p>📌 <strong>ሁኔታ፦</strong> ${status}</p>
          <p>🛠️ <strong>አገልግሎት፦</strong> ${service}</p>
          <p>📅 <strong>ቀን፦</strong> ${date}</p>
          <p>⏰ <strong>ሰዓት፦</strong> ${time}</p>

          ${
            reason
              ? `<p>⚠️ <strong>ምክንያት፦</strong> ${reason}</p>`
              : ""
          }
        </div>

        <p style="text-align:center;margin-top:25px">
          ${
            isApproved
              ? "ቀጠሮዎ በተሳካ ሁኔታ ተረጋግጧል! በተቆረጠው ቀን እንጠብቅዎታለን።"
              : "ስለተፈጠረው እክል እናዝናለን። በሌላ ጊዜ እንደምናስተናግድዎ ተስፋ እናደርጋለን።"
          }
        </p>

        <p style="text-align:center;color:#94a3b8">
          እናመሰግናለን!<br/>
          <strong>ዳኒ ፎቶ & ዲኮር</strong>
        </p>
      </div>
    `;

    const emailResult = await resend.emails.send({
      from: "Dani Photo & Decor <onboarding@resend.dev>",
      to: [email],
      subject,
      html: htmlContent,
    });

    if (emailResult.error) {
      return NextResponse.json(
        { error: emailResult.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Status updated & Email sent!",
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "ስህተት ተፈጥሯል";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
