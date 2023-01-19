import React, {useState, useEffect} from 'react'
import { Table } from 'antd';

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

const TableOfActivities = ({user}) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const temp = [];
    user.activities.forEach((activity) => {
      temp.push({
        key: activity.id,
        location: activity.location.name,
        package: activity.pack.name,
        cost: activity.pack.cost,
        date: activity.time
      });
    }) 
    setData(temp)
  }, []);


  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default TableOfActivities
