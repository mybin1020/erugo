import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
/*
const MainEntrance = () => {
    const history = useHistory()
    return (
        <div 
        style={{
            width:'100vw', height:'100vh',
            backgroundImage:'url(/images/main_gate_menu.jpg)',
            backgroundSize:'cover',
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat',
            display:'flex', justifyContent:'center' ,alignItems:'center'
        }}
        >
            <div 
            className="pointer"
            style={{width:'100vw', height:'100vh', }}
            onClick={
                () => {
                    history.push('/home')
                }
            }
            >
                
            </div>
        </div>
    )
}
*/
const MainEntrance = () => {
    const history = useHistory()
    useEffect(() => {
        window.addEventListener('message', function(e) {
            history.push('/auction')
        });
    }, [])
    return (
        <div style={{width:'100%', height:'100%'}}>
            <iframe src='https://erugoworld.cafe24.com/public/index.html' style={{width:'100%', height:'100%', boxSizing:'border-box'}} />
        </div>
    )
}
export default MainEntrance