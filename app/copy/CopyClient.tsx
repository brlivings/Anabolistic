'use client';

import { useSearchParams } from 'next/navigation';

export default function CopyClient() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  return (
    <div>
      <h1>Copy Page</h1>
      <p>{code}</p>
    </div>
  );
}
``
