async function handleSubmit() {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);

  // Get comprehension points
  chrome.tabs.sendMessage(tabs[0].id, { type: "get-comprehension-points" }, function (comprehensionPoints) {
    // Get video id
    chrome.tabs.get(tabs[0].id, (tab) => {
      if (tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParameters = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
    
        // Open new tab with comprehension information
        const videoId = urlParameters.get("v");
        const stringifiedData = JSON.stringify({
          videoId,
          comprehensionPoints,
        });
        const encodedData = encodeURIComponent(stringifiedData);
        const url = `supplementary.html?data=${encodedData}`;
        chrome.tabs.create({ url });
      }
    });
  });
}

// Wait for the webpage to stop loading
onDocumentReady(() => {
  const submitDataButton = document.getElementById("submit-data");
  submitDataButton.addEventListener("click", handleSubmit);
});
