import React, { useState, useEffect, useRef } from 'react';
import { sampleTexts } from '../data/texts';
import './TypingPractice.css';

/**
 * TypingPractice Component
 * 
 * A component that provides a typing practice interface with real-time feedback,
 * performance metrics, and controls for practice sessions.
 */
const TypingPractice = () => {
  // State for the current text to type
  const [text, setText] = useState('');
  // State for user's input
  const [userInput, setUserInput] = useState('');
  // State to track when the session started
  const [startTime, setStartTime] = useState(null);
  // State to track if the session is finished
  const [isFinished, setIsFinished] = useState(false);
  // State to track if the session is paused
  const [isPaused, setIsPaused] = useState(false);
  // State to track elapsed time when paused
  const [pausedTime, setPausedTime] = useState(0);
  // State to track performance statistics
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, errors: 0 });
  // State to track which text is currently being practiced
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  // Reference to the input field for focus management
  const inputRef = useRef(null);

  // Set the current text when the text index changes
  useEffect(() => {
    setText(sampleTexts[currentTextIndex]);
  }, [currentTextIndex]);

  /**
   * Calculates and updates the performance statistics
   * including WPM, accuracy, and error count
   */
  const calculateStats = () => {
    if (!startTime) return;

    const endTime = Date.now();
    // Calculate time in minutes, accounting for paused time
    const timeInMinutes = (endTime - startTime - pausedTime) / 60000;
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / timeInMinutes);

    // Count errors by comparing each character
    let errors = 0;
    const userInputChars = userInput.split('');
    const textChars = text.split('');

    userInputChars.forEach((char, index) => {
      if (char !== textChars[index]) {
        errors++;
      }
    });

    // Calculate accuracy as percentage of correct characters
    const accuracy = Math.round(((text.length - errors) / text.length) * 100);

    setStats({ wpm, accuracy, errors });
  };

  /**
   * Handles input changes from the user
   * Starts the timer on first input and calculates stats when finished
   */
  const handleInputChange = (e) => {
    // Don't process input if paused
    if (isPaused) return;
    
    const value = e.target.value;
    // Start the timer on first input
    if (!startTime) {
      setStartTime(Date.now());
    }

    setUserInput(value);

    // Check if the user has completed the text
    if (value.length === text.length) {
      setIsFinished(true);
      calculateStats();
    }
  };

  /**
   * Resets the practice session to its initial state
   */
  const resetPractice = () => {
    setUserInput('');
    setStartTime(null);
    setIsFinished(false);
    setIsPaused(false);
    setPausedTime(0);
    setStats({ wpm: 0, accuracy: 0, errors: 0 });
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  /**
   * Moves to the next practice text
   */
  const nextText = () => {
    setCurrentTextIndex((prev) => (prev + 1) % sampleTexts.length);
    resetPractice();
  };

  /**
   * Toggles the pause state of the practice session
   */
  const togglePause = () => {
    if (isFinished) return;
    
    if (isPaused) {
      // Resuming from pause
      setStartTime(Date.now() + pausedTime);
      setPausedTime(0);
    } else {
      // Pausing the session
      setPausedTime(Date.now() - startTime);
    }
    
    setIsPaused(!isPaused);
  };

  /**
   * Determines the CSS class for each character based on user input
   * @param {number} index - The index of the character
   * @returns {string} - The CSS class to apply
   */
  const getCharacterClass = (index) => {
    if (index >= userInput.length) return '';
    return userInput[index] === text[index] ? 'correct' : 'incorrect';
  };

  return (
    <div className="typing-practice">
      {/* Display the text to type with character highlighting */}
      <div className="text-display">
        {text.split('').map((char, index) => (
          <span key={index} className={getCharacterClass(index)}>
            {char}
          </span>
        ))}
      </div>

      {/* Input field for user typing */}
      <textarea
        ref={inputRef}
        className="input-field"
        value={userInput}
        onChange={handleInputChange}
        placeholder={isPaused ? "Paused - Click Resume to continue" : "Start typing..."}
        disabled={isFinished || isPaused}
      />

      {/* Display performance statistics */}
      <div className="stats">
        <div>WPM: {stats.wpm}</div>
        <div>Accuracy: {stats.accuracy}%</div>
        <div>Errors: {stats.errors}</div>
      </div>

      {/* Control buttons */}
      <div className="controls">
        <button onClick={resetPractice}>Reset</button>
        <button onClick={togglePause}>{isPaused ? 'Resume' : 'Pause'}</button>
        <button onClick={nextText}>Next Text</button>
      </div>
    </div>
  );
};

export default TypingPractice; 