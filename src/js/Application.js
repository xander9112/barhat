import Tabs from './Components/Tabs'
import OwlCarousel from './Components/OwlCarousel'
import MainNav from './Components/MainNav'
import Projects from './Components/Projects'

import 'jquery-validation'
import './plugins/jquery.formstyler'

/**
 * Main Application Class
 */
export default class Application {
  constructor () {
    this._initComponents()

    $('input, select').styler()

    jQuery.extend(jQuery.validator.messages, {
      required: 'Поле обязательно для заполнения.',
      remote: 'Please fix this field.',
      email: 'Некорректный email.',
      url: 'Please enter a valid URL.',
      date: 'Please enter a valid date.',
      dateISO: 'Please enter a valid date (ISO).',
      number: 'Please enter a valid number.',
      digits: 'Please enter only digits.',
      creditcard: 'Please enter a valid credit card number.',
      equalTo: 'Пароли не совпадают.',
      accept: 'Please enter a value with a valid extension.',
      maxlength: jQuery.validator.format('Please enter no more than {0} characters.'),
      minlength: jQuery.validator.format('Введите больше чем {0} символов.'),
      rangelength: jQuery.validator.format('Please enter a value between {0} and {1} characters long.'),
      range: jQuery.validator.format('Please enter a value between {0} and {1}.'),
      max: jQuery.validator.format('Please enter a value less than or equal to {0}.'),
      min: jQuery.validator.format('Please enter a value greater than or equal to {0}.')
    })

    $('.js-form').each((index, element) => {
      const formObject = $(element)

      formObject.validate({
        errorClass: 'error',
        rules: {
          'email': {
            required: true,
            email: true
          },
          'name': 'required',
          'phone': 'required'
        },

        showErrors: function (errorMap, errorList) {
          if (this.numberOfInvalids()) {
            formObject.find('.js-error-content').html('Некорректные данные')
          } else {
            formObject.find('.js-error-content').html(' ')
          }
          this.defaultShowErrors()
        },

        highlight: function (element, errorClass) {
          $(element).parent().addClass('form-group_error')
          $(element).addClass('error')
          /* $(element).fadeOut(function() {
             $(element).fadeIn();
           });*/
        },

        unhighlight: function (element, errorClass) {
          $(element).parent().removeClass('form-group_error')
          $(element).removeClass('error')
          /* $(element).fadeOut(function() {
             $(element).fadeIn();
           });*/
        },

        submitHandler: (form, event) => {
          event.preventDefault()

          $(form).find('.js-error-content').html(' ')

          return false
        }
      })
    })

    $('.js-tabs').each((index, element) => {
      new Tabs($(element))
    })
  }

  _initComponents () {
    $('.js-services-carousel').each((index, element) => {
      new OwlCarousel($(element))
    })

    new MainNav($('.js-main-nav'))

    $('.js-reviews').each((index, element) => {
      const wrap = $(element).parents('.js-reviews-wrap')

      const owlCarousel = $(element).owlCarousel({
        loop: true,
        margin: 20,
        responsiveClass: true,
        items: 1
      })

      wrap.on('click', '.js-reviews-next', (event) => {
        event.preventDefault()

        owlCarousel.trigger('next.owl.carousel')
      })
    })

    $('.js-component').each((index, element) => {
      const componentName = $(element).data('component')
      const options = $(element).data('options')

      let componentClass = null

      try {
        componentClass = require(`./Components/${componentName}`)
      } catch (e) {
        console.error(e)
      }

      if (componentClass) {
        let component = new componentClass.default($(element), options)
      }
    })

    $('.js-projects').each((index, element) => {
      new Projects($(element))
    })

    $(window).on('resize', () => {
      setTimeout(() => {
        this.centeredImages()
      }, 100)
    })

    $(window).trigger('resize')
  }

  centeredImages () {
    if ($('.js-center-image').length) {
      $('.js-center-image').each((index, element) => {
        const image = $(element)
        const parent = image.parent()
        const marginLeft = image.width() > parent.width() ? (image.width() - parent.width()) / 2 : 0

        image.css({
          width: 'auto',
          float: 'left',
          marginLeft: `-${marginLeft}px`
        })
      })
    }
  }
}