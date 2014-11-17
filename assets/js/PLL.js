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

				tolerance : 150,
				fade : true

			}

		instance.settings = merge(options, defaults);

		var elements, imgObj = {};

		instance.check = function() {

			instance.core_funcs['loopThrough']();

		}
		
		instance.core_funcs = {

			init: function() {

				elements = document.querySelectorAll('.pll');
				instance.core_funcs['loopThrough']();

			},

			loopThrough : function() {

				for(var i = 0; i < elements.length; i++) {
				
					var currentElement = elements[i],
						visible = instance.core_funcs['isVisible'](currentElement);

					if (!visible || (currentElement.classList ? (currentElement.classList.contains('pll__loaded')) : (new RegExp('(^| )' + 'pll__loaded' + '( |$)', 'gi').test(currentElement.className))) || !document.body.contains(currentElement)) continue;

					var imgSrc = currentElement.getAttribute('data-src'),
						imgAlt = currentElement.getAttribute('alt'),
						imgClasses = currentElement.getAttribute('class');

					instance.core_funcs['preLoad'](currentElement, {
					
						src : imgSrc, 
						alt : imgAlt,
						classes : imgClasses

					}, i);

				}

			},

			replaceElement : function(element, data) {

				if(element.parentNode.classList ? (element.parentNode.classList.contains('loading')) : (new RegExp('(^| )' + 'loading' + '( |$)', 'gi').test(element.parentNode.className))) return false;				
				element.classList ? element.classList.add('loading') : element.className = 'loading ' + element.className;

				var parent = element.parentNode,
					opacity = 0,				
					classes = data['classes'].replace('pll', 'pll__loaded');				
				
				data['img'].width = data['width'];
				data['img'].height = data['height'];
				
				if(data.alt) data['img'].setAttribute('alt', data['alt']);
				
				if(instance.settings.fade) data['img'].style.opacity = opacity;
				if(instance.settings.fade) {

					var increaseOp = setInterval(function() {

						if(data['img'].style.opacity < 1) {

							opacity += 0.05;
							data['img'].style.opacity = opacity;
							
						} else {

							data['img'].style.opacity = 1;
							clearInterval(increaseOp);

						}

					}, 10);

				}
				
				parent.replaceChild(data['img'], element);

			},

			preLoad : function(element, data, index) {

				if(imgObj[index]) return;

				imgObj[index] = new Image();
				imgObj[index].src = data['src'];

				var loaded = function() {

					var newData = {

						img: imgObj[index],
						src: imgObj[index].src = data['src'],
						alt: data['alt'],
						classes: imgObj[index].className = data['classes'],
						width: imgObj[index].width,
						height: imgObj[index].height

					};

					instance.core_funcs['replaceElement'](element, newData);
					
				}

				imgObj[index].onload = loaded;

			},

			isVisible : function(element) {

				var top = element.offsetTop - (window.pageYOffset || document.documentElement.scrollTop),
					bottom = (element.offsetTop + element.offsetHeight) - (window.pageYOffset || document.documentElement.scrollTop),
					scrollTop = document.documentElement.scrollTop - instance.settings.tolerance,
					windowBottom = (document.documentElement.clientHeight + scrollTop) + instance.settings.tolerance,
					elementTop = (top + document.documentElement.scrollTop) - instance.settings.tolerance,
					elementBottom = (bottom + document.documentElement.scrollTop) + instance.settings.tolerance;

				if(elementTop < windowBottom && elementBottom > scrollTop) return true;

			}

		}

		window.onscroll = function() {

			instance.core_funcs['loopThrough']();				

		}

		instance.core_funcs['init']();

	}

	window.PLL = PLL;

})(window, document);

window.onload = function() {

	window.procedural = new PLL();
		
}