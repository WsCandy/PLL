function PLL(options) {
	
	'use strict';
	
	var ins = this, elements, imgObj = {},
		version = '2.0.0';

	ins.check = function() {

		return core['loopThrough']();

	}
	
	var core = {

		init: function() {

			elements = document.getElementsByTagName('img');
			core['loopThrough']();

		},

		loopThrough : function() {

			for(var i = 0; i < elements.length; i++) {
			
				var currentElement = elements[i],
					visible = core['isVisible'](currentElement),
					pllScr = currentElement.getAttribute('pll-src'),
					imgAlt = currentElement.getAttribute('alt'),
					imgClasses = currentElement.getAttribute('class');

				if (!pllScr || !visible) continue;

				core['preLoad'](currentElement, {
				
					src : pllScr, 
					alt : imgAlt,
					classes : imgClasses

				}, i);

			}

		},

		replaceElement : function(element, data) {

			var parent = element.parentNode;
			
			data['img'].height = data['height'];
			data['img'].width = data['width'];			
			data['img'].setAttribute('alt', data['alt']);
			
			if(data['classes'].length <= 0) data['img'].removeAttribute('class');

			parent.replaceChild(data['img'], element);

		},

		preLoad : function(element, data, index) {

			if(imgObj[index]) return;

			imgObj[index] = new Image();
			imgObj[index].src = data['src'];

			var loaded = function() {

				var newData = {

					img: imgObj[index],
					alt: data['alt'],
					classes: imgObj[index].className = data['classes'] ? data['classes'] : '',
					width: imgObj[index].width,
					height: imgObj[index].height

				};

				core['replaceElement'](element, newData);
				
			}

			imgObj[index].onload = loaded;

		},

		isVisible : function(element) {

			var top = element.offsetTop - (window.pageYOffset || document.documentElement.scrollTop),
				bottom = (element.offsetTop + element.offsetHeight) - (window.pageYOffset || document.documentElement.scrollTop),
				scrollTop = document.documentElement.scrollTop - options.tolerance,
				windowBottom = (document.documentElement.clientHeight + scrollTop) + options.tolerance,
				elementTop = (top + document.documentElement.scrollTop) - options.tolerance,
				elementBottom = (bottom + document.documentElement.scrollTop) + options.tolerance;

			if(elementTop < windowBottom && elementBottom > scrollTop) return true;

		}

	}

	window.onscroll = function() {

		core['loopThrough']();				

	}

	core['init']();

}

window.onload = function() {

	window.PLL = new PLL({

		tolerance: 0

	});
		
}