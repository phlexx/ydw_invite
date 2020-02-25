// @ts-check
(function () {
    "use strict";
    var redirectLinks = {
        'android': "intent://fancypants-logo.netlify.com/ydw.glb#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;",
        'ios': "https://fancypants-logo.netlify.com/ydw.usdz"
    };
    var fallbackLink = "https://www.daikin.com/";

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window['opera'];
        if (userAgent) {
            // Windows Phone must come first because its UA also contains "Android"
            if (/windows phone/i.test(userAgent)) {
                return "winphone";
            }
            if (/android/i.test(userAgent)) {
                return "android";
            }
            // iOS detection from: http://stackoverflow.com/a/9039885/177710
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                return "ios";
            }
        }
        return "unknown";
    }

    window.onload = function () {
        var os = getMobileOperatingSystem();
        var targetUri = redirectLinks[os];
        if (!targetUri) targetUri = fallbackLink;

        window.setTimeout(function () {
            document.getElementById("target")['href'] = targetUri;
            document.getElementById("redirect").style.display = 'block';
        }, 10);
        window.setTimeout(function () {
            window.location.replace(targetUri);
        }, 150);
    };
})();