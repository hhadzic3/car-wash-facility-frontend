import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd'
import useReservation from '../../hooks/useReservation'
import axiosInstance from '../../config/axois';
import { message } from 'antd';
import { useNavigate } from 'react-router';

const Reservation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { selectedLocation, selectedPackage, discount, finalCost, setFinalCost, userId, numberOfWashings } = useReservation();
  const navigate = useNavigate();

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'Select location and package',
    });
  };

  useEffect(() => {
    if (selectedPackage){
      if (discount)
        setFinalCost(selectedPackage.cost * 0.1) // TODO
      else setFinalCost(selectedPackage.cost)
    }
  }, [finalCost]);
  
  const showModal = () => {
    if (selectedLocation && selectedPackage)
      setIsModalOpen(true);
    else warning();
  };
  const handleOk = async () => {
    setIsModalOpen(false);
    const response = await axiosInstance.post("/washing", {
      user: userId,
      location: selectedLocation.id,
      pack: selectedPackage.key
    });
    console.log(response);
    navigate('/success', {state: response.data});
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div style={{margin: '20px'}}>
      {contextHolder}
       <Button type="primary" onClick={showModal}>
          Reserve car wash
        </Button>
        <Modal title="Reserve car wash" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          { (selectedPackage && selectedLocation) ?
                        <>
                          <p>Location: {selectedLocation.name}</p>
                          <p>Package: {selectedPackage.package}</p>
                          <p>Discount: {discount ? 10 : 0} %</p>
                          <p>Note: Every 10th washing you get 10% discount. This is yours {numberOfWashings + 1}th wash! </p>
                          <p>Pay:  {finalCost} $</p>
                        </>
                        : <p> No data </p>
          }
        </Modal>
    </div>
  )
}

export default Reservation
