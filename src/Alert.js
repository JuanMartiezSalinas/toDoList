/** @format */

import React, { useEffect } from "react";
import { useGlobalContext } from "./context";
export const Alert = () => {
  const { alert, list, showAlert } = useGlobalContext();
  const { show, msg, type } = alert;
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <section className={`alert alert-${type}`}>{alert.msg}</section>;
};
export default Alert;
