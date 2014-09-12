;(function(window, document) {

	'use strict';

	var version = '1.1.0';

	var merge = function(options, defaults) {

		var merged = {};

		if(!options) return defaults;

		for(var property in defaults) {

			merged[property] = (options[property] != undefined ? options[property] : defaults[property]);

		}

		return merged;

	}

	function PLL(options) {
		
		var instance = this,
			defaults = {

				tolerance : 200,
				fade : true

			}

		instance.settings = merge(options, defaults);

		var allElements, elements;

		instance.check = function() {

			instance.core_funcs['loopThrough']();

		}
		
		instance.core_funcs = {

			init: function() {

				allElements = document.querySelectorAll('.pll');
				elements = [];

				instance.core_funcs['loopThrough']('load');

			},

			loopThrough : function(action) {

				for(var i = 0; i < allElements.length; i++) {

					elements[i] = allElements[i];

				}

				for(var i = 0; i < elements.length; i++) {
				
					var currentElement = elements[i];
					var visible = instance.core_funcs['isVisible'](currentElement);

					if(action == 'load' && visible) {

						instance.core_funcs.setDefaultDimensions(currentElement, currentElement.getAttribute('data-src')); 
						continue;

					}

					if (!visible || (currentElement.classList ? (currentElement.classList.contains('pll__loaded')) : (new RegExp('(^| )' + 'pll__loaded' + '( |$)', 'gi').test(currentElement.className))) || !document.body.contains(currentElement)) continue;

					var imgSrc = currentElement.getAttribute('data-src');
					var imgAlt = currentElement.getAttribute('data-alt');
					var imgClasses = currentElement.getAttribute('class');

					instance.core_funcs['replaceElement'](currentElement, {
					
						src : imgSrc, 
						alt : imgAlt,
						classes : imgClasses,
						index : i

					});

				}

			},

			replaceElement : function(element, data) {
				
				if(element.parentNode.classList ? (element.parentNode.classList.contains('loading')) : (new RegExp('(^| )' + 'loading' + '( |$)', 'gi').test(element.parentNode.className))) return false;				
				
				element.classList ? element.classList.add('loading') : element.className = 'loading ' + element.className;

				var parent = element.parentNode,
					opacity = 0,
					img = new Image();

				if(instance.settings.fade) img.style.opacity = opacity;

				img.src = data['src'];

				if(data.alt) img.setAttribute('alt', data['alt']);

				var classes = data['classes'].replace('pll', 'pll__loaded');				
				
				// img.onload = function() {
					
					parent.replaceChild(img, element);
					
					img.className = classes;
					elements[data.index] = img;

					if(instance.settings.fade) {

						var increaseOp = setInterval(function() {

							if(img.style.opacity < 1) {

								opacity += 0.05;
								img.style.opacity = opacity;
								
							} else {

								img.style.opacity = 1;
								clearInterval(increaseOp);

							}

						}, 10);

					}

					$('.social-section--scrollin').scrollin('update');

				// };

			},

			isVisible : function(element) {

				var top = element.offsetTop - (window.pageYOffset || document.documentElement.scrollTop),
					bottom = (element.offsetTop + element.offsetHeight) - (window.pageYOffset || document.documentElement.scrollTop),
					scrollTop = document.documentElement.scrollTop - instance.settings.tolerance,
					windowBottom = (document.documentElement.clientHeight + scrollTop) + instance.settings.tolerance,
					elementTop = (top + document.documentElement.scrollTop) - instance.settings.tolerance,
					elementBottom = (bottom + document.documentElement.scrollTop) + instance.settings.tolerance;

				if(elementTop < windowBottom && elementBottom > scrollTop) return true;

			}, 

			setDefaultDimensions: function(element, source) {

				var img = new Image();
					img.src = source;

				img.onload = function() {

					element.style.width = img.width + 'px';
					element.style.height = img.height + 'px';

				}

			} 

		}

		instance.core_funcs['init']();

		window.onscroll = function() {

			instance.core_funcs['loopThrough']();				

		}

		window.onload = function() {

			instance.core_funcs['loopThrough']();

		}

	}

	window.PLL = PLL;

})(window, document);

if (document.addEventListener) {
		
	  document.addEventListener('DOMContentLoaded', function() {

		window.procedural = new PLL({

			tolerance: 0

		});
	  	
	  });

} else {

	window.onload = function() {

		window.procedural = new PLL({

			tolerance: 0,
			fade: false

		});

		procedural.core_funcs['loopThrough']();
			
	}

}