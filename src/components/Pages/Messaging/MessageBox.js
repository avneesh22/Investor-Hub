import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { connect, useDispatch } from 'react-redux'
import { storeMessage } from '../../../actions'
function MessageBox({ data, user, selectedUser }) {
    console.log(data)
    const [message, setMsg] = useState('')
    const [messages, setMessages] = useState([])
    const dispatch = useDispatch()
    useEffect(e => {
        setMessages(data)
    }, [data])
    function prepareMessage() {
        if (message == '') {
            alert("Enter a Message")
            return;
        }
        if(!selectedUser.name){
            alert("Choose a Chat First")
            setMsg('')
            return;
        }
        var dt = new Date()
        var newMessage = {
            text: message,
            from: {
                name: user.name,
                email: user.email,
            },
            to: selectedUser,
            date: `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`,
            time: `${dt.getHours()}:${dt.getMinutes()}`
        }

        console.log(newMessage)
        dispatch(storeMessage(newMessage, (e) => {
            console.log('success')
        }, (err) => {
            console.log(err.message)
        }))
        setMsg('')
    }
    return (
        <Box>
            <BoxHeader>
                <h3>{selectedUser.name}</h3>
                <p style={{
                    fontSize: '12px'
                }}>{selectedUser.email}</p>
            </BoxHeader>
            <Chats>
                {
                    messages.length ? messages.map(msg => {
                        return <MessageContainer>
                            <Message style={{
                                marginLeft: (msg.from.email === user.email) ? 'auto' : '',
                                backgroundColor: (msg.from.email === user.email) ? 'purple' : 'grey'
                            }}>
                                {msg.text}
                            </Message>
                        </MessageContainer>
                    }) : 'No messages'
                }
            </Chats>
            <Form>
                <MessageInput placeholder='Type a Message' value={message} onChange={(e) => setMsg(e.target.value)}></MessageInput>
                <MessageButton onClick={() => prepareMessage()}>
                    Send
                </MessageButton>
            </Form>
        </Box>
    )
}

const Box = styled.div`
  width:50%;
  background-color:white;
  border:.5px solid lightgray;
  padding:10px;
  height:70vh;
`

const BoxHeader = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:10px;
`

const MessageContainer = styled.div`
    margin:10px 0px;

`
const Chats = styled.div`
    border-top:.5px solid lightgray;
    height:80%;
    overflow-y:scroll;
`

const Message = styled.p`
    border-radius:200px;
    color:white;
    padding:5px 20px;
    font-size:12px;
    width:fit-content;
`

const Form = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    border:.5px solid lightgray;
    padding:5px 0px;
    border-radius:200px
`

const MessageInput = styled.input`
    padding:10px 0px;
    width:75%;
    border:none
`

const MessageButton = styled.button`
    width:15%;
    background-color:white;
    border:none;
    color:gray;
    padding:5px 0px;
`

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};


export default connect(mapStateToProps)(MessageBox);
