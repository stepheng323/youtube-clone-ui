import React from 'react';
import StudioLayout from '../components/Layout/StudioLayout';
import StudioDashboard from '../components/StudioDashboard/StudioDashboard';

export default function StudioDashboardPage() {
  return (
    <div>
      <StudioLayout>
        <StudioDashboard />
      </StudioLayout>
    </div>
  );
}
