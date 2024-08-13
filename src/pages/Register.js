import React from 'react'
import {Checkbox,Form,Input,Radio,message,Cascader,DatePicker} from 'antd'
import "../styles/RegisterStyles.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const onChange = (date, dateString) => {
  console.log(date, dateString, typeof date, typeof dateString);
};

/*const options = [
  {
    value: 'Tamil Nadu',
    label: 'Tamil Nadu'
  },
  {
    value: 'Kerala',
    label: 'Kerala'
  },
  {
    value: 'Andhra Pradesh',
    label: 'Andhra Pradesh'
  },
  {
    value: 'Karnataka',
    label: 'Karnataka'
  },
  {
    value: 'Pondicherry',
    label: 'Pondicherry'
  },
  {
    value: 'Other',
    label: 'Other'
  }
]*/

const details = [
  {
    value: 'Deluxe',
    label: 'Deluxe'
  },
  {
    value: 'Semi Deluxe',
    label: 'Semi Deluxe'
  },
  {
    value: 'Super Deluxe',
    label: 'Super Deluxe'
  }
]

const Register = () => {
  const navigate = useNavigate();

  
  const onfinishHandler = async(values) => {
    try{
      const res = await axios.post('/api/v1/users/register', values);
      if(res.data.success){
        message.success('Registered Successfully!')
        navigate('/')
      }
      else{
        message.error(res.data.message)
      }

    } catch(error){
      console.log(error)
    }
  };
  return (
    <>
      <div className='register-form-container'>
        <Form layout='vertical' onFinish={onfinishHandler} className='Register-form'>
          <h1 className='text-center'>Customer Details </h1>
          <Form.Item label = 'Name' name = 'name'>
            <Input type = 'text' required/>
          </Form.Item>          
          <Form.Item label = 'age' name = 'age'>
            <Input type = 'text' required/>
          </Form.Item>
          
          <Form.Item label = 'Gender' name='gender'>
          <Radio.Group>
          <Radio value='Male'>Male</Radio>
          <Radio value='Female'>Female</Radio>
          </Radio.Group>
          </Form.Item>

          <Form.Item label = 'Email' name = 'email'>
            <Input type = 'email' required/>
          </Form.Item>
          <Form.Item label='Branch' name='branch'>
             <Input type = 'branch' required/>
          </Form.Item>
          <Form.Item label='checkin' name='checkin'>
         
            <DatePicker onChange={onChange} />
         
          </Form.Item>
          <Form.Item label='checkout' name='checkout'>
         <DatePicker onChange={onChange} />
       </Form.Item>

          <Form.Item label = 'Foodexpense' name = 'Foodexpense'>
            <Input type = 'text' required/>
          </Form.Item>

          <Form.Item label = 'Roomexpense' name = 'Roomexpense'>
            <Input type = 'text' required/>
          </Form.Item>

          <Form.Item label = 'Room no' name = 'room'>
            <Input type = 'text' required/>
          </Form.Item>
          <Form.Item label='Room type' name='roomtype'>
          <Cascader  options={details}  placeholder="Please select" />
          </Form.Item>

          <Form.Item>
            <Checkbox>
              I agree to all the terms and Conditions
            </Checkbox>
          </Form.Item>
          <button  className='btn btn-primary'>Submit</button>
          <br></br>
          
        </Form>
      </div>
    </>
  )
}

export default Register