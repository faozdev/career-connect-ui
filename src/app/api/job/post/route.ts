// src/app/api/job/post/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Job received:', body);

    return NextResponse.json({ success: true, message: 'İş ilanı başarıyla kaydedildi!' });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ success: false, message: 'Bir hata oluştu' }, { status: 500 });
  }
}
