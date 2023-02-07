import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import useReservation from '../../hooks/useReservation'
import axiosInstance from '../../config/axois';

const Reservation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedLocation, selectedPackage, discount, setDiscount, finalCost, setFinalCost, userId, numberOfWashings } = useReservation();

  useEffect(() => {
    if (selectedPackage)
       setFinalCost(selectedPackage.cost)
  }, [finalCost]);
  
  const showModal = () => {
    if (selectedLocation && selectedPackage)
      setIsModalOpen(true);
    else alert("Select location and package");
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    const response = await axiosInstance.post("/washing", {
      user: userId,
      location: selectedLocation.id,
      pack: selectedPackage.key
    });
    console.log(response);
  };
  const handleCancel = () => {
    console.log(userId);
    console.log(selectedLocation.id);
    console.log(selectedPackage.key);
    setIsModalOpen(false);
  };
  
  return (
    <div style={{margin: '20px'}}>
       <Button type="primary" onClick={showModal}>
          Reserve car wash
        </Button>
        <Modal title="Reserve car wash" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          { (selectedPackage && selectedLocation) ?
                        <>
                          <p>Location: {selectedLocation.name}</p>
                          <p>Package: {selectedPackage.package}</p>
                          <p>Discount: {discount} %</p>
                          <p>Note: Every 10th washing you get 10% discount. This is your  </p>
                          <p>Pay:  {finalCost} $</p>
                        </>
                        : <p> No data </p>
          }
        </Modal>
    </div>
  )
}

export default Reservation
