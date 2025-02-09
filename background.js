chrome.runtime.onInstalled.addListener(() => {
    console.log("Auto Form Filler Installed!");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkConnection") {
        sendResponse({ status: "connected" });
    }
});
