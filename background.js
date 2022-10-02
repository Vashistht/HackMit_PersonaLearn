chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.com/watch")) {
      const queryParameters = tab.url.split("?")[1];
      const urlParameters = new URLSearchParams(queryParameters);
  
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        videoId: urlParameters.get("v"),
      });
    }
  });


let color = '#3aa757'; 
chrome.runtime.onInstalled.addListener(()=>{
  chrome.storage.sync.set({color}); 
  // console.log('Deafualt color changed'); 
})