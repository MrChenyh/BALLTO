import React, { useState, useEffect } from 'react';
import { Plus, Users, MapPin, Clock, ShieldCheck, Zap } from 'lucide-react';
import { Game } from '../types';

const MOCK_GAMES: Game[] = [
  {
    id: 'g1',
    venueId: '1',
    venueName: '东城体育公园篮球场',
    sport: '篮球',
    time: '今天 19:00-21:00',
    level: '中等偏上',
    currentPlayers: 5,
    maxPlayers: 6,
    cost: 'AA制',
    creator: 'Alex',
    status: 'Recruiting'
  },
  {
    id: 'g2',
    venueId: '2',
    venueName: '星光羽毛球馆',
    sport: '羽毛球',
    time: '明天 14:00-16:00',
    level: '新手友好',
    currentPlayers: 2,
    maxPlayers: 4,
    cost: '¥30/人',
    creator: 'Sarah',
    status: 'Recruiting'
  }
];

export default function GamesTab() {
  const [showAIPush, setShowAIPush] = useState(false);

  useEffect(() => {
    // Simulate AI Agent pushing a match after 2 seconds
    const timer = setTimeout(() => {
      setShowAIPush(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">约球组局</h1>
        <button className="bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors">
          <Plus size={20} />
        </button>
      </div>

      {/* AI Agent Push Notification */}
      {showAIPush && (
        <div className="mx-4 mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Zap size={64} />
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="bg-white/20 p-1.5 rounded-full">
              <Zap size={16} className="text-yellow-300" />
            </div>
            <span className="font-bold text-sm">AI 智能匹配</span>
          </div>
          <p className="text-sm text-indigo-50 mb-4 leading-relaxed">
            今晚 8 点东城球场缺 1 名后卫，实力匹配，是否加入？
          </p>
          <div className="flex space-x-3">
            <button className="flex-1 bg-white text-indigo-600 py-2 rounded-xl text-sm font-bold shadow-sm">
              一键加入
            </button>
            <button 
              onClick={() => setShowAIPush(false)}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-white/10 hover:bg-white/20 transition-colors"
            >
              忽略
            </button>
          </div>
        </div>
      )}

      {/* Game List */}
      <div className="px-4 mt-4 space-y-4 flex-1 overflow-y-auto">
        {MOCK_GAMES.map(game => (
          <div key={game.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-md font-bold">
                  {game.sport}
                </span>
                <span className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-md">
                  {game.level}
                </span>
              </div>
              <span className="text-indigo-600 font-bold text-sm">{game.cost}</span>
            </div>
            
            <h3 className="text-lg font-bold text-gray-900 mb-2">{game.venueName}</h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-500 text-sm">
                <Clock size={14} className="mr-2" />
                {game.time}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Users size={14} className="mr-2" />
                已报名 {game.currentPlayers}/{game.maxPlayers} 人
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                  {game.creator[0]}
                </div>
                <span className="text-xs text-gray-500 font-medium">发起人: {game.creator}</span>
                <ShieldCheck size={14} className="text-green-500" />
              </div>
              <button className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                报名
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
