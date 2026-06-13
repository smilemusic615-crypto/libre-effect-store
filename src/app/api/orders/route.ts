import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// service_role key を使ってRLSをバイパス（サーバーサイドのみ）
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { form, items, subtotal, shipping, tax, total } = body;

  // 注文番号生成
  const ts   = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const rand = Math.floor(Math.random() * 900 + 100);
  const orderId = `LE-${ts}${rand}`;

  // orders テーブルへ挿入
  const { error: orderError } = await supabaseAdmin
    .schema('le')
    .from('orders')
    .insert({
      id:         orderId,
      last_name:  form.lastName,
      first_name: form.firstName,
      zip:        form.zip,
      address:    form.address,
      building:   form.building || null,
      tel:        form.tel,
      email:      form.email,
      note:       form.note || null,
      subtotal,
      shipping,
      tax,
      total,
    });

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
  }

  // order_items テーブルへ挿入
  const orderItems = items.map((item: {
    productId: string; productName: string;
    material: string; size: string; qty: number; price: number;
  }) => ({
    order_id:     orderId,
    product_id:   item.productId,
    product_name: item.productName,
    material:     item.material,
    size:         item.size,
    qty:          item.qty,
    unit_price:   item.price,
  }));

  const { error: itemsError } = await supabaseAdmin
    .schema('le')
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    return NextResponse.json({ error: itemsError.message }, { status: 500 });
  }

  return NextResponse.json({ orderId }, { status: 201 });
}
