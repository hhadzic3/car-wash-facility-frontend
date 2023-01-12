import { createContext, useEffect, useState } from "react";
import jwtDecode from 'jwt-decode';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        if (localStorage.getItem("token")) 
          setIsLoggedIn(true) 
        else {
            setIsLoggedIn(false);
        }
    
        if (isLoggedIn) 
          setUserRole(jwtDecode(localStorage.getItem("token")).authorities[0].authority);
      }, [userRole, isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
