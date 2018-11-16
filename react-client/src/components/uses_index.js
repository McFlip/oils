import React, { Component } from "react";
import { Link } from "react-router-dom";
import Menu from "./menu";

class UsesIndex extends Component {
  render(){
    return(
      <div>
        <Menu page='uses' />
        Uses Page
      </div>
    );
  }
}

export default UsesIndex;
