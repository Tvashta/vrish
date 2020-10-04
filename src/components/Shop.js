import React from 'react'
import Product from './Product'
function Shop (props) {
  return (
    <div className='items'>
      {props.items.map((item, key) => (
        <Product
          key={key}
          id={item.id}
          name={item.name}
          url={item.url}
          added={item.added}
          quantity={item.quantity}
          price={item.price}
          addItem={props.addItem}
          allowedQuantity={item.allowedQuantity}
        />
      ))}
    </div>
  )
}

export default Shop
