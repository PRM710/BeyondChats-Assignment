// src/hooks/useAIAssistant.js
import { useState } from 'react';

export default function useAIAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateResponse = async (context, policyText) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a customer support assistant. Use this refund policy to answer questions:
              ${policyText}
              Always reference specific policy sections when applicable.`
            },
            {
              role: "user",
              content: context
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      setError(err.message);
      console.error('AI API Error:', err);
      return "I'm having trouble accessing the policy information. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  return { generateResponse, isLoading, error };
}