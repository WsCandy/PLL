;(function(window, document) {

	'use strict';

	function PLL(options) {

		var instance = this;

		var defaults = {

			tolerance : 200

		}

		var merge = function(options, defaults) {

			var merged = {};

			if(!options) {
				return defaults;
			}
			for(var property in defaults) {
				merged[property] = (options[property] ? options[property] : defaults[property]);
			}
			return merged;

		}

		var settings = merge(options, defaults);

		console.log(settings);

		instance.core = {

			init: function() {

				instance.core['loopThrough']();

				window.onscroll = function() {

					instance.core['scollEvents']();

				}

			},

			loopThrough : function() {
				
				var elements = document.getElementsByClassName('pll');

				for(var i = elements.length -1; i >= 0; i--) {
					
					var currentElement = elements[i];
					
					if (!instance.core['isVisible'](currentElement)) {

						continue;

					}

					var imgSrc = currentElement.getAttribute('data-src');
					var imgAlt = currentElement.getAttribute('data-alt');

					instance.core['replaceElement'](elements[i], {
					
						src : imgSrc, 
						alt : imgAlt

					});

				}

			},

			replaceElement : function(element, data) {

				var parent = element.parentNode;
				var img = document.createElement('img');
					img.setAttribute('src', data['src']);
					
				data.alt ? img.setAttribute('alt', data['alt']) : '';
				parent.replaceChild(img, element);

			},

			isVisible : function(element) {

				var scrollTop = window.pageYOffset;
				var windowBottom = (document.documentElement.clientHeight + scrollTop) + settings.tolerance;

				if(element.offsetTop < windowBottom) {

					return true;

				} else {

					return false;

				}

			},

			scollEvents : function() {

				instance.core['loopThrough']();

			}

		}

		instance.core['init']();

	}

	window.PLL = PLL;

})(window, document);

document.addEventListener('DOMContentLoaded', function() {

	new PLL();

});