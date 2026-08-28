# Frequently Asked Questions (FAQ)

---

### Q: Does this plugin work on PCVR / Oculus Link / SteamVR?
**A:** In Unreal Editor PIE mode on Windows, Quest 3D WebView displays an interactive test pattern. When packaged for Meta Quest (Android), it runs the live hardware WebKit/Chromium engine. PCVR runs on Windows DirectX, which does not have the Android OS System WebView.

---

### Q: Can I load local offline HTML/CSS/JS files?
**A:** Yes! You can load offline files by passing `file:///sdcard/...` or `data:text/html,...` URIs into `LoadURL()` or `InitialURL`.

---

### Q: Does it support WebGL and Three.js?
**A:** Yes! Android's System WebView fully supports WebGL 1.0 and WebGL 2.0 with hardware GPU acceleration.

---

### Q: Can users sign in to Google, YouTube, Discord, etc.?
**A:** Yes. Session cookies, login tokens, and localStorage persist across app launches automatically.

---

### Q: How much does this plugin increase my APK size?
**A:** Only **~24 KB (0.02 MB)**! Because Quest 3D WebView reuses the Chromium engine already built into Meta Quest OS, no heavy external browser binaries are packed into your APK.
