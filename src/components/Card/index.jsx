import React from 'react'

import classes from './style.module.scss';

const Card = ({data}) => {
    const {
        id,
        name,
        price,
        desc,
        category,
        img,
        rating
      } = data;

      console.log(data, "<<<data")

  return (
    <div>{id}</div>
  )
}

export default Card