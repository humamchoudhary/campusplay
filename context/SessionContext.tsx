import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

type User = {
  username: string;
  email: string;
  id: string;
  loggedin: string;
};

type SessionContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (
    loginData: { email: string; password: string },
    type: string,
  ) => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SESSION_KEY = "token";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredSession();
  }, []);

  const loadStoredSession = async () => {
    try {
      setIsLoading(true);
      const sessionToken = await AsyncStorage.getItem(SESSION_KEY);
      console.log(sessionToken);
      const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/auth`;

      if (sessionToken) {
        const response = await fetch(url, {
          method: "GET",
          headers: { Authorization: `Bearer ${sessionToken}` },
        });

        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error loading session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (
    loginData: { email: string; password: string },
    type: string,
  ) => {
    try {
      setIsLoading(true);
      const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/${type}login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();

      if (data.success) {
        await AsyncStorage.setItem(SESSION_KEY, data.token);

        await loadStoredSession();
      } else {
        throw new Error(data.message || "Login failed"); // Provide a default error message
      }
    } catch (error) {
      // console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }

    // try {
    //   setIsLoading(true);
    //   await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData.token));
    //   await AsyncStorage.setItem("uType", JSON.stringify(userData.role));
    //   // setUser(userData);
    // } catch (error) {
    //   console.error("Error signing in:", error);
    //   throw error;
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem(SESSION_KEY);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SessionContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
