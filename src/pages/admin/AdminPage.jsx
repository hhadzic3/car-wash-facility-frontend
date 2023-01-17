import React from 'react'
import { useState, useEffect } from 'react';
import axiosInstance from '../../config/axois'
import { Table } from 'antd';
import { Collapse } from 'antd';
const { Panel } = Collapse;

const columns = [
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Package',
    dataIndex: 'package',
    key: 'package',
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
];
/*
const data = [
  {
    key: '1',
    location: 'John Brown',
    package: 'sasasa',
    cost: 300.00,
    date: 'date'
  },
];*/

const AdminPage = () => {

  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);

  
  const onChange = (key) => {
    console.log(key);
  };

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
            console.log(response.data);
            const temp = [];
            response.data.activities.forEach((activity) => {
              temp.push({
                key: activity.id,
                location: activity.location.name,
                package: activity.pack.name,
                cost: activity.pack.cost,
                date: activity.time
              });
            }) 
            setData(temp)
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
    <Collapse style={{ margin: '20px' }} defaultActiveKey={['1']} onChange={onChange}>
      
      {users.map(user => (
        <Panel header={user?.email} key={user?.id}>
          <Table columns={columns} dataSource={data} />
        </Panel>
      ))}
    </Collapse>
  )
}

export default AdminPage
