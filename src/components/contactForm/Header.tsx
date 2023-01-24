import * as React from "react";

interface Props {
    count?: number,
    models: boolean
}

export default ({
                    renderCount,
                    description
                }: {
    renderCount: number;
    description?: string;
}) => (
    <>
        <span className="counter" style={{display:'none'}}>Render Count: {renderCount}</span>
        <h1 className="h1">
            Contact Form
        </h1>
        <p style={{fontSize: 14, lineHeight: 1.3}}>{description}</p>
    </>
);
