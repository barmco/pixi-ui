/*!
 * puxi.js - v1.0.1
 * Compiled Mon, 07 Sep 2020 08:34:11 UTC
 *
 * puxi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
this.PUXI = this.PUXI || {};
var puxi_js = (function (exports, core, tween) {
	'use strict';



	Object.keys(core).forEach(function (k) {
		if (k !== 'default') Object.defineProperty(exports, k, {
			enumerable: true,
			get: function () {
				return core[k];
			}
		});
	});
	exports.tween = tween;

	return exports;

}({}, core, tween));
Object.assign(this.PUXI, puxi_js)
//# sourceMappingURL=puxi.js.map
