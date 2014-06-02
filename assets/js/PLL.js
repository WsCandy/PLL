;(function(window, document) {

	'use strict';

	function PLL() {

		var elements = document.getElementsByClassName('pll');
		var instance = this;

		var settings = {

			tolerance : 200

		}

		instance.core = {

			init: function() {

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

				if(element.offsetTop - settings.tolerance < document.documentElement.clientHeight) {

					return true;

				} else {

					return false;

				}

			}

		}

		instance.core['init']();

	}

	window.PLL = PLL;

})(window, document);

document.addEventListener('DOMContentLoaded', function() {

	new PLL();

});