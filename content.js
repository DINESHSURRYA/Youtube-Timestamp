// Listen for messages sent from the extension's background or popup scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Check if the received message action is "getTimestamp"
    if (request.action === "getTimestamp") {
        // Look for the <video> element on the current webpage (e.g., YouTube player)
        const video = document.querySelector("video");
        
        // If a video element is found, proceed to send its status back
        if (video) {
            sendResponse({
                // Capture the current playback time of the video, rounded down to the nearest second
                timestamp: Math.floor(video.currentTime),
                // Attempt to get the video's thumbnail/poster image if it exists
                thumbnail: document.querySelector("video").getAttribute("poster") || ""
            });
        }
    }
    // Return true to indicate that the response will be sent asynchronously (if needed)
});
