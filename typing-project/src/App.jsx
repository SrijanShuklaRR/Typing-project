import React from 'react';
import TypingPractice from './components/TypingPractice';
import './App.css';

/**
 * App Component
 * 
 * The main application component that serves as the container
 * for the typing practice feature.
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Typing Practice</h1>
      </header>
      <main>
        {/* TypingPractice component handles all the typing functionality */}
        <TypingPractice />
      </main>
    </div>
  );
}

export default App; 