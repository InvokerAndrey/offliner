import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'


function UserEditScreen({ match, history }) {

    const userId = match.params.id
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const {loading, error, user} = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = userUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET,
            })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user.id !== Number(userId)) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, userId, user, successUpdate, history])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({
            id: user.id,
            name,
            email,
            password,
            confirmPassword,
            isAdmin,
        }))
    }

    return (
        <div>
            <Button className="btn btn-dark my-3" onClick={() => history.goBack()}>
                <i className="fas fa-angle-double-left"></i>
                Back
            </Button>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
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
                                type='email'
                                placeholder='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Change Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='passwordConfirm'>
                            <Form.Label>Confirm Change Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}    
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isAdmin'>
                            <Form.Check
                                type='checkbox'
                                label='Is Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}    
                            >
                            </Form.Check>
                        </Form.Group>

                        <Button className='mt-3' type='submit' variant='primary'>Update</Button>
                    </Form>
                )}
            </FormContainer>
        </div>
    )
}

export default UserEditScreen
