'use client';

import { useState, useEffect } from 'react';

type InquiryStatus = 'unread' | 'read' | 'replied';
type FilterStatus = 'all' | InquiryStatus;

interface Inquiry {
  id: number; created_at: string; type: string; name: string;
  company: string | null; email: string; tel: string | null;
  product_cat: string | null; body: string; status: InquiryStatus;
}

const STATUS_OPTIONS: { value: InquiryStatus; label: string }[] = [
  { value: 'unread',  label: '未読'     },
  { value: 'read',    label: '確認済み' },
  { value: 'replied', label: '返信済み' },
];

const TYPE_LABEL: Record<string, string> = {
  quote: '見積もり', data: 'データ入稿', other: 'その他',
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/admin/inquiries')
      .then((r) => r.json())
      .then((data) => { setInquiries(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function updateStatus(id: number, status: InquiryStatus) {
    setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
    await fetch(`/api/admin/inquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  }

  const displayed = inquiries.filter((i) => {
    if (filter !== 'all' && i.status !== filter) return false;
    if (search) {
      return i.name.includes(search) || i.email.toLowerCase().includes(search.toLowerCase())
        || i.body.includes(search) || (i.company ?? '').includes(search);
    }
    return true;
  });

  const counts: Record<FilterStatus, number> = {
    all:     inquiries.length,
    unread:  inquiries.filter((i) => i.status === 'unread').length,
    read:    inquiries.filter((i) => i.status === 'read').length,
    replied: inquiries.filter((i) => i.status === 'replied').length,
  };

  return (
    <>
      <div className="adm-topbar">
        <div className="adm-topbar-title">INQUIRY <span className="red">MANAGEMENT</span></div>
        <div className="adm-topbar-meta">{displayed.length} 件表示</div>
      </div>
      <div className="adm-body">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
          <div className="chips">
            {([
              { value: 'all',     label: 'すべて'   },
              { value: 'unread',  label: '未読'     },
              { value: 'read',    label: '確認済み' },
              { value: 'replied', label: '返信済み' },
            ] as { value: FilterStatus; label: string }[]).map((f) => (
              <span
                key={f.value}
                className={`chip${filter === f.value ? ' on' : ''}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label} <span style={{ fontFamily: 'var(--dot)', fontSize: 9, opacity: .7 }}>({counts[f.value]})</span>
              </span>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <div className="faq-search" style={{ marginBottom: 0 }}>
              <span className="si" style={{ top: '50%' }}>🔍</span>
              <input
                type="text"
                placeholder="名前・メール・内容"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: 260, padding: '10px 14px 10px 40px', boxShadow: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="adm-block">
          <div className="adm-block-h">
            <span>INQUIRIES</span>
            <span className="count">{displayed.length} 件</span>
          </div>
          {loading ? (
            <div style={{ padding: 40, textAlign: 'center', fontFamily: 'var(--dot)', color: 'var(--ink-mut)' }}>読み込み中...</div>
          ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>日時</th>
                <th>種別</th>
                <th>送信者</th>
                <th>内容</th>
                <th>ステータス</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, fontFamily: 'var(--dot)', color: 'var(--ink-mut)' }}>お問い合わせがありません</td></tr>
              ) : displayed.map((inq) => (
                <>
                <tr key={inq.id} style={{ cursor: 'pointer' }} onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}>
                  <td>
                    <div className="adm-td-sub">{new Date(inq.created_at).toLocaleDateString('ja-JP')}</div>
                    <div className="adm-td-sub">{new Date(inq.created_at).toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}</div>
                  </td>
                  <td><span className="ci-tag">{TYPE_LABEL[inq.type] ?? inq.type}</span></td>
                  <td>
                    <div className="adm-td-name">{inq.name}{inq.company ? ` / ${inq.company}` : ''}</div>
                    <div className="adm-td-sub">{inq.email}</div>
                  </td>
                  <td style={{ maxWidth: 260 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 13 }}>
                      {inq.body}
                    </div>
                  </td>
                  <td>
                    <select
                      className="adm-status-select"
                      value={inq.status}
                      onChange={(e) => { e.stopPropagation(); updateStatus(inq.id, e.target.value as InquiryStatus); }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        background: inq.status === 'replied' ? 'var(--green)' : inq.status === 'read' ? 'var(--blue)' : 'var(--paper-2)',
                        color: ['replied', 'read'].includes(inq.status) ? '#fff' : 'var(--ink)',
                        backgroundImage: 'none', paddingRight: 14,
                      }}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                </tr>
                {expanded === inq.id && (
                  <tr key={`${inq.id}-exp`} style={{ background: 'var(--paper-2)' }}>
                    <td colSpan={5} style={{ padding: '16px 20px' }}>
                      <div style={{ fontFamily: 'var(--dot)', fontSize: 11, color: 'var(--ink-mut)', marginBottom: 8 }}>
                        TEL: {inq.tel ?? '—'} {inq.product_cat ? `｜ 商品カテゴリ: ${inq.product_cat}` : ''}
                      </div>
                      <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, fontSize: 14 }}>{inq.body}</div>
                      <a href={`mailto:${inq.email}`} style={{ display: 'inline-block', marginTop: 12, color: 'var(--red)', borderBottom: '1px solid var(--red)', fontSize: 13, fontFamily: 'var(--dot)' }}>
                        {inq.email} に返信する →
                      </a>
                    </td>
                  </tr>
                )}
                </>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </>
  );
}
