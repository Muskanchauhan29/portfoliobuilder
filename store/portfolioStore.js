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

export const usePortfolioStore = create((set, get) => ({
  portfolio: defaultPortfolio,
  setPortfolio: (data) => {
    set({ portfolio: data });
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioForm', JSON.stringify(data));
    }
  },
  updatePortfolio: (section, value) => {
    set((state) => {
      const updated = { ...state.portfolio, [section]: value };
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolioForm', JSON.stringify(updated));
      }
      return { portfolio: updated };
    });
  },
  resetPortfolio: () => {
    set({ portfolio: defaultPortfolio });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('portfolioForm');
    }
  }
}));
