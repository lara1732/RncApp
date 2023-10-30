
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
          "id": "cordova-plugin-email-composer.EmailComposer",
          "file": "plugins/cordova-plugin-email-composer/www/email_composer.js",
          "pluginId": "cordova-plugin-email-composer",
        "clobbers": [
          "cordova.plugins.email"
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
      "cordova-plugin-email-composer": "0.10.1",
      "cordova-plugin-fullscreen": "1.3.0",
      "cordova-plugin-streaming-media": "2.3.0",
      "cordova-plugin-x-toast": "2.7.3"
    };
    // BOTTOM OF METADATA
    });
    