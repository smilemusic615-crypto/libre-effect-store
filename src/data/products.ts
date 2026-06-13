export type SwatchKey = 'clear' | 'milk' | 'mirror' | 'brass' | 'wood' | 'white' | 'black';

export interface Material {
  id: string;
  name: string;
  note: string;
  swatch: SwatchKey;
}

export interface Product {
  id: string;
  cat: 'wedding' | 'sign' | 'cutting' | 'sticker';
  name: string;
  latin: string;
  price: number;
  from?: boolean;
  tone: number;
  badge?: string;
  materials: Material[];
  sizes: string[];
  lead: number;
  blurb: string;
  spec: [string, string][];
}

export interface Category {
  id: string;
  latin: string;
  name: string;
  lead: string;
  desc: string;
}

const M: Record<string, Material> = {
  acrylic:    { id: 'acrylic',    name: 'クリアアクリル',    note: '透明 / 5mm厚',    swatch: 'clear'  },
  milk:       { id: 'milk',       name: '乳白アクリル',      note: 'マット / 5mm厚',  swatch: 'milk'   },
  mirror:     { id: 'mirror',     name: 'ミラーアクリル',    note: '鏡面 / 3mm厚',    swatch: 'mirror' },
  brass:      { id: 'brass',      name: '真鍮プレート',      note: '経年変化あり',    swatch: 'brass'  },
  wood:       { id: 'wood',       name: 'ウォルナット材',    note: 'オイル仕上げ',    swatch: 'wood'   },
  white:      { id: 'white',      name: 'ホワイト',          note: '屋内外対応',      swatch: 'white'  },
  black:      { id: 'black',      name: 'ブラック',          note: '屋内外対応',      swatch: 'black'  },
  gold:       { id: 'gold',       name: 'ゴールド',          note: '光沢仕上げ',      swatch: 'brass'  },
  clearsheet: { id: 'clearsheet', name: '透明シート',        note: 'ガラス面向け',    swatch: 'clear'  },
  frost:      { id: 'frost',      name: 'すりガラス調',      note: '目隠し効果',      swatch: 'milk'   },
};

export const CATEGORIES: Category[] = [
  { id: 'wedding', latin: 'WEDDING PANEL', name: 'ウェディングパネル', lead: '一日限りの空間に、長く残る一枚を。', desc: 'アクリル・真鍮・木のフレームに、お二人の名前や日付を切り出して。式のあとは住まいのインテリアとして。' },
  { id: 'sign',    latin: 'SHOP SIGN',     name: 'ショップサイン',     lead: '店先で、静かに語る看板を。',           desc: '卓上から自立式まで。素材の質感をいかした簡易看板を、設置のしやすさにこだわって製作します。' },
  { id: 'cutting', latin: 'CUTTING SHEET', name: 'カッティングシート', lead: '壁とガラスに、文字を貼る。',           desc: 'ロゴ・営業時間・装飾レタリング。糊残りの少ない屋内外シートを一文字ずつ精密にカット。' },
  { id: 'sticker', latin: 'STICKER',       name: 'ステッカー',         lead: '持ち歩ける、小さなサイン。',           desc: 'ダイカット・転写・防水・蓄光。原稿の持ち込みもデザイン依頼も、小ロットから承ります。' },
];

