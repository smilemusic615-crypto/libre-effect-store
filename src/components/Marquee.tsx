const WORDS = [
  'FREE SHIPPING OVER ¥11,000',
  'MIN LOT 10 PCS',
  'MADE IN FUKUOKA',
  'WEDDING PANEL',
  'SHOP SIGN',
  'CUTTING SHEET',
  'DIE-CUT STICKER',
  'DATA OK / DESIGN OK',
];

function Item({ word }: { word: string }) {
  return (
    <span>
      {word} <span className="sep">●</span>
    </span>
  );
}

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee-track">
        {WORDS.map((w) => <Item key={w} word={w} />)}
        {WORDS.map((w) => <Item key={`dup-${w}`} word={w} />)}
      </div>
    </div>
  );
}
