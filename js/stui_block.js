/*!
 * Stui v3.0 Copyright 2016-2018 http://v.shoutu.cn
 * Email 726662013@qq.com,admin@shoutu.cn
 */
var stui = {
	'browser': {
		url: document.URL,
		domain: document.domain,
		title: document.title,
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
		canvas: function() {
			return !!document.createElement("canvas").getContext
		}(),
		useragent: function() {
			var a = navigator.userAgent;
			return {
				mobile: !! a.match(/AppleWebKit.*Mobile.*/),
				ios: !! a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: -1 < a.indexOf("Android") || -1 < a.indexOf("Linux"),
				iPhone: -1 < a.indexOf("iPhone") || -1 < a.indexOf("Mac"),
				iPad: -1 < a.indexOf("iPad"),
				trident: -1 < a.indexOf("Trident"),
				presto: -1 < a.indexOf("Presto"),
				webKit: -1 < a.indexOf("AppleWebKit"),
				gecko: -1 < a.indexOf("Gecko") && -1 == a.indexOf("KHTML"),
				weixin: -1 < a.indexOf("MicroMessenger")
			}
		}()
	},
	'mobile': {
		'popup': function() {
			$popblock = $(".popup");
			$(".open-popup").click(function() {
				$popblock.addClass("popup-visible");
				$("body").append('<div class="mask"></div>');
				$(".close-popup").click(function() {
					$popblock.removeClass("popup-visible");
					$(".mask").remove();
					$("body").removeClass("modal-open")
				});
				$(".mask").click(function() {
					$popblock.removeClass("popup-visible");
					$(this).remove();
					$("body").removeClass("modal-open")
				})
			})
		},
		'slide': function() {
			$.getScript("http://xzcys.net/template/xzcys/js/flickity.pkgd.min.js", function() {
				$(".type-slide").each(function(a) {
					$index = $(this).find('.active').index()*1;
					if($index > 3){
						$index = $index-3;
					}else{
						$index = 0;
					}
					$(this).flickity({
						cellAlign: 'left',
						freeScroll: true,
						contain: true,
						prevNextButtons: false,				
						pageDots: false,
						initialIndex: $index
					});
				})
			})
		},
		'mshare': function() {
			$(".open-share").click(function() {
				stui.browser.useragent.weixin ? $("body").append('<div class="mobile-share share-weixin"></div>') : $("body").append('<div class="mobile-share share-other"></div>');
				$(".mobile-share").click(function() {
					$(".mobile-share").remove();
					$("body").removeClass("modal-open")
				})
			})
		}
	},
	'flickity': {
		'carousel': function() {
			$.getScript("http://xzcys.net/template/xzcys/js/flickity.pkgd.min.js", function() {
				$('.carousel_default').flickity({
				  	cellAlign: 'left',
				  	contain: true,
				  	wrapAround: true,
				  	autoPlay: true,
				  	prevNextButtons: false
				});
				$('.carousel_wide').flickity({
				  	cellAlign: 'center',
				  	contain: true,
				  	wrapAround: true,
				  	autoPlay: true
				});
				$('.carousel_center').flickity({
				  	cellAlign: 'center',
				  	contain: true,
				  	wrapAround: true,
				  	autoPlay: true,
				  	prevNextButtons: false
				});
				$('.carousel_right').flickity({
				  	cellAlign: 'left',
				  	wrapAround: true,
				  	contain: true,
				  	pageDots: false
				});
			})
		}
	},	
	'images': {
		'lazyload': function() {
			$.getScript("http://xzcys.net/template/xzcys/js/jquery.lazyload.min.js", function() {
				$(".lazyload").lazyload({
					effect: "fadeIn",
					threshold: 500,
					failurelimit: 15,
					skip_invisible: false
				})
			})
		},
		'qrcode': function() {
			$("img.qrcode").attr("src", "//b.bshare.cn/barCode?site=weixin&url=" + encodeURIComponent(stui.browser.url) + "")
		}
	},
	'common': {
		'bootstrap': function() {
			$('a[data-toggle="tab"]').on("shown.bs.tab", function(a) {
				var b = $(a.target).text();
				$(a.relatedTarget).text();
				$("span.active-tab").html(b)
			})
		},
		'headroom': function() {
			$.getScript("http://xzcys.net/template/xzcys/js/headroom.min.js", function() {
				$("#header-top", function() {
					(new Headroom(document.querySelector("#header-top"), {
						tolerance: 5,
						offset: 205,
						classes: {
							initial: "top-fixed",
							pinned: "top-fixed-up",
							unpinned: "top-fixed-down"
						}
					})).init()
				});			
			})
		},
		'history': function() {
			if($.cookie("recente")){
			    var json=eval("("+$.cookie("recente")+")");
			    var list="";
			    for(i=0;i<json.length;i++){
			        list = list + "<li class='top-line'><a href='"+json[i].vod_url+"' title='"+json[i].vod_name+"'><span class='pull-right text-red'>"+json[i].vod_part+"</span>"+json[i].vod_name+"</a></li>";
			    }
			    $("#stui_history").append(list);
			}
			else
	            $("#stui_history").append("<p style='padding: 80px 0; text-align: center'>鎮ㄨ繕娌℃湁鐪嬭繃褰辩墖鍝�</p>");
		   
		    $(".historyclean").on("click",function(){
		    	$.cookie("recente",null,{expires:-1,path: '/'});
		    })		    
		},
		'collapse': function() {
			$("a.detail-more").on("click",function(){
				$(this).parent().find(".detail-sketch").addClass("hide");
				$(this).parent().find(".detail-content").css("display","");
				$(this).remove();
			})
		},
		'scrolltop': function() {
			var a = $(window);
			$scrollTopLink = $("a.backtop");
			a.scroll(function() {
				500 < $(this).scrollTop() ? $scrollTopLink.css("display", "") : $scrollTopLink.css("display", "none")
			});
			$scrollTopLink.on("click", function() {
				$("html, body").animate({
					scrollTop: 0
				}, 400);
				return !1
			})
		},
		'share': function(){
			$(".share").html('<span class="bds_shere"></span><a class="bds_qzone" data-cmd="qzone" title="鍒嗕韩鍒癚Q绌洪棿"></a><a class="bds_tsina" data-cmd="tsina" title="鍒嗕韩鍒版柊娴井鍗�"></a><a class="bds_weixin" data-cmd="weixin" title="鍒嗕韩鍒板井淇�"></a><a class="bds_tqq" data-cmd="tqq" title="鍒嗕韩鍒拌吘璁井鍗�"></a><a class="bds_sqq" data-cmd="sqq" title="鍒嗕韩鍒癚Q濂藉弸"></a><a class="bds_bdhome" data-cmd="bdhome" title="鍒嗕韩鍒扮櫨搴︽柊棣栭〉"></a><a class="bds_tqf" data-cmd="tqf" title="鍒嗕韩鍒拌吘璁湅鍙�"></a><a class="bds_youdao" data-cmd="youdao" title="鍒嗕韩鍒版湁閬撲簯绗旇"></a><a class="bds_more" data-cmd="more" title="鏇村"></a>');
			window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"24","bdCustomStyle": "/statics/css/stui_share.css"},"share":{}};with(document)0[(getElementsByTagName("head")[0]||body).appendChild(createElement('script')).src='//bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
		}
	}	
};
$(document).ready(function() {
	if(stui.browser.useragent.mobile){	
		stui.mobile.slide();
		stui.mobile.popup();
		stui.mobile.mshare();
	}
	stui.flickity.carousel();
	stui.images.lazyload();
	stui.images.qrcode();
	stui.common.bootstrap();
	stui.common.headroom();
	stui.common.history();
	stui.common.collapse();
	stui.common.scrolltop();	
	stui.common.share();
});