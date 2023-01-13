import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import { List } from 'antd';
import axiosInstance from '../../config/axois'
import { Button, Modal } from 'antd';
import { Steps } from 'antd';

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};

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
  const [users, setUsers] = useState();

  useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const getUsers = async () => {
        try {
          const response = await axiosInstance.get('/user', {
            signal: controller.signal
          })
          isMounted && setUsers(response.data)
        } catch (error) {
          console.log(error)
        }
      }

      getUsers()

      return () => {
        isMounted = false;
        controller.abort();
      }
  },[])

  return (
    <div>
      <Select
        showSearch
        placeholder="Select a location"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
       <List
          itemLayout="horizontal"
          dataSource={users}
          renderItem={(item) => (
            <List.Item
              actions={[<a key="list-loadmore-edit">Packages</a>]}
            >
              <List.Item.Meta
                  title={item.email}
                />
                <>
                  <Button type="primary" onClick={showModal}>
                    Open Modal
                  </Button>
                  <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Steps
                      size="small"
                      //current={1}
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

    <>
      <Button type="primary" onClick={showModal}>
        Reserve car wash
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Location: Vratnik</p>
        <p>Package: King wash</p>
        <p>Discount: 10%</p>
        <p>Pay:  90$</p>
      </Modal>
    </>

    </div>
  )
}

export default UserPage
