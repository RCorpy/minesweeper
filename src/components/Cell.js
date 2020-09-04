import React from 'react'
import {connect} from 'react-redux'
import Reward from 'react-rewards'

function Cell(props) {

    const hasWon = () => {
        if(props.state.grid.filter(row=> (row.filter(cell=>(cell.status==="unclicked" && cell.type!=="bomb"))).length>0).length===0){
            props.dispatchWin()
        }
    }

    const handleClick = (e) => {
        if (e.type === 'click') {
            if(props.type==="bomb"){
                console.log("BOOOOOM")
                props.setCell("bomb", [props.row, props.column])
                buttonRef.rewardMe()
            }
            else{
                props.setCell("clicked", [props.row, props.column])
                hasWon()
            }
            

        }
        else if (e.type === 'contextmenu'){
            e.preventDefault()
            if(props.status==="marked"){props.setCell("unclicked" , [props.row, props.column])}
            else{
                props.setCell("marked" , [props.row, props.column])

            }
        }
    }
    let buttonRef


    return(
        <div className="cell">
            <Reward
                ref={ref=> buttonRef=ref}
                type={"emoji"}
                config={{springAnimation:false, emoji:['💣','💀'], spread: 160}}
            >
                {props.status==="clicked" && (props.type==="bomb" ? <button> <span role="img" aria-label="Bomb">💣</span></button>: <button>{props.number}</button>)}
                {props.status==="marked" && <button onContextMenu={(e)=>{handleClick(e)}}>x</button>}
                {props.status==="unclicked" && <button ref={ref=> buttonRef=ref} onClick={(e)=>handleClick(e)} onContextMenu={(e)=>{handleClick(e)}}></button>}
            </Reward>
        </div>
    )
}

const connectedCell = connect(state => ({state:state}), (dispatch)=>({
    setCell: (newStatus, position) => dispatch({
        type: 'SET_CELL',
        newStatus: newStatus,
        position: position
    }),
    dispatchWin: () => dispatch({
        type: 'WIN'
    })
  }))(Cell)
  export default connectedCell;