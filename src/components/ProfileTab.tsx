import React, { useState } from 'react';
import { Settings, Award, Activity, ShieldCheck, ChevronRight, Loader2, Sparkles, X, HeartPulse, Scale, Ruler, Map as MapIcon } from 'lucide-react';
import { generateWeeklyReport } from '../services/aiService';

const MOCK_STATS = {
  totalHours: 12.5,
  sports: ['篮球', '飞盘'],
  calories: 3200,
  beatPercentage: 85,
  creditScore: 98,
  totalGames: 24,
  distance: 32.5,
  height: 178,
  weight: 70,
  heartRate: 62,
  bmi: 22.1
};

export default function ProfileTab() {
  const [report, setReport] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const text = await generateWeeklyReport(MOCK_STATS);
      setReport(text);
    } catch (error) {
      console.error(error);
      setReport('生成失败，请重试。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-indigo-600 px-4 pt-12 pb-6 text-white">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">我的主页</h1>
          <button onClick={() => setShowSettings(true)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Settings size={20} />
          </button>
        </div>
        
        <div className="flex items-center">
          <img src="https://picsum.photos/seed/rainmarkc/100/100" alt="User" className="w-16 h-16 rounded-full border-2 border-white/20 mr-4" />
          <div>
            <h2 className="text-xl font-bold mb-1">rainmarkc</h2>
            <div className="flex items-center space-x-2 text-sm text-indigo-100">
              <span className="bg-white/20 px-2 py-0.5 rounded-md">篮球控卫</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-md">飞盘新手</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 -mt-4">
        {/* Stats Cards */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 flex justify-between items-center border border-gray-100">
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-gray-900">{MOCK_STATS.totalGames}</div>
            <div className="text-xs text-gray-500 mt-1">总场次</div>
          </div>
          <div className="w-px h-8 bg-gray-100"></div>
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-gray-900">{MOCK_STATS.totalHours}</div>
            <div className="text-xs text-gray-500 mt-1">运动时长(h)</div>
          </div>
          <div className="w-px h-8 bg-gray-100"></div>
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-gray-900">{MOCK_STATS.distance}</div>
            <div className="text-xs text-gray-500 mt-1">本周距离(km)</div>
          </div>
        </div>

        {/* Physical Data */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center">
            <Activity size={16} className="mr-2 text-indigo-500" />
            身体数据
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-xl flex items-center">
              <Ruler size={18} className="text-blue-500 mr-3" />
              <div>
                <div className="text-xs text-gray-500">身高</div>
                <div className="font-bold text-gray-900">{MOCK_STATS.height} <span className="text-xs font-normal">cm</span></div>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl flex items-center">
              <Scale size={18} className="text-orange-500 mr-3" />
              <div>
                <div className="text-xs text-gray-500">体重</div>
                <div className="font-bold text-gray-900">{MOCK_STATS.weight} <span className="text-xs font-normal">kg</span></div>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl flex items-center">
              <HeartPulse size={18} className="text-red-500 mr-3" />
              <div>
                <div className="text-xs text-gray-500">静息心率</div>
                <div className="font-bold text-gray-900">{MOCK_STATS.heartRate} <span className="text-xs font-normal">bpm</span></div>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl flex items-center">
              <Activity size={18} className="text-green-500 mr-3" />
              <div>
                <div className="text-xs text-gray-500">BMI</div>
                <div className="font-bold text-gray-900">{MOCK_STATS.bmi} <span className="text-xs font-normal">标准</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 shadow-sm border border-indigo-100 mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
                <Activity size={18} />
              </div>
              <h3 className="font-bold text-gray-900">AI 运动助理</h3>
            </div>
          </div>
          
          {!report ? (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 mb-4">本周运动数据已生成，快来看看你的专属复盘报告吧！</p>
              <button 
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-indigo-700 transition-colors flex items-center justify-center mx-auto disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} className="mr-2" />
                    生成周度复盘报告
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white">
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">{report}</p>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <Award className="text-yellow-500" size={20} />
              <span className="text-sm font-medium text-gray-700">我的成就</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="text-green-500" size={20} />
              <span className="text-sm font-medium text-gray-700">信用防鸽机制</span>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="absolute inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 pt-12">
            <h2 className="text-xl font-bold text-gray-900">设置</h2>
            <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} className="text-gray-600" />
            </button>
          </div>
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-2">账号信息</h3>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 text-sm">用户名</span>
                <span className="font-medium text-sm">rainmarkc</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 text-sm">手机号</span>
                <span className="font-medium text-sm">138****8888</span>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-2">隐私与安全</h3>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600 text-sm">位置信息授权</span>
                <span className="text-indigo-600 font-medium text-sm">已开启</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600 text-sm">向附近的人可见</span>
                <span className="text-indigo-600 font-medium text-sm">已开启</span>
              </div>
            </div>
            <button className="w-full bg-red-50 text-red-600 font-bold py-3 rounded-xl mt-8">
              退出登录
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
