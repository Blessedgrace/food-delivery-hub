import React, { useState } from 'react';
import { Sparkles, Wand2, Download, AlertTriangle, Upload, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

type Mode = 'generate' | 'edit';
type ImageSize = '1K' | '2K' | '4K';

// Branding Guidelines for AI Generation
const BRAND_STYLE_PROMPT = `
STYLE GUIDELINES FOR ANNA CAKES:
- THEME: "Anna Cakes & Confectioneries" brand style.
- COLORS: Dominant cheerful YELLOW and GREEN accents (e.g., in napkins, backgrounds, plates, or toppings).
- VIBE: Professional, realistic, high-end food photography. Appetizing and fresh.
- LIGHTING: Bright, natural, soft daylight.
- CONTENT: Full food presentation.
- NEGATIVE PROMPT: Do not generate cartoonish, 3D render style, low resolution, or dark gloomy images.
`;

const CakeDesigner: React.FC = () => {
  const [mode, setMode] = useState<Mode>('generate');
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState<ImageSize>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Edit Mode State
  const [baseImage, setBaseImage] = useState<string | null>(null);

  const handleBaseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBaseImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      // API Key Check for gemini-3-pro-image-preview
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
        // Wait for race condition mitigation? 
        // Logic says assume success after openSelectKey returns (user action completed).
      }

      // Re-instantiate with latest key state implicitly via process.env.API_KEY injection 
      // (The environment simulates the key being available after selection)
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Combine user prompt with branding guidelines
      const fullPrompt = `${BRAND_STYLE_PROMPT}\n\nUSER REQUEST: ${prompt}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: fullPrompt }]
        },
        config: {
          imageConfig: {
            imageSize: imageSize,
            aspectRatio: '1:1' 
          }
        }
      });

      // Extract Image
      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64String = part.inlineData.data;
            setGeneratedImage(`data:image/png;base64,${base64String}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        setError("No image was generated. The model might have refused the prompt.");
      }

    } catch (err: any) {
      console.error(err);
      if (err.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio.openSelectKey(); // Retry key selection
        setError("Please select a valid paid API key project.");
      } else {
        setError("Failed to generate image. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!prompt.trim() || !baseImage) return;
    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const base64Data = baseImage.split(',')[1];
      const mimeType = baseImage.split(';')[0].split(':')[1];

      // For editing, we append a lighter version of the style guide to avoid over-altering the original image
      const editPrompt = `${prompt}. (Keep realistic style, Anna Cakes branding)`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Data
              }
            },
            { text: editPrompt }
          ]
        }
      });

      // Extract Image
      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64String = part.inlineData.data;
            setGeneratedImage(`data:image/png;base64,${base64String}`);
            foundImage = true;
            break;
          }
        }
      }
      
      if (!foundImage) {
        setError("Editing failed. Try a different prompt.");
      }

    } catch (err) {
      console.error(err);
      setError("Failed to edit image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-20 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <Sparkles className="text-brand-yellow" /> Cake Designer
        </h1>
        <p className="text-gray-600">Visualize your dream cake with our AI. <span className="text-brand-green font-bold">Always fresh, always realistic.</span></p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setMode('generate')}
            className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wide transition-colors ${
              mode === 'generate' ? 'bg-brand-green text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            Create New
          </button>
          <button 
             onClick={() => setMode('edit')}
             className={`flex-1 py-4 text-center font-bold text-sm uppercase tracking-wide transition-colors ${
               mode === 'edit' ? 'bg-brand-green text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
             }`}
          >
            Edit Image
          </button>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Controls Side */}
          <div className="space-y-6">
            
            {mode === 'generate' ? (
              <>
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-sm text-yellow-800 flex gap-2">
                  <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                  <p>Uses <strong>Gemini 3 Pro Image</strong>. Generates realistic Anna Cakes style images (Yellow & Green theme).</p>
                </div>
                
                <div>
                   <label className="block text-sm font-bold text-gray-700 mb-2">Image Resolution</label>
                   <div className="flex gap-2">
                     {(['1K', '2K', '4K'] as ImageSize[]).map((size) => (
                       <button
                         key={size}
                         onClick={() => setImageSize(size)}
                         className={`flex-1 py-2 rounded-lg border text-sm font-bold ${
                           imageSize === size 
                             ? 'border-brand-green bg-brand-lightgreen text-brand-green' 
                             : 'border-gray-200 text-gray-500'
                         }`}
                       >
                         {size}
                       </button>
                     ))}
                   </div>
                </div>
              </>
            ) : (
              <>
                 <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm text-blue-800 flex gap-2">
                  <Wand2 size={16} className="shrink-0 mt-0.5" />
                  <p>Uses <strong>Gemini 2.5 Flash Image</strong>. Upload a photo and describe changes (e.g., "Add candles").</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Base Image</label>
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100">
                    {baseImage ? (
                      <img src={baseImage} alt="Base" className="h-full object-contain" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-xs text-gray-500">Click to upload image</p>
                      </div>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={handleBaseImageUpload} />
                  </label>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                {mode === 'generate' ? 'Describe your dream cake' : 'Instructions for editing'}
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={mode === 'generate' ? "A three-tier chocolate cake with gold drip and red roses..." : "Make the background a garden party..."}
                rows={4}
                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-green resize-none"
              ></textarea>
            </div>

            <button
              onClick={mode === 'generate' ? handleGenerate : handleEdit}
              disabled={loading || !prompt.trim() || (mode === 'edit' && !baseImage)}
              className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>Generating...</>
              ) : (
                <>{mode === 'generate' ? 'Generate Cake' : 'Edit Cake'} <Sparkles size={20} /></>
              )}
            </button>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>

          {/* Output Side */}
          <div className="bg-gray-900 rounded-2xl flex items-center justify-center min-h-[300px] relative overflow-hidden">
            {loading ? (
              <div className="text-center">
                 <div className="w-12 h-12 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                 <p className="text-white text-sm animate-pulse">AI is baking your design...</p>
              </div>
            ) : generatedImage ? (
              <div className="relative w-full h-full group">
                <img src={generatedImage} alt="Generated" className="w-full h-full object-contain" />
                <a 
                  href={generatedImage} 
                  download="anna-cake-design.png"
                  className="absolute bottom-4 right-4 bg-white text-gray-900 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Download size={24} />
                </a>
              </div>
            ) : (
              <div className="text-center text-gray-500 p-8">
                <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                <p>Generated image will appear here</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CakeDesigner;