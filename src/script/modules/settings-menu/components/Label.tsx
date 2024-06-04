import { Button } from '@mantine/core';
import React from 'react';

export default function Label({ children, verified }: { children: React.ReactNode; verified: boolean }) {
  if (verified) {
    return children;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ marginRight: '8px' }}>{children}</span>
      <Button style={{ fontSize: 14, padding: '4px' }} variant="light" size="compact-xs" color="orange">
        Premium
      </Button>
    </div>
  );
}
