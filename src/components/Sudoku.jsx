
import { useState, useEffect } from 'react'
import { getSudoku  } from '../scripts/sudoku.js'
import Board from './Board.jsx'
import KeyLock from './KeyLock.jsx'

export default function Sudoku(){
    const sudoku = getSudoku()
    const [initialBoard, setInitialBoard] = useState([])
    const [board, setBoard] = useState([])
    const [gridSolved, setGridSolved] = useState([
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ])
    const [gridKey, setGridKey] = useState([
        ['f', 'S', '0'],
        ['c', '1', 'e'],
        ['t', 'y', '1']
    ])
    const messageCiphered = "233d10005001155952133e400f54048516424a735c0c4245101c5c093d590c4245101c110a32101144111d1750463051065f49540b5410365c025f011b595d077346064301151d110930450f4504541d541221d110110111595d0720100ed016171843072010005e111d1d58073d51101f452716410a32100f5016540f540a3243434845101c42033d5d024206150b50463f51434300151558023254434010115948073055435c840759500a3fd14d"

    const [message, setMessage] = useState(messageCiphered)
    const [solved, setSolved] = useState(false)

    const keySecret = 'fS0c1ety1'

    function getRow(i){
        return board[i]
    }

    function getCol(j){
        return board.map(row => row[j])
    }

    function getBox(i, j){
        return board.slice(i - i % 3, i - i % 3 + 3).map(row => row.slice(j - j % 3, j - j % 3 + 3)).flat()
    }

    function checkNumber(number, i, j){
        return getRow(i).includes(number) || getCol(j).includes(number) || getBox(i, j).includes(number)
    }

    function checkGridSolved(i, j){
        if(getBox(i, j).every(cell => cell != '')){
            const grids = [...gridSolved]
            const iGrid = Math.floor(i / 3)
            const jGrid = Math.floor(j / 3)
            grids[iGrid][jGrid] = true
        }
    }

    function handleInput(e, i, j){
        const number = e.target.value
        const validation = checkNumber(number, i, j) 
        if (!validation || number == ''){
            const newBoard = [...board]
            newBoard[i][j] = number
            setBoard([...newBoard])
            checkGridSolved(i, j)
        }
    }

    function xorCipher(message = '', key = '') {
        var output = '';
        for (var i = 0; i < message.length; i += 2) {
            var charCode = parseInt(message.substr(i, 2), 16);
            var keyCode = key.charCodeAt(i / 2 % key.length);
            output += String.fromCharCode(charCode ^ keyCode);
        }
        return output;
    }
    
    function xorEncrypt(message = '', key = '') {
        var output = '';
        for (var i = 0; i < message.length; i++) {
            var charCode = message.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            output += charCode.toString(16).padStart(2, '0');
        }
        return output;
    }

    function handleDecrypt(key){
        if(key == ''){
            setMessage(messageCiphered)
            return
        }
        const decrypted = xorCipher(messageCiphered, key)
        setMessage(decrypted)

        if(key == keySecret){
            setSolved(true)
        }
    }

    useEffect(() => {
        const initialBoard_str = '.2184937558761...943.27..817.5.3.9..312.96857...75.134.965847..2...67.1....321596'
        console.log(sudoku.print_board(sudoku.solve(initialBoard_str)))
        const initialBoard_arr = sudoku.board_string_to_grid(initialBoard_str)
        setInitialBoard(initialBoard_arr)
        setBoard(initialBoard_arr.map(row => row.map(cell => cell == '.' ? '' : cell)))
    }, [])

    return <div className=" w-100 flex flex-col justify-between gap-10">
        <div className="w-100 flex items-center justify-around gap-2">
            <Board board={board} handleInput={handleInput} initialBoard={initialBoard} gridKey={gridKey} gridSolved={gridSolved} />
            <KeyLock handleDecrypt={handleDecrypt} keySecret={keySecret} message={message} />
        </div>
        { solved && <div className='flex px-20'>
            <p className='text-red-500 text-center  font-bold'>
                Has desvelado la verdad detrás de las máscaras. Cada cumpleaños es una oportunidad para ver más allá de las apariencias. Que tus años estén llenos de revelaciones y autenticidad. ¡Feliz cumpleaños, Mr Alderson desenmascarador de realidades!</p>
        </div>}
    </div>
}
