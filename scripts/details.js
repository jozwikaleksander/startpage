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
                $(this).parent('details').removeAttr('open');
             });
             $(this).removeClass('open');
          } else {
             $(this).parent('details').attr('open', true);
             $Wrapper.slideDown();
             $(this).addClass('open');
          }
       });
    });
}