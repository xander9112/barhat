import _ from 'lodash';

export function parseUrlParams (url) {
    "use strict";

    url = url || location.href;
    var searchParam = {};
    var regExpParams = /\?{1}.+/;

    if (regExpParams.test(url)) {
        url = url.replace(regExpParams, '');

        var urlParams = location.search.replace('?', '');
        urlParams = urlParams.split('&');

        _.each(urlParams, function (item) {
            var param = item.split('=');
            searchParam[ param[ 0 ] ] = param[ 1 ];
        });
    }
    return searchParam;
}

export function getRandomInt (min, max) {
    "use strict";

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function makeVideoPlayerHtml (videoType, videoId, width, height) {
    "use strict";

    if (videoType == 'youtube') {
        return `
            <iframe 
                    class="js-player b-player youtube" 
                    type="text/html" 
                    width="${width}"
                    height="${height}"
                    src="http://www.youtube.com/embed/${videoId}'?autoplay=0&rel=0&amp;controls=0&amp;showinfo=0"
                    frameborder="0"
                    wmode="opaque" 
                    autoplay="false">
            </iframe>`;

    } else if (videoType == 'vimeo') {
        return `
            <iframe 
                    class="js-player b-player vimeo" 
                    width="${width}"
                    height="${height}"
                    src="http://player.vimeo.com/video/${videoId}'?autoplay=1"
                    frameborder="0"
                    wmode="opaque" 
                    webkitAllowFullScreen 
                    mozallowfullscreen 
                    allowFullScreen>
            </iframe>`;
    }

    return '';
}

export function ScrollWidth () {
    "use strict";

    var div = document.createElement('div');

    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';

    // при display:none размеры нельзя узнать
    // нужно, чтобы элемент был видим,
    // visibility:hidden - можно, т.к. сохраняет геометрию
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    var scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);

    return scrollWidth;
}

export function number_format (number, decimals, dec_point, thousands_sep) {
    "use strict";

    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[ 0 ].length > 3) {
        s[ 0 ] = s[ 0 ].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[ 1 ] || '').length < prec) {
        s[ 1 ] = s[ 1 ] || '';
        s[ 1 ] += new Array(prec - s[ 1 ].length + 1).join('0');
    }
    return s.join(dec);
}

export function getVideoID (url) {
    "use strict";

    let id = '';
    url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

    if (url[ 2 ] !== undefined) {
        id = url[ 2 ].split(/[^0-9a-z_\-]/i);
        id = id[ 0 ];
    } else {
        id = url;
    }

    return id;
}

export function secondsToTime (seconds) {
    "use strict";

    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds - (minutes * 60));

    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    if (seconds < 10) {
        seconds = `0${seconds}`
    }

    return {
        minutes: minutes,
        seconds: seconds
    };
}

/*export function clamp (value, min, max) {
 "use strict";

 return Math.min(max, Math.max(min, value));
 }*/
