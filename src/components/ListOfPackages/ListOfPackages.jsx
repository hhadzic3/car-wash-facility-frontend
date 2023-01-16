import React, { useEffect, useState } from 'react'
import { List } from 'antd';
import axiosInstance from '../../config/axois'
import { Button, Modal } from 'antd';
import { Steps } from 'antd';

const ListOfPackages = () => {
  const [packages, setPackages] = useState();
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

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getPackages = async () => {
      try {
        const response = await axiosInstance.get('/package', {
          signal: controller.signal
        })
        isMounted && setPackages(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getPackages()

    return () => {
      isMounted = false;
      controller.abort();
    }
},[])


  return (
    <div>
      <List
          itemLayout="horizontal"
          dataSource={packages}
          renderItem={(item) => (
            <List.Item
              actions={[<a key="list-loadmore-edit">Packages</a>]}
            >
              <List.Item.Meta
                  title={item.name}
                />
                <>
                  <Button onClick={showModal}>
                    Steps of washing
                  </Button>
                  <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Steps
                      size="small"
                      items={[
                        {
                          title: 'Step1',
                        },
                        {
                          title: 'Step2',
                        },
                        {
                          title: 'Step3',
                        },
                      ]}
                    />
                  </Modal>
                </>
            </List.Item>
          )}
        />
    </div>
  )
}

export default ListOfPackages
