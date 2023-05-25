import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import image from '../../../images/user.svg'
import { sendConnection, storeMessage } from '../../../actions'
import { Redirect } from 'react-router-dom'
function Profile() {
    const selectedUser = useSelector(state => state.userState.selectedUser)
    const user = useSelector(state => state.userState.user)
    const allMessages = useSelector(state => state.userState.chats)
    const dispatch = useDispatch()
    const [buttonMsg, setMsg] = useState('Connect')
    const [isRedirect, setRedirect] = useState(false)
    const [isConnected, setConnected] = useState(false)
    console.log(selectedUser)
    useEffect(e => {
        var record = user.connections.filter(e => e.actor.uid === selectedUser.uid)
        console.log(record)
        if (record.length !== 0) {
            setConnected(true)
        }
        //eslint-disable-next-line
    }, [])

    var messageUser = () => {
        var isMessaged = allMessages.filter(e => e.to.email === selectedUser.email)

        if (isMessaged.length != 0) {
            setRedirect(true)
        } else {
            var dt = new Date()
            var newMessage = {
                text: "START",
                from: {
                    name:user.name,
                    email:user.email
                },
                to: {
                    email: selectedUser.email,
                    name: selectedUser.name,
                    imageUrl: selectedUser.imageUrl || ''
                },
                date: `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`,
                time: `${dt.getHours()}:${dt.getMinutes()}`
            }
            dispatch(storeMessage(newMessage, (e) => {
                setRedirect(true)
            }, err => {
                alert(err.message)
            }))
            setRedirect(true)
        }
    }



    return (
        <div style={{
            marginTop: '50px',
            display: 'flex',
            alignItems: 'center',
            height: '60vh',
            width: '90vw',
            margin: 'auto'
        }}>

            {isRedirect && <Redirect to='/messaging' />}
            <div>
                <img alt='kmdfkm' style={{
                    borderRadius: '200px',
                    border: '1px solid black'
                }} src={selectedUser.imageUrl || image} width={100} height={100} />
                <ul style={{
                    listStyleType: 'none'
                }}>
                    <li style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}><h2>{selectedUser.name} </h2><img title='Aadhar Verified' alt='mdkmkd' src='https://cdn-icons-png.flaticon.com/512/7595/7595571.png' width={20} height={20} /></li>
                    <li>{selectedUser.uid} - {selectedUser.email}</li>
                    {
                        (selectedUser.uid === user.uid) ? 'Your Profile' : isConnected ? <button onClick={() => {
                            messageUser()
                        }}>Message</button> : <button onClick={() => {
                            dispatch(sendConnection(user, selectedUser))
                            setMsg('Sent Request')
                        }}>{buttonMsg}</button>
                    }
                </ul>
            </div>
        </div>
    )
}


export default Profile