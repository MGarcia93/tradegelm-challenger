import React from "react";

import styles from "./ModalFooter.module.scss";
const ComponentName: React.FC = ({children}) => {
  return <nav className={styles.container}>{children}</nav>;
};

export default ComponentName;
