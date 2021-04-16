import React from "react";

import style from "./ListItem.module.scss";

interface Props {
  onRemove: VoidFunction;
}
const ListItem: React.FC<Props> = ({children, onRemove}) => {
  return (
    <li className={style.container}>
      <span>{children}</span>
      <button onClick={onRemove}>delete</button>
    </li>
  );
};

export default ListItem;
