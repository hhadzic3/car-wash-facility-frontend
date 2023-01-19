import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axois'
import PackageSteps from '../PackageSteps/PackageSteps';
import { Divider, Radio, Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const ListOfPackages = () => {
  const [packages, setPackages] = useState();
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [selectionType, setSelectionType] = useState('radio');

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
      {/*<List
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
          />*/}
        <div>
          <Radio.Group
            onChange={({ target: { value } }) => {
              setSelectionType(value);
            }}
            value={selectionType}
          >
          </Radio.Group>

          <Divider />

          <Table
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
          />
        </div>
    </div>
  )
}

export default ListOfPackages
