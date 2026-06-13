'use client';

import React, { useState } from 'react';
import { MOCK_INQUIRIES, AdminInquiry, InquiryStatus, INQ_STATUS_LABEL, INQ_TYPE_LABEL } from '@/data/adminData';

const STATUS_OPTIONS: { value: InquiryStatus; label: string }[] = [
  { value: 'unread',  label: '未読'     },
  { value: 'read',    label: '確認済み' },
  { value: 'replied', label: '返信済み' },
];

type FilterStatus = 'all' | InquiryStatus;

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<AdminInquiry[]>(MOCK_INQUIRIES);
  const [filter, setFilter]       = useState<FilterStatus>('all');
  const [search, setSearch]       = useState('');
  const [expanded, setExpanded]   = useState<string | null>(null);

  function updateStatus(id: string, status: InquiryStatus) {
    setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
  }

  const displayed = inquiries.filter((i) => {
    if (filter !== 'all' && i.status !== filter) return false;
    if (search) {
      const kw = search.toLowerCase();
      return i.name.includes(search) || i.email.includes(kw) || i.body.includes(search) || i.company.includes(search);
    }
    return true;
  });

  const counts = {
    all:     inquiries.length,
    unread:  inquiries.filter((i) => i.status === 'unread').length,
    read:    inquiries.filter((i) => i.status === 'read').length,
    replied: inquiries.filter((i) => i.status === 'replied').length,
  };

  const INQ_CLASS: Record<InquiryStatus, string> = {
    unread: 'unread', read: 'read', replied: 'replied',
  };

  return (
    <>
      <div className="adm-topbar">
        <div className="adm-topbar-title">INQUIRY <span className="red">MANAGEMENT</span></div>
        <div className="adm-topbar-meta">
          {counts.unread > 0 && (
            <span style={{ color: 'var(--red)', fontWeight: 700 }}>未読 {counts.unread}件 ● </span>
          )}
          {displayed.length} 件表示
        </div>
      </div>
      <div className="adm-body">
        {/* toolbar */}
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
                {f.label} <span style={{ fontFamily: 'var(--dot)', fontSize: 9, opacity: .7 }}>({counts[f.value as keyof typeof counts]})</span>
              </span>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <div className="faq-search" style={{ marginBottom: 0 }}>
              <span className="si" style={{ top: '50%' }}>🔍</span>
              <input
                type="text"
                placeholder="名前・会社・内容"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: 240, padding: '10px 14px 10px 40px', boxShadow: 'none' }}
              />
            </div>
          </div>
        </div>

        <div className="adm-block">
          <div className="adm-block-h">
            <span>INQUIRIES</span>
            <span className="count">{displayed.length} 件</span>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                <th>日付</th>
                <th>差出人</th>
                <th>種別 / カテゴリ</th>
                <th>内容</th>
                <th>ステータス</th>
              </tr>
            </thead>
            <tbody>
              {displayed.length === 0 ? (
                <tr><td colSpan={5} style={{ textAlign: 'center', padding: 40, fontFamily: 'var(--dot)', color: 'var(--ink-mut)' }}>該当するお問い合わせがありません</td></tr>
              ) : displayed.map((inq) => (
                <React.Fragment key={inq.id}>
                  <tr
                    style={{
                      cursor: 'pointer',
                      fontWeight: inq.status === 'unread' ? 700 : 400,
                    }}
                    onClick={() => setExpanded(expanded === inq.id ? null : inq.id)}
                  >
                    <td>
                      <span style={{ fontFamily: 'var(--dot)', fontSize: 11 }}>{inq.date}</span>
                    </td>
                    <td>
                      <div className="adm-td-name">{inq.name}</div>
                      <div className="adm-td-sub">{inq.company || inq.email}</div>
                    </td>
                    <td>
                      <div>
                        <span className="ci-tag">{INQ_TYPE_LABEL[inq.type]}</span>
                      </div>
                      <div className="adm-td-sub" style={{ marginTop: 4 }}>{inq.category}</div>
                    </td>
                    <td style={{ maxWidth: 320 }}>
                      <div style={{ fontSize: 12.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: expanded === inq.id ? 'normal' : 'nowrap' }}>
                        {inq.body}
                      </div>
                      {expanded === inq.id && (
                        <div style={{ marginTop: 12 }}>
                          <div className="adm-td-sub" style={{ marginBottom: 4 }}>メール: {inq.email}</div>
                          {inq.company && <div className="adm-td-sub">会社: {inq.company}</div>}
                          <a
                            href={`mailto:${inq.email}?subject=Re: ${inq.category}のお問い合わせについて`}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, fontFamily: 'var(--en)', fontWeight: 700, fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', border: '2px solid var(--ink)', background: 'var(--ink)', color: 'var(--paper)', padding: '7px 14px' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            ✉ REPLY BY MAIL
                          </a>
                        </div>
                      )}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <select
                        className="adm-status-select"
                        value={inq.status}
                        onChange={(e) => updateStatus(inq.id, e.target.value as InquiryStatus)}
                        style={{
                          background: inq.status === 'unread' ? 'var(--red)' : inq.status === 'replied' ? 'var(--green)' : 'var(--paper-2)',
                          color: ['unread','replied'].includes(inq.status) ? '#fff' : 'var(--ink)',
                          backgroundImage: 'none',
                          paddingRight: 14,
                        }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
