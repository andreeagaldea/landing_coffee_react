# Specialty Coffee Experience

A premium, interactive web experience designed for coffee enthusiasts. This project features a sophisticated **Coffee Quiz** that matches users with their ideal roast profile based on their morning rituals and flavor preferences, all wrapped in a high-end "Artisan" aesthetic.

---

## Features

* **Interactive Coffee Quiz**: A multi-step journey with a real-time progress bar and artisan design.
* **Smart Result Logic**: A custom algorithm that calculates the perfect roast match (Bold, Connoisseur, Classic, or Explorer).
* **Philosophy of Flavor (Values)**: A dedicated section showcasing the brand's commitment to Terroir, Roasting Alchemy, and Brewing Rituals.
* **Responsive Page Routing**: Fluid transitions between Home, Quiz, and Contact pages.
* **Modern UI/UX**: Built with a "Premium Dark Mode" aesthetic, featuring glassmorphism, smooth transitions, and professional iconography.

---

## Tech Stack

* **Framework**: [React.js](https://reactjs.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Routing**: [React Router Dom](https://reactrouter.com/)
* **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
* **State Management**: React Hooks (`useState`, `useEffect`)

---

## Project Structure

The project follows a modular architecture for better scalability:

```bash
src/
├── assets/             # Static images and brand assets
├── components/         # Reusable UI components
│   └── layout/         # Navigation and Footer
├── data/               # Configuration files (quizData, coffeeBeansData)
├── pages/              
│   ├── Home/           # Home sub-components (Gallery, Hero, Values, Quiz)
│   ├── Contact.jsx     # Contact page
│   └── Quiz.jsx        # Dedicated Quiz application page
├── router/             # React Router configuration
├── services/           # External API logic (contact service)
├── App.jsx             # Main application entry
└── main.jsx            # React DOM rendering
```

---

## Design System

The project follows a **High-Contrast Dark Aesthetic** to evoke the feeling of a specialty coffee shop:

| Element | Style / Color |
| :--- | :--- |
| **Main Background** | Deep Matte Black (`#12100E`) |
| **Card Background** | Rich Charcoal (`#1d120c`) |
| **Accent Color** | Coffee Orange (`#D97706`) |
| **Border Finish** | Subtle White Overlay (`border-white/5`) |
| **Border Radius** | Extra Large (`rounded-[3rem]`) |
| **Typography** | Bold tight-tracked headings & light elegant body text |

---

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/andreeagaldea/landing_coffee_react.git
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```
---

## Quiz Logic

The quiz uses a weighted system to determine the user's profile based on three key pillars:
1.  **Morning Routine**: Quick boost vs. slow ritual.
2.  **Flavor Profile**: Dark/Chocolatey vs. Floral/Citrus.
3.  **Brewing Method**: Pressure (Espresso) vs. Filtration (Pour-over).

---

## Testing Suite

To ensure a seamless coffee-discovery experience and robust performance, the project includes a comprehensive suite of tests using **Vitest** and **React Testing Library**.

### 1. Logic & Routing Tests (Unit)
* **Coffee Algorithm (`src/data/quizData.test.js`)**: Validates the recommendation engine, ensuring user answers correctly map to the Bold, Connoisseur, Classic, or Explorer profiles.
* **App Navigation (`src/router/index.test.jsx`)**: Confirms that all URL paths (`/`, `/contact`, `/quiz`) are correctly mapped to their respective page components.

### 2. Page & Component Tests (Integration)
* **Hero Section (`Hero.test.jsx`)**: Verifies the initialization of Parallax effects and Anime.js kinetics, ensuring proper memory cleanup on unmount.
* **Interactive Gallery (`Gallery.test.jsx`)**: Tests the modal system, including data injection for specific coffee beans and "click-to-close" backdrop functionality using `data-testid`.
* **Navbar & Navigation (`Navbar.test.jsx`)**: Ensures the mobile burger menu toggles correctly and that navigation links properly reset the UI state.
* **Contact Experience (`Contact.test.jsx`)**: Validates form validation logic, error states, and successful submission through mocked API services.
* **Footer (`Footer.test.jsx`)**: Confirms consistent branding and presence of legal/copyright information.
* **Home Page Composition (`Home/index.test.jsx`)**: Ensures all high-level sections (Hero, Gallery, Values, Quiz) are correctly integrated and rendered.

### 3. Quiz Experience (UX Flow)
* **Homepage Quick Start (`Quiz.test.jsx`)**: Verifies `sessionStorage` persistence and seamless redirection to the main quiz flow.
* **Full Quiz Journey (`pages/Quiz.test.jsx`)**:
    * **State Persistence**: Checks if the quiz correctly resumes from previous sessions.
    * **Interactive Flow**: Ensures progress bars and steps update dynamically.
    * **Results & Reset**: Validates the rendering of the result screen and "Retake Quiz" logic.

### Coverage & UI

The project maintains high-quality standards with **100% Statement Coverage** on all major UI components.

```bash
# Run all tests in the terminal
npm test

# Open the interactive Vitest UI (Visual Mode)
npm run test:ui

# Generate a detailed HTML coverage report
npm run test:coverage

```

---

