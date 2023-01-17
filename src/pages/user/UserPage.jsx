import React from 'react'
import SelectLocation from '../../components/SelectLocation/SelectLocation'
import ListOfPackages from '../../components/ListOfPackages/ListOfPackages';
import Reservation from '../../components/Reservation/Reservation';
import './UserPage.scss'

const UserPage = () => {
  return (
    <div>
      <div className='center-div'>
        <SelectLocation/>
      </div>
      <h3 className='margin'> Select package </h3>
      <ListOfPackages/>
      <div className='center-div'>
        <Reservation/>
      </div>
    </div>
  )
}

export default UserPage
