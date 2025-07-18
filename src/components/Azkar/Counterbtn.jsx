import React from 'react'
import { useState } from 'react'

function Counterbtn({count, onCountChange }) {
    const [counter, setCounter] = useState(count)

    const handleCountClick = () => {
        if(counter > 0){
            const newValue = counter - 1;
            setCounter(newValue)
            onCountChange(newValue); 
        }else {
            return;
        }
    }

    return (
        <div className="flex justify-center mt-4">
            <button className="bg-[#785391] text-white rounded py-3 w-full cursor-pointer" onClick={handleCountClick}>
                {counter}
            </button>
        </div>
    )
}

export default Counterbtn
