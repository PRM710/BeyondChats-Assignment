import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import PolicyViewer from '../components/PolicyViewer';

const COMPANY_POLICY = `Global Commerce Solutions Refund Policy
Last Updated: January 15, 2024

1. Introduction
This Refund Policy governs all requests for refunds of products or services purchased from our platform.

2. Eligibility for Refunds
2.1 Standard Products
- Unopened products: 30-day refund window
- Digital products: 14-day refund if not accessed
- Custom products: Non-refundable

3. Refund Process
3.1 Submission Requirements
- Order number
- Proof of purchase
- Reason for refund

3.2 Processing Time
- 5-7 business days for approval
- Additional 3-5 days for bank processing

4. Conditions
4.1 Non-Refundable Items
- Gift cards
- Downloadable software after download
- Personal care items

5. Return Shipping
- Customer responsibility unless our error
- Must use trackable shipping method

6. Denied Refunds
- Items after 30 days
- Not in original condition
- Missing proof of purchase

7. Contact Information
Email: prakashprm710@gmail.com
Phone: +91 9833001027`;

export default function SupportDashboard() {
  const [activeTab, setActiveTab] = useState('chat');
  const [inboxItems] = useState([
    { id: 1, name: 'Luis - Github', preview: 'Regarding order #12345...' }
  ]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState({});

  const handleInboxItemClick = (item) => {
    setActiveConversation(item.id);
    if (!conversations[item.id]) {
      setConversations(prev => ({
        ...prev,
        [item.id]: [
          {
            text: `Hello, I'm contacting you about: ${item.preview}`,
            sender: 'customer'
          }
        ]
      }));
    }
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Your Inbox</h2>
        <div className="inbox-list">
          {inboxItems.map(item => (
            <div 
              key={item.id} 
              className={`inbox-item ${activeConversation === item.id ? 'active' : ''}`}
              onClick={() => handleInboxItemClick(item)}
            >
              <div className="inbox-name">{item.name}</div>
              <div className="inbox-preview">{item.preview}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="main-content">
        {activeConversation ? (
          <>
            <div className="conversation-header">
              <h3>{inboxItems.find(item => item.id === activeConversation)?.name}</h3>
            </div>
            <div className="tabs">
              <button 
                className={activeTab === 'chat' ? 'active' : ''}
                onClick={() => setActiveTab('chat')}
              >
                Customer Chat
              </button>
              <button 
                className={activeTab === 'policy' ? 'active' : ''}
                onClick={() => setActiveTab('policy')}
              >
                Policy Reference
              </button>
            </div>
            
            {activeTab === 'chat' ? (
              <ChatWindow 
                policyText={COMPANY_POLICY}
                messages={conversations[activeConversation] || []}
                onSendMessage={(message) => {
                  setConversations(prev => ({
                    ...prev,
                    [activeConversation]: [
                      ...(prev[activeConversation] || []),
                      { text: message, sender: 'agent' }
                    ]
                  }));
                }}
              />
            ) : (
              <PolicyViewer policyText={COMPANY_POLICY} />
            )}
          </>
        ) : (
          <div className="empty-state">
            <h3>Select a conversation from your inbox</h3>
            <p>Or start a new conversation with a customer</p>
          </div>
        )}
      </div>
    </div>
  );
}