import { createContext, useEffect, useState } from "react";
import { getDecodedToken, getToken } from "../services/authService";
import axiosInstance from '../../config/axois';

const ReservationContext = createContext({});

export const ReservationProvider = ({ children }) => {
    const [selectedLocation, setSelectedLocation] = useState();
    const [selectedPackage, setSelectedPackage] = useState();
    const [discount, setDiscount] = useState(0);
    const [numberOfWashings, setNumberOfWashings] = useState(0);
    const [finalCost, setFinalCost] = useState(0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => { 
        try {
            const response = await axiosInstance.get(`/user/${getDecodedToken(getToken()).sub}`);
            setNumberOfWashings(response.numberOdWashes);
        } catch (error) {
            console.log(error);
        }  
        setNumberOfWashings();
    }, [numberOfWashings]);

    return (
        <ReservationContext.Provider value={{ selectedLocation, setSelectedLocation, selectedPackage, setSelectedPackage, discount, setDiscount, finalCost, setFinalCost }}>
            {children}
        </ReservationContext.Provider>
    )
}

export default ReservationContext;
