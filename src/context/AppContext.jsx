import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  services: [
    {
      id: 1,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
      icon: '🌐'
    },
    {
      id: 2,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications',
      icon: '📱'
    },
    {
      id: 3,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment',
      icon: '☁️'
    }
  ],
  contactMessages: [],
  testimonials: [
    {
      id: 1,
      name: 'John Smith',
      company: 'Tech Corp',
      message: 'XYZ Innovations delivered exceptional results for our project.',
      rating: 5
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      company: 'StartupXYZ',
      message: 'Professional team with great communication and delivery.',
      rating: 5
    }
  ]
};

function appReducer(state, action) {
  switch (action.type) {
    case 'ADD_SERVICE':
      return {
        ...state,
        services: [...state.services, { ...action.payload, id: Date.now() }]
      };
    case 'UPDATE_SERVICE':
      return {
        ...state,
        services: state.services.map(service =>
          service.id === action.payload.id ? action.payload : service
        )
      };
    case 'DELETE_SERVICE':
      return {
        ...state,
        services: state.services.filter(service => service.id !== action.payload)
      };
    case 'ADD_CONTACT_MESSAGE':
      return {
        ...state,
        contactMessages: [...state.contactMessages, { ...action.payload, id: Date.now(), timestamp: new Date().toISOString() }]
      };
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('xyzInnovationsData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('xyzInnovationsData', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
