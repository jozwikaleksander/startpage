chrome.action.onClicked.addListener(async (info, tab) => {
    chrome.tabs.create(
        {
            url: "index.html"
        }
      );
});