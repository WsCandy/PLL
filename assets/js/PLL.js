;(function(window, document) {

	'use strict';

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

	function PLL(options) {

		var instance = this;

		var defaults = {

			tolerance : 200

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
				
				if(element.classList.contains('loading')) {

					return false;
					
				}
				
				element.classList.add('loading');

				var parent = element.parentNode;

				var img = new Image();

				img.onload = function() {

					img.setAttribute('height', img.height);
					img.setAttribute('width', img.width);
					
					parent.replaceChild(img, element);

				};
				
				img.src = data['src'];
				data.alt ? img.setAttribute('alt', data['alt']) : '';

			},

			isVisible : function(element) {

				var scrollTop = window.pageYOffset - settings.tolerance;
				var windowBottom = (document.documentElement.clientHeight + scrollTop) + settings.tolerance;

				if(element.offsetTop < windowBottom && element.offsetTop > scrollTop) {

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

	var proceedural = new PLL();

});