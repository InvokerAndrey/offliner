import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'


function ProfileScreen({ history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])


    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords dont match')
        } else {
            dispatch(updateUserProfile({
                'id': user.id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {loading && <Loader />}
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='name'>
                        <Form.Label>Your Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}    
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}    
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='confirm password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}    
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button className='mt-3' type='submit' variant='primary'>Update</Button>

                </Form>
            </Col>
            <Col md={9}>
                <h2>Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
