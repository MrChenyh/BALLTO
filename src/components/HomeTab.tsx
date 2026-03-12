import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, Users, RefreshCw } from 'lucide-react';
import { Venue } from '../types';

const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: '东城体育公园篮球场',
    type: '篮球',
    distance: '1.2km',
    address: '东城区体育路1号',
    image: 'https://picsum.photos/seed/basketball/400/200',
    crowdLevel: 'High',
    price: '免费'
  },
  {
    id: '2',
    name: '星光羽毛球馆',
    type: '羽毛球',
    distance: '2.5km',
    address: '朝阳区星光大道8号',
    image: 'https://picsum.photos/seed/badminton/400/200',
    crowdLevel: 'Medium',
    price: '¥60/小时'
  },
  {
    id: '3',
    name: '绿茵飞盘营地',
    type: '飞盘',
    distance: '3.8km',
    address: '海淀区绿茵公园内',
    image: 'https://picsum.photos/seed/frisbee/400/200',
    crowdLevel: 'Low',
    price: '¥30/人'
  }
];

export default function HomeTab() {
  const [filter, setFilter] = useState('全部');
  const [location, setLocation] = useState({ address: '雷达扫描中...', loading: true });
  const filters = ['全部', '篮球', '羽毛球', '飞盘', '网球'];

  const fetchLocation = () => {
    setLocation({ address: '定位中...', loading: true });
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ 
            address: `当前位置: ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`, 
            loading: false 
          });
        },
        (err) => {
          setLocation({ address: '定位失败，使用默认位置(北京市)', loading: false });
        },
        { timeout: 5000 }
      );
    } else {
      setLocation({ address: '设备不支持定位', loading: false });
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const filteredVenues = filter === '全部' ? MOCK_VENUES : MOCK_VENUES.filter(v => v.type === filter);

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20">
      {/* Header & Search */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">发现附近场馆</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="搜索场馆、运动类型..." 
            className="w-full bg-gray-100 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Map Radar Simulation */}
      <div className="relative h-48 bg-indigo-50 overflow-hidden">
        <img src="https://picsum.photos/seed/map/800/400" alt="Map" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full border-2 border-indigo-400/30 animate-ping absolute"></div>
          <div className="w-16 h-16 rounded-full border-2 border-indigo-500/50 animate-ping absolute" style={{ animationDelay: '0.5s' }}></div>
          <div className="bg-indigo-600 text-white p-2 rounded-full shadow-lg z-10">
            <MapPin size={24} />
          </div>
        </div>
        <button 
          onClick={fetchLocation}
          className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-indigo-700 shadow-sm flex items-center hover:bg-white transition-colors"
        >
          {location.loading ? (
            <RefreshCw size={12} className="mr-1 animate-spin" />
          ) : (
            <Navigation size={12} className="mr-1" />
          )}
          {location.address}
        </button>
      </div>

      {/* Filters */}
      <div className="px-4 py-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
        <div className="flex space-x-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Venue List */}
      <div className="px-4 space-y-4 flex-1 overflow-y-auto">
        {filteredVenues.map(venue => (
          <div key={venue.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-32 relative">
              <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white px-2 py-1 rounded-md text-xs font-medium">
                {venue.distance}
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-bold text-gray-900">{venue.name}</h3>
                <span className="text-indigo-600 font-semibold text-sm">{venue.price}</span>
              </div>
              <p className="text-gray-500 text-sm flex items-center mb-3">
                <MapPin size={14} className="mr-1" /> {venue.address}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium">
                    {venue.type}
                  </span>
                  <div className="flex items-center text-xs font-medium">
                    <Users size={14} className={`mr-1 ${
                      venue.crowdLevel === 'High' ? 'text-red-500' : 
                      venue.crowdLevel === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                    }`} />
                    <span className={
                      venue.crowdLevel === 'High' ? 'text-red-600' : 
                      venue.crowdLevel === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }>
                      {venue.crowdLevel === 'High' ? '拥挤' : venue.crowdLevel === 'Medium' ? '适中' : '空闲'}
                    </span>
                  </div>
                </div>
                <button className="bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
                  导航去这
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
