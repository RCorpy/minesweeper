import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import './container.css'
import Reward from 'react-rewards'

const cellWidth= 30
const cellHeight= 30
const navBarHeight = 24

function Container({children, ...props}) {

    const [styles, setStyles] = useState({width: "0px"})
    let containerRef = 0

    useEffect(()=>{
        const width = props.state.columns * cellWidth
        const height = props.state.rows * cellHeight + navBarHeight
        setStyles(prev => {
            return {width: `${width}px`, height: `${height}px`}
        })
        if(props.state.victory) containerRef.rewardMe()
    }, [props.state.rows, props.state.columns, props.state.victory, containerRef])
    return (
        <Reward
            ref={ref=> containerRef=ref}
            type={"confetti"}
            config={{lifetime:1000, angle:40, spread: 250, elementSize: 13, elementCount: 70}}
        >
            <div 
                className="mainContainer"
                style={styles}
                >
                {children}
            </div>
        </Reward>
    )
}

const connectedContainer = connect(state => ({state:state}), ()=>({}))(Container)
  export default connectedContainer;