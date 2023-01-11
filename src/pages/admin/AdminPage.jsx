import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../../api/axois'
import { List } from 'antd';

const AdminPage = () => {

  const [users, setUsers] = useState();

  useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const getUsers = async () => {
        try {
          const response = await axios.get('/user', {
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
    <List
    itemLayout="horizontal"
    dataSource={users}
    renderItem={(item) => (
      <List.Item
        actions={[<a key="list-loadmore-edit">Activities</a>]}
      >
          <List.Item.Meta
            title={item.email}
          />
      </List.Item>
    )}
  />
  )
}

export default AdminPage
