import React from 'react';
import moment from "moment";

const ListItem = (props) => {
    return (
        <div className="list-item-container">
            <div className="list-item" onClick={() => props.showEntry(props.index)} data-index={props.index}>
                <h4>
            {props.entry.title}
                </h4>
                <h5>{moment(props.entry.date, "x").format("MMMM Do YYYY, h:mm a")}</h5>
            </div>
        </div>
    )
};

export default ListItem;