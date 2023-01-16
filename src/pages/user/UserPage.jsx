import React, { useEffect, useState } from 'react'
import SelectLocation from '../../components/SelectLocation/SelectLocation'
import axiosInstance from '../../config/axois'
import { Button, Modal } from 'antd';
import ListOfPackages from '../../components/ListOfPackages/ListOfPackages';

const UserPage = () => {
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
    <div>
      <SelectLocation/>
      <ListOfPackages/>
      <Button style={{ margin: 50 }} type="primary" onClick={showModal}>
        Reserve car wash
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Location: Vratnik</p>
        <p>Package: King wash</p>
        <p>Discount: 10%</p>
        <p>Pay:  90$</p>
      </Modal>

    </div>
  )
}

export default UserPage
