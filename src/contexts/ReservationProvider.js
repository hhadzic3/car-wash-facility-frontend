import { createContext, useEffect, useState } from "react";
import { getDecodedToken, getToken } from "../services/authService";
import axiosInstance from '../config/axois';

const ReservationContext = createContext({});

export const ReservationProvider = ({ children }) => {
    const [selectedLocation, setSelectedLocation] = useState();
    const [selectedPackage, setSelectedPackage] = useState();
    const [userId, setUserId] = useState();
    const [discount, setDiscount] = useState();
    const [numberOfWashings, setNumberOfWashings] = useState();
    const [finalCost, setFinalCost] = useState();

    useEffect( () => { 

        const getCurrentUser = async () => {
            try {
                const response = await axiosInstance.get(`/user/${getDecodedToken(getToken()).sub}`);
                setNumberOfWashings(response.data.numberOdWashes);
                setUserId(response.data.id);
                if ((response.data.numberOdWashes + 1) >= 10) {
                    setDiscount(true);
                } else setDiscount(false);

            } catch (error) {
              console.log(error)
            }
          }
      
        getCurrentUser()
    }, [numberOfWashings]);

    return (
        <ReservationContext.Provider value={{ selectedLocation, setSelectedLocation, selectedPackage, setSelectedPackage, discount, setDiscount, finalCost, setFinalCost, userId, numberOfWashings }}>
            {children}
        </ReservationContext.Provider>
    )
}

export default ReservationContext;
