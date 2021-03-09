import React from 'react';
import StudioLayout from '../components/Layout/StudioLayout';
import StudioCustomise from '../components/StudioCustomise//StudioCustomise';

export default function StudioCustomisePage() {
  return (
    <div>
      <StudioLayout>
        <StudioCustomise />
      </StudioLayout>
    </div>
  );
}
