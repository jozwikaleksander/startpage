const searchForFolders = () => {
    $('details summary').each(function() {
        var $Wrapper = $(this).nextAll().wrapAll('<div></div>').parent();
        // Hide elements that are not open by default
        if(!$(this).parent('details').attr('open'))
           $Wrapper.hide();
        $(this).click(function(Event) {
           Event.preventDefault();
           if($(this).parent('details').attr('open')) {
              $Wrapper.slideUp(function() {
                 // Remove the open attribute after sliding so, so the animation is visible in browsers supporting the <details> element
                 $(this).parent('details').removeAttr('open');
              });
           } else {
              // Add the open attribute before sliding down, so the animation is visible in browsers supporting the <details> element
              $(this).parent('details').attr('open', true);
              $(this).parent('details').animate({ width: 'fit-content'});
              $Wrapper.slideDown();
           }
        });
     });
}