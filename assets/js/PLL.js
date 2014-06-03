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

		instance.settings = merge(options, defaults);

		var core_funcs = {

			init: function() {

				core_funcs['loopThrough']();

				window.onscroll = function() {

					core_funcs['scollEvents']();

				}

			},

			loopThrough : function() {
				
				var elements = document.getElementsByClassName('pll');

				for(var i = 0; i < elements.length; i++) {
					
					var currentElement = elements[i];
					
					if (!core_funcs['isVisible'](currentElement)) {

						continue;

					}

					var imgSrc = currentElement.getAttribute('data-src');
					var imgAlt = currentElement.getAttribute('data-alt');

					core_funcs['replaceElement'](elements[i], {
					
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
				var opacity = 0;

				var img = new Image();
					img.style.opacity = opacity;

				img.onload = function() {

					img.setAttribute('height', img.height);
					img.setAttribute('width', img.width);
					
					parent.replaceChild(img, element);

					var increaseOp = setInterval(function() {

						if(img.style.opacity < 1) {

							opacity += 0.05;
							img.style.opacity = opacity;
							
						} else {

							clearInterval(increaseOp);

						}

					}, 10);

				};

				img.src = data['src'];				
				data.alt ? img.setAttribute('alt', data['alt']) : '';

			},

			isVisible : function(element) {

				var scrollTop = window.pageYOffset - instance.settings.tolerance;
				var windowBottom = (document.documentElement.clientHeight + scrollTop) + instance.settings.tolerance;

				if(element.offsetTop < windowBottom && element.offsetTop > scrollTop) {

					return true;

				} else {

					return false;

				}

			},

			scollEvents : function() {

				core_funcs['loopThrough']();

			}

		}

		core_funcs['init']();

	}

	window.PLL = PLL;

})(window, document);

document.addEventListener('DOMContentLoaded', function() {

	var	procedural = new PLL();

});