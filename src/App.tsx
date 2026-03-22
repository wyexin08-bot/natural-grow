import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { TopNav } from './components/TopNav';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './views/HomeView';
import { CameraView } from './views/CameraView';
import { ResultsView } from './views/ResultsView';
import { WardrobeView } from './views/WardrobeView';
import { ViewState, UserProfile, ColorType, WardrobeItem } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    colorType: null,
    wardrobe: [
      // Some initial mock data so the wardrobe isn't completely empty
      {
        id: '1',
        imageUrl: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=400',
        category: 'outerwear',
        color: 'Navy Blue'
      },
      {
        id: '2',
        imageUrl: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=400',
        category: 'top',
        color: 'Soft Pink'
      }
    ]
  });

  const handleColorTestComplete = (result: ColorType) => {
    setUserProfile(prev => ({ ...prev, colorType: result }));
    setCurrentView('results');
  };

  const handleAddWardrobeItem = (item: WardrobeItem) => {
    setUserProfile(prev => ({
      ...prev,
      wardrobe: [item, ...prev.wardrobe]
    }));
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container">
      <TopNav />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <HomeView key="home" onNavigate={setCurrentView} />
          )}
          {currentView === 'camera' && (
            <CameraView key="camera" onComplete={handleColorTestComplete} />
          )}
          {currentView === 'results' && (
            <ResultsView key="results" colorType={userProfile.colorType} onNavigate={setCurrentView} />
          )}
          {currentView === 'wardrobe' && (
            <WardrobeView 
              key="wardrobe" 
              colorType={userProfile.colorType} 
              wardrobe={userProfile.wardrobe}
              onAddItem={handleAddWardrobeItem}
            />
          )}
        </AnimatePresence>
      </main>

      <BottomNav currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
}
