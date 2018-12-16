import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

class UseList extends Component {
  constructor(props){
    super(props);
  }

  renderUses() {
    return this.props.uses.map( (use, i) => {
      return (
        <li className="list-group-item input-group" key={i}>
          <span data-testid='use'>
            <Link to={`/uses/?q=${use}`} data-testid='use'>
              {use}
            </Link>
          </span>
          <span className="px-2">
            <button onClick={e => this.props.handleClick(e)} data-txt={use} className="btn btn-outline-danger float-right">Delete</button>
          </span>
        </li>
      );
    });
  }

  render() {
    if (!this.props.uses) return <div>Loading...</div>
    return (
      <div>
        <h6>Uses:</h6>
        <ul className="list-group">
          {this.renderUses()}
        </ul>
      </div>
    );
  }
}

export default UseList;
