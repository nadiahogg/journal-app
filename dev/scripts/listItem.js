import React from 'react';

const ListItem = (props) => {

    return (
        <div className="list-item">
            <h2 onClick={() => props.removeEntry(props.entry.key)}>
          {props.entry.title}
            </h2>
            <h3>{props.entry.text}</h3>
        </div>
    )
};

export default ListItem;