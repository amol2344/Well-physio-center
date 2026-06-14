import { useState, useRef, useEffect } from "react";
import "./chatbot.css";

const API_URL = "";
const QUICK_QUESTIONS = [
  "What conditions do you treat?",
  "How do I book an appointment?",
  "What should I bring to my first visit?",
  "Do you offer home physiotherapy?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 👋 I'm the Wellness Physio Center virtual assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Server error");

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again or call us directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating button */}
      <button
        className="chatbot-fab"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Open chat assistant"
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
        {!isOpen && <span className="chatbot-fab-label">Ask us anything</span>}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-label="Chat with Wellness Physio Center assistant">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">P</div>
            <div>
              <p className="chatbot-header-name">Wellness Physio Assistant</p>
              <p className="chatbot-header-status">
                <span className="chatbot-dot" /> Online
              </p>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-bubble-wrap ${msg.role}`}>
                {msg.role === "assistant" && <div className="chatbot-avatar">P</div>}
                <div className={`chatbot-bubble ${msg.role}`}>{msg.content}</div>
              </div>
            ))}

            {/* Quick questions — show after first message only */}
            {messages.length === 1 && (
              <div className="chatbot-quick">
                {QUICK_QUESTIONS.map((q) => (
                  <button key={q} className="chatbot-quick-btn" onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="chatbot-bubble-wrap assistant">
                <div className="chatbot-avatar">P</div>
                <div className="chatbot-bubble assistant chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-wrap">
            <textarea
              className="chatbot-input"
              rows={1}
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="chatbot-send"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
          <p className="chatbot-disclaimer">Not medical advice. Always consult your physiotherapist.</p>
        </div>
      )}
    </div>
  );
}