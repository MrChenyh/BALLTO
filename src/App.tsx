/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import HomeTab from './components/HomeTab';
import GamesTab from './components/GamesTab';
import CommunityTab from './components/CommunityTab';
import ProfileTab from './components/ProfileTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full h-screen sm:h-[844px] sm:w-[390px] bg-white sm:rounded-[40px] sm:shadow-2xl relative overflow-hidden sm:border-[8px] sm:border-gray-900 flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          {activeTab === 'home' && <HomeTab />}
          {activeTab === 'games' && <GamesTab />}
          {activeTab === 'community' && <CommunityTab />}
          {activeTab === 'profile' && <ProfileTab />}
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
