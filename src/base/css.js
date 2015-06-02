/**
 * @file 加载css文件插件
 *  
 * @author liyinan
 * @version 
 * @date 2014-11-10
 */
define(function () {
    return {
        load: function ( resourceId, req, load, config ) {
            var link = document.createElement( 'link' );
            link.setAttribute( 'rel', 'stylesheet' );
            link.setAttribute( 'type', 'text/css' );
            link.setAttribute( 'href', req.toUrl( resourceId ) );

            // 判断是否是ie，只用一次，写在这省代码
            if (/msie (\d+\.\d+)/i.test(navigator.userAgent)) {
                link.onreadystatechange = function() {
                    if (/^loaded|complete$/.test(this.readyState)) {
                        this.onreadystatechange = null;
                        load( true );
                    }
                };
            }
            else {
                if (link.onload) {
                    link.onload = function() {
                        load( true );
                    }
                }
                else {
                    load ( true );
                }
            }

            var parent = document.getElementsByTagName( 'head' )[ 0 ] || document.body;
            parent.appendChild( link );
        }
    };
});
