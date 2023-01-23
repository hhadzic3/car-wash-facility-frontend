import React, { useState } from 'react'
import { Button, Modal } from 'antd'
import useReservation from '../../hooks/useReservation'

const Reservation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedLocation, selectedPackage, discount, setDiscount, finalCost, setFinalCost } = useReservation();
  
  const showModal = () => {
    if (selectedLocation && selectedPackage)
      setIsModalOpen(true);
    else alert("Select location and package");
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div style={{margin: '20px'}}>
       <Button type="primary" onClick={showModal}>
          Reserve car wash
        </Button>
        <Modal title="Reserve car wash" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Location: {selectedLocation}</p>
          <p>Package: {selectedPackage.package}</p>
          <p>Discount: {discount} %</p>
          <p>Pay:  {finalCost} $</p>
        </Modal>
    </div>
  )
}

export default Reservation
