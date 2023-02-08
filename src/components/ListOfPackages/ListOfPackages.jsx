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
  const [data, setData] = useState([]);
  const [selectionType, setSelectionType] = useState('radio');
  const { setSelectedPackage, setFinalCost } = useReservation();

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedPackage(selectedRows[0]);
      setFinalCost(selectedRows[0].cost)
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
      <Divider />
        <h3 style={{textAlign: 'center'}}> Select package (program) </h3>
        <Radio.Group
          onChange={({ target: { value } }) => {
            setSelectionType(value);
          }}
          value={selectionType}
        >
        </Radio.Group>
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      <Divider />
    </div>
  )
}

export default ListOfPackages
