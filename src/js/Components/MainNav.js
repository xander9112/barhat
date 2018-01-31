import Component from '../Component'

export default class MainNav extends Component {
  constructor (root, options) {
    super(root, options)
  }

  get _defaultOptions () {
    'use strict'

    return {
      offsetTop: $('.js-slider-logo').length ? $('.js-slider-logo').offset().top : 50
    }
  }

  initialize () {
    'use strict'

    this.width = document.body.clientWidth

    super.initialize()
  }

  _cacheNodes () {
    'use strict'

    this.nodes = {
      nav: this.root.find('.js-nav'),
      item: this.root.find('.js-nav li'),
      itemLink: this.root.find('.js-nav li a'),
      toggle: this.root.find('.js-toggle'),

      toggleItem: this.root.find('.js-toggle-item')
    }
  }

  _bindEvents () {
    this.nodes.toggle.on('click', (event) => {
      event.preventDefault()

      this.toggle()
    })

    $(window).bind('resize orientationchange', () => {
      this.width = document.body.clientWidth

      this.adjustMenu()
    })

    $(window).on('scroll', () => {
      if ($(window).scrollTop() > this.options.offsetTop) {
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
    console.log(this.root.hasClass('main-nav_opened'))
    if (this.root.hasClass('main-nav_opened')) {
      this.close()
    } else {
      this.open()
    }
  }

  adjustMenu () {
    if (this.width < 768) {
      this.nodes.item.unbind('mouseenter mouseleave')

      this.nodes.itemLink.filter('.parent').unbind('click').bind('click', event => {
        event.preventDefault()
        $(event.currentTarget).parent('li').toggleClass('hover')
      })
    } else if (this.width >= 768) {
      this.nodes.item.removeClass('hover')
      this.nodes.itemLink.unbind('click')
      this.nodes.item.unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function (event) {
        $(event.currentTarget).toggleClass('hover')
      })
    }
  }

  _ready () {
    'use strict'

    this.nodes.itemLink.each(function () {
      if ($(this).next().length > 0) {
        $(this).addClass('parent')
      }
    })

    this.adjustMenu()
  }
}
