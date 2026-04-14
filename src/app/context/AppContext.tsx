import React, { createContext, useContext, useState, useEffect } from "react";

interface UserProfile {
  name: string;
  location: string;
  age: number;
  fitnessLevel: string;
  healthConditions: string[];
  defaultActivity: string;
  workoutTime: string;
}

interface ActivityItem {
  id: number;
  type: string;
  label: string;
  date: string;
  time: string;
  score: number;
  status: string;
  temp: string;
  uv: string;
  aqi: string;
  duration: string;
  emoji: string;
}

interface AppContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  history: ActivityItem[];
  addToHistory: (activity: Omit<ActivityItem, "id">) => void;
  saveProfile: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: UserProfile = {
  name: "User",
  location: "Detecting...",
  age: 28,
  fitnessLevel: "Moderate",
  healthConditions: ["None"],
  defaultActivity: "Running",
  workoutTime: "Morning",
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("fitweather_profile");
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [history, setHistory] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem("fitweather_history");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Basic geolocation detection
    if (user.location === "Detecting...") {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // In a real app, we'd reverse geocode. For now, we'll just set it.
          setUser(prev => ({ ...prev, location: "Current Location" }));
        },
        () => {
          setUser(prev => ({ ...prev, location: "New Delhi, India" }));
        }
      );
    }
  }, []);

  const saveProfile = () => {
    localStorage.setItem("fitweather_profile", JSON.stringify(user));
  };

  const addToHistory = (activity: Omit<ActivityItem, "id">) => {
    const newItem = { ...activity, id: Date.now() };
    const newHistory = [newItem, ...history];
    setHistory(newHistory);
    localStorage.setItem("fitweather_history", JSON.stringify(newHistory));
  };

  return (
    <AppContext.Provider value={{ user, setUser, history, addToHistory, saveProfile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
