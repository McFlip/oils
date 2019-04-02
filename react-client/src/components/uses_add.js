// Adds uses to a product or recipe
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import Menu from "./menu";
import UseList from './use_list';
import SearchBar from './search_bar';
import { Link } from "react-router-dom";
import { fetchUses, searchUses, createUse, addUse } from "../actions/use";

class UsesAdd extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    var refType;
    const { id } = this.props.match.params;
    const path = this.props.match.path;
    if (path.includes("products")) {
      refType = "product";
    } else {
      refType = "recipe";
    }
    this.props.fetchUses(id, refType);
  }

  handleSearch(throwaway,term){
    this.props.searchUses(term);
    // throwaway is the category of a prod search
    // TODO: refactor prod search to switch order of args
  }

  handleClick(e){
    // TODO: this is a placeholder stub; front & back end need to be wired up
    const use = e.target.dataset.txt;
    const { id } = this.props.match.params;
    this.props.addUse(use, 'FUBAR', id);
  }

  render(){
    const { match, uses, currentUses } = this.props;
    // const { match, uses, currentUses } = this.props;
    // console.log(this.props.uses);

    return(
      <div>
        <Menu />
        <h2>Add Uses</h2>
        <Link to={`/products/${match.params.id}`} className="btn btn-success">Done</Link>
        <SearchBar onSearchSubmit={this.handleSearch} subject="uses" />
        <UseList uses={uses} handleClick={this.handleClick} btnMode="add" />
      </div>
    );
  }
}
// {uses, itemUses}
function mapStateToProps({uses}) {
  // filter out itemUses from uses so user cant add existing use
  // TODO: Clean Up; figure out how to chain lodash functions
  // console.log(state);
  const u = uses.uses;
  var filtered = [];
  if (u) {
    const keys = _.flatMap(uses.itemUses, use => use._id);
    // console.log(`keys: ${keys}`);
    const keyed = _.keyBy(u, '_id');
    var temp = _.omit(keyed,keys);
    // .values()
    // console.log(temp);
    filtered = _.values(temp);
    // console.log(filtered);

  }
  return {uses: filtered};
}

export default connect(mapStateToProps, { fetchUses, searchUses, createUse, addUse })(UsesAdd);
