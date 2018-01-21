import Tabs from './Components/Tabs'
import OwlCarousel from './Components/OwlCarousel'
import MainNav from './Components/MainNav'

import 'jquery-validation'
import './plugins/jquery.formstyler'

/**
 * Main Application Class
 */
export default class Application {
  constructor () {
    this._initComponents()
    //    TODO: УДАЛИТЬ!!!!
    this._initAssets()

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

    $('.js-form').validate({
      errorClass: 'error',
      rules: {
        'email': {
          required: true,
          email: true
        },
        'name': 'required'
      },

      submitHandler: (form, event) => {
        console.log(form, event)

        event.preventDefault()
        return false
      }
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
  }

  _initAssets () {
    if (location.host === '192.168.0.150') {
      $('html').find('[rel="stylesheet"]').attr('href', `./dist/app.css?time=${+new Date()}`)
    }

    //    $('.main-slider__footer-title').html($(window).width())
  }
}