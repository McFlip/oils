import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import Menu from './menu'
import ProdsShowDropdown from './prodsShow_dropdown'
import ProdsList from './prods_list'
import Checkbox from './checkbox'
import UseList from './use_list'
import RecipeList from './recipe_list'
import PostList from './posts_list'
import { fetchProd, deleteProd, updateProd } from '../actions/prods'
import { removeUse } from '../actions/use'
import $ from 'jquery'
import Popper from 'popper.js'

class ProdsShow extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount () {
    const { id } = this.props.match.params
    const { state } = this.props.history.location
    // asuming only reason we have state is we are coming from ProdsNew
    if (!state) this.props.fetchProd(id)
  }

  componentDidUpdate (prevProps) {
    const { id } = this.props.match.params
    if (prevProps.match.params.id != id) this.props.fetchProd(id)
  }

  onDeleteClick () {
    const { id } = this.props.match.params

    this.props.deleteProd(id)
      .then(this.props.history.push('/products'))
  }

  handleClick (e) {
    const use = e.target.dataset.txt
    const { id } = this.props.match.params
    this.props.removeUse(use, 'product', id)
  }

  renderVal (wholesale, retail, pv) {
    return (
      <table>
        <thead>
          <tr><th>wholesale</th><th>retail</th><th>PV</th></tr>
        </thead>
        <tbody>
          <tr><td>${wholesale || ''}</td><td>${retail || ''}</td><td>{pv || ''}</td></tr>
        </tbody>
      </table>
    )
  }

  renderOil (oilProps) {
    return (
      <div className='form-group'>
        {Object.keys(oilProps).map((k) => (
          <div className='form-check' key={k}>
            <input className='form-check-input' type='checkbox' id={k} checked={oilProps[k] ? oilProps[k] : false} readOnly />
            <label htmlFor={k}>{k}</label>
          </div>
        ))}
      </div>
    )
  }

  renderAccordian (name, element) {
    return (
      <div className='card'>
        <div className='card-header'>
          <a className='card-link' data-toggle='collapse' href={`#${name.replace(/ /g, '')}`}>
            <h4>{name}:</h4>
          </a>
        </div>
        <div id={name.replace(/ /g, '')} className='collapse' data-parent='#accordian'>
          {element}
        </div>
      </div>
    )
  }

  render () {
    const { prod, match } = this.props

    if (!prod) {
      return <div>Loading...</div>
    } else {
      const { _id, descr, size, unit_issue, category, wholesale, retail, pv, oil, contains, containedIn, wishlist, uses, recipes, useTitles, posts } = prod
      let oilProps = false
      if (oil) {
        const { photosensitive, topical, dilute, aromatic, dietary } = oil
        oilProps = { photosensitive, topical, dilute, aromatic, dietary }
      }

      return (
        <div>
          <Menu page='products' dropdown={ProdsShowDropdown(this.onDeleteClick, match.params.id)} />
          <div className='jumbotron'>
            <h1>{`${descr} ${size || ''} ${unit_issue || ''}`}</h1>
            <Checkbox _id={_id} checked={wishlist} readOnly />
            <h2>Category: {category}</h2>
            {wholesale || retail || pv ? this.renderVal(wholesale, retail, pv) : ''}
            {oil && this.renderOil(oilProps)}
          </div>
          <div id='accordian'>
            {contains != undefined && contains.length > 0 ? this.renderAccordian('Contains', <ProdsList prods={contains} />) : ''}
            {containedIn != undefined && containedIn.length > 0 ? this.renderAccordian('Contained In', <ProdsList prods={containedIn} />) : ''}
            {uses != undefined && uses.length > 0 ? this.renderAccordian('Uses', <UseList uses={uses} id={_id} handleClick={this.handleClick} />) : ''}
            {recipes != undefined && recipes.length > 0 ? this.renderAccordian('Recipes', <RecipeList recipes={recipes} titles={useTitles} />) : ''}
            {posts != undefined && posts.length > 0 ? this.renderAccordian('Posts', <PostList posts={posts} id={_id} />) : ''}
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps ({ prods }, ownProps) {
  return { prod: prods[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchProd, deleteProd, updateProd, removeUse })(ProdsShow)
