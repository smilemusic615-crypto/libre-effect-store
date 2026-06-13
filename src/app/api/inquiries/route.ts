import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { error } = await supabaseAdmin
    .schema('le')
    .from('inquiries')
    .insert({
      type:        body.type        || 'other',
      name:        body.name,
      company:     body.company     || null,
      email:       body.email,
      tel:         body.tel         || null,
      product_cat: body.productCat  || null,
      body:        body.body,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
