import { message } from 'antd';
import React from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'

const PayPal = ({total, cart, userProfile, onMakeOrder}) => {
  
  const onSuccess = (payment) => {
    console.log("The payment was succeeded!", payment);
    onMakeOrder()
  }

  const onCancel = (data) => {
    console.log('The payment was cancelled!', data);
    message.error('The payment was cancelled!')
  }

  const onError = (err) => console.log("Error!", err)


  const items = cart.map(item => ({
    name: item.product.name,
    price: item.product.price,
    currency: "USD",
    quantity: item.count
  }))

  const paymentOptions = {
    // state: "approved",
    // intent: "order",
    payer: {
      payment_method: "paypal",
      payer_info: {
        email: "sb-yrj2v3387087@personal.example.com",  
        first_name: userProfile.name.split(" ")[0],
        last_name: userProfile.name.split(" ")[1],
        payer_id: "PUP87RBJV8HPU",
        shipping_address: {
          line1: "4th Floor, One Lagoon Drive",
          line2: "Unit #34",
          city: userProfile.city,
          state: "CA",
          postal_code: userProfile.postal,
          country_code: "US",
          recipient_name: userProfile.name
        }
      }
    },
    transactions: [
      {
        amount:
        {
          total,
          currency: "USD",
        },
        description: "This is the payment transaction description.",
        item_list:
        {
          items: items,
          shipping_address:
          {
            recipient_name: userProfile.name,
            line1: "4thFloor",
            line2: "unit#34",
            city: userProfile.city,
            state: "US",
            country_code: "US",
            postal_code: userProfile.postal,
          }
        },
      }],
  }

  const client = {
    sandbox: 'AQPcnia-JOn1PPsn5J3hACn3Y0wwq1m_Nxj9Ixs8WJIKpPRuqLqAzoCH7I5d4KBfRzFQ02XalxSTOxFR',
    production: 'YOUR-PRODUCTION-APP-ID',
  }

  return (
    <PaypalExpressBtn
      paymentOptions={paymentOptions}
      env={'sandbox'} 
      client={client} 
      currency={'USD'} 
      total={total} 
      onError={onError} 
      onSuccess={onSuccess} 
      onCancel={onCancel} 
      style={{size: 'large', color: 'blue', shape: 'rect', label: 'checkout'}}
    />
  );
}

export default PayPal
