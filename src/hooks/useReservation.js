import { useContext } from "react";
import ReservationContext from "../contexts/ReservationProvider";

const useReservation = () => {
    return useContext(ReservationContext);
}

export default useReservation;
