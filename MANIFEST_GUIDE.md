# YouTube Bookmark Extension - Manifest Guide

This file provides a detailed explanation of the `manifest.json` file. Because standard JSON does not allow comments, this separate guide explains how each line configures your Chrome Extension.

## File Location: `e:\clg\My Projects\Chrome_Extension 2\manifest.json`

| Line | Key | Description |
| :--- | :--- | :--- |
| **2** | `"manifest_version": 3` | Defines the version of the manifest specification. Version 3 is the latest standard required by Google for modern extensions. |
| **3** | `"name"` | The official name of the extension as it appears in the Chrome Browser and Web Store. |
| **4** | `"version"` | The developer's version number. Helps Chrome track updates for the extension. |
| **5** | `"description"` | A short summary shown to users explaining what the extension does. |
| **6** | `"permissions"` | Requests access to specific Chrome APIs:<br>- **storage**: To save and load your bookmarks.<br>- **tabs**: To read information about the current tab (like the URL).<br>- **scripting**: To execute JavaScript (like `content.js`) on the page. |
| **7** | `"host_permissions"` | Security setting that limits the extension's power. It can only interact with URLs matching `https://www.youtube.com/*`. |
| **8-11**| `"action"` | Configures the UI that appears when you click the extension icon:<br>- **default_popup**: Links to `popup.html`.<br>- **default_icon**: Sets the icon image for the browser toolbar. |
| **12-14**| `"background"` | Registers a **Service Worker** (`background.js`). This script runs in the background to handle events even when the popup window is closed. |
| **15-19**| `"icons"` | Defines the icons used in different parts of Chrome (16x16 for the tab, 48x48 for the extensions page, 128x128 for the Web Store). |

---

### Why are there no comments in the actual `manifest.json`?
JSON (JavaScript Object Notation) is a data format that strictly forbids comments. If you add `//` or `/* */` inside `manifest.json`, Chrome will fail to load the extension and show a "Manifest is not valid JSON" error.
