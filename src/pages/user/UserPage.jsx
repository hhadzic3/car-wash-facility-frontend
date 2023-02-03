import React from 'react'
import SelectLocation from '../../components/SelectLocation/SelectLocation'
import ListOfPackages from '../../components/ListOfPackages/ListOfPackages';
import Reservation from '../../components/Reservation/Reservation';
import './UserPage.scss'
import { ReservationProvider } from '../../contexts/ReservationProvider';

const UserPage = () => {
  return (
    <div>
      <ReservationProvider>
        <div className='center-div'>
          <SelectLocation/> 
        </div>
        <ListOfPackages/>
        <div className='center-div'>
          <Reservation/>
        </div>
      </ReservationProvider>
    </div>
  )
}

export default UserPage
