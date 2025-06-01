import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axios/axios";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('idle');

  const getUser = async () => {
    setStatus('loading');
    try {
      const {data} = await axiosInstance.get("/auth/me");
      localStorage.setItem('access-token', data.accessToken)
         setUser(data);
        setStatus('success');
    } catch {
      setUser(null);
      setStatus('error');
    }
  };

    useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem('access-token');
    setUser(null);
    setStatus('idle');
  }

  return (
    <AuthContext.Provider value={{ user, setUser, getUser, status, setStatus, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
