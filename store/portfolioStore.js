import { create } from 'zustand';

// Default/empty portfolio structure
const defaultPortfolio = {
  template: 'card',
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    role: '',
    photo: ''
  },
  projects: [{}],
  skills: [''],
  education: [{}],
  experience: [{}]
};

// Helper to save state to localStorage
const saveState = (portfolio) => {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = JSON.stringify(portfolio);
      localStorage.setItem('portfolioForm', serializedState);
    }
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

export const usePortfolioStore = create((set) => ({
  portfolio: defaultPortfolio, // Start with default state to prevent hydration mismatch
  hydrated: false, // Flag to check if store has been hydrated

  // Action to hydrate the store from localStorage on the client
  hydrate: () => {
    try {
      if (typeof window !== 'undefined') {
        const serializedState = localStorage.getItem('portfolioForm');
        if (serializedState !== null) {
          set({ portfolio: JSON.parse(serializedState), hydrated: true });
        } else {
          set({ hydrated: true });
        }
      }
    } catch (e) {
      console.error("Could not hydrate state from localStorage", e);
      set({ hydrated: true });
    }
  },

  update: (updater) => set((state) => {
    const newPortfolio = updater(state.portfolio);
    saveState(newPortfolio);
    return { portfolio: newPortfolio };
  }),
  
  setPortfolio: (newPortfolio) => set(() => {
    saveState(newPortfolio);
    return { portfolio: newPortfolio };
  }),
  
  resetPortfolio: () => set(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('portfolioForm');
    }
    return { portfolio: defaultPortfolio };
  }),
}));
