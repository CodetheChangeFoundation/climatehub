import * as React from 'react';

interface ButtonProps {
  classes: string,
  handleClick: any,
  ids: Array<number>,
  postType: string,
  title: string
}

export const Button = ({ classes, handleClick, ids, postType, title }: ButtonProps) => {
  const clickCallback = () => handleClick(postType, ids);
  return (
    <button type="button" className={classes} onClick={clickCallback}>{title}</button>
  )
}