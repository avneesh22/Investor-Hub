import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getDateDifference } from '../../../utils';


const ChatCard = ({ data, onPress }) => {
  return <ReqBody onClick={onPress}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <ReqImage src={data.imageUrl || 'https://pixlok.com/wp-content/uploads/2022/02/Profile-Icon-SVG-09856789.png'} />
      <div style={{ textAlign: 'left' }}>
        <h3>{data.name}</h3>
        {/* <p style={{
                    fontSize: '12px',
                    opacity: 0.5,
                    marginTop: '2px',
                    borderRadius: '200px'
                }}>{data.messages.length?data.messages[0].text.substring(0,25):'start chatting'}...</p> */}
      </div>
    </div>
    {/* <p style={{
                fontSize: '12px',
                opacity: 0.5,
                marginTop: '2px'
            }}>{getDateDifference(data.messages.length?data.messages[0].date:'0')}d</p> */}

  </ReqBody>
}


const ReqBody = styled.button`
  display:flex;
  align-items:center;
  justify-content:space-between;
  height:50px;
  width:100%;
  border:none;
  background-color:white;
  border-radius:5px;
  cursor:pointer;
  margin:10px auto;
  padding:5px 10px;
  :hover{
    transition:0.5s;
    opacity:0.7
  }
`

const ReqImage = styled.img`
  border-radius:200px;
  width:50px;
  height:50px;
  object-fit:cover;
  margin:auto 10px;
`




export default ChatCard