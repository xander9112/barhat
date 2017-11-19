import Component from 'Component'

export default class Modal extends Component {
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
      closeButton: this.root.find('.g-modal__close')
    }
  }

  _bindEvents () {
    'use strict'

    this.nodes.closeButton.on('click', () => {
      this.hide()
    })

    window.onclick = (event) => {
      if (event.target === this.root.get(0)) {
        this.hide()
      }
    }
  }

  _ready () {
    'use strict'

    this.root.data('class', this)
  }

  show () {
    this.root.css({display: 'block'})
  }

  hide () {
    this.root.css({display: 'none'})
  }
}
