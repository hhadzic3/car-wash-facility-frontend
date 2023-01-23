import React, { useEffect, useState } from 'react'
import axiosInstance from '../../config/axois'
import PackageSteps from '../PackageSteps/PackageSteps';
import { Divider, Radio, Table } from 'antd';
import useReservation from '../../hooks/useReservation'

const columns = [
  {
    title: 'Package',
    dataIndex: 'package',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
  },
  {
    title: 'Steps',
    dataIndex: 'steps',
  },
];

const ListOfPackages = () => {
  const [packages, setPackages] = useState();
  const [data, setData] = useState([]);
  const [selectionType, setSelectionType] = useState('radio');
  const { setSelectedPackage } = useReservation();

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      console.log(selectedRows[0])
      setSelectedPackage(selectedRows[0]);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getPackages = async () => {
      try {
        const response = await axiosInstance.get('/package', {
          signal: controller.signal
        })
        if (isMounted) {
          setPackages(response.data)
          const temp = []
          response.data.forEach((pack) => {
            temp.push({
              key: pack.id,
              package: pack.name,
              cost: pack.cost,
              steps: <PackageSteps packageStep={pack.packageStep} />,
            })
          })
          setData(temp);
        }
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
  )
}

export default ListOfPackages
