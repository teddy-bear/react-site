import React from "react";

const spinner = () => (
    <div className="spinner-wrap">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
);

export default spinner;