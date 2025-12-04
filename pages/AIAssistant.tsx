import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Bot, User, Loader2, X } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  image?: string; // base64
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: "Hello! I'm Anna's AI Assistant. You can ask me about our cakes, request recipe ideas, or upload a photo of a cake you like for analysis!"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!inputText.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setSelectedImage(null);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let responseText = '';

      if (userMessage.image) {
        // Multimodal Analysis using gemini-3-pro-preview
        const base64Data = userMessage.image.split(',')[1];
        const mimeType = userMessage.image.split(';')[0].split(':')[1];

        const response: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Data
                }
              },
              { text: userMessage.text || "Analyze this image and tell me about the cake design, potential flavors, and if it looks suitable for a celebration." }
            ]
          },
          config: {
            systemInstruction: "You are a helpful assistant for 'Anna Cakes & Confectioneries'. You help users pick cakes and analyze cake photos. Our branding is cheerful Yellow and Green. We prefer realistic, appetizing descriptions.",
          }
        });
        
        responseText = response.text || "I couldn't analyze that image.";

      } else {
        // Text Chat using gemini-3-pro-preview
        const chat = ai.chats.create({
          model: 'gemini-3-pro-preview',
          config: {
            systemInstruction: "You are a helpful assistant for 'Anna Cakes & Confectioneries'. You are friendly, knowledgeable about Nigerian snacks (Zobo, Puff puff, Chin chin) and cakes. Our signature colors are Yellow and Green.",
          }
        });

        // Reconstruct history slightly for context (optional optimization)
        const historyText = messages.slice(-4).map(m => `${m.role === 'user' ? 'User' : 'Model'}: ${m.text}`).join('\n');
        
        const result = await chat.sendMessage({ 
            message: `${historyText}\nUser: ${userMessage.text}` 
        });
        responseText = result.text || "I'm not sure what to say.";
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I encountered an error connecting to the AI service. Please try again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-24 max-w-3xl h-[85vh] flex flex-col">
      <div className="bg-white rounded-t-3xl shadow-xl border border-gray-100 flex-grow flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-brand-green p-4 flex items-center gap-3 text-white">
          <div className="bg-white/20 p-2 rounded-full">
            <Bot size={24} className="text-brand-yellow" />
          </div>
          <div>
            <h2 className="font-bold text-lg">Anna's AI Assistant</h2>
            <p className="text-xs text-green-100">Powered by Gemini 3 Pro</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${
                msg.role === 'user' 
                  ? 'bg-brand-green text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
              }`}>
                {msg.image && (
                  <img src={msg.image} alt="Upload" className="w-full max-w-xs rounded-lg mb-2 border border-white/20" />
                )}
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 rounded-bl-none shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-brand-orange" />
                <span className="text-xs text-gray-500">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          {selectedImage && (
            <div className="mb-2 relative inline-block">
              <img src={selectedImage} alt="Preview" className="h-20 rounded-lg border border-gray-200" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow"
              >
                <X size={12} />
              </button>
            </div>
          )}
          <div className="flex gap-2 items-end">
            <label className="p-3 text-gray-400 hover:text-brand-green cursor-pointer bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
              <ImageIcon size={24} />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask about cakes or upload a photo..."
              className="flex-grow p-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green resize-none max-h-32"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={isTyping || (!inputText.trim() && !selectedImage)}
              className="p-3 bg-brand-green text-white rounded-xl hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg"
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;