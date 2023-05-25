import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { signUpAPI } from '../../actions'
import { useDispatch } from 'react-redux'
import { connect } from "react-redux";

import { Redirect } from 'react-router-dom'
import Loader from '../atoms/Loader'
function Signup(props) {

    console.log(props)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPwd, setConfirmPwd] = useState('')
    const [isLoading, setLoading] = useState(false)
    var createUser = () => {
        if (!name || !password || !email || !confirmPwd) {
            alert("All Details are Compulsory")
            return -1;
        }

        if (password !== confirmPwd) {
            alert("Both Passwords don't match, Check Again")
            return;
        }

        setLoading(true)
        dispatch(signUpAPI({ email, password, name }))
        setLoading(false)
    }

    if (props.loading) {
        return <Loader />
    }

    return (
        <Body>
            {props.user && <Redirect to={'/verify'} />}
            <Container>
                <Form>
                    <div style={{ width: '50%', textAlign: 'center' }}>
                        <img alt="" src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000" width="70%" />
                    </div>
                    <form style={{ width: '50%', textAlign: 'center' }} onSubmit={(e) => {
                        e.preventDefault()
                        createUser()
                    }}>

                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '30px' }}>Welcome to Investors Hub</h1>
                        <Input required={true} value={name} onChange={e => {
                            setName(e.target.value)
                        }} placeholder=' Name' />
                        <Input required={true} type="email" value={email} onChange={e => {
                            setEmail(e.target.value)
                        }} placeholder=' Email' />
                        <Input required={true} type='password' value={password} onChange={e => {
                            setPassword(e.target.value)
                        }} placeholder=' Password' />
                        <Input required={true} type='password' value={confirmPwd} onChange={e => {
                            setConfirmPwd(e.target.value)
                        }} placeholder=' Confirm Password' />
                        <Button type='submit'>
                            {isLoading ? 'Loading...' : 'Submit'}
                        </Button>
                        <p style={{
                            fontSize: '13px',
                            display: 'block'
                        }} >Already have an Account? <Link to="/login">Login Now</Link></p>
                    </form>
                </Form>
            </Container>
        </Body>

    )
}


const Body = styled.div`
    background-color:white;
    height:100vh
`

const Input = styled.input`
    padding:15px;
    border:none;
    border-radius:10px;
    width:60%;
    margin:5px auto;
    border:0.5px solid #d3d3d3

`


const Button = styled.button`
    background-color:blue;
    padding:15px;
    width:67%;
    border:none;
    border-radius:200px;
    color:white;
    margin:10px;

`

const Container = styled.div`
display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:row;
`

const Form = styled.div`
    color:black;
    height:500px;
    border-radius:20px;
    display:flex;
    align-items:center;
    justify-content:center
    
`


const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        loading: state.userState.loading
    };
};


export default connect(mapStateToProps)(Signup);