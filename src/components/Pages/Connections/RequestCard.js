import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getDateDifference } from '../../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser,rejectConnection, setConnection } from '../../../actions';

const RequestCard = ({ data, accepted, removeCard }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.userState.user)
  function acceptRequest(email) {
    dispatch(setConnection(user, data))
  }

  function rejectRequest(email) {
    dispatch(rejectConnection(data))
  }
  return <ReqBody>
    <div style={{
      display: 'flex'
    }}>
      <ReqImage src={data.actor.photoURL} />
      <div>
        <h3>{data.actor.name}</h3>
        <p style={{
          fontSize: '12px',
          opacity: 0.5,
          marginTop: '2px'
        }}>{data.actor.email} • {accepted ? 'connected' : 'requested'} {(accepted) ? getDateDifference(data.date) : getDateDifference(data.date)}d ago</p>
        {(accepted) ? <Link style={{fontSize:10, textDecoration:'none'}} to="/profile" onClick={() => dispatch(setSelectedUser(data.actor))}>View Profile</Link> : <p style={{
          fontSize: '12px',
          opacity: 0.5,
          marginTop: '2px',
          background: 'lightgray',
          padding: '3px 10px',
          borderRadius: '200px'
        }}>{data.message}</p>}
      </div>
    </div>
    {(accepted) ? '' :
      <ReqButtons>
        <ReqButton onClick={() => acceptRequest(data.actor.email)}>Accept</ReqButton>
        <ReqButton style={{
          background: 'white',
          border: '1px solid #e6a106',
          color: '#e6a106'
        }} onClick={() => rejectRequest(data.actor.email)}>Reject</ReqButton>
      </ReqButtons>
    }
  </ReqBody>
}


const ReqBody = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  height:70px;
  width:100%;
  margin:15px 0px;
`

const ReqImage = styled.img`
  border-radius:200px;
  width:60px;
  height:60px;
  object-fit:cover;
  margin:auto 10px;
`


const ReqButtons = styled.div`
  display:flex;
  align-items:center;
  justify-content:center
`

const ReqButton = styled.button`
  background-color:#e6a106;
  border-radius:200px;
  color:white;
  width:100px;
  border:none;
  padding:5px 0px;
  margin:0px 5px;

  :hover{
    opacity:0.7
  }
`


export default RequestCard