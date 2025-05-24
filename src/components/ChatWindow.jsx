import { useState, useRef, useEffect } from 'react';
import Message from './Message';
import AICopilot from './AICopilot';

export default function ChatWindow({ policyText }) {
  const [messages, setMessages] = useState([
    { text: "Hello, how can I help you today?", sender: 'agent' }
  ]);
  const [input, setInput] = useState('');
  const [showCopilot, setShowCopilot] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const chatEndRef = useRef(null);

  const formatAIResponse = (text) => {
    // Convert markdown-style bold (**text**) to HTML bold
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert markdown-style lists to HTML lists
    formattedText = formattedText.replace(/^\s*-\s(.*$)/gm, '<li>$1</li>');
    formattedText = formattedText.replace(/^\s*\d+\.\s(.*$)/gm, '<li>$1</li>');
    
    // If we found any list items, wrap them in a ul tag
    if (formattedText.includes('<li>')) {
      formattedText = formattedText.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    }
    
    return formattedText;
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'customer' }]);
      setInput('');
    }
  };

  const handleAIResponse = (response) => {
    const formattedResponse = formatAIResponse(response);
    setMessages([...messages, { 
      text: <div dangerouslySetInnerHTML={{ __html: formattedResponse }} />, 
      sender: 'agent' 
    }]);
    setShowCopilot(false);
  };

  const handleContextMenu = (e) => {
    const selection = window.getSelection().toString();
    if (selection) {
      e.preventDefault();
      setSelectedText(selection);
      setShowCopilot(true);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div 
        className="message-area" 
        onMouseUp={() => setSelectedText(window.getSelection().toString())}
        onContextMenu={handleContextMenu}
      >
        {messages.map((msg, i) => (
          <Message key={i} text={msg.text} sender={msg.sender} />
        ))}
        <div ref={chatEndRef} />
      </div>
      
      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
        <button 
          onClick={() => setShowCopilot(true)}
          className="ai-assist-btn"
        >
          AI Assist
        </button>
      </div>

      {showCopilot && (
        <AICopilot 
          onClose={() => setShowCopilot(false)}
          onSubmit={handleAIResponse}
          context={selectedText || policyText}
        />
      )}
    </div>
  );
}