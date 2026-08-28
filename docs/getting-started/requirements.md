# System Requirements

This page details the supported engine versions, target hardware, and SDK requirements for **Quest 3D WebView**.

---

## 1. Unreal Engine Versions

| Engine Version | Compatibility | Notes |
| :--- | :---: | :--- |
| **Unreal Engine 5.5.x** | 🟢 **Primary Target** | Fully tested and verified on UE 5.5.4 |
| **Unreal Engine 5.4.x** | 🟢 **Compatible** | Supported with standard C++ compilation |
| **Unreal Engine 5.3 & earlier** | ⚠️ **Untested** | May require minor include adjustments |

---

## 2. Target VR Hardware

| Headset Device | Chipset / OS | Status |
| :--- | :--- | :---: |
| **Meta Quest 3** | Qualcomm Snapdragon XR2 Gen 2 / Android 14 | 🟢 **Fully Verified** |
| **Meta Quest 3S** | Qualcomm Snapdragon XR2 Gen 2 / Android 14 | 🟢 **Fully Verified** |
| **Meta Quest 2** | Qualcomm Snapdragon XR2 Gen 1 / Android 12 | 🟢 **Fully Verified** |
| **Meta Quest Pro** | Qualcomm Snapdragon XR2+ Gen 1 / Android 12 | 🟢 **Fully Verified** |
| **Pico 4 / Neo 3** | Qualcomm Snapdragon XR2 / Android OS | 🟢 **Compatible** *(Standard Android WebView)* |
| **Windows 64-bit** | DirectX 11/12 (Editor PIE) | 🟢 **Editor Test Pattern Generator** |

---

## 3. Android SDK & NDK Toolchain

When packaging for Meta Quest from Unreal Engine:

* **Android SDK Target API:** API Level `32` / `33` / `34` (Android 12 to 14)
* **Android NDK Version:** `r25b` (NDK `25.1.8937393`) or `r26b`
* **Rendering RHI:** Mobile **Vulkan**
* **Texture Compression:** **ASTC**

---

## 4. Android Manifest Permissions

Quest 3D WebView requires **ZERO dangerous runtime permissions**:
* ✅ No camera permissions (`CAMERA`)
* ✅ No microphone permissions (`RECORD_AUDIO`)
* ✅ No external storage write permissions
* ✅ Standard `android.permission.INTERNET` is automatically included by Unreal Engine for network access.
* ✅ 100% compliant with Meta Horizon Store automated submission checks.
