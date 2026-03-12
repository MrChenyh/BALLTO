import React, { useState, useEffect } from 'react';
import { Search, MapPin, Navigation, Users, RefreshCw, X } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Venue } from '../types';

// Fix leaflet default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const THEMES: Record<string, any> = {
  '全部': {
    bgLight: 'bg-indigo-50',
    bgMain: 'bg-indigo-600',
    textMain: 'text-indigo-600',
    borderMain: 'border-indigo-600',
    ringMain: 'focus:ring-indigo-500',
    pattern: 'https://picsum.photos/seed/map/800/400',
    radarTint: 'border-indigo-400/30',
    radarTint2: 'border-indigo-500/50',
    textLight: 'text-indigo-700'
  },
  '篮球': {
    bgLight: 'bg-orange-50',
    bgMain: 'bg-orange-600',
    textMain: 'text-orange-600',
    borderMain: 'border-orange-600',
    ringMain: 'focus:ring-orange-500',
    pattern: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=800&h=400',
    radarTint: 'border-orange-400/30',
    radarTint2: 'border-orange-500/50',
    textLight: 'text-orange-700'
  },
  '羽毛球': {
    bgLight: 'bg-teal-50',
    bgMain: 'bg-teal-600',
    textMain: 'text-teal-600',
    borderMain: 'border-teal-600',
    ringMain: 'focus:ring-teal-500',
    pattern: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800&h=400',
    radarTint: 'border-teal-400/30',
    radarTint2: 'border-teal-500/50',
    textLight: 'text-teal-700'
  },
  '飞盘': {
    bgLight: 'bg-emerald-50',
    bgMain: 'bg-emerald-600',
    textMain: 'text-emerald-600',
    borderMain: 'border-emerald-600',
    ringMain: 'focus:ring-emerald-500',
    pattern: 'https://images.unsplash.com/photo-1556816723-1ce827b9cf95?auto=format&fit=crop&q=80&w=800&h=400',
    radarTint: 'border-emerald-400/30',
    radarTint2: 'border-emerald-500/50',
    textLight: 'text-emerald-700'
  },
  '网球': {
    bgLight: 'bg-lime-50',
    bgMain: 'bg-lime-600',
    textMain: 'text-lime-600',
    borderMain: 'border-lime-600',
    ringMain: 'focus:ring-lime-500',
    pattern: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&q=80&w=800&h=400',
    radarTint: 'border-lime-400/30',
    radarTint2: 'border-lime-500/50',
    textLight: 'text-lime-700'
  }
};

const MOCK_VENUES: Venue[] = [
  {
    id: '1',
    name: '东城体育公园篮球场',
    type: '篮球',
    distance: '1.2km',
    address: '东城区体育路1号',
    image: 'https://picsum.photos/seed/basketball/400/200',
    crowdLevel: 'High',
    price: '免费',
    lat: 39.915,
    lng: 116.415
  },
  {
    id: '2',
    name: '星光羽毛球馆',
    type: '羽毛球',
    distance: '2.5km',
    address: '朝阳区星光大道8号',
    image: 'https://picsum.photos/seed/badminton/400/200',
    crowdLevel: 'Medium',
    price: '¥60/小时',
    lat: 39.935,
    lng: 116.455
  },
  {
    id: '3',
    name: '绿茵飞盘营地',
    type: '飞盘',
    distance: '3.8km',
    address: '海淀区绿茵公园内',
    image: 'https://picsum.photos/seed/frisbee/400/200',
    crowdLevel: 'Low',
    price: '¥30/人',
    lat: 40.015,
    lng: 116.395
  }
];

export default function HomeTab() {
  const [filter, setFilter] = useState('全部');
  const [location, setLocation] = useState({ address: '雷达扫描中...', loading: true });
  const [userCoords, setUserCoords] = useState<[number, number]>([39.9042, 116.4074]); // 默认北京
  const [showMapModal, setShowMapModal] = useState(false);
  const filters = ['全部', '篮球', '羽毛球', '飞盘', '网球'];
  const theme = THEMES[filter] || THEMES['全部'];

  const fetchLocation = () => {
    setLocation({ address: '定位中...', loading: true });
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ 
            address: `当前位置: ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}`, 
            loading: false 
          });
          setUserCoords([pos.coords.latitude, pos.coords.longitude]);
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
            className={`w-full bg-gray-100 rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 ${theme.ringMain}`}
          />
        </div>
      </div>

      {/* Map Radar Simulation */}
      <div 
        className={`relative h-48 ${theme.bgLight} overflow-hidden cursor-pointer group z-0`}
        onClick={() => setShowMapModal(true)}
      >
        <MapContainer center={userCoords} zoom={12} style={{ height: '100%', width: '100%', zIndex: 0 }} zoomControl={false} dragging={false} scrollWheelZoom={false} doubleClickZoom={false}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={userCoords} />
          {filteredVenues.map(v => (
            v.lat && v.lng && <Marker key={v.id} position={[v.lat, v.lng]} />
          ))}
        </MapContainer>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className={`w-32 h-32 rounded-full border-2 ${theme.radarTint} animate-ping absolute`}></div>
          <div className={`w-16 h-16 rounded-full border-2 ${theme.radarTint2} animate-ping absolute`} style={{ animationDelay: '0.5s' }}></div>
          <div className={`${theme.bgMain} text-white p-2 rounded-full shadow-lg z-10`}>
            <MapPin size={24} />
          </div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            fetchLocation();
          }}
          className={`absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium ${theme.textLight} shadow-sm flex items-center hover:bg-white transition-colors pointer-events-auto z-20`}
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
                filter === f ? `${theme.bgMain} text-white` : 'bg-white text-gray-600 border border-gray-200'
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
                <span className={`${theme.textMain} font-semibold text-sm`}>{venue.price}</span>
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
                <button className={`${theme.bgLight} ${theme.textMain} px-3 py-1.5 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity`}>
                  导航去这
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Modal */}
      {showMapModal && (
        <div className="absolute inset-0 z-50 bg-gray-100 flex flex-col animate-in slide-in-from-bottom-full duration-300">
          <div className="relative flex-1">
            <MapContainer center={userCoords} zoom={12} style={{ height: '100%', width: '100%', zIndex: 0 }}>
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapUpdater center={userCoords} />
              
              {/* User Location Marker */}
              <Marker position={userCoords}>
                <Popup>
                  <div className="font-bold text-sm text-blue-600">当前位置</div>
                </Popup>
              </Marker>

              {/* Venue Markers */}
              {filteredVenues.map(v => (
                v.lat && v.lng && (
                  <Marker key={v.id} position={[v.lat, v.lng]}>
                    <Popup>
                      <div className="font-bold text-sm">{v.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{v.distance} | {v.price}</div>
                      <button className={`mt-2 w-full ${theme.bgMain} text-white text-xs py-1 rounded`}>
                        导航去这
                      </button>
                    </Popup>
                  </Marker>
                )
              ))}
            </MapContainer>
            
            {/* Header / Close */}
            <div className="absolute top-0 left-0 right-0 p-4 pt-12 bg-gradient-to-b from-black/50 to-transparent flex justify-between items-center pointer-events-none z-10">
              <button onClick={() => setShowMapModal(false)} className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md text-gray-800 hover:bg-white transition-colors pointer-events-auto">
                <X size={24} />
              </button>
              <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md text-sm font-bold text-gray-800 flex items-center pointer-events-auto">
                <MapPin size={16} className={`mr-1 ${theme.textMain}`} />
                附近场馆地图
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
