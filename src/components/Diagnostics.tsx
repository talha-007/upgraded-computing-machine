import { useState } from "react";
import type { FormEvent } from "react";
import { Sparkles, Zap, AlertTriangle, Settings } from "lucide-react";

import { callGeminiDiagnostics } from "../lib/callGeminiDiagnostics";

const Diagnostics = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDiagnosis = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const diagnosis = await callGeminiDiagnostics(input);
      setResult(diagnosis);
    } catch {
      setResult("Error connecting to diagnostic server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="diagnostics" className="py-24 bg-white relative border-t border-gray-200 overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 border border-[#005eD2]/20 rounded-full border-dashed animate-spin-slow"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-[#ff1d1d]/10 rounded-full border-dotted"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-[#005eD2]/30 rounded px-3 py-1 mb-4">
              <Sparkles className="w-4 h-4 text-[#005eD2]" />
              <span className="text-[#005eD2] text-xs font-bold uppercase tracking-wider">AI Powered Diagnostics</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 uppercase">
              Check Your Engine <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005eD2] to-blue-600">Instantly</span>
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Describe your vehicle's symptoms below (e.g., black smoke, loss of power, hard starting). Our AI, trained on diesel engine data, will provide a preliminary analysis and suggest next steps.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded mr-4 text-[#005eD2]">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-sm">Instant Analysis</h4>
                  <p className="text-gray-600 text-xs">Get immediate feedback on potential issues.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gray-100 p-2 rounded mr-4 text-[#ff1d1d]">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="text-gray-900 font-bold text-sm">Early Warning</h4>
                  <p className="text-gray-600 text-xs">Catch pump and injector failures before they damage the engine.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-300 shadow-xl overflow-hidden flex flex-col h-[500px]">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-300 flex justify-between items-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-gray-600 text-xs font-mono">Majeed-Lab-OS v2.0</div>
            </div>

            <div className="p-6 flex-1 flex flex-col font-mono text-sm overflow-y-auto bg-gray-50">
              <div className="text-gray-500 mb-4">
                &gt; Initializing Diagnostic Core... <br />
                &gt; System Ready. Waiting for input...
              </div>

              {result && (
                <div className="bg-blue-50 p-4 rounded border-l-2 border-[#005eD2] mb-4 text-gray-700 animate-fadeIn">
                  <span className="text-[#005eD2] font-bold block mb-2">Analysis Complete:</span>
                  <div className="whitespace-pre-wrap">{result}</div>
                </div>
              )}

              <form onSubmit={handleDiagnosis} className="mt-auto">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded p-3 text-gray-900 focus:outline-none focus:border-[#005eD2] transition-colors resize-none mb-3"
                  rows={3}
                  placeholder="Type symptoms here (e.g. 'Tractor engine knocking loudly when cold')..."
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#005eD2] hover:bg-blue-600 text-white font-bold py-3 rounded flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Settings className="animate-spin mr-2 h-4 w-4" /> Analyzing Engine Data...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Run Diagnostics ✨
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Diagnostics;


