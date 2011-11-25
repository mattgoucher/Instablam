# Instablam

### A jQuery plugin that grabs photos from Instagram

Very little setup is required to get the plugin up and running. You must have an Instagram developer account. 

### Features
* Automagically fetches more photos when the user reaches the last photo
* Remembers where a user left off when they revisit your website
	* Set `'rememberPosition' : true` to enable
* Error Handling
	* If Instagram sends back an error, we'll let you know
* Get the number of photos that are tagged (with the specified tag)
	* Run the `countTags()` method to return the count
* Adds a style-able button to scroll the user to top of photos
* Ability to limit how many fetches a user can get

#### HTML
```html
	<!-- Include The Javascript -->
	<script src="http://code.jquery.com/jquery.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="/path/to/jquery.instablam.js" type="text/javascript" charset="utf-8"></script>
```

#### Javascript
```javascript
	// Start The Plugin
	$(document).ready(function(){
		$('#where-you-want-photos-to-go').instablam({
			'client_id'				:		'client-id',	// Your Instagram Client ID
			'tag'					:		'cars',			// The Tag You Want To Pull
			'maxFetches'			:		10,				// Limit The Number of Fetches a User gets
			'totalCount'			:		18,				// How many photos are displayed per page
			'scrollToTop'			:		true/false,		// Add the scroll to top button?
			'rememberPosition'		:		true/false,		// Set a cookie to remember the users position?
			
		});
	});
```

### Release Notes:
* Currently, when you supply a client_id you (that id) is limited to 5000 requests per hour.
	* After that limit is hit, Instagram will send back an error
* In the near future, support for Implicit authentication will be added as an option
	* This allows for many more ways to use the API
	
	

#### License
Copyright (c) 2011 Matt Goucher

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
