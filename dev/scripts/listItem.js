import React from 'react';
import moment from "moment";

const ListItem = (props) => {
console.log(props.index)
    return (
        <div className="list-item" onClick={() => props.showEntry(props.entry)} data-index={props.index}>
            <h2>
          {props.entry.title}
            </h2>
            <h3>{moment(props.entry.date, "x").format("MMMM Do YYYY, h:mm:ss a")}</h3>
        </div>
    )
};

export default ListItem;