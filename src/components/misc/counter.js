import React, {useState} from "react";
import CounterBtn from "./counterBtn";

export default function Counter() {
    const [countAmount, setCountAmount] = useState(0);

    const handleClick = (event, operation) => {
        let newValue;
        if (operation === '-') {
            newValue = countAmount - 1
        } else {
            newValue = countAmount + 1
        }
        setCountAmount(newValue);
        //console.info(event)
    }

    return (
        <div className="counter-wrap">
            <CounterBtn operation={'+'} handleClick={(event, operation) => handleClick(event, operation)}/>
            {countAmount}
            <CounterBtn operation={'-'} handleClick={(event, operation) => handleClick(event, operation)}/>
        </div>
    )
}
