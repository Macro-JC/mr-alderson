import { useState, useEffect } from 'react'

export default function Board({board, initialBoard, handleInput, gridKey, gridSolved}){

    useEffect(() => {
    },[board, initialBoard, handleInput])

    return(
        <div className='flex flex-col relative' style={{width: '400px', height: '400px'}}>

        <div className='text-white border border-blue-800' >
            { board.map((row, i) => 
                <div key={i} className="grid grid-cols-9">
                    { row.map((cell, j) => 
                        //  add borders to every third row
                        <div key={j} className={`${ i % 3 == 0 ? 'border-t border-blue-800' : '' } ${ j % 3 == 0 ? 'border-l border-blue-800' : ''}`}>
                            <input type="text" 
                                className='text-center text-3xl bg-transparent w-12 h-12 disabled:bg-transparent disabled:text-gray-500 font-bold disabled:font-normal' 
                                value={cell} disabled={initialBoard[i][j] != '.'} 
                                maxLength={1}
                                onChange={e => handleInput(e, i, j)}/>
                        </div>
                    )}
                </div>
            )}
                
        </div>
            <div className='-z-10 opacity-40 absolute top-0 left-0 grid grid-rows-3' style={{width: '400px', height: '400px'}}>
            { gridSolved && gridSolved.map((row, i) =>
                    <div key={i} className='grid grid-cols-3 items-center justify-center'>
                        { row.map((cell, j) =>
                            <div key={j} className='text-8xl font-bold text-center text-blue-800 p-0'>
                                {cell ? gridKey[i][j] : ''}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}