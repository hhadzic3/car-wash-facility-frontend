import React, { useEffect, useState } from 'react'
import { List } from 'antd';
import axiosInstance from '../../config/axois'
import PackageSteps from '../PackageSteps/PackageSteps';
import { Checkbox } from 'antd';

const ListOfPackages = () => {
  const [packages, setPackages] = useState();
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (e) => {
    setSelectedCheckbox(e.target.value);
    console.log('checked = ', e.target.value);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getPackages = async () => {
      try {
        const response = await axiosInstance.get('/package', {
          signal: controller.signal
        })
        if (isMounted) 
          setPackages(response.data)
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
          renderItem={(item, index) => (
            <List.Item>
             <Checkbox
                style={{ marginRight: '15px' }}
                value={item.id}
                checked={selectedCheckbox === item.id}
                onChange={handleCheckboxChange}
              >
              </Checkbox>
              <List.Item.Meta
                  title={item.name}
                />
              <List.Item.Meta
                  title={item.cost + ' EUR'}
                />
                <PackageSteps packageStep={item.packageStep} /> 
            </List.Item>
          )}
        />
    </div>
  )
}

export default ListOfPackages
