import Component from 'Component'

/**
 *
 */
export default class Component2 extends Component {
  constructor (root, options) {
    super(root, options)
  }
  
  get _defaultOptions () {
    'use strict'
    
    return {
      name: 'default Name'
    }
  }
  
  initialize () {
    'use strict'
    
    this._cacheNodes()
    this._bindEvents()
    this._ready()
  }
  
  _cacheNodes () {
    'use strict'
    
    this.nodes = {}
  }
  
  _bindEvents () {
    'use strict'
  }
  
  _ready () {
    'use strict'
    
    
    this.root.html(`<h1>${this.options.name}</h1>`)
  }
}
