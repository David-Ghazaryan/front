/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
// import config from "../config/public";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    const register = async (data) => {
        try {
            const response = await fetch(`http://localhost:8080/api/auth/sign-up`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                
                body: JSON.stringify(data),
              });
                      
            if (!response.ok) throw new Error("Registration failed");
            
            const result = await response.json();
            console.log(result)      
            setUser(result.user);
        } catch (error) {
      console.error("Register error:", error.message);
    }
};

return (
    <AuthContext.Provider value={{ user, register }}>
      {children}
    </AuthContext.Provider>
  );
};
