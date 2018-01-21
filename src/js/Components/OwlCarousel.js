import 'imports-loader?jQuery=jquery!owl.carousel'
import Component from '../Component'

export default class OwlCarousel extends Component {
  constructor (root, options) {
    super(root, options)
  }

  get _defaultOptions () {
    'use strict'

    return {
      loop: true,
      margin: 20,
      responsiveClass: true,
      responsive: {
        0: {
          items: 2,
          nav: false
        },
        960: {
          items: 3,
          nav: true,
          loop: false
        }
      }
    }
  }

  initialize () {
    'use strict'

    super.initialize()
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

    this.root.owlCarousel(this.options)
  }
}
