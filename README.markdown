# jQuery Simple Captioner

### a simple plugin that adds some nifty captions to your images.

Its pretty simple, if your images have a class of `caption` and they have the HTML attribute `title` they will get Captioned. Added support for basic HTML in captions as well. 

### Setup


#### HTML
```html
	<!-- Include The Javascript -->
	<script src="/path/to/jquery.captioner.js" type="text/javascript" charset="utf-8"></script>
	
	<!-- Adding An Image -->
	<img class="caption" src="/path/to/image.jpg" title="Image Caption"  />
```
*Note:* The class of 'caption' must be specified, or the image will not be captioned.

#### Javascript
```javascript
	// Enable Captioning (With A Fallback Caption)
	$(document).ready(function(){
		$('.caption').captioner({
			'title' : 'My Fallback Caption!'
		});
	});
	
	
	// Enable Captioning (No Fallback Caption)
	$(document).ready(function(){
		$('.caption').captioner();
	});
```

### Update Log:
1. Version 0.1
	* Adding Padding-Offset support
		* Allows you to span the text across the entire image (without padded edges)
	* Added README :D
	* Clean Up
		* Removing DS_Store
	* Adding Support For Fallback Language
	* Deprecated
		* paddingOffset




##### License
Instablam by Matt Goucher is licensed under a Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)