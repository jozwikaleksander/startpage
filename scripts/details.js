const searchForFolders = () => {
  // Find summary in each details
  $("details summary").each(function () {
    //  Find wrapper element
    let wrapper = $(this).nextAll().wrapAll("<div></div>").parent();

    //  If details closed
    if (!$(this).parent("details").attr("open")) wrapper.hide();

    //  Summary click event
    $(this).click(function (Event) {
      Event.preventDefault();
      // If details is open close it
      if ($(this).parent("details").attr("open")) {
        wrapper.slideUp(function () {
          $(this).parent("details").removeAttr("open");
        });
      }
      // If details is closed open it
      else {
        $(this).parent("details").attr("open", true);
        wrapper.slideDown();
      }
    });
  });
};
