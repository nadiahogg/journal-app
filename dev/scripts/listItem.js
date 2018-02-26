import React from 'react';
import moment from "moment";

const ListItem = (props) => {
// console.log(props.index)
    return (
        <div className="list-item-container">
            <div className="list-item" onClick={() => props.showEntry(props.index)} data-index={props.index}>
                <h2>
            {props.entry.title}
                </h2>
                <h3>{moment(props.entry.date, "x").format("MMMM Do YYYY, h:mm a")}</h3>
            </div>
        </div>
    )
};

export default ListItem;