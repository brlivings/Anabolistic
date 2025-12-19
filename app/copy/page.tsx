'use client';

import { Suspense } from 'react';
import CopyClient from './CopyClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CopyClient />
    </Suspense>
  );
}
