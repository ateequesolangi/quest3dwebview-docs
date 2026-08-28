# Engine Compatibility (UE 5.4 / 5.5)

Information on compiling and running **Quest 3D WebView** across Unreal Engine versions.

---

## Supported Unreal Engine Versions

* **Unreal Engine 5.5.x:** Primary release version. Fully tested with Android NDK 25.1 and mobile Vulkan.
* **Unreal Engine 5.4.x:** Compatible with standard source build.
* **Unreal Engine 5.3 & earlier:** Untested.

---

## Android Build Environment Setup

In Unreal Editor **Project Settings → Platforms → Android SDK**:
* **Location of Android SDK:** e.g. `C:/Users/YourName/AppData/Local/Android/Sdk`
* **Location of Android NDK:** e.g. `C:/Users/YourName/AppData/Local/Android/Sdk/ndk/25.1.8937393`
* **Location of Java (JDK):** e.g. `C:/Program Files/Eclipse Adoptium/jdk-17.0.6.10-hotspot`
* **SDK API Level:** `android-32` or `latest`
* **NDK API Level:** `android-29` or `latest`
