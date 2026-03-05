// Event listener that triggers when the extension icon is clicked
chrome.action.onClicked.addListener((tab) => {
    // Executes a script in the context of the current active tab
    chrome.scripting.executeScript({
        // Specifies the target tab where the script should run
        target: { tabId: tab.id },
        // The file containing the code to be executed in the page
        files: ["content.js"]
    });
});
