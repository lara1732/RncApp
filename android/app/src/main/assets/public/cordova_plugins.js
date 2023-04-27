
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
      "cordova-plugin-fullscreen": "1.3.0",
      "cordova-plugin-x-toast": "2.7.3"
    };
    // BOTTOM OF METADATA
    });
    