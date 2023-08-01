
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-fullscreen.AndroidFullScreen",
          "file": "plugins/cordova-plugin-fullscreen/www/AndroidFullScreen.js",
          "pluginId": "cordova-plugin-fullscreen",
        "clobbers": [
          "AndroidFullScreen"
        ]
        },
      {
          "id": "cordova-plugin-app-update.AppUpdate",
          "file": "plugins/cordova-plugin-app-update/www/AppUpdate.js",
          "pluginId": "cordova-plugin-app-update",
        "clobbers": [
          "AppUpdate"
        ]
        },
      {
          "id": "cordova-plugin-streaming-media.StreamingMedia",
          "file": "plugins/cordova-plugin-streaming-media/www/StreamingMedia.js",
          "pluginId": "cordova-plugin-streaming-media",
        "clobbers": [
          "streamingMedia"
        ]
        },
      {
          "id": "cordova-plugin-x-toast.Toast",
          "file": "plugins/cordova-plugin-x-toast/www/Toast.js",
          "pluginId": "cordova-plugin-x-toast",
        "clobbers": [
          "window.plugins.toast"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-app-update": "2.0.2",
      "cordova-plugin-fullscreen": "1.3.0",
      "cordova-plugin-streaming-media": "2.3.0",
      "cordova-plugin-x-toast": "2.7.3"
    };
    // BOTTOM OF METADATA
    });
    