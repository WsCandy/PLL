PLL 
===

Propeller's personal lazy loading is here! See below for all the docs. Completely dependency free.

Version 1.0.1
---

Improved the isVisible function to now be more reliable and accurate.

#####Release History

https://github.com/WsCandy/PLL/releases


Basic Implementation:
---

#####HTML:

Use the following html structure when placing images into your page, you can use any html element not just '<figure>'. 

	<figure class="pll" data-src="http://placehold.it/400x400" data-alt="Test"></figure>

'data-alt' is optional, however 'data-src' is required. A class of 'pll' on the element is also required for it to function properly.

#####JS:

To initialise the code simply use the following code snippet:

	document.addEventListener('DOMContentLoaded', function() {

		var	procedural = new PLL();

	});

For IE8 support then you will need to use the following code:

	if (document.addEventListener) {

		document.addEventListener('DOMContentLoaded', function() {

			var	procedural = new PLL();

		});

	} else {

		document.attachEvent('onreadystatechange', function() {
		
			if (document.readyState === 'interactive') {

				var	procedural = new PLL();

			}

		});

	}

Or you can use jQuery to initialise

	$(document).ready(function() {

		var	procedural = new PLL();

	});

Options:
---

PLL supports a few options, more will be added as development progresses. They are as follows (with their default values):

	tolerance: 200, // The buffer above and below the current view port that triggers loading of images, increase to have smoother loading but more images up at any time.
	fade : true 	// Sets whether the images fade in when they load in.

Customisation:
---

There are a few things you can do to customise the appearance of loading images, a 'loading' class is added to all elements while the data is being received and can be styled with ajax loaders or animations.