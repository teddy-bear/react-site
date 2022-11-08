import React from "react";

export default function CounterBtn(props) {
    let attr = props.operation;

    return (
        <div className="item" onClick={(event) => props.handleClick(event, attr)}>
            {attr}
        </div>
    )
}
