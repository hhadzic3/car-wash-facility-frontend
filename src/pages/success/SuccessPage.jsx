import React from 'react'
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div>
      <Result
        status="success"
        title="Successfully reserved car washing! Good luck!"
        subTitle={"Good luck washing your car!"}
        extra={[
          <Link key="back" to='/user'><Button key="ok">OK</Button></Link>,
        ]}
      />
    </div>
  )
}

export default SuccessPage
