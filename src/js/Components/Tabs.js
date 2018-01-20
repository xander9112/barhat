import Component from '../Component'

/**
 *
 */
export default class Tabs extends Component {
  constructor (root, options) {
    super(root, options)
  }
  
  get _defaultOptions () {
    return {}
  }
  
  initialize () {
    super.initialize()
  }
  
  _cacheNodes () {
    this.nodes = {
      headerElements: this.root.children('.f-tabs__header').find('.js-tab-header-element'),
      bodyElements: this.root.children('.f-tabs__body').children('.js-tab-body-element')
    }
  }
  
  _bindEvents () {
    this.nodes.headerElements.on('click', event => {
      event.preventDefault()
      
      const element = $(event.currentTarget).parent()
      
      element.addClass('active')
      element.siblings().removeClass('active')
      
      this.nodes.bodyElements.filter(`[data-index=${element.index()}]`).addClass('active')
      this.nodes.bodyElements.filter(`[data-index=${element.index()}]`)
        .siblings()
        .removeClass('active')
    })
  }
  
  _ready () {
    'use strict'
    
    this.root.data('class', this)
  }
}
