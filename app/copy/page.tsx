'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CopyInner() {
  const sp = useSearchParams();
  const text = sp.get('text') ?? '';
  const redirect = sp.get('redirect') ?? '';

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700 }}>Copy</h1>

      <p style={{ marginTop: 12, opacity: 0.8 }}>
        This page copies text passed in the URL.
      </p>

      <textarea
        value={text}
        readOnly
        style={{
          width: '100%',
          height: 180,
          marginTop: 12,
          padding: 12,
          borderRadius: 10,
          border: '1px solid #333',
          background: '#0b0b0b',
          color: '#fff',
        }}
      />

      <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
        <button
          onClick={async () => {
            await navigator.clipboard.writeText(text);
            if (redirect) window.location.href = redirect;
          }}
          style={{
            padding: '10px 14px',
            borderRadius: 10,
            border: '1px solid #333',
            background: '#111',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Copy to clipboard
        </button>

        {redirect ? (
          <a
            href={redirect}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid #333',
              background: '#0b0b0b',
              color: '#fff',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Back
          </a>
        ) : null}
      </div>
    </main>
  );
}

export default function CopyPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <CopyInner />
    </Suspense>
  );
}
