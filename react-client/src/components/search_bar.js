import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "", category: "sku" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='searchInput'>Search</label>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <select
              value={this.state.category}
              className='input-group-text'
              onChange={event => this.onSelectChange(event.target.value)}
            >
              <option value='sku'>Item #</option>
              <option value='descr'>Description</option>
            </select>
          </div>
          <input
            id='searchInput'
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
            className="form-control"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit" >Search</button>
          </div>
        </div>
      </form>
    );
  }

  // controlled component
  onInputChange(term) {
    this.setState({ term });
  }

  onSelectChange(category) {
    this.setState({ category });
  }

  // dispatch actions
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.category, this.state.term);
  }

}

export default SearchBar;
