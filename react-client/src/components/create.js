import React, { Component } from "react";

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = { term: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='input-group'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>Create</span>
          </div>
          <input
            id='createUseInput'
            value={this.state.term}
            onChange={event => this.onInputChange(event.target.value)}
            className="form-control"
            data-testid='createUseInput'
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit" data-testid="Create">Create</button>
          </div>
        </div>
      </form>
    );
  }

  // controlled component
  onInputChange(term) {
    this.setState({ term });
  }

  // dispatch actions
  handleSubmit(e) {
    e.preventDefault();
    this.props.onCreateSubmit(this.state.term);
  }

}

export default Create;
