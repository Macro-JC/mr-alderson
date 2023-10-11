import { useState, useEffect } from 'react'
import Message from './Message.jsx'

export default function KeyLock({handleDecrypt, message}){
    const [keys, setKeys] = useState(Array(9).fill(''))

    function handleInput(e, i){
        const newKeys = [...keys]
        // get last char of input
        const key = e.target.value.slice(-1)
        newKeys[i] = key
        setKeys(newKeys)
        handleDecrypt(newKeys.join(''))
        
    }
    
    return <div className='flex flex-col items-center justify-center gap-2'>
        <div className="flex items-center gap-3">
            { keys.map( (key, i) =>
                <input key={i} 
                    type="text" 
                    className="text-4xl p-3 w-12 h-12 text-center selection:text-blue-200 rounded-2xl bg-transparent text-red-700 border border-red-800" 
                    value={key}
                    onChange={e => handleInput(e, i)}
                    />
            )}
        </div>
        <div className='flex flex-col items-center justify-center gap-2 break-words'
            
        >
            { <Message message={message} />}
        </div>
            
        
        
    </div>
}