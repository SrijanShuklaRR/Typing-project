# Typing Practice App

A React-based typing practice application that helps users improve their typing speed and accuracy.

## Features

- Real-time typing feedback with character-by-character highlighting
- Words per minute (WPM) calculation
- Accuracy tracking
- Multiple practice texts
- Reset and next text functionality

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Usage

1. Start typing in the input field to begin the practice session
2. The text above will highlight in green for correct characters and red for incorrect ones
3. Your WPM and accuracy will be calculated in real-time
4. Use the Reset button to start over with the same text
5. Use the Next Text button to move to a different practice text

## Development

The project is built with:
- React
- TypeScript
- CSS Modules

### Project Structure

```
src/
  ├── components/
  │   └── TypingPractice.tsx
  ├── data/
  │   └── texts.ts
  ├── App.tsx
  ├── index.tsx
  └── styles/
      ├── App.css
      └── TypingPractice.css
```
