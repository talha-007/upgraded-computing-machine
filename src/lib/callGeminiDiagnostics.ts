const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; // Load from environment variable

export const callGeminiDiagnostics = async (symptoms: string): Promise<string> => {
  const systemPrompt = `You are a Senior Diesel Technician at Majeed Diesel Lab (established 1970, Delphi & Phinia certified, operating Hartridge ISO-standard OEM benches). 
  Analyze the user's reported diesel engine symptoms. 
  Focus on potential issues with the Fuel Injection System (Pumps, Injectors, Common Rail). 
  Provide 3 likely technical causes. 
  Keep the tone professional, industrial, and authoritative. 
  ALWAYS end by recommending they bring the vehicle to Majeed Diesel Lab for a definitive test on the Hartridge CRI-Pro machine.
  Do not provide definitive repair instructions, only diagnostic possibilities.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Symptoms: ${symptoms}` }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate diagnosis at this time.";
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error("Gemini API Error:", error);
    }
    return "Diagnostic system currently offline. Please contact our workshop directly.";
  }
};


