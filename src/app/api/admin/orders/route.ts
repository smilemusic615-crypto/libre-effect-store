import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET() {
  const { data, error } = await supabaseAdmin
    .schema('le')
    .from('orders')
    .select(`
      id, created_at, last_name, first_name, email, tel,
      subtotal, shipping, tax, total, status, note,
      order_items ( product_id, product_name, material, size, qty, unit_price )
    `)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
