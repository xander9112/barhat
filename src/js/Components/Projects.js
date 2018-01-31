import Component from '../Component'

export default class Projects extends Component {

  constructor (root, options) {
    super(root, options)

    this.owlCarousel = null
  }

  get _defaultOptions () {
    'use strict'

    return {
      widthStep: 768,
    }
  }

  initialize () {
    'use strict'

    super.initialize()
  }

  _cacheNodes () {
    'use strict'

    this.nodes = {
      project: this.root.find('.js-project')
    }
  }

  _bindEvents () {
    'use strict'

    $(window).on('resize', () => {
      this.width = $(window).width()
    })

    this.nodes.project.on('click', (event) => {
      event.preventDefault()

      const currentTarget = $(event.currentTarget)

      if (this.root.find('.js-projects-detail').length) {
        this.closeProjectDetail(this.root.find('.js-projects-detail'))

        currentTarget.trigger('click')

        return
      }

      const {project} = currentTarget.data()

      //      if (project) {
      this.prepareProjectDetail(project, currentTarget.index())
      //      }
    })
  }

  _ready () {
    'use strict'

    $(window).trigger('resize')
  }

  initOwlCarousel (element) {
    this.owlCarousel = element.owlCarousel({
      loop: true,
      margin: 0,
      responsiveClass: true,
      items: 1,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true
    })

    element.find('img').each((index, element) => {
      $(element).addClass('js-center-image')
    })
  }

  destroyOwlCarousel () {
    if (this.owlCarousel) {
      this.owlCarousel.trigger('destroy.owl.carousel')
    }
  }

  initProjectDetail (element) {
    if (this.owlCarousel) {
      this.destroyOwlCarousel()
    }

    this.initOwlCarousel()
  }

  initLoadImage (projectsDetail) {
    let loaded = 0
    const images = projectsDetail.find('img')

    images.each((index, element) => {
      const image = new Image()

      image.onload = () => {
        loaded += 1

        if (loaded === images.length) {
          this.trigger('imagesLoaded')
        }
      }

      image.src = $(element).attr('src')

    })
  }

  prepareProjectDetail (project = {}, index) {
    const {images, client, task} = project

    const owlCarouselTemplate = this._owlCarouselTemplate(images)

    const row = parseInt(index / 3, 10)

    if (this.width >= this.options.widthStep) {
      if (row * 3) {
        $(this._template(owlCarouselTemplate, client, task)).insertAfter(this.nodes.project.eq((row * 3) - 1))
      } else {
        $(this._template(owlCarouselTemplate, client, task)).insertBefore(this.nodes.project.eq(row * 3))
      }
    } else {
      $(this._template(owlCarouselTemplate, client, task)).insertAfter(this.nodes.project.eq(index))
    }

    const projectsDetail = this.root.find('.js-projects-detail')
    const projectsDetailClear = projectsDetail.siblings('.project-detail_clear')

    this.initLoadImage(projectsDetail)

    this.initOwlCarousel(this.root.find('.js-projects-detail .owl-carousel'))

    this.on('imagesLoaded', () => {
      const marginBottom = projectsDetail.outerHeight() + 25

      projectsDetailClear.css({marginBottom})

      $(window).trigger('resize')
    })

    projectsDetail.on('click', '.js-projects-detail-close', (event) => {
      event.preventDefault()

      this.closeProjectDetail(projectsDetail)
    })
  }

  closeProjectDetail (element) {
    this.destroyOwlCarousel()

    element.off()
    element.parent().remove()
  }

  _owlCarouselTemplate (images) {
    let template = ''

    images.forEach((image) => {
      template += `
        <div class="project-detail__image">
            <img src="${image}" alt="">
        </div>`
    })

    return template
  }

  _template (images, client, task) {
    return `
      <div class="project-detail-wrap">
        <div class="project-detail js-projects-detail">
        <div class="owl-carousel owl-theme">
          ${images}
        </div>
        
        <div class="project-detail__footer">
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-3">
                <div class="project-detail__title">Клиенты</div>
                <div class="project-detail__description">
                  ${client}
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="project-detail__title">Задача</div>
                <div class="project-detail__description">
                  ${task}
                </div>
              </div>
              <div class="col-12 col-md-3">
                <div class="project-detail__close">
                  <div class="close-button close-button_light js-projects-detail-close">
                    <div class="close-button-line"></div>
                    <div class="close-button-line"></div>
                  </div>  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div class="project-detail_clear"></div>
      </div>
`
  }
}
