import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import Checkbox from './checkbox'
import QtyButton from './qty_button'
import QtyForm from './qty_form'

class ProdsList extends Component {
  constructor (props) {
    super(props)
    this.category = ''
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {}
  }

  categorize (cat) {
    // check cat and output header
    if (this.category !== cat) {
      this.category = cat
      return (<div><h4 className='alert alert-yl shadow-lg'>{cat}</h4><hr /></div>)
    }
    return null
  }

  handleClick (_id, qty) {
    this.setState({ ...this.state, sel_prod: { _id, qty } })
  }

  handleClose () {
    this.setState({ sel_prod: null })
  }

  handleSubmit (id, value) {
    this.props.handleSubmit(id, value)
    this.handleClose()
  }

  renderProds () {
    this.category = ''
    return _.map(this.props.prods, (prod, i) => {
      return (
        <li className='list-group-item input-group' key={i}>
          {this.categorize(prod.category)}
          <span data-testid='sku'>
            {prod.sku}
          </span>
          <span className='px-2'>
            <Link to={`/products/${prod._id}`} data-testid='descr'>
              {prod.descr}
            </Link>
          </span>
          <span className='px-2' data-testid='size'>
            {prod.size}
          </span>
          {prod.qty && this.props.mode === 'inventory' ? <QtyButton qty={parseInt(prod.qty)} _id={prod._id} handleClick={this.handleClick} /> : ''}
          <Checkbox _id={prod._id} checked={prod.wishlist} />
        </li>
      )
    })
  }

  render () {
    if (!this.props.prods) return <div>Loading...</div>
    return (
      <div>
        {
          this.state.sel_prod &&
          <QtyForm
            close={this.handleClose}
            value={this.state.sel_prod.qty ? this.state.sel_prod.qty : 0}
            _id={this.state.sel_prod._id}
            handleSubmit={this.handleSubmit}
          />
        }
        <ul className='list-group'>
          {this.renderProds()}
        </ul>
      </div>
    )
  }
}
ProdsList.propTypes = {
  handleSubmit: PropTypes.func,
  prods: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  mode: PropTypes.oneOf(['inventory'])
}
export default ProdsList
