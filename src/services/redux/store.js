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
            rowArray.push({type: "", number: 9, status: "unclicked"})
        }
        grid.push(rowArray)
    }
    const bombedGrid = placeBombs(grid, 10)
    const bombedAndNumeredGrid = numberGrid(grid)
    return bombedAndNumeredGrid
}

const placeBombs = (grid, amountBombs) => {
    const rows = grid.length
    const columns = grid[0].length
    const randomRow = () => {
        return Math.floor(Math.random()*rows)
    }
    const randomColumn = () => {
        return Math.floor(Math.random()*columns)
    }
    const bombLoop = (bombGrid, bombsRemaining) => {
        if ( bombsRemaining < 1 ){
            return bombGrid
        }
        else {
            let r = randomRow()
            let c = randomColumn()
            if (bombGrid[r][c].type === "bomb") { return bombLoop(bombGrid, bombsRemaining)}
            else {
            bombGrid[r][c] = {...bombGrid[r,c], type: "bomb"}
            return bombLoop(bombGrid, bombsRemaining-1)
        }
        }
    }
    return bombLoop(grid, amountBombs)
}

const numberGrid = (grid) => {
    const rows = grid.length
    const columns = grid[0].length

    const isBomb = (x, y) => {
        let count = 0
        for (let i = -1 ; i<=1 ; i++){
            for (let j = -1; j<=1; j++){
                let posX= x+i
                let posY= y+j
                if(posX>=0 && posY>=0 &&posX<rows && posY<columns && !(posX==posY && posX==0) && grid[posX][posY].type==="bomb"){
                    count++
                }
            }
        }
        return count
    }

    for(let i=0; i<rows; i++){
        for(let j=0; j<columns; j++){
            grid[i][j]= {...grid[i][j], number: isBomb(i,j)}
        }
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