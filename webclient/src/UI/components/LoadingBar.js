import React from "react"

const LoadingBar = ({ percentage }) => {
    return (
        <div className="progress w-100">
            <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={`${percentage}`}
            style={{ width: `${percentage}%` }}
            aria-valuemin="0"
            aria-valuemax="100"
            />
        </div>
    );
}

export default LoadingBar