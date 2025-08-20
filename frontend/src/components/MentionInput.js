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
  const [invalidMentions, setInvalidMentions] = useState([]);
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
    
    // Check for invalid mentions in real time
    const invalidMentionsList = validateMentions(inputValue);
    setInvalidMentions(invalidMentionsList);

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

  const validateMentions = (text) => {
    const mentionRegex = /@(\w+)/g;
    const mentions = [...text.matchAll(mentionRegex)];
    const invalidMentions = [];
    
    mentions.forEach(match => {
      const username = match[1];
      if (!allUsers.includes(username)) {
        invalidMentions.push(username);
      }
    });
    
    return invalidMentions;
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
      
      // Validate mentions before submitting
      const invalidMentions = validateMentions(value);
      if (invalidMentions.length > 0) {
        alert(`Usuário(s) não encontrado(s): ${invalidMentions.join(', ')}`);
        return;
      }
      
      onSubmit();
    }
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
        className={`${className} ${invalidMentions.length > 0 ? 'invalid-mentions' : ''}`}
        disabled={disabled}
      />
      
      {invalidMentions.length > 0 && (
        <div className="mention-error">
          Usuário(s) não encontrado(s): {invalidMentions.join(', ')}
        </div>
      )}
      
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