(function(root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Pager = factory();
	}
} (this, function() {
	'use strict';

	function Pager (length, circular) {
		if (isNaN(length)) {
			throw 'The "length" parameter must be a number';
		}

		if ('undefined' !== typeof circular && 'boolean' !== typeof circular) {
			throw 'The "circular" parameter must be a boolean';
		}

		this.current = 0;
		this.length = parseInt(length);
		this.circular = ('undefined' === typeof circular) ? true : circular;
	}

	Pager.prototype = {
		set: function(index) {
			if (isNaN(length)) {
				throw 'The "length" parameter must be a number';
			}

			var last = this.getLast();
			this.current = (last >= index) ? parseInt(index) : last;
		},

		hasPrev: function() {
			return 0 !== this.current;
		},

		hasNext: function() {
			return this.current < this.getLast();
		},

		getPrev: function () {
			if (this.hasPrev()) {
				return this.current - 1;
			} else {
				return (this.circular) ? this.getLast() : false;
			}
		},

		getNext: function() {
			if (this.hasNext()) {
				return this.current + 1;
			} else {
				return (this.circular) ? 0 : false;
			}
		},

		getFirst: function() {
			return 0;
		},

		getLast: function() {
			return this.length - 1;
		},

		prev: function() {
			if (this.hasPrev()) {
				this.current--;
			} else if (this.circular) {
				this.last();
			}

			return this.current;
		},

		next: function() {
			if (this.hasNext()) {
				this.current++;
			} else if (this.circular) {
				this.first();
			}

			return this.current;
		},

		first: function() {
			return (this.current = this.getFirst());
		},

		last: function() {
			return (this.current = this.getLast());
		}
	};

	return Pager;
}));
