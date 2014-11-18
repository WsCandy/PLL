PLL 
===

Propeller's personal lazy loading is here! See below for all the docs. Completely dependency free with backward compatibility up to IE7.

Version 2.0.0
---

Version 2 has been released, it's almost a complete rewrite, please check the docs!

#####Release History

https://github.com/WsCandy/PLL/releases


Basic Implementation:
---

Version 2 will automatically scan through all the images on your site and lazy load them IF they have the pll-src attribute.

#####HTML:

Use the following html structure when placing images into your page. 

	<img pll-src="http://placehold.it/400" alt="Test" class="your classes">

The native src attribute is an optional extra if you wish to load in a low res image or a blank placeholder, it will be replaced with pll-src upon showing on the page.

	<img src="http://placehold.it/100" pll-src="http://placehold.it/400" alt="Test" class="your classes">

#####JS:

To initialise the code simply include the script in your page/template

	<script type="text/javascript" src="/assets/js/PLL.js"></script>

Options:
---

PLL supports a few options, more will be added as development progresses. They are as follows (with their default values):

	tolerance: 0, // The buffer above and below the current view port that triggers loading of images, increase to have smoother loading but more images up at any time.

Options can be edited by going into PLL.js and finding where the object is created, this will later be moved once all testing has been completed.

	window.PLL = new PLL({

		tolerance: 0

	});

Methods:
---

PLL currently has one method, it can be invoked as follows:

	PLL.check();
	// This will perform a scan of the page and lazy load any visible images
