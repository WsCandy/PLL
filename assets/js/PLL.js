;(function(window, document) {

	'use strict';

	var version = '1.0.1';

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

		var core_funcs = {

			loopThrough : function() {
				
				var elements = document.getElementsByClassName('pll');

				for(var i = 0; i < elements.length; i++) {
					
					var currentElement = elements[i];
					
					if (!core_funcs['isVisible'](currentElement)) continue;

					var imgSrc = currentElement.getAttribute('data-src');
					var imgAlt = currentElement.getAttribute('data-alt');

					core_funcs['replaceElement'](elements[i], {
					
						src : imgSrc, 
						alt : imgAlt

					});

				}

			},

			replaceElement : function(element, data) {
				
				if(element.classList.contains('loading')) return false;				
				element.classList.add('loading');

				var parent = element.parentNode,
					opacity = 0,
					img = new Image();

				if(instance.settings.fade) img.style.opacity = opacity;

				img.src = data['src'];

				if(data.alt) img.setAttribute('alt', data['alt']);

					img.onload = function() {

						img.setAttribute('height', img.height);
						img.setAttribute('width', img.width);
						
						parent.replaceChild(img, element);
					
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

				};

			},

			isVisible : function(element) {

				var scrollTop = window.pageYOffset - instance.settings.tolerance;
				var windowBottom = (document.documentElement.clientHeight + scrollTop) + instance.settings.tolerance;
				var elementTop = (element.getBoundingClientRect().top + document.body.scrollTop) - instance.settings.tolerance;
				var elementBottom = (element.getBoundingClientRect().bottom + document.body.scrollTop) +instance.settings.tolerance;

				if(elementTop < windowBottom && elementBottom > scrollTop) return true;

			}

		}

		core_funcs['loopThrough']();

		window.onscroll = function() {

			core_funcs['loopThrough']();

		}

	}

	window.PLL = PLL;

})(window, document);

document.addEventListener('DOMContentLoaded', function() {

	var	procedural = new PLL();

});