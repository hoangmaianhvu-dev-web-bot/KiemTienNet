
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Xin chào! Tôi là trợ lý AI. Tôi có thể giúp gì cho bạn trong việc kiếm tiền online hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    try {
      const response = await geminiService.getEarningAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Lỗi kết nối AI. Thử lại sau.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-slate-900 rounded-[2rem] border border-white/5 shadow-2xl overflow-hidden animate-in zoom-in-95">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-4">
        <Sparkles className="animate-pulse" />
        <div>
          <h2 className="font-black">Trợ lý Kiếm Tiền AI</h2>
          <p className="text-[10px] text-blue-100 uppercase tracking-widest font-bold">Powered by Gemini 3</p>
        </div>
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center border ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 border-white/5'}`}>
                {msg.role === 'user' ? <User size={18} /> : <Bot size={18} />}
              </div>
              <div className={`p-5 rounded-[1.5rem] text-sm leading-relaxed shadow-xl ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-300 rounded-tl-none border border-white/5'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-4 items-center p-5 bg-slate-800 rounded-2xl border border-white/5">
              <Loader2 className="animate-spin text-blue-400" size={20} />
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">AI đang suy nghĩ...</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-6 bg-slate-900 border-t border-white/5">
        <div className="flex gap-3">
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Đặt câu hỏi về MMO..."
            className="flex-1 px-6 py-4 bg-slate-800 border border-white/10 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-white text-sm"
          />
          <button onClick={handleSend} disabled={isLoading || !input.trim()} className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all">
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
