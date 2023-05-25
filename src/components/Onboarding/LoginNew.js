import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { loginUserAPI } from '../../actions'
import { useDispatch } from 'react-redux'
import { connect } from "react-redux";

import { Redirect } from 'react-router-dom'
import Loader from '../atoms/Loader'
function LoginNew(props) {

    console.log(props)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    var loginUser = () => {
        if (!password || !email) {
            alert("All Details are Compulsory")
            return -1;
        }

        setLoading(true)
        dispatch(loginUserAPI({ email, password }))
        setLoading(false)
    }

    if (props.loading) {
        return <Loader />
    }

    return (
        <Body>
            {props.user && <Redirect to={'/trifurcate'} />}
            <Container>
                <Form>
                    <div style={{ width: '50%', textAlign: 'center' }}>
                        <img alt="" src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000" width="70%" />
                    </div>
                    <form style={{ width: '50%', textAlign: 'center' }} onSubmit={(e) => {
                        e.preventDefault()
                        loginUser()
                    }}>

                        <h1 style={{ fontFamily: 'sans-serif', fontSize: '30px' }}>Welcome to Investors Hub</h1>

                        <Input required={true} type="email" value={email} onChange={e => {
                            setEmail(e.target.value)
                        }} placeholder=' Email' />
                        <Input required={true} type='password' value={password} onChange={e => {
                            setPassword(e.target.value)
                        }} placeholder=' Password' />

                        <Button type='submit'>
                            {isLoading ? 'Loading...' : 'Submit'}
                        </Button>
                        <p style={{
                            fontSize: '13px',
                            display: 'block'
                        }} >Don't have an account? <Link to="/signup">Create One</Link></p>
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


export default connect(mapStateToProps)(LoginNew);