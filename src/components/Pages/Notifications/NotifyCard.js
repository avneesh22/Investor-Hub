import { useEffect, useState } from 'react'
import { getDateDifference } from '../../../utils'
import image from '../../../images/user.svg'
import { useDispatch } from 'react-redux'
import { setNotificationRead } from '../../../actions'

const NotificationCard = ({ data }) => {
    const dispatch=useDispatch()

    return <div style={{
        background: (data.isNew) ? 'lightblue' : 'white',
        display: 'flex',
        alignItems: "center",
        justifyContent: 'space-between',
        height: '70px',
        width: '95%',
        margin: '15px auto',
        padding: '5px 10px',
        borderRadius: '5px',
        cursor:'pointer'
    }} onClick={()=>{
        dispatch(setNotificationRead(data.key))
    }}>
        <div style={{
            display: 'flex',
            alignItems: 'center'
        }}>
            <img style={{
                borderRadius: "200px",
                width: "50px",
                height: "50px",
                objectFit: 'cover',
                margin: 'auto 10px'
            }} src={data.actor.photoURL || image} />
            <p style={{
                fontSize: '12px',
                opacity: 0.5,
                marginTop: '2px'
            }}>{data.text}</p>
        </div>
        <p style={{
            fontSize: '12px',
            opacity: 0.5,
            marginTop: '2px'
        }}>{getDateDifference(data.date) == 0 ? 'Today' : `${getDateDifference(data.date)}d`}</p>

    </div >
}


export default NotificationCard