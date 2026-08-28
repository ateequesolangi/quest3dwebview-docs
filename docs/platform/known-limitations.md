# Assumptions & Known Limitations

Transparent engineering documentation of platform boundaries and technical limitations on Android/Meta Quest.

---

## Technical Limitations

### 1. Hardware DRM Video (Widevine L1)
* **Status:** Restricted by Android OS Security Architecture.
* **Explanation:** Premium streaming services (Netflix, Disney+, Hulu) enforce Widevine L1 hardware encryption. Android OS actively prevents `VirtualDisplay` and screen capture APIs from reading protected DRM hardware buffers to prevent piracy.
* **Workaround:** Standard unencrypted HTML5 video, YouTube, Vimeo, Twitch, and direct video streaming formats (`.mp4`, `.webm`, `.hls`) function perfectly.

---

### 2. Camera & Microphone Input via WebRTC
* **Status:** Requires additional manifest permissions.
* **Explanation:** To keep the plugin 100% free of dangerous Android permissions for instant Meta Horizon Store compliance, camera/microphone capture within the WebView is disabled by default.

---

### 3. Native File Upload Dialogs
* **Status:** Standard Android file chooser dialogs are 2D OS windows.
* **Explanation:** Clicking `<input type="file">` attempts to summon Android's 2D file picker, which may not render natively inside an immersive VR space.
* **Workaround:** Transfer file data or base64 blobs from Unreal Engine using the `ExecuteJavaScript()` bridge.

---

### 4. Shared Cookie Jar
* **Status:** By Android OS Design.
* **Explanation:** Calling `ClearCookies()` affects all active WebView instances because Android maintains a single shared `CookieManager` instance per application process.
