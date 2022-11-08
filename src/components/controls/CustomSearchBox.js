import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import React, { useState } from "react";

const CustomSearchBox = ({ placeholder, setSearchValue }) => {

  return (
    <div className="customSearchBox">
      <input onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder={placeholder} />
      <IconButton size="small" >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default CustomSearchBox;
