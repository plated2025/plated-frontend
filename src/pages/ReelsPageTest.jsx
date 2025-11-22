import { useNavigate } from 'react-router-dom'

function ReelsPageTest() {
  const navigate = useNavigate()
  
  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      backgroundColor: 'red', 
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      color: 'white',
      fontSize: '24px'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>REELS PAGE TEST</h1>
      <p>If you see this, the route is working!</p>
      <button 
        onClick={() => navigate(-1)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '18px',
          backgroundColor: 'white',
          color: 'black',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Go Back
      </button>
    </div>
  )
}

export default ReelsPageTest
