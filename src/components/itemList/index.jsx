import React from 'react';
import "../itemList/styles.css"

export function ItemList({title, description}) {
  return (
    <div className='item-list'>
        <strong>{title}</strong>
        <p>{description}</p>
        <hr/>
    </div>
  );
}

