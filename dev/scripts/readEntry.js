import React from 'react';

export default class ReadEntry extends React.Component {
    constructor() {
        super()
        
    }
    render() {
        return (
            <div className="read-entry">
                <h2>{props.entry.title}</h2>
                <h3>{props.entry.text}</h3>
            </div>
        )
    }
}

