import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axois'
import { Collapse } from 'antd';
import TableOfActivities from '../../components/TableOfActivities/TableOfActivities';
const { Panel } = Collapse;

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const getUsers = async () => {
        try {
          const response = await axiosInstance.get('/user', {
            signal: controller.signal
          })
          if (isMounted){ 
            setUsers(response.data)
          }
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
    <Collapse style={{ margin: '20px' }} defaultActiveKey={['1']}>
      
      {users.map(user => (
        <Panel header={user?.email} key={user?.id}>
          <TableOfActivities user={user} />
        </Panel>
      ))} 

    </Collapse>
  )
}

export default AdminPage
