import React from 'react';
import StudioLayout from '../components/Layout/StudioLayout';
import StudioPlaylist from '../components/StudioPlaylist/StudioPlaylist';

export default function StudioPlaylistPage() {
  return (
    <div>
      <StudioLayout>
        <StudioPlaylist />
      </StudioLayout>
    </div>
  );
}
