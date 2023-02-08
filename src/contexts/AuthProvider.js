import { createContext, useEffect, useState } from "react";
import { UserRoles } from "../common/enums/enums";
import { getDecodedToken, getToken } from "../services/authService";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [userRole, setUserRole] = useState();

    function setCastedRole(authority) {
        authority == UserRoles.User ? setUserRole(UserRoles.User) : setUserRole(UserRoles.Admin); 
    }

    useEffect(() => {
        if (getToken()){
          setIsLoggedIn(true)
          setCastedRole(getDecodedToken(getToken()).authorities[0].authority)
        } else {
            setIsLoggedIn(false);
        }
      }, [userRole, isLoggedIn]);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
