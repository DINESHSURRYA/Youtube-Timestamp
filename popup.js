// This event listener ensures that the DOM content is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Select the "Save Timestamp" button and the unordered list for bookmarks
    const bookmarkBtn = document.getElementById("bookmark");
    const timestampsList = document.getElementById("timestamps");

    // If either element is missing, stop execution and log an error
    if (!bookmarkBtn || !timestampsList) {
        console.error("Bookmark button or timestamps list not found.");
        return;
    }

    /**
     * Function to fetch bookmarks from Chrome's local storage and render them in the UI.
     */
    function loadBookmarks() {
        // Retrieve the "bookmarks" array from chrome.storage.local
        chrome.storage.local.get(["bookmarks"], (result) => {
            // Clear the list to prevent duplicates when re-rendering
            timestampsList.innerHTML = "";
            
            // If bookmarks exist in the storage
            if (result.bookmarks) {
                result.bookmarks.forEach((item, index) => {
                    // Create a list item (li) for each bookmark
                    let li = document.createElement("li");

                    // Create thumbnail image element
                    let img = document.createElement("img");
                    // Use the saved thumbnail URL or a default image if not available
                    img.src = item.thumbnail || "default_thumbnail.png";
                    img.classList.add("thumbnail");

                    // Create a span to hold the timestamp description (e.g., "Timestamp: 120s")
                    let span = document.createElement("span");
                    span.textContent = item.title;
                    span.classList.add("timestamp-text");

                    // Create a "Go" button to navigate to the bookmarked timestamp
                    let goBtn = document.createElement("button");
                    goBtn.textContent = "Go";
                    goBtn.classList.add("go-btn");
                    // On click, open the bookmarked URL in a new tab
                    goBtn.addEventListener("click", () => {
                        chrome.tabs.create({ url: item.url });
                    });

                    // Create a "Delete" button to remove the bookmark
                    let deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "Delete";
                    deleteBtn.classList.add("delete-btn");
                    // On click, remove the item from the array and update storage
                    deleteBtn.addEventListener("click", () => {
                        result.bookmarks.splice(index, 1); // Remove the bookmark at the specific index
                        chrome.storage.local.set({ bookmarks: result.bookmarks }, loadBookmarks); // Save and refresh list
                    });

                    // Append all created elements to the list item
                    li.appendChild(img);
                    li.appendChild(span);
                    li.appendChild(goBtn);
                    li.appendChild(deleteBtn);
                    
                    // Add the list item to the main list in the popup
                    timestampsList.appendChild(li);
                });
            }
        });
    }

    /**
     * Click event for the "Save Timestamp" button.
     * It queries the active tab, executes a script to get video data, and saves it.
     */
    bookmarkBtn.addEventListener("click", () => {
        // Find the currently active tab in the focused window
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            // Execute a function directly in the context of the active webpage
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                func: () => {
                    // Look for the video element in the page
                    const video = document.querySelector("video");
                    if (!video) return { timestamp: null, thumbnail: "" };

                    let url = window.location.href;
                    let videoId = null;

                    // Parse the URL to find the YouTube Video ID
                    if (url.includes("youtube.com/watch?v=")) {
                        videoId = new URL(url).searchParams.get("v");
                    } else if (url.includes("youtu.be/")) {
                        videoId = url.split("youtu.be/")[1].split("?")[0];
                    }

                    // Construct the high-quality thumbnail URL using the video ID
                    let thumbnailUrl = videoId 
                        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                        : "";

                    // Return video status back to the popup script
                    return {
                        timestamp: Math.floor(video.currentTime),
                        thumbnail: thumbnailUrl
                    };
                }
            }, (results) => {
                // Check if the script execution was successful and returned a valid timestamp
                if (results && results[0] && results[0].result.timestamp !== null) {
                    let timestamp = results[0].result.timestamp;
                    let url = new URL(tabs[0].url);
                    
                    // Add the timestamp as a query parameter (e.g., &t=120) to the YouTube URL
                    url.searchParams.set("t", timestamp);
                    
                    // Define the new bookmark object
                    let newBookmark = {
                        title: `Timestamp: ${timestamp}s`,
                        url: url.href,
                        thumbnail: results[0].result.thumbnail
                    };

                    // Retrieve existing bookmarks, add the new one, and save back to storage
                    chrome.storage.local.get(["bookmarks"], (result) => {
                        let bookmarks = result.bookmarks || [];
                        bookmarks.push(newBookmark);
                        chrome.storage.local.set({ bookmarks }, loadBookmarks);
                    });
                } else {
                    console.error("No video element found.");
                }
            });
        });
    });

    // Initial call to load and display saved bookmarks when the popup opens
    loadBookmarks();
});
