import React from 'react'

function Loader() {
  return (
    <div style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:'100vh',
        background:'white'
    }}>
        <img 
        src="https://miro.medium.com/v2/resize:fit:1400/1*CsJ05WEGfunYMLGfsT2sXA.gif"
        width={200}
        />
    </div>
  )
}

export default Loader