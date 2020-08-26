import {createStore} from 'redux'

const initialState = {
    rows: 5,
    columns: 10,
    grid: [[]],

}

const createGrid = (rows, columns) => {
    let grid = []
    for(let j=0; j<rows; j++){
        let rowArray = []
        for (let i=0; i<columns; i++){
            rowArray.push(9)
        }
        grid.push(rowArray)
    }
    return grid
}

function reducer(state = initialState, action){
    console.log("the action: ", action)
    switch(action.type){
        case 'CREATE_BOARD':
            return (
                {
                    ...state,
                    grid: createGrid(action.size[0], action.size[1])
                }
            )
        default:
            return state
    }
}

const store = createStore(reducer)

export default store;