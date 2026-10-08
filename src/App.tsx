import React, { useState, useEffect } from 'react';
import { ArtistProvider, useArtist } from './context/ArtistContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewView } from './components/views/OverviewView';
import { SocialAccountsView } from './components/views/SocialAccountsView';
import { ContentCalendarView } from './components/views/ContentCalendarView';
import { ContentLibraryView } from './components/views/ContentLibraryView';
import { ReleasesView } from './components/views/ReleasesView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { AudienceView } from './components/views/AudienceView';
import { CampaignsView } from './components/views/CampaignsView';
import { CollaborationsView } from './components/views/CollaborationsView';
import { PlaylistsView } from './components/views/PlaylistsView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';

// Modals
import { ConnectAccountModal } from './components/modals/ConnectAccountModal';
import { NewContentModal } from './components/modals/NewContentModal';
import { NewReleaseModal } from './components/modals/NewReleaseModal';
import { NewCreatorModal } from './components/modals/NewCreatorModal';
import { NewAssetModal } from './components/modals/NewAssetModal';
import { NewCampaignModal, NewPlaylistPitchModal } from './components/modals/NewCampaignModal';
import { OnboardingModal } from './components/modals/OnboardingModal';

const AppContent: React.FC = () => {
  const { activeTab, isOnboarded, artistProfile } = useArtist();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isNewContentModalOpen, setIsNewContentModalOpen] = useState(false);
  const [isNewReleaseModalOpen, setIsNewReleaseModalOpen] = useState(false);
  const [isNewCreatorModalOpen, setIsNewCreatorModalOpen] = useState(false);
  const [isNewAssetModalOpen, setIsNewAssetModalOpen] = useState(false);
  const [isNewCampaignModalOpen, setIsNewCampaignModalOpen] = useState(false);
  const [isNewPitchModalOpen, setIsNewPitchModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  // Auto-prompt onboarding wizard on first launch if unconfigured
  useEffect(() => {
    if (!isOnboarded && !artistProfile.name) {
      setIsOnboardingModalOpen(true);
    }
  }, [isOnboarded, artistProfile.name]);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewView
            onOpenConnectModal={() => setIsConnectModalOpen(true)}
            onOpenNewContentModal={() => setIsNewContentModalOpen(true)}
            onOpenOnboardingModal={() => setIsOnboardingModalOpen(true)}
            onOpenNewReleaseModal={() => setIsNewReleaseModalOpen(true)}
            onOpenNewCampaignModal={() => setIsNewCampaignModalOpen(true)}
          />
        );
      case 'social_accounts':
        return (
          <SocialAccountsView
            onOpenConnectModal={() => setIsConnectModalOpen(true)}
          />
        );
      case 'content_calendar':
        return (
          <ContentCalendarView
            onOpenNewContentModal={() => setIsNewContentModalOpen(true)}
          />
        );
      case 'content_library':
        return (
          <ContentLibraryView
            onOpenNewAssetModal={() => setIsNewAssetModalOpen(true)}
            onOpenNewContentModal={() => setIsNewContentModalOpen(true)}
          />
        );
      case 'releases':
        return (
          <ReleasesView
            onOpenNewReleaseModal={() => setIsNewReleaseModalOpen(true)}
          />
        );
      case 'analytics':
        return <AnalyticsView />;
      case 'audience':
        return <AudienceView />;
      case 'campaigns':
        return (
          <CampaignsView
            onOpenNewCampaignModal={() => setIsNewCampaignModalOpen(true)}
          />
        );
      case 'collaborations':
        return (
          <CollaborationsView
            onOpenNewCreatorModal={() => setIsNewCreatorModalOpen(true)}
          />
        );
      case 'playlists':
        return (
          <PlaylistsView
            onOpenNewPitchModal={() => setIsNewPitchModalOpen(true)}
          />
        );
      case 'reports':
        return <ReportsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <OverviewView
            onOpenConnectModal={() => setIsConnectModalOpen(true)}
            onOpenNewContentModal={() => setIsNewContentModalOpen(true)}
            onOpenOnboardingModal={() => setIsOnboardingModalOpen(true)}
            onOpenNewReleaseModal={() => setIsNewReleaseModalOpen(true)}
            onOpenNewCampaignModal={() => setIsNewCampaignModalOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col font-sans">
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="lg:pl-64 flex flex-col min-h-screen flex-1">
        <Header
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onOpenNewContentModal={() => setIsNewContentModalOpen(true)}
          onOpenConnectModal={() => setIsConnectModalOpen(true)}
          onOpenOnboardingModal={() => setIsOnboardingModalOpen(true)}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {renderActiveView()}
        </main>
      </div>

      {/* Global Modals */}
      <OnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={() => setIsOnboardingModalOpen(false)}
      />

      <ConnectAccountModal
        isOpen={isConnectModalOpen}
        onClose={() => setIsConnectModalOpen(false)}
      />

      <NewContentModal
        isOpen={isNewContentModalOpen}
        onClose={() => setIsNewContentModalOpen(false)}
      />

      <NewReleaseModal
        isOpen={isNewReleaseModalOpen}
        onClose={() => setIsNewReleaseModalOpen(false)}
      />

      <NewCreatorModal
        isOpen={isNewCreatorModalOpen}
        onClose={() => setIsNewCreatorModalOpen(false)}
      />

      <NewAssetModal
        isOpen={isNewAssetModalOpen}
        onClose={() => setIsNewAssetModalOpen(false)}
      />

      <NewCampaignModal
        isOpen={isNewCampaignModalOpen}
        onClose={() => setIsNewCampaignModalOpen(false)}
      />

      <NewPlaylistPitchModal
        isOpen={isNewPitchModalOpen}
        onClose={() => setIsNewPitchModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <ArtistProvider>
      <AppContent />
    </ArtistProvider>
  );
}
