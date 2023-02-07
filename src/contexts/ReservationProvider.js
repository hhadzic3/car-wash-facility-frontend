import { createContext, useEffect, useState } from "react";
import { getDecodedToken, getToken } from "../services/authService";
import axiosInstance from '../config/axois';

const ReservationContext = createContext({});

export const ReservationProvider = ({ children }) => {
    const [selectedLocation, setSelectedLocation] = useState();
    const [selectedPackage, setSelectedPackage] = useState();
    const [userId, setUserId] = useState();
    const [discount, setDiscount] = useState(0);
    const [numberOfWashings, setNumberOfWashings] = useState(0);
    const [finalCost, setFinalCost] = useState(0);

    useEffect( () => { 

        const getCurrentUser = async () => {
            try {
                const response = await axiosInstance.get(`/user/${getDecodedToken(getToken()).sub}`);
                setNumberOfWashings(response.data.numberOdWashes);
                setUserId(response.data.id);
                if ((response.data.numberOdWashes + 1) >= 10) {
                    setDiscount(10);
                }

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
