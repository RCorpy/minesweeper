import React, {useState} from 'react'
import {connect} from 'react-redux'

function Cell({type, number, position}) {

    const [clicked, setClicked] = useState("unclicked")

    const handleClick = (e) => {
        if (e.type === 'click') {
            if(type==="bomb"){
                console.log("BOOOOOM")
            }
            else{setClicked("clicked")}
            

        }
        else if (e.type === 'contextmenu'){
            e.preventDefault()
            if(clicked==="marked"){setClicked("unclicked")}
            else{setClicked("marked")}
        }
    }

    return (
        <>
        {
        (clicked==="clicked" || clicked ==="marked") ? 
            (clicked==="marked") ?
            (<button>x</button>) :
            (<button>{position[0]}</button>) : 
            (<button onClick={(e)=>handleClick(e)} onContextMenu={(e)=>{handleClick(e)}}>o</button>)
        }
        </>
    )

}


const connectedCell = connect(state => ({state:state}), (dispatch)=>({
    setMarked: (columnName) => dispatch({
        type: 'DELETE_COLUMN',
        columnName: columnName
    })
  }))(Cell)
  export default connectedCell;