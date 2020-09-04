import {createStore} from 'redux'

const initialState = {
    bombs: 20,
    victory: false,
    defeat: false,
    rows: 10,
    columns: 10,
    grid: [[1]],

}

const createGrid = (rows, columns, bombs) => {
    let grid = []
    for(let j=0; j<rows; j++){
        let rowArray = []
        for (let i=0; i<columns; i++){
            rowArray.push({type: "", number: 9, status: "unclicked"})
        }
        grid.push(rowArray)
        
    }
    console.log(bombs)
    const bombedGrid = placeBombs(grid, bombs)
    const bombedAndNumeredGrid = numberGrid(bombedGrid)
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
            bombGrid[r][c] = {...bombGrid[r][c], type: "bomb"}
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
                if(posX>=0 && posY>=0 && posX<rows && posY<columns && !(i===0 && j===0) && grid[posX][posY].type==="bomb"){
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
    console.log(grid)
    return grid
}

function reducer(state = initialState, action){
    console.log("the action: ", action)
    switch(action.type){
        case 'CREATE_BOARD':
            return (
                {
                    ...state,
                    victory: false,
                    defeat: false,
                    grid: createGrid(action.size[0], action.size[1], action.bombs),
                    
                }
            )
        case 'CHANGE_BOARD_SIZE':
            return {
                ...state,
                victory: false,
                defeat: false,
                rows: action.rows,
                columns: action.columns,
                bombs: action.bombs,
                grid: createGrid(action.rows, action.columns, action.bombs)
            }
        case 'RESET_BOARD':
            return {
                ...state,
                victory: false,
                defeat: false,
                grid: createGrid(action.size[0], action.size[1], action.bombs)
            }
        case 'SET_CELL':
            let prevGrid = state.grid
            if(action.newStatus==="bomb"){return {...state, defeat: true}}
            prevGrid[action.position[0]][action.position[1]] = { ...prevGrid[action.position[0]][action.position[1]] , status: action.newStatus}
            if(prevGrid[action.position[0]][action.position[1]].number===0 && action.newStatus==="clicked"){manageZero(prevGrid,action.position[0],action.position[1])}
            return {
                ...state,
                grid: prevGrid
            }
            case 'WIN':
                return {
                    ...state,
                    victory: true
                }
        default:
            return state
    }
}

const manageZero = (grid, row, column) => {
    
    for (let i=-1;i<=1;i++){
        for(let j=-1;j<=1;j++){
            if(grid[row+i] && grid[row+i][column+j] && grid[row+i][column+j].status==="unclicked"){
                grid[row+i][column+j] = {...grid[row+i][column+j], status: "clicked"}
                if (grid[row+i][column+j].number===0){manageZero(grid, row+i, column+j)}
            }
        }
    }
}

const store = createStore(reducer)

export default store;