import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import NotificationCard from './NotifyCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNotifications } from '../../../actions'


function Notifications() {
  const notifications = useSelector(state => state.userState.notifications)
  const user = useSelector(state => state.userState.user)
  const dispatch = useDispatch()
  useEffect(e => {
    dispatch(getAllNotifications(user))
  }, [])
  return (
    <Main>
      <Connections>
        <SectionHead>

          Notifications
        </SectionHead>
        <ConnectionList>
          {
            notifications.map(req => {
              return <NotificationCard data={req} />
            })
          }
        </ConnectionList>
      </Connections>
    </Main>
  )
}


const Main = styled.div`
  display:flex;
  margin:auto;
  margin-top:50px;
  justify-content:flex-start;
  align-items:center;
  height:90vh;
  background-color:white
`

const SectionHead = styled.p`
  padding:10px;
  margin-left:10px;
  color:gray;
  font-size:13px;
`


const Connections = styled.div`
  background-color:white;
  width:45%;
  margin:auto;
  padding:10px;
  height:500px;
  border:.5px solid lightgray
`

const ConnectionList = styled.div`
  height:450px;
  overflow-y:scroll;
`


export default Notifications