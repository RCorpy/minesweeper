import {createStore} from 'redux'

const initialState = {
    rows: 5,
    columns: 10,
    grid: [[1]],

}

const createGrid = (rows, columns) => {
    let grid = []
    for(let j=0; j<rows; j++){
        let rowArray = []
        for (let i=0; i<columns; i++){
            rowArray.push({type: "bmb", number: 9, status: "unclicked"})
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
        case 'CHANGE_BOARD_SIZE':
            return {
                ...state,
                rows: action.rows,
                columns: action.columns,
                grid: createGrid(action.rows, action.columns)
            }
        case 'RESET_BOARD':
            return {
                ...state,
                grid: createGrid(action.size[0], action.size[1])
            }
        case 'SET_CELL':
            let prevGrid = state.grid
            prevGrid[action.position[0]][action.position[1]] = { ...prevGrid[action.position[0]][action.position[1]] , status: action.newStatus}
            return {
                ...state,
                grid: prevGrid
            }
        default:
            return state
    }
}

const store = createStore(reducer)

export default store;