import React, { useState, useRef, useEffect } from 'react';
import './MentionInput.css';

const MentionInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  placeholder, 
  className, 
  allUsers = [],
  disabled = false 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [mentionStart, setMentionStart] = useState(-1);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0 });
  const inputRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    const handleScroll = () => {
      if (showSuggestions && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setSuggestionPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
        });
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [showSuggestions]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const cursorPos = e.target.selectionStart;
    
    onChange(inputValue);

    // Check for @ mentions
    const textBeforeCursor = inputValue.substring(0, cursorPos);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);

    if (mentionMatch) {
      const mentionText = mentionMatch[1].toLowerCase();
      const startPos = textBeforeCursor.lastIndexOf('@');
      
      const filteredUsers = Array.from(allUsers).filter(user =>
        user.toLowerCase().includes(mentionText) && user.toLowerCase() !== mentionText
      );

      if (filteredUsers.length > 0) {
        setSuggestions(filteredUsers);
        setMentionStart(startPos);
        
        // Calculate position for the suggestions dropdown
        const rect = inputRef.current.getBoundingClientRect();
        setSuggestionPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX
        });
        
        setShowSuggestions(true);
        setSelectedSuggestion(0);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const insertMention = (username) => {
    const cursorPos = inputRef.current.selectionStart;
    const beforeMention = value.substring(0, mentionStart);
    const afterCursor = value.substring(cursorPos);
    
    const newValue = beforeMention + '@' + username + ' ' + afterCursor;
    onChange(newValue);
    setShowSuggestions(false);
    
    // Focus back to input
    setTimeout(() => {
      const newCursorPos = beforeMention.length + username.length + 2;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        insertMention(suggestions[selectedSuggestion]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    } else if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  const renderTextWithMentions = (text) => {
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
        <span key={match.index} className="mention">
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
    <div className="mention-input-container">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
      />
      
      {showSuggestions && (
        <div 
          className="mention-suggestions"
          style={{
            top: suggestionPosition.top,
            left: suggestionPosition.left
          }}
        >
          {suggestions.map((user, index) => (
            <div
              key={user}
              className={`mention-suggestion ${index === selectedSuggestion ? 'selected' : ''}`}
              onClick={() => insertMention(user)}
            >
              @{user}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentionInput;