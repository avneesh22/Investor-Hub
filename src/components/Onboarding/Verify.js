import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { storeAadhar } from '../../actions'
import { Redirect } from 'react-router-dom'
import Loader from '../atoms/Loader'
function Verify(props) {
    const [aadhar, setAadhar] = useState('')
    const dispatch=useDispatch()
    if (!props.user) return <>Not Authorized</>
    if(props.loading) return <Loader />
    return (
        <Main>
            {props.isVerified && <Redirect to="/trifurcate" />}
            <div style={{ textAlign: 'center' }}>
                <img src='https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png' width={150} />
                <Head>
                    Verify Your Aadhaar
                </Head>
                <p style={{ opacity: 0.6 }}>We need these details to keep trusted users on this platform.</p>
                <Input placeholder='Aadhar Number' maxLength="12" type='number' value={aadhar} onChange={(e) => (e.target.value.length <= 12) ? setAadhar(e.target.value) : null} />
                <Button onClick={() => {
                    if (aadhar.length == 12) {
                        dispatch(storeAadhar({ ...props.user, aadhar }))
                    }else{
                        alert("12 digit aadhar number required")
                    }
                }}>
                    Continue
                </Button>
            </div>
        </Main>
    )
}


const Head = styled.h1`
    font-size:50px;
    margin:5px 0px;
`

const Main = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh;
`


const Input = styled.input`
    padding:15px;
    border:none;
    border-radius:10px;
    width:60%;
    margin:10px auto;
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


const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
        loading: state.userState.loading,
        isVerified:state.userState.isAadharVerified
    };
};


export default connect(mapStateToProps)(Verify);


