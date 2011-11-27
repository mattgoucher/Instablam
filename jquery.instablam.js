/*----------------------------------------------------------
	Name:			Instagram Fetcher
	Code:			Matt Goucher

	Copyright (c) 2011 Matt Goucher

	Permission is hereby granted, free of charge, to any person obtaining a copy of this 
	software and associated documentation files (the "Software"), to deal in the Software 
	without restriction, including without limitation the rights to use, copy, modify, merge, 
	publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
	to whom the Software is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all copies 
	or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
	INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
	PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
	FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	
----------------------------------------------------------*/
(function( $ ){
	$.fn.instablam = function( options ) {
		
		var	settings = $.extend(true, settings, $.fn.instablam.defaults, options),

				nextURL			=		'https://api.instagram.com/v1/tags/'+ settings.tag +'/media/recent?client_id=' + settings.client_id + '&count=' + settings.totalCount,
				isFetching		=		false,
				fetchCount		=		0,
				viewCount		=		0,
				cookieName		= 		'instablam',
				cookieSet		=		false,

				container = $('<div id="instagram-photos">')
					.appendTo(this),
				
				viewPoint =	$('<div id="view-point">')
					.css({
						'height'		:		1,
						'width'		:		1,
						'position'	:		'relative'
					})
					.appendTo(this);

		$(window).scroll(function(){
			if ( ! settings.autoReload ) { return; }
			if ( isScrolledIntoView( viewPoint ) ) {
				engineMethod();
			}

		});

		if ( settings.scrollToTop ) {
			// Build The Element
			var	scrollButton = $('<div id="scroll-to-top">')
						.append('<span>Scroll To Top</span>')
						.appendTo(this);

			scrollButton.click(function(){
				$('html, body')
					.animate({
						scrollTop	:	container.offset().top
					});
			});
		}

		function createPhoto ( object ) {
			var photo = $('<div>')
					.addClass('instagram-placeholder')
					.attr('id', object.id)
				.appendTo(container),
				
				anchor = $('<a>')
					.attr('target', '_blank')
					.attr('href', object.link)
				.appendTo(photo),
				
				figure = $('<div class="figure loading">').appendTo(anchor),
				
				image = $('<img>')
					.addClass('instagram-image')
					.attr('src', object.images.low_resolution.url)
					.bind({
						'load':function(){
							figure.removeClass('loading');
						},
						'error': function() {
							figure.addClass('error');
						}
					}).appendTo(figure),
					
				details = $('<div class="details">')
					.append(
						$('<span class="author">')
							.text(object.user.username)
						)
						.append(
							$('<span class="likes">')
								.text(object.likes.count + ' likes')
						)
				.appendTo(anchor);
		}
	
		function getPhotosByTag () {
			
			// Make Sure We're Not Already Fetching or Maxed Out
			if ( isFetching ) { return; }
			if ( fetchCount >= settings.maxFetches ) { return; }

			// If Theres A Cookie, Load It
			if ( checkCookie() ) { nextURL = checkCookie(); }

			// Hey, We're Fetching. Back Off.
			isFetching = true;
			
			$.ajax({
				type: "GET",
				dataType: "jsonp",
				cache: false,
				url: nextURL,
				success: function(response) {

					// Check For Errors Before Moving Forward
					if( handleResponse(response) ) { return; }

					// Generate Each Photo Element
					for (var i = 0;i < settings.totalCount; i++) {
						container.append(createPhoto(response.data[i]));
					}

					// Store The Next URL
					nextURL = response.pagination.next_url;

					// Set The Cookie
					setCookie( nextURL );

					// Turn Off Fetch, Its Okay To Grab More
					isFetching = false;
					
					// Update Fetch Count
					fetchCount++;
					
					// Update View Count
					viewCount = fetchCount * settings.totalCount;
				}
			});
		}

		function countTags () {

			$.ajax({
				type: "GET",
				dataType: "jsonp",
				cache: false,
				url: 'https://api.instagram.com/v1/tags/'+ tag +'?client_id=' + settings.client_id,
				success: function(response) {
					// Check For Errors Before Moving Forward
					if( handleResponse(response) ) { return; }
					var tagCount = response.data.media_count;
					return tagCount;
				}
			});
			
		}

		function handleResponse ( response ) {
			
			if ( response ) {		
				// Get Response Details
				var	code			=		response.meta.code,
						message		=		response.meta.error_message,
						error_type	=		response.meta.error_type;
				
				if ( code != 200 ) {
					container.text('Error: ' + message)
					return true;
				}
				
			}
			
		}

		function isScrolledIntoView ( viewPoint ) {
			var	docViewTop		=		$(window).scrollTop(),
					docViewBottom	=		docViewTop + $(window).height(),
					elemTop			=		$(viewPoint).offset().top,
					elemBottom		=		elemTop + $(viewPoint).height();

		    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
		}

		function checkCookie () {
			
			var	cookies = document.cookie.split(';');
			for ( i = 0; i < cookies.length; i++ ) {

				var	cookiePairs			=		cookies[i].split('='),
						cookieNameClean	=		jQuery.trim(cookiePairs[0]);

				if ( cookieNameClean == cookieName ) {
					cookieSet = cookiePairs[1] + '=' + cookiePairs[2] + '=' + cookiePairs[3] + '=' + cookiePairs[4] + '=' + cookiePairs[5];
					return cookieSet;
				}
				
			}

		}

		function setCookie ( nextURL ) {
			if ( ! settings.rememberPosition ) { return; }
			document.cookie = cookieName + '=' + nextURL;
		}

		function engineMethod () {
			if ( settings.tag  ) {
				getPhotosByTag();
			}else{
				alert("I'm No Mind Reader");
			}
		}

		// Racers! Start Your Engines
		engineMethod();
		
	};
	$.fn.instablam.defaults = {
		'client_id'				:		false,
		'tag'						:		false,
		'maxFetches'			:		10,
		'totalCount'			:		18,
		'scrollToTop'			:		false,
		'rememberPosition'	:		false,
	}
})(jQuery);