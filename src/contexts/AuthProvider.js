import { createContext, useEffect, useState } from "react";
import { getDecodedToken, getToken } from "../services/authService";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(getToken());
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        if (getToken()) 
          setIsLoggedIn(true) 
        else {
            setIsLoggedIn(false);
        }
    
        if (isLoggedIn) 
          setUserRole(getDecodedToken(getToken()).authorities[0].authority);
      }, [userRole, isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
