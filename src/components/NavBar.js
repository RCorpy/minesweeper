import React, {useState} from 'react'
import {connect} from 'react-redux'
import './NavBar.css'
import MenuModal from './MenuModal'



function NavBar(props) {

    const [showModal, setShowModal] = useState(false)

    const handleMenuButton = () => {
        setShowModal(true)
    }

    return (
        <div className="navbar">
            <button className="menubutton" onClick={()=>{handleMenuButton()}}>Menu</button>
            <button className="resetbutton" onClick={()=>{props.resetBoard([props.state.rows, props.state.columns], props.state.bombs)}}>Reset</button>
            {showModal && <MenuModal close={()=>setShowModal(false)}/>}
        </div>
    )
}

const connectedNavBar = connect(state => ({state:state}), (dispatch)=>({

    resetBoard: (size, bombs) => dispatch({
        type: 'RESET_BOARD',
        size: size,
        bombs: bombs
    })
  }))(NavBar)
  export default connectedNavBar;

