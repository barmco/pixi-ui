/*!
 * puxi.js - v1.0.1
 * Compiled Thu, 10 Sep 2020 02:01:32 UTC
 *
 * puxi.js is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
// cjs
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@puxi/core');
var tween = require('@puxi/tween');



Object.keys(core).forEach(function (k) {
	if (k !== 'default') Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () {
			return core[k];
		}
	});
});
exports.tween = tween;
//# sourceMappingURL=puxi.cjs.map
