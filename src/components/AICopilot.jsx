import { useState } from 'react';
import useAIAssistant from '../hooks/useAIAssistant';

export default function AICopilot({ onClose, onSubmit, context }) {
  const [aiResponse, setAiResponse] = useState('');
  const { generateResponse, isLoading } = useAIAssistant();

  const handleGenerate = async () => {
    const response = await generateResponse(context);
    setAiResponse(response);
  };

  return (
    <div className="ai-copilot">
      <div className="ai-header">
        <h3>AI Copilot</h3>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      
      <div className="ai-context">
        <p><strong>Context:</strong> {context || 'No specific context selected'}</p>
      </div>
      
      <div className="ai-controls">
        <button 
          onClick={handleGenerate} 
          disabled={isLoading}
          className="generate-btn"
        >
          {isLoading ? 'Generating...' : 'Generate Response'}
        </button>
        
        <textarea 
          value={aiResponse}
          onChange={(e) => setAiResponse(e.target.value)}
          placeholder="AI response will appear here..."
          className="ai-textarea"
        />
        
        <button 
          onClick={() => onSubmit(aiResponse)} 
          disabled={!aiResponse.trim()}
          className="insert-btn"
        >
          Insert to Chat
        </button>
      </div>
    </div>
  );
}