import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import './container.css'

const cellWidth= 27
const cellHeight= 27
const navBarHeight = 24

function Container({children, ...props}) {

    const [styles, setStyles] = useState({width: "255px"})

    useEffect(()=>{
        const width = props.state.columns * cellWidth
        const height = props.state.rows * cellHeight + navBarHeight
        setStyles(prev => {
            return {...prev, width: `${width}px`, height: `${height}px`}
        })
    }, [props.state.rows, props.state.columns])
    return (
        <div 
            className="mainContainer"
            style={styles}
            >
            {children}
        </div>
    )
}

const connectedContainer = connect(state => ({state:state}), ()=>({}))(Container)
  export default connectedContainer;