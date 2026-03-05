# YouTube Timestamp Bookmarker

<video src="Video%20Project%201.mp4" width="100%" autoplay loop muted controls></video>
<br>
<em>Watch the extension in action!</em>

A Google Chrome Extension that allows users to bookmark specific timestamps in YouTube videos and navigate back to them easily.

## Features

- **Save Timestamps:** Seamlessly save the current timestamp of any YouTube video you are watching.
- **Easy Navigation:** Quickly jump back to your saved timestamps directly from the extension popup.
- **Video Specific:** Bookmarks are saved and organized per video, ensuring you only see relevant timestamps for the video you are currently viewing.

## File Structure

- `manifest.json`: Configuration file for the Chrome Extension (Manifest V3).
- `popup.html` & `styles.css`: The user interface of the extension popup.
- `popup.js`: Handles interactions within the popup, such as saving a timestamp, retrieving saved timestamps, and requesting the content script to jump to a timestamp.
- `content.js`: Injected into YouTube pages to interact with the YouTube video player (e.g., fetching the current time, changing the current play time).
- `background.js`: Service worker managing background events.
- `MANIFEST_GUIDE.md`: A detailed guide explaining the structure and configuration of the `manifest.json`.

## Installation (Local Development)

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle switch in the top right corner.
4. Click on the **Load unpacked** button.
5. Select the directory containing this project.
6. The extension should now be installed and appear in your Chrome toolbar.

## Usage

1. Go to any a YouTube video (e.g., `https://www.youtube.com/watch?v=...`).
2. Click the **YouTube Timestamp Bookmarker** extension icon in your browser toolbar.
3. Click the **Save Timestamp** button to save the current point in the video.
4. The saved timestamp will appear in the list below the button.
5. Click on any saved timestamp in the list to jump the video to that exact moment.

## Permissions

This extension requires the following permissions:
- `storage`: To save the bookmarks locally in your browser.
- `tabs`: To interact with the active YouTube tab and get its URL.
- `scripting`: To smoothly execute interactions with the YouTube video player.
- `host_permissions` (`https://www.youtube.com/*`): To ensure the extension only runs on YouTube.

## License

This project is open-source and available for usage.
