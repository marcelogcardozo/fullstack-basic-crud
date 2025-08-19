import React from 'react';
import './MentionText.css';

const MentionText = ({ text, className = '' }) => {
  const renderTextWithMentions = (text) => {
    if (!text) return text;
    
    const mentionRegex = /@(\w+)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = mentionRegex.exec(text)) !== null) {
      // Add text before mention
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Add mention
      parts.push(
        <span key={match.index} className="mention-highlight">
          @{match[1]}
        </span>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts;
  };

  return (
    <span className={className}>
      {renderTextWithMentions(text)}
    </span>
  );
};

export default MentionText;