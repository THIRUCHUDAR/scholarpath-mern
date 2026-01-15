// src/components/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { FaCommentDots, FaTimes, FaRobot, FaPaperPlane } from 'react-icons/fa'; 
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Standard options list to reuse
  const mainOptions = [
    { label: '🔍 Find Scholarships', value: 'search' },
    { label: '📝 Application Process', value: 'process' }, // NEW
    { label: '✅ Eligibility Rules', value: 'eligibility' }, // NEW
    { label: '📄 Required Documents', value: 'documents' }, // NEW
    { label: '🔑 Login/Signup Help', value: 'account' },   // NEW
    { label: '📞 Contact Support', value: 'contact' }
  ];

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello there! 👋 Welcome to ScholarPath.",
      sender: 'bot',
      type: 'text'
    },
    {
      id: 2,
      text: "I can help you navigate your scholarship journey. What would you like to know?",
      sender: 'bot',
      type: 'options',
      options: mainOptions
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    // 1. Add User Message
    const newUserMsg = { 
      id: Date.now(), 
      text: option.label, 
      sender: 'user', 
      type: 'text' 
    };

    // 2. Determine Detailed Bot Response
    let botResponseText = "";
    
    switch(option.value) {
      case 'search':
        botResponseText = "To find scholarships, click the 'Search' tab in the top navigation bar. You can browse verified opportunities including Merit-based, Need-based, and Sports scholarships.";
        break;
        
      case 'process':
        botResponseText = "The process is simple:\n1. Create a free account.\n2. Complete your student profile.\n3. Browse the 'Search' section.\n4. Click 'Apply' on scholarships you qualify for.";
        break;
        
      case 'eligibility':
        botResponseText = "Eligibility varies by scholarship. Generally, you need to be a registered student in a recognized institution. Some grants require specific GPA scores (usually above 75%) or income proofs.";
        break;
        
      case 'documents':
        botResponseText = "Keep these documents ready: \n• Valid Student ID card\n• Academic Transcripts/Mark sheets\n• Community Certificate (if applicable)\n• Income Certificate\n• Aadhar Card";
        break;
        
      case 'account':
        botResponseText = "If you don't have an account, click 'Sign Up' at the top right. If you are already a member, click 'Login'. If you forgot your password, please contact support.";
        break;
        
      case 'contact':
        botResponseText = "Our support team is here to help! You can reach us via the 'Contact' page form, or email us directly at support@scholarpath.com.";
        break;
        
      default:
        botResponseText = "I'm here to help! Please select an option from the menu.";
    }

    const newBotMsg = {
      id: Date.now() + 1,
      text: botResponseText,
      sender: 'bot',
      type: 'text'
    };

    // 3. Update State with User Msg + Bot Answer
    setMessages((prev) => {
      // Keep history but remove old option buttons to keep UI clean
      const history = prev.map(msg => 
        msg.type === 'options' ? { ...msg, type: 'text-hidden-options' } : msg
      );
      return [...history, newUserMsg, newBotMsg];
    });
    
    // 4. Follow up after a delay
    setTimeout(() => {
       setMessages((prev) => [...prev, {
        id: Date.now() + 2,
        text: "Is there anything else I can assist you with?",
        sender: 'bot',
        type: 'options',
        options: mainOptions // Show the full menu again
      }]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <button className={`chatbot-toggle ${isOpen ? 'open' : ''}`} onClick={toggleChat}>
        {isOpen ? <FaTimes /> : <FaCommentDots />}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="header-icon-container">
               <FaRobot />
            </div>
            <div className="header-info">
              <h3>ScholarBot</h3>
              <p><span className="status-dot"></span> Online</p>
            </div>
            <button className="close-btn" onClick={toggleChat}><FaTimes /></button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-row ${msg.sender}`}>
                {msg.sender === 'bot' && (msg.type === 'text' || msg.type === 'options') && (
                  <div className="msg-avatar"><FaRobot /></div>
                )}

                {/* Text Message */}
                {(msg.type === 'text' || msg.type === 'text-hidden-options') && (
                  <div className="message-bubble">
                    {/* Handle new lines in text */}
                    {msg.text.split('\n').map((line, i) => (
                      <span key={i}>{line}<br/></span>
                    ))}
                  </div>
                )}

                {/* Options Buttons */}
                {msg.type === 'options' && (
                  <div className="options-grid">
                    {msg.options.map((opt, idx) => (
                      <button 
                        key={idx} 
                        className="option-btn"
                        onClick={() => handleOptionClick(opt)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-footer">
            <input type="text" placeholder="Select an option above..." disabled />
            <button className="send-btn"><FaPaperPlane /></button>
          </div>
          
          <div className="chatbot-branding">
            Powered by <strong>ScholarPath</strong>
          </div>

        </div>
      )}
    </div>
  );
}

export default Chatbot;