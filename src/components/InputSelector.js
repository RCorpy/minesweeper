import React from 'react'

export default function InputSelector({value, setter, name}) {

    const modifyValue = (amount) => {
        setter(prevState => prevState +amount)
    }

    return (
        <div className="inputSelector">
            {name.charAt(0).toUpperCase()+ name.slice(1)}
            <div className="textAndButtons">
                <input value={value} type="text" />
                <div className="inputSelectorButtons">
                    <button onClick={()=>modifyValue(1)}>+</button>
                    <button onClick={()=>modifyValue(-1)}>-</button>
                </div>
            </div>
        </div>
    )
}