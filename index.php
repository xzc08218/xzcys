<!DOCTYPE html>
<html lang="zh-CN">
    <head>  
        <title>video H5 Player</title>    
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" >
        <meta http-equiv="X-UA-Compatible" content="IE=edge"><!-- IE内核 强制使用最新的引擎渲染网页 -->
        <meta name="renderer" content="webkit">  <!-- 启用360浏览器的极速模式(webkit) -->
        <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0 ,maximum-scale=1.0, user-scalable=no"><!-- 手机H5兼容模式 -->
        <meta name="x5-fullscreen" content="true" ><meta name="x5-page-mode" content="app" > <!-- X5  全屏处理 -->
        <meta name="full-screen" content="yes"><meta name="browsermode" content="application">  <!-- UC 全屏应用模式 -->
        <meta name=”apple-mobile-web-app-capable” content=”yes”>
		<meta name=”apple-mobile-web-app-status-bar-style” content=”black-translucent” /> <!--  苹果全屏应用模式 -->
        <!--必要样式-->
        <!--<link rel="stylesheet" href="/DPlayer.min.css">-->
        <style type="text/css">
            html,body{
                background-color:#000;
                padding: 0;
                margin: 0;
                height:100%;
                width:100%; 
                color:#999;
                overflow:hidden;
            }
            #p2p{
                height:100% !important; 
                width:100% !important ;  
            }
        </style>	 
    </head>
<body>
    
    <div id="p2p"></div>

<!-- <script src="https://cdn.bskchina.cn/p2p/p2p.js"></script> -->
<script src="https://cdn.jsdelivr.net/gh/xzc08218/xzcys@master/p2p.js"></script>
<script src="https://cdn.bootcdn.net/ajax/libs/dplayer/1.26.0/DPlayer.min.js"></script>
<script>
    var hlsjsConfig = {
        debug: false,
        maxBufferHole: 3,
        p2pConfig: {
            logLevel: 'warn',
            announce: "https://tracker.klink.tech",
            wsSignalerAddr: 'wss://signal.klink.tech/ws',
        }
    };
    
    var dp = new DPlayer({
        container: document.getElementById('p2p'),
        autoplay:true,
        volume:1.0,
        screenshot:true,
        hotkey:true,
        preload:'auto',
        video: {
            url: '<?php echo($_REQUEST['url']);?>',
            type: 'customHls',
            customType: {
                'customHls': function (video, player) {
                    var isMobile = navigator.userAgent.match(/iPad|iPhone|Linux|Android|iPod/i) != null;
                    if (isMobile) {
                        var html = '<video src="'+video.src+'" controls="controls" autoplay="true" playsinline="true" webkit-playsinline="true" x-webkit-airplay="allow" x5-video-player-fullscreen="true" preload="auto" width="100%" height="100%"></video>';
                        if(Hls.isSupported()) {
                        var hls = new Hls(hlsjsConfig);
                        hls.loadSource(video.src);
                        hls.attachMedia(video);
                        hls.on(Hls.Events.MANIFEST_PARSED,function() {
                        });
                        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                        video.src = '<?php echo($_REQUEST['url']);?>';
                        video.addEventListener('loadedmetadata',function() {
                        });
                        }
                        document.getElementById('p2p').innerHTML = html;
                    }else{
                    var hls = new Hls(hlsjsConfig);
                        hls.loadSource(video.src);
                        hls.attachMedia(video);
                        hls.engine.on('stats', function (data) {
                            var size = hls.engine.fetcher.totalP2PDownloaded;
                            hls.engine.fetcher.totalP2PDownloaded=0;
                            if(size>0){
                                hls.engine.signaler.signalerWs.send({action:'stat',size:size});
                            }
                        })
                    }
                }
            }
        }
    });
</script>
</body>
</html>