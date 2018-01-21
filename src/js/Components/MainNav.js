import Component from '../Component'

export default class MainNav extends Component {
  constructor (root, options) {
    super(root, options)
  }

  get _defaultOptions () {
    'use strict'

    return {}
  }

  initialize () {
    'use strict'

    super.initialize()
  }

  _cacheNodes () {
    'use strict'

    this.nodes = {
      toggle: this.root.find('.js-toggle')
    }
  }

  _bindEvents () {
    'use strict'

    this.nodes.toggle.on('click', (event) => {
      event.preventDefault()

      this.toggle()
    })

    $(window).on('scroll', () => {
      if ($(window).scrollTop() > 50) {
        this.root.addClass('main-nav_fixed')
      } else {
        this.root.removeClass('main-nav_fixed')
      }
    })
  }

  open () {
    this.root.addClass('main-nav_opened')
  }

  close () {
    this.root.removeClass('main-nav_opened')
  }

  toggle () {
    if (this.root.hasClass('main-nav_opened')) {
      this.close()
    } else {
      this.open()
    }
  }

  _ready () {
    'use strict'

    //    this.root.owlCarousel(this.options)
  }
}
