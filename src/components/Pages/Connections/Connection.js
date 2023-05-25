import React from 'react'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import RequestCard from './RequestCard'
import { useDispatch } from 'react-redux'
import { getRequests } from '../../../actions'
import { useSelector } from 'react-redux'
function Connection() {

  const requests = useSelector(state => state.userState.requests)
  const user = useSelector(state => state.userState.user)
  const dispatch = useDispatch()
  useEffect(e => {
    dispatch(getRequests(user))
  }, [])
  return (
    <Main>
      <Connections>
        <SectionHead>
          Your Connections
        </SectionHead>
        <ConnectionList>
          {
            user.connections.map(req => {
              return <RequestCard data={req} accepted={true} />
            })
          }
        </ConnectionList>
      </Connections>
      <Invitations>
        <SectionHead>
          Connection Requests
        </SectionHead>
        <RequestList>
          {
            requests.length ? requests.map(req => {
              return <RequestCard data={req} removeCard={(mail) => {
                var remainRequests = requests.filter(e => e.actor.email !== mail)
                console.log(remainRequests)
              }} />
            }) : ''
          }
        </RequestList>
      </Invitations>
    </Main>
  )
}


const Main = styled.div`
  display:flex;
  width:95vw;
  margin:50px auto;
  justify-content:space-around;
  align-items:center;
  height:90vh;
`
const Invitations = styled.div`
background-color:white;
border-radius:20px;
width:50%;
border:.5px solid lightgray;
padding:10px
`

const SectionHead = styled.p`
  padding:10px;
  margin-left:10px;
  color:gray;
  font-size:13px;
`
const RequestList = styled.div`
  height:400px;
  overflow-y:scroll;
`



const Connections = styled.div`
  background-color:white;
  border-radius:20px;
  width:35%;
  border:.5px solid lightgray;
  padding:10px;
`

const ConnectionList = styled.div`
  height:400px;
  overflow-y:scroll;
`
export default Connection