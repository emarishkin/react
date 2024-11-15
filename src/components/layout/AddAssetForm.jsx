import { useState } from "react"
import {Select,Space,Typography,Flex,Divider,Form, InputNumber,Button,DatePicker,Result} from 'antd'
import { useCrypto } from "../../context/crypto-context"
import { CoinInfo } from "./CoinInfo";


const validateMessages = {
    required: "${ladel}' is required!",
    types:{
        number: "${ladel}' is not valid number!",
    },
    number: {
        range: "${ladel}' must be between ${min} and ${max}"
    }
  };



export function AddAssetForm(){
    const [form] = Form.useForm()
    const {crypto} = useCrypto()
    const [coin,setCoin] = useState(null)
    const [submitted,setSubmitted] = useState(false)


 if(submitted){
 return (
   <Result
    status="success"
    title="New Assed Added"
    subTitle={`Added ${42} of ${coin.name} by price ${24}`}
    extra={[
      <Button type="primary" key="console" onClick={onClose}>
        close
      </Button>  
    ]}
  />
 )
}

   if(!coin){
    return <Select style={{width: '100%'}}
    onSelect={(v)=> setCoin(crypto.find((c) => c.id === v))}
    placeholder= 'Select coin'
    options={crypto.map((coin) => ({
      label: coin.name,
      value: coin.id,
      icon: coin.icon,
    }))}
    optionRender={(option) => (
      <Space>
        <img style={{width: 20}} src={option.data.icon} alt={option.data.label} />
        {option.data.label}
      </Space>
    )}
  />
   }

    function onFinish(values){
     console.log('finish', values)
     setSubmitted(true)
    }


    function handleAmountChange(value){
        const price = form.getFieldValue('price')
        form.setFieldsValue({
            total: +(value * price).toFixed(2)
        })
    }


    function handlePriceChange(value){
        const amount = form.getFieldValue('amount')
        form.setFieldsValue({
            total: +(amount * value).toFixed(2)
        })
    }

    return  (
    <Form
    form={form}
    name="basic"
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 10,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
        price: coin.price.toFixed(2)
    }}
    onFinish={onFinish}
    validateMessages = {validateMessages}
  >
       <CoinInfo coin={coin} />
        <Divider />
       
    <Form.Item
      label="Amount"
      name="amount"
      rules={[
        {
          required: true,
          type: 'number',
          min: 0,
        },
      ]}
    >
      <InputNumber placeholder="Enter coin amound" onChange={handleAmountChange} style={{width: '100%'}}/>
    </Form.Item>

    <Form.Item label="Price" name="price">
      <InputNumber onChange={handlePriceChange} style={{width: '100%'}}/>
    </Form.Item>

    <Form.Item label="Date & Time" name="date">
    <DatePicker showTime/>
    </Form.Item>

    <Form.Item label="Total" name="total">
      <InputNumber disabled style={{width: '100%'}}/>
    </Form.Item>
    

    <Form.Item >  
      <Button type="primary" htmlType="submit">
          Add asset
      </Button>
    </Form.Item>
  </Form>
    )  
}