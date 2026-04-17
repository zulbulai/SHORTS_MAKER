import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Video, Image as ImageIcon, MessageSquare, Loader2, RefreshCw } from 'lucide-react';
import { generateShortsScript } from './services/geminiService';
import { Button, Input, Textarea } from './components/ui';

export default function App() {
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isQuestionFlow, setIsQuestionFlow] = useState(false);

  const handleGenerate = async (context: string = '') => {
    if (!productName || !productDesc) return;
    setLoading(true);
    try {
      const script = await generateShortsScript(productName, productDesc, context);
      setResult(script);
      
      // Basic heuristic to check if Gemini is asking questions
      if (script.toLowerCase().includes('?') && script.length < 500) {
        setIsQuestionFlow(true);
      } else {
        setIsQuestionFlow(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setProductName('');
    setProductDesc('');
    setAdditionalInfo('');
    setResult(null);
    setIsQuestionFlow(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-900">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-zinc-900 mb-6 border border-zinc-800">
            <Video className="w-8 h-8 text-zinc-100" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-display">
            Shorts Maker <span className="text-zinc-500">AI</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto">
            Transform product details into viral, emotional short-form video scripts.
          </p>
        </motion.header>

        <main className="grid gap-12">
          {!result ? (
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm"
            >
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-zinc-400 ml-1">Product Name</label>
                  <Input 
                    placeholder="e.g., AeroBloom Humidifier" 
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 h-14 text-lg"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-sm font-medium text-zinc-400 ml-1">Product Description</label>
                  <Textarea 
                    placeholder="Describe what it does, why it's special..."
                    value={productDesc}
                    onChange={(e) => setProductDesc(e.target.value)}
                    className="bg-zinc-900 border-zinc-800 min-h-[160px] text-lg leading-relaxed focus:ring-zinc-700"
                  />
                </div>

                <Button 
                  onClick={() => handleGenerate()}
                  disabled={loading || !productName || !productDesc}
                  className="w-full h-16 text-lg font-semibold rounded-2xl bg-zinc-100 hover:bg-white text-zinc-950 transition-all active:scale-[0.98]"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Generate Script
                      <Sparkles className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </motion.section>
          ) : (
            <div className="space-y-8">
              <AnimatePresence mode="wait">
                {isQuestionFlow ? (
                  <motion.div
                    key="questions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl"
                  >
                    <div className="flex items-center gap-3 mb-6 text-zinc-400 font-medium italic">
                      <MessageSquare className="w-5 h-5" />
                      AI needs more details to make it viral...
                    </div>
                    <div className="prose prose-invert prose-zinc max-w-none mb-8 whitespace-pre-line leading-relaxed text-lg">
                      {result}
                    </div>
                    <div className="space-y-4">
                      <Textarea 
                        placeholder="Answer the questions above..."
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        className="bg-zinc-950 border-zinc-800 min-h-[120px]"
                      />
                      <Button 
                        onClick={() => handleGenerate(additionalInfo)}
                        className="w-full h-14 rounded-xl"
                        disabled={loading}
                      >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Complete Script"}
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between mb-2">
                       <h2 className="text-2xl font-bold font-display">Your Content Strategy</h2>
                       <Button variant="ghost" onClick={reset} className="text-zinc-500 hover:text-zinc-100 flex items-center gap-2 px-0 hover:bg-transparent">
                         <RefreshCw className="w-4 h-4" />
                         Start Again
                       </Button>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl overflow-hidden">
                      <div className="prose prose-invert prose-zinc max-w-none whitespace-pre-wrap leading-relaxed select-all">
                        {result}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-start gap-4">
                        <ImageIcon className="w-6 h-6 text-zinc-500 shrink-0" />
                        <div>
                          <p className="font-medium mb-1">Visual prompts included</p>
                          <p className="text-sm text-zinc-500">Ready for Midjourney, DALL-E, or Flux generation.</p>
                        </div>
                      </div>
                      <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex items-start gap-4">
                        <MessageSquare className="w-6 h-6 text-zinc-500 shrink-0" />
                        <div>
                          <p className="font-medium mb-1">Emotion-first storytelling</p>
                          <p className="text-sm text-zinc-500">Optimized for high retention and engagement.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </main>

        <footer className="mt-20 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          <p>© 2026 Product Shorts Maker AI. Built for Creators.</p>
        </footer>
      </div>
    </div>
  );
}
