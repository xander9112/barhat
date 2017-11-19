import Component from 'Component';

export default class ExampleClass extends Component {
	constructor (root, options) {
		super(root, options);
	}

	get _defaultOptions () {
		"use strict";

		return {}
	}

	initialize () {
		"use strict";

		super.initialize();
	}

	_cacheNodes () {
		"use strict";

		this.nodes = {};
	}

	_bindEvents () {
		"use strict";
	}

	_ready () {
		"use strict";
		console.log('ready Class');
	}
}
