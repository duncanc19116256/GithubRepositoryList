import React, { Component } from "react";

import hStyle from "./Header.module.css";
import HelpIcon from "@mui/icons-material/Help";
import { Button } from "@mui/material";

function Header(props: any) {
  const { onHelpClick } = props;
  return (
    <div className={hStyle.headerContainer}>
      <div className={hStyle.sideItem} />
      <div className={hStyle.item}>Github Repository List Search</div>
      <div className={hStyle.sideItem}>
        <Button
          startIcon={<HelpIcon />}
          onClick={onHelpClick}
          style={{ color: "#ffffff" }}
        />
      </div>
    </div>
  );
}

export default Header;
