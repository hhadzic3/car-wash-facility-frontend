import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import axiosInstance from '../../config/axois'

const onChange = (value) => {
};
const onSearch = (value) => {
};

const SelectLocation = () => {

  const [locations, setLocations] = useState();
  const [selectOptions, setSelectOptions] = useState([])

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getLocations = async () => {
      try {
        const response = await axiosInstance.get('/location', {
          signal: controller.signal
        })
        const options = [];
        response.data.forEach((location) => {
          options.push({ value: location.id, label: location.name })
        })
        if (isMounted){ 
          setLocations(response.data) 
          setSelectOptions(options)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getLocations()
    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])


  return (
    <div>
        <Select
        size='large'
        showSearch
        style={{
          width: 300,
          margin: 50
        }}
        placeholder="Select a location"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={selectOptions}
      />
    </div>
  )
}

export default SelectLocation
