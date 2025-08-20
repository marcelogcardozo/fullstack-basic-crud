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
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      parts.push(
        <span key={match.index} className="mention-highlight">
          @{match[1].trim()}
        </span>
      );
      
      lastIndex = match.index + match[0].length;
    }
    
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