import React, { useState } from 'react'
import { Form, Button, ProgressBar, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartActions'


function PaymentScreen({ history }) {

    const shippingAddress = useSelector(state => state.cart.shippingAddress)

    if (!shippingAddress.address) {
        history.push('/shipping')
    }

    const dispatch = useDispatch()

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <ProgressBar now={65} />
            <CheckoutSteps stepLogin stepShipping stepPayment />

            <Form onSubmit={submitHandler}>

                <Form.Group>
                    <Form.Label>Payment Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='paypal'
                            name='paymentMethod'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >

                        </Form.Check>
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary' className='my-2'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
