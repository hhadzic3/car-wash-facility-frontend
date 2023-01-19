import React, { useState, useEffect } from 'react'
import { Steps } from 'antd';

const PackageSteps = ({ packageStep }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const temp = []
    packageStep.forEach((data) => {
      temp.push({ title: data.step.name/*, subTitle: data.sequenceNumber*/ });
    })
    setItems(temp);
  }, [])

  return (
    <div>
        <Steps
          status="wait"
          size="small"
          items={items}
        />
    </div>
  )
}

export default PackageSteps
