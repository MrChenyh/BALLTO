import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, Sparkles, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import { Post } from '../types';
import { generateMoment } from '../services/aiService';

const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: 'Alex',
    avatar: 'https://picsum.photos/seed/alex/100/100',
    content: '今天东城球场的局太棒了！大家配合默契，打得酣畅淋漓。期待下次再战！🏀🔥 #篮球 #周末运动',
    image: 'https://picsum.photos/seed/bball_game/800/600',
    likes: 24,
    comments: 5,
    time: '2小时前'
  },
  {
    id: 'p2',
    author: 'Sarah',
    avatar: 'https://picsum.photos/seed/sarah/100/100',
    content: '第一次尝试飞盘，虽然跑得很累，但是接到盘的那一刻真的超有成就感！感谢教练的耐心指导。🥏✨',
    likes: 18,
    comments: 2,
    time: '5小时前'
  }
];

export default function CommunityTab() {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [showAIModal, setShowAIModal] = useState(false);
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!tags.trim()) return;
    setIsGenerating(true);
    setGeneratedText('');
    try {
      const text = await generateMoment(tags, image || undefined);
      setGeneratedText(text);
    } catch (error) {
      console.error(error);
      setGeneratedText('生成失败，请重试。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">运动社区</h1>
        <button 
          onClick={() => setShowAIModal(true)}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all flex items-center text-sm font-medium"
        >
          <Sparkles size={16} className="mr-1" />
          AI 写动态
        </button>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto">
        {posts.map(post => (
          <div key={post.id} className="bg-white mb-4 p-4 shadow-sm border-y border-gray-100">
            <div className="flex items-center mb-3">
              <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover mr-3" />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">{post.author}</h4>
                <span className="text-xs text-gray-500">{post.time}</span>
              </div>
            </div>
            <p className="text-gray-800 text-sm mb-3 leading-relaxed">{post.content}</p>
            {post.image && (
              <img src={post.image} alt="Post" className="w-full h-48 object-cover rounded-xl mb-3" />
            )}
            <div className="flex items-center space-x-6 text-gray-500">
              <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                <Heart size={18} />
                <span className="text-xs font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-indigo-500 transition-colors">
                <MessageCircle size={18} />
                <span className="text-xs font-medium">{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-indigo-500 transition-colors ml-auto">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Modal */}
      {showAIModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-[400px] rounded-t-3xl sm:rounded-3xl p-6 animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <Sparkles className="text-purple-500 mr-2" />
                AI 瞬间生成器
              </h2>
              <button onClick={() => setShowAIModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">情绪标签 / 关键词</label>
                <input 
                  type="text" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="例如：#累但爽 #夜跑 #篮球" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">上传照片 (可选)</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-purple-400 transition-colors cursor-pointer overflow-hidden relative"
                >
                  {image ? (
                    <img src={image} alt="Upload" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon size={32} className="mb-2 text-gray-400" />
                      <span className="text-sm">点击上传运动照片</span>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              <button 
                onClick={handleGenerate}
                disabled={!tags.trim() || isGenerating}
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold shadow-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    AI 创作中...
                  </>
                ) : (
                  '一键生成文案'
                )}
              </button>

              {generatedText && (
                <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                  <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{generatedText}</p>
                  <div className="mt-3 flex justify-end space-x-2">
                    <button 
                      onClick={handleGenerate}
                      className="text-xs font-medium text-purple-600 bg-purple-100 px-3 py-1.5 rounded-lg hover:bg-purple-200"
                    >
                      换一个
                    </button>
                    <button 
                      onClick={() => {
                        const newPost: Post = {
                          id: Date.now().toString(),
                          author: 'rainmarkc',
                          avatar: 'https://picsum.photos/seed/rainmarkc/100/100',
                          content: generatedText,
                          image: image || undefined,
                          likes: 0,
                          comments: 0,
                          time: '刚刚'
                        };
                        setPosts([newPost, ...posts]);
                        setShowAIModal(false);
                        setGeneratedText('');
                        setTags('');
                        setImage(null);
                      }}
                      className="text-xs font-medium text-white bg-purple-600 px-4 py-1.5 rounded-lg shadow-sm hover:bg-purple-700"
                    >
                      发布
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
