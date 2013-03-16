// By Chris Johnson
// http://chrisltd.com
// Created February 2013
// Version .02
// Run this plugin on a wrapper, optionally define a child object (default's to DIV) to paginate on. This will hide all the subobjects and provide buttons for advancing and backing through them (default's to BUTTONS). You can provide a callback function for when the last object is reached.

(function( $ ){

  $.fn.YoFauxPagination = function( options ) {  

    // Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'childObject'         : 'div',                // Target object
      'buttonType' : 'button',                  // Next and Previous button tag
      'prevText' : 'Previous',                     // Text for the previous button
      'nextText' : 'Next',                          // Text for the next button
      'initCallback' : function() {},            // Called if plugin initialized on an object
      'nextCallback' : function() {},           // Called after the next button is pressed
      'previousCallback' : function() {},     // Called after the previous button is pressed
      'lastCallback' : function() {}              // Called when the user reaches the last "page"
    }, options);

    // Plugin code
    return this.each(function(index, value) {        

      // Find and make sure there are child objects before continuing
      var childTotal = $("> " + settings.childObject, this).length;
      if(childTotal == 0){
        return;
      }
      settings.initCallback();

      // Modify child objects
      $("> " + settings.childObject, this).each(function(index, value) {     
        $(this).attr("data-total", childTotal);
        $(this).attr("data-target", index);
        $(this).append('<div class="paginate_nav" />');
        nav = $(".paginate_nav", this);
        //  don't hide the first page or put a previous button
       if( index !== 0 ){
          $(nav).append('<' + settings.buttonType + ' class="paginate_previous" data-target-index="' + (index - 1) + '">' + settings.prevText + '</' + settings.buttonType + '>');
          $(this).hide();
        }
        // Every object but the last gets a next button
        if (index !== childTotal - 1) {
          $(nav).append('<' + settings.buttonType + ' class="paginate_next" data-target-index="' + (index + 1) + '">' + settings.nextText + '</' + settings.buttonType + '>');
        }

        // Bind next button
        $("> .paginate_nav > .paginate_next", this).click(function(event) {
          event.preventDefault();
          $(this).parent().parent().hide();
          $('[data-target="' + $(this).data("target-index") + '"]').show();
          settings.nextCallback();
          // Check to see if this is the last page, if so callback time
          if( ($(this).parent().parent().data("total") - 1) == $(this).data("target-index")){
            settings.lastCallback();
          }
        });

        // Bind previous button
        $("> .paginate_nav > .paginate_previous", this).click(function(event) {
          event.preventDefault();
          $(this).parent().parent().hide();
          $('[data-target="' + $(this).data("target-index") + '"]').show();
          settings.previousCallback();
        });

      });

    });


  };
})( jQuery );