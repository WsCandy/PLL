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

		instance.core = {

			init: function() {

				instance.core['loopThrough']();

				window.onscroll = function() {

					instance.core['scollEvents']();

				}

			},

			loopThrough : function() {
				
				var elements = document.getElementsByClassName('pll');

				for(var i = 0; i < elements.length; i++) {
					
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

				var img = new Image();
					img.src = data['src'];
					data.alt ? img.setAttribute('alt', data['alt']) : '';
					
				img.onload = function() {

					var parent = element.parentNode;
					
					img.setAttribute('height', img.height);
					img.setAttribute('width', img.width);						
					parent.replaceChild(img, element);

				}					

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