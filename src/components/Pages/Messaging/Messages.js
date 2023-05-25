import React, { useEffect } from 'react'
import styled from 'styled-components'
import ChatCard from './ChatCard'
import MessageBox from './MessageBox'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import db from '../../../firebase'
import { setChatList } from '../../../actions'
import { query, onSnapshot } from 'firebase/firestore'
function Messages() {
  const user = useSelector(state => state.userState.user)
  const [allMessages, setAllMessages] = useState([])
  const [userMessages, setUserMessages] = useState([])
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState([])
  const [isEmpty, setEmpty] = useState(false)
  useEffect(() => {
    const unsubscribe = db.collection("messages").orderBy('time').limit(50).onSnapshot((QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });

      setAllMessages(messages.filter(e => e.text !== "START"));
      var userArray = {}
      messages.map(e => {
        if (e.to.email === user.email && !userArray[e.from.email]) {
          userArray[e.from.email] = {
            name: e.from.name,
            email: e.from.email
          }
        } else if (e.from.email === user.email && !userArray[e.to.email]) {
          userArray[e.to.email] = {
            name: e.to.name,
            email: e.to.email
          }
        }
      })
      console.log(userArray)
      setUsers(Object.values(userArray))
      if (Object.values(userArray).length == 0) {
        setEmpty(true)
        return
      }

      setSelected(Object.values(userArray)[0])
    });
    return () => unsubscribe;
  }, []);

  useEffect(s => {
    console.log(allMessages.filter(e => e.to.email === selected.email || e.from.email === selected.email))
    if (Object.values(selected).length) {
      var messagesByUser = allMessages.filter(e => e.to.email === selected.email || e.from.email === selected.email)
      setUserMessages(messagesByUser)
      console.log(messagesByUser)
    }

    console.log(selected)
  }, [selected])

  return (
    (!isEmpty) ? <Main>
      <ChatList>
        <ChatListTop>
          <p>Messages</p>
        </ChatListTop>
        <div style={{ width: '100%' }}>
          {users.length ? users.map(data => {
            return <ChatCard onPress={() => {
              setSelected(data)
            }} data={data} />
          }) : 'No Chats Available'}
        </div>
      </ChatList>
      <MessageBox data={userMessages} selectedUser={selected} />
    </Main> : <p style={{
      color: 'black',
      marginTop: '100px',
      textAlign: 'center'
    }}>'No Chats Available Right Now, Start Messaging'</p>
  )
}





const Main = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  margin:auto;
  width:80%;
  margin-top:50px;
  color:black
`

const ChatList = styled.div`
  padding:10px;
  background-color:white;
  width:30%;
  border:.5px solid lightgray;
  height:70vh;
`

const ChatListTop = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between
`

export default Messages