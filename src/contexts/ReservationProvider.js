import { createContext, useEffect, useState } from "react";
import { getDecodedToken, getToken } from "../services/authService";

const ReservationContext = createContext({});

export const ReservationProvider = ({ children }) => {
    const [selectedLocation, setSelectedLocation] = useState();
    const [selectedPackage, setSelectedPackage] = useState();
    const [discount, setDiscount] = useState(0);
    const [finalCost, setFinalCost] = useState(0);

    useEffect(() => {
       
    }, []);

    return (
        <ReservationContext.Provider value={{ selectedLocation, setSelectedLocation, selectedPackage, setSelectedPackage, discount, setDiscount, finalCost, setFinalCost }}>
            {children}
        </ReservationContext.Provider>
    )
}

export default ReservationContext;
