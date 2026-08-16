import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// ይህ ፋይል ሙሉ በሙሉ በሰርቨር ላይ ብቻ (Dynamic) እንዲሰራ ማድረግ
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, date, time, service, packageType, email } = body;

    // 1. Supabase ላይ የቀጠሮውን መረጃ ማስቀመጥ (ለአስተዳዳሪ ዳሽቦርድ)
    const { data: dbData, error: dbError } = await supabase
      .from('bookings')
      .insert([
        {
          name,
          phone,
          email: email || '',
          service,
          package_type: packageType || '',
          date,
          time: time || '',
          status: 'መጠባበቂያ', // አዲስ ሲገባ የሚኖረው የመጀመሪያው ስታተስ
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase Error:', dbError);
      return NextResponse.json({ success: false, error: dbError.message }, { status: 500 });
    }

    // 2. ቴሌግራም ቦት ማሳወቂያ መላክ
    const BOT_TOKEN = '8910818102:AAFtdmBJgmLbM5Va7zgQ_HJ5GVj8YdZbrlc';
    const CHAT_ID = '8158625035';

    const message = `🔔 **አዲስ ቀጠሮ ተይዟል!**\n\n👤 ስም: ${name}\n📞 ስልክ: ${phone}\n✉️ ኢሜይል: ${email || 'አልተሰጠም'}\n📅 ቀን: ${date}\n⏰ ሰዓት: ${time || 'አልተሰጠም'}\n🛠️ አገልግሎት: ${service}\n📦 ፓኬጅ: ${packageType || 'አልተሰጠም'}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramResponse.ok) {
      console.error('Telegram Error:', await telegramResponse.text());
    }

    return NextResponse.json({ 
      success: true, 
      message: 'ቀጠሮው ተይዟል፣ ማሳወቂያውም ተልኳል!', 
      data: dbData 
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'ስህተት ተፈጥሯል';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}