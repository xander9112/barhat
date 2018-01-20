import {merge} from 'lodash'
import Emitter from './utils/Emitter';

export default class Component extends Emitter {
    constructor (root, options) {
        super();

        this.root = root;
        this.options = merge(this._defaultOptions, options);

        this.initialize();
    }

    initialize () {
        this._cacheNodes();
        this._bindEvents();
        this._ready();
    }

    _cacheNodes () {
    }

    _bindEvents () {
    }

    _ready () {
    }
}
