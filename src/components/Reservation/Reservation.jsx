import React, { useState } from 'react'
import { Button, Modal } from 'antd'

const Reservation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const showModal = () => {
    setIsModalOpen(true);
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
          <p>Location: Vratnik</p>
          <p>Package: King wash</p>
          <p>Discount: 10%</p>
          <p>Pay:  90$</p>
        </Modal>
    </div>
  )
}

export default Reservation
