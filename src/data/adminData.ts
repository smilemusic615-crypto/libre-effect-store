import { PRODUCTS } from './products';

export type OrderStatus = 'proc' | 'made' | 'ship' | 'done';

export interface AdminOrder {
  no: string;
  date: string;
  customerName: string;
  email: string;
  productId: string;
  productName: string;
  material: string;
  size: string;
  qty: number;
  amount: number;
  status: OrderStatus;
}

export type InquiryStatus = 'unread' | 'read' | 'replied';
export type InquiryType = 'quote' | 'data' | 'other';

export interface AdminInquiry {
  id: string;
  date: string;
  name: string;
  company: string;
  email: string;
  type: InquiryType;
  category: string;
  body: string;
  status: InquiryStatus;
}

export const STATUS_LABEL: Record<OrderStatus, string> = {
  proc: '製作準備中',
  made: '製作中',
  ship: '発送済み',
  done: '完了',
};

export const INQ_STATUS_LABEL: Record<InquiryStatus, string> = {
  unread:  '未読',
  read:    '確認済み',
  replied: '返信済み',
};

export const INQ_TYPE_LABEL: Record<InquiryType, string> = {
  quote: 'お見積り',
  data:  'データ入稿',
  other: 'その他',
};

const p = (id: string) => PRODUCTS.find((x) => x.id === id)!;

export const MOCK_ORDERS: AdminOrder[] = [
  { no:'LE-26061309', date:'2026-06-13', customerName:'山田 花子', email:'hanako@example.com', productId:'w-clear',  productName:p('w-clear').name,  material:'クリアアクリル', size:'A2 (420×594)', qty:1, amount:12800, status:'proc' },
  { no:'LE-26061215', date:'2026-06-12', customerName:'鈴木 一郎', email:'ichiro@example.com', productId:'k-diecut', productName:p('k-diecut').name, material:'ホワイト',       size:'〜80mm',        qty:30, amount:54000, status:'made' },
  { no:'LE-26061108', date:'2026-06-11', customerName:'田中 美咲', email:'misaki@example.com', productId:'s-astand', productName:p('s-astand').name, material:'クリアアクリル', size:'A1 (594×841)', qty:1, amount:28000, status:'ship' },
  { no:'LE-26061002', date:'2026-06-10', customerName:'佐藤 健',   email:'ken@example.com',    productId:'c-logo',   productName:p('c-logo').name,   material:'ブラック',       size:'〜400mm',       qty:1, amount:4500,  status:'done' },
  { no:'LE-26060921', date:'2026-06-09', customerName:'伊藤 真由', email:'mayu@example.com',   productId:'w-brass',  productName:p('w-brass').name,  material:'真鍮プレート',   size:'M (240×320)',   qty:1, amount:24000, status:'proc' },
  { no:'LE-26060834', date:'2026-06-08', customerName:'渡辺 拓',   email:'taku@example.com',   productId:'k-car',    productName:p('k-car').name,    material:'ホワイト',       size:'〜200mm',       qty:5, amount:12000, status:'made' },
  { no:'LE-26060717', date:'2026-06-07', customerName:'中村 陽子', email:'yoko@example.com',   productId:'s-hang',   productName:p('s-hang').name,   material:'ウォルナット材', size:'200×300',       qty:2, amount:32000, status:'ship' },
  { no:'LE-26060641', date:'2026-06-06', customerName:'小林 翔',   email:'sho@example.com',    productId:'c-hours',  productName:p('c-hours').name,  material:'ホワイト',       size:'定型 200×300',  qty:1, amount:3200,  status:'done' },
  { no:'LE-26060556', date:'2026-06-05', customerName:'加藤 みな', email:'mina@example.com',   productId:'w-mirror', productName:p('w-mirror').name, material:'ミラーアクリル', size:'A3 (297×420)',  qty:1, amount:15800, status:'proc' },
  { no:'LE-26060428', date:'2026-06-04', customerName:'吉田 大輔', email:'dai@example.com',    productId:'k-glow',   productName:p('k-glow').name,   material:'透明シート',     size:'〜100mm',       qty:20, amount:44000, status:'ship' },
];

export const MOCK_INQUIRIES: AdminInquiry[] = [
  { id:'INQ-001', date:'2026-06-13', name:'山田 花子', company:'',         email:'hanako@example.com', type:'quote', category:'ウェディングパネル', body:'結婚式用のウェルカムボードを検討しています。A2サイズで透明アクリルを希望。6/28の式に間に合いますか？',       status:'unread'  },
  { id:'INQ-002', date:'2026-06-12', name:'鈴木商店',  company:'鈴木商店', email:'info@suzuki.jp',      type:'data',  category:'ステッカー',         body:'aiデータを添付しました。ダイカットで50枚の見積りをお願いします。線が細い箇所があるかもしれません。',             status:'read'    },
  { id:'INQ-003', date:'2026-06-11', name:'田中 美咲', company:'CAFÉ LUNA',email:'misaki@cafeluna.com', type:'quote', category:'ショップサイン',     body:'カフェのA型看板を作りたいです。両面印刷で、マグネット式で面を入れ替えられるものはありますか？',               status:'replied' },
  { id:'INQ-004', date:'2026-06-10', name:'伊藤 真由', company:'',         email:'mayu@example.com',   type:'other', category:'未定・相談したい',   body:'個人です。引越し祝いに友人へのプレゼントとして表札を作りたいのですが、木製のプレートはできますか？',             status:'unread'  },
  { id:'INQ-005', date:'2026-06-09', name:'渡辺商事',  company:'渡辺商事', email:'watanabe@co.jp',      type:'quote', category:'カッティングシート', body:'店舗のガラス扉にロゴを貼りたいです。サイズは幅600mmほど。白と透明の2種類の見積りをお願いします。',               status:'replied' },
  { id:'INQ-006', date:'2026-06-08', name:'小林 翔',   company:'',         email:'sho@example.com',    type:'data',  category:'ステッカー',         body:'入稿データがIllustrator CS6形式なのですが、対応していますか？フォントはアウトライン化済みです。',                 status:'read'    },
];

export const ADMIN_PRODUCTS = PRODUCTS.map((p) => ({
  ...p,
  available: true,
}));
