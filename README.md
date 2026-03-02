# 🌍 World Quiz Dev Challenge

An interactive, gamified geography quiz application built with React. This project challenges users to test their knowledge of world countries, featuring dynamically generated questions and a highly engaging user interface.

## ✨ Key Features
* **Dynamic Question Engine:** Utilizes custom React hooks (`useQuestionQuizPool`) and helper functions to generate randomized, non-repeating questions from a country data API.
* **Interactive UI/UX:** Features a clean, responsive design with custom CSS animations, including a dynamic floating-ball background to enhance the visual experience.
* **Gamified Feedback:** Provides instant visual feedback on user answers and rewards completion with a satisfying confetti animation (via `canvas-confetti`).
* **State Management:** Clean separation of concerns using functional components and state hooks to track scores, answers, and quiz progression.

## 🛠️ Tech Stack
* **Frontend:** React 19, Vite
* **Styling:** Custom CSS with keyframe animations
* **Libraries:** `canvas-confetti`, `lucide-react`

## 🚀 Getting Started

### Prerequisites
Ensure you have Node.js installed on your local environment.

### Installation
1. Clone the repository
2. Install the dependencies:
   ```bash
   npm install
