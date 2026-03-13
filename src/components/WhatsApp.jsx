import React, { useState, useEffect, useRef } from "react";
import { Send, X, Bot, Loader2, Zap } from "lucide-react";

export default function Whatsapp() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Path Finder AI online. How can I assist with your stage production or festival today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleChat = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/MistralAI/Mistral-7B-Instruct-v0.2",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            inputs: `[INST] You are the Path Finder AI. Focus: Award Shows and Music Festivals. Tone: Professional. Question: ${input} [/INST]`,
          }),
        }
      );

      const data = await response.json();
      let aiText = data[0]?.generated_text || "I'm having trouble connecting to the stage crew.";
      if (aiText.includes("[/INST]")) aiText = aiText.split("[/INST]").pop().trim();

      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Signal lost. Please check your connection." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "25px", right: "25px", zIndex: 10000 }}>
      
      {/* --- SMALLER FLOATING AI BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "50px", // Reduced from 60px
          height: "50px", // Reduced from 60px
          borderRadius: "50%",
          backgroundColor: isOpen ? "#333" : "#7c3aed", 
          color: "white",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        {isOpen ? <X size={24} /> : <Bot size={26} />}
      </button>

      {/* --- CHAT POPUP --- */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "65px",
            right: "0",
            width: "320px",
            height: "450px",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 15px 50px rgba(0,0,0,0.15)",
            fontFamily: "inherit",
            animation: "chatFadeIn 0.4s ease-out",
          }}
        >
          {/* Header with Signal Icon */}
          <div
            style={{
              backgroundColor: "#1a1a1a",
              color: "white",
              padding: "18px 15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ position: "relative" }}>
                <Bot size={20} className="text-purple-400" />
                <span className="signal-dot"></span>
              </div>
              <div>
                <div style={{ fontWeight: "600", fontSize: "14px", letterSpacing: "0.5px" }}>PATHFINDER AI</div>
                <div style={{ fontSize: "10px", color: "#a1a1aa", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Zap size={8} fill="#fbbf24" stroke="none" /> System Active
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              padding: "20px 15px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              backgroundColor: "#f9fafb",
            }}
          >
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "12px 16px",
                  borderRadius: "18px",
                  fontSize: "13px",
                  lineHeight: "1.5",
                  backgroundColor: m.role === "user" ? "#7c3aed" : "#ffffff",
                  color: m.role === "user" ? "#ffffff" : "#1f2937",
                  boxShadow: m.role === "user" ? "0 4px 10px rgba(124, 58, 237, 0.3)" : "0 2px 5px rgba(0,0,0,0.05)",
                  borderBottomRightRadius: m.role === "user" ? "2px" : "18px",
                  borderBottomLeftRadius: m.role === "assistant" ? "2px" : "18px",
                }}
              >
                {m.content}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: "flex-start", display: "flex", gap: "5px" }}>
                 <div className="typing-dot"></div>
                 <div className="typing-dot" style={{ animationDelay: "0.2s" }}></div>
                 <div className="typing-dot" style={{ animationDelay: "0.4s" }}></div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleChat}
            style={{
              padding: "15px",
              backgroundColor: "#ffffff",
              display: "flex",
              gap: "10px",
              borderTop: "1px solid #f1f1f1",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "10px 15px",
                borderRadius: "25px",
                border: "1px solid #e5e7eb",
                outline: "none",
                fontSize: "13px",
                color: "#000000", // Forced Black Text
                backgroundColor: "#f3f4f6"
              }}
            />
            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: "#1a1a1a",
                color: "white",
                border: "none",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Advanced CSS for Signal and Animations */}
      <style>{`
        @keyframes chatFadeIn {
          from { opacity: 0; transform: translateY(15px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .signal-dot {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 8px;
          height: 8px;
          background-color: #22c55e;
          border-radius: 50%;
          border: 2px solid #1a1a1a;
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }
        .typing-dot {
          width: 6px;
          height: 6px;
          background: #d1d5db;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