export const PRODUCTS: Product[] = [
  // wedding
  { id:'w-clear',  cat:'wedding', name:'クリアアクリル ウェルカムボード',  latin:'Clear Welcome Board',   price:12800, from:false, tone:1, badge:'人気',    materials:[M.acrylic,M.milk,M.mirror],   sizes:['A3 (297×420)','A2 (420×594)'],    lead:10, blurb:'透明アクリルに白文字を切り出した、もっとも軽やかなボード。背景を選ばず空間になじみます。',     spec:[['素材','アクリル 5mm'],['文字','カッティング / 印刷'],['付属','木製イーゼル別売']] },
  { id:'w-brass',  cat:'wedding', name:'真鍮プレート ウェルカムサイン',    latin:'Brass Welcome Plate',   price:24000, tone:2, badge:'受注製作',             materials:[M.brass],                     sizes:['S (180×240)','M (240×320)'],       lead:21, blurb:'真鍮の塊から切り出し、一枚ずつ磨いて仕上げます。時とともに深まる色味を住まいへ。',             spec:[['素材','真鍮 t2.0'],['仕上げ','ヘアライン / 黒染め'],['備考','経年変化を楽しむ素材です']] },
  { id:'w-mirror', cat:'wedding', name:'ミラーアクリル サインボード',       latin:'Mirror Sign Board',    price:15800, tone:1,                               materials:[M.mirror,M.acrylic],          sizes:['A3 (297×420)','正方形 (400×400)'], lead:12, blurb:'鏡面が会場の光を映し込み、写真映えする一枚。ゴールド/シルバーの2色から。',                   spec:[['素材','ミラーアクリル 3mm'],['文字','UVプリント'],['付属','スタンド別売']] },
  { id:'w-wood',   cat:'wedding', name:'ウッドフレーム ウェルカムボード',   latin:'Wood Frame Board',     price:18500, tone:3,                               materials:[M.wood,M.acrylic],            sizes:['A2 (420×594)'],                   lead:14, blurb:'ウォルナットの枠に透明アクリルを重ねた、温かみのある佇まい。ナチュラルな会場に。',             spec:[['枠','ウォルナット無垢'],['面材','クリアアクリル'],['仕上げ','植物オイル']] },
  { id:'w-round',  cat:'wedding', name:'円形アクリル ウェルカムボード',     latin:'Round Acrylic Board',  price:13800, tone:1,                               materials:[M.acrylic,M.milk],            sizes:['φ400','φ500'],                    lead:10, blurb:'やわらかな円形に名前と日付を。リースやドライフラワーと合わせて。',                             spec:[['素材','アクリル 5mm'],['形状','円形 / 角丸も可'],['文字','カッティング']] },
  // sign
  { id:'s-astand', cat:'sign',    name:'A型スタンド看板 アクリル',          latin:'A-Stand Sign',         price:28000, tone:2, badge:'人気',                materials:[M.acrylic,M.white,M.black],   sizes:['A1 (594×841)','B1 (728×1030)'],   lead:14, blurb:'両面表示の自立式。屋外の風にも配慮した重量設計で、店先の定番に。',                           spec:[['本体','スチール脚 + アクリル面'],['表示','両面'],['備考','面の貼替え可']] },
  { id:'s-desk',   cat:'sign',    name:'卓上アクリルサイン',                 latin:'Desk Acrylic Sign',    price: 6800, tone:1,                               materials:[M.acrylic,M.milk,M.black],    sizes:['100×150','150×200'],              lead: 7, blurb:'レジ横やテーブルに置く小さなサイン。営業案内やQRの掲示に。',                                   spec:[['素材','アクリル 8mm'],['形状','L字スタンド'],['文字','印刷 / カッティング']] },
  { id:'s-hang',   cat:'sign',    name:'吊り下げサイン 木製',               latin:'Hanging Wood Sign',    price:16000, tone:3,                               materials:[M.wood,M.brass],              sizes:['200×300','250×350'],              lead:14, blurb:'天井や軒先から吊るす木製サイン。真鍮金具と組み合わせて。',                                     spec:[['素材','集成材 + 真鍮金具'],['仕上げ','オイル / 焼き'],['付属','吊り金具']] },
  { id:'s-stand',  cat:'sign',    name:'自立式ウェルカムスタンド',           latin:'Welcome Floor Stand',  price:34000, tone:2,                               materials:[M.white,M.black,M.wood],      sizes:['H1200','H1500'],                  lead:21, blurb:'エントランスに据える背の高いスタンド。式・店舗・イベントまで幅広く。',                         spec:[['本体','スチール + 面材'],['高さ','1200 / 1500mm'],['備考','面の差替え対応']] },
  { id:'s-cut',    cat:'sign',    name:'アクリル切り文字看板',               latin:'Cut-Letter Sign',      price:22000, tone:1,                               materials:[M.acrylic,M.brass,M.black],   sizes:['文字高 50mm〜','文字高 100mm〜'], lead:18, blurb:'立体的な切り文字を壁面に。素材の厚みが影をつくり、上質な店構えに。',                           spec:[['素材','アクリル / 真鍮'],['厚み','5〜10mm'],['施工','スペーサー浮かし']] },
  // cutting
  { id:'c-logo',   cat:'cutting', name:'ロゴ カッティングシート',            latin:'Logo Cutting Sheet',   price: 4500, from:true, tone:1, badge:'オーダー', materials:[M.white,M.black,M.gold,M.clearsheet], sizes:['〜200mm','〜400mm','〜600mm'], lead: 7, blurb:'お持ちのロゴを一色ずつ精密カット。ガラス扉や壁面の定番です。',                               spec:[['素材','屋内外用シート'],['色','60色以上'],['備考','入稿データ要']] },
  { id:'c-hours',  cat:'cutting', name:'営業時間 ウィンドウサイン',          latin:'Opening Hours Sign',   price: 3200, tone:1,                               materials:[M.white,M.black,M.gold],      sizes:['定型 200×300'],                   lead: 5, blurb:'OPEN/CLOSEや営業時間をすっきりと。書体と配置はテンプレートから選べます。',                     spec:[['素材','屋内外用シート'],['内容','時間 / 定休日'],['施工','貼り方説明書付']] },
  { id:'c-wall',   cat:'cutting', name:'ウォールレタリング',                  latin:'Wall Lettering',       price: 5800, from:true, tone:3,                   materials:[M.white,M.black,M.gold],      sizes:['〜500mm','〜1000mm'],             lead: 7, blurb:'店内の壁にメッセージやコンセプトを。マットな質感で印刷とは違う佇まい。',                       spec:[['素材','マットシート'],['対応','曲面以外の平滑面'],['備考','文字数で見積']] },
  { id:'c-frost',  cat:'cutting', name:'ガラス帯シート すりガラス調',        latin:'Frosted Band Sheet',   price: 6400, from:true, tone:1,                   materials:[M.frost,M.clearsheet],        sizes:['幅〜900mm'],                      lead: 7, blurb:'視線をやわらかく遮る目隠しシート。窓まわりの印象を整えます。',                                 spec:[['素材','フロスト調フィルム'],['効果','目隠し / UVカット'],['施工','水貼り推奨']] },
  // sticker
  { id:'k-diecut', cat:'sticker', name:'ダイカットステッカー',               latin:'Die-Cut Sticker',      price: 1800, from:true, tone:1, badge:'小ロット可', materials:[M.white,M.clearsheet],       sizes:['〜50mm','〜80mm','〜100mm'],      lead:10, blurb:'形に沿って抜くオリジナルステッカー。10枚から、原稿持ち込み歓迎。',                             spec:[['素材','PVC / 透明PET'],['加工','ラミネート'],['最小','10枚〜']] },
  { id:'k-car',    cat:'sticker', name:'カーステッカー 転写タイプ',          latin:'Car Transfer Sticker', price: 2400, from:true, tone:2,                   materials:[M.white,M.black,M.gold],      sizes:['〜200mm','〜400mm'],              lead:10, blurb:'背景のない一色転写で、車体にロゴを直接貼ったような仕上がりに。',                               spec:[['素材','屋外耐候シート'],['耐候','約3〜5年'],['施工','転写シート付']] },
  { id:'k-logo',   cat:'sticker', name:'防水ロゴステッカー セット',          latin:'Waterproof Logo Set',  price: 2800, tone:1,                               materials:[M.white,M.clearsheet],        sizes:['小×20','小×50'],                lead: 8, blurb:'什器・備品・ボトルに。耐水ラミネートでくり返し拭いても安心。',                                 spec:[['素材','耐水PVC'],['加工','光沢ラミネート'],['枚数','20 / 50枚']] },
  { id:'k-glow',   cat:'sticker', name:'蓄光ステッカー',                     latin:'Glow Sticker',         price: 2200, from:true, tone:0,                   materials:[M.clearsheet],                sizes:['〜60mm','〜100mm'],              lead:12, blurb:'光を蓄えて暗所でほのかに光る特殊素材。誘導サインや遊び心の演出に。',                           spec:[['素材','蓄光フィルム'],['発光','残光 約30分'],['最小','10枚〜']] },
];

export function yen(n: number): string {
  return '¥' + n.toLocaleString('ja-JP');
}

const BADGE_EN: Record<string, string> = {
  '人気': 'BEST',
  '受注製作': 'MADE TO ORDER',
  'オーダー': 'CUSTOM',
  '小ロット可': 'SMALL LOT',
};
export function badgeEn(badge: string): string {
  return BADGE_EN[badge] ?? badge;
}
