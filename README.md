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

