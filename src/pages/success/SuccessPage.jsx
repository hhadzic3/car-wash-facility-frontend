import React from 'react'
import { Button, Result } from 'antd';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  let { state } = useLocation();
  console.log(state); // TODO
  return (
    <div>
      <Result
        status="success"
        title="Successfully reserved car washing! Good luck!"
        subTitle={"Washing number: " + "Good luck washing your car!"}
        extra={[
          <Link to='/user'><Button key="buy">OK</Button></Link>,
        ]}
      />
    </div>
  )
}

export default SuccessPage
