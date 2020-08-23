/**
 * Copyright (c) 2012-2020 Vincent W., MIT-licensed.
 * @fileOverview PhotoShow background js.
 * @author Vincent | vincentwang863@gmail.com
 * @version 1.0.0.0 | 2012-11-30 | Vincent    // Initial version.
 * @version 2.0.0.0 | 2013-01-03 | Vincent    // Updates: Support turnning on/off PhotoShow for individual website.
 * @version 3.0.0.0 | 2018-11-08 | Vincent    // Updates: Reconstruction.
 * @version 3.0.2.0 | 2018-11-10 | Vincent    // Updates: Optimize url matching method;
 *                                            // Updates: Support wiki, pinterest, zhihu, eBay, walmart, newegg, zcool, hellorf.
 * @version 3.0.2.1 | 2018-11-12 | Vincent    // Updates: Add website checking action when the extension is initialized.
 * @version 3.0.4.0 | 2018-11-15 | Vincent    // Updates: Support using function in 'processor' property for websiteConfig;
 *                                            // Updates: Strictly limit supported domain rule for weibo.com, mi.com;
 *                                            // Updates: Support Instagram, 1688.com, alibaba.com, aliexpress.com, alitrip.com, liangxinyao.com.
 * @version 3.1.0.0 | 2018-11-17 | Vincent    // Updates: Update icon resources.
 * @version 3.2.0.0 | 2018-11-20 | Vincent    // Bug Fix: Fix matching error for website urls that end with national code;
 *                                            // Updates: Support non-image triggers;
 *                                            // Updates: Support etsy.com, target.com.
 * @version 3.2.1.0 | 2018-12-01 | Vincent    // Updates: Support more triggers for tmall and taobao;
 *                                            // Updates: Support auto-play gif images for zhihu.
 * @version 3.2.1.2 | 2018-12-02 | Vincent    // Updates: Support zhuanlan.zhihu.com;
 *                                            // Bug Fix: Hack extension icon graying problem for chrome (seemingly since version 70).
 * @version 3.2.2.0 | 2018-12-06 | Vincent    // Updates: Optimize website config structure;
 *                                            // Updates: Support imgur and yelp;
 *                                            // Updates: Support more triggers for Amazon, eBay, tmall, 1688 suning and zhihu.
 * @version 3.2.2.2 | 2019-01-01 | Vincent    // Updates: Support more triggers for douban.
 * @version 3.4.0.0 | 2019-01-24 | Vincent    // Updates: Add activation mode control;
 *                                            // Updates: Add context menu;
 *                                            // Updates: Support api.weibo.com, book.weibo.com, dribbble, behance;
 *                                            // Updates: Support more hosts for yelp.
 * @version 3.4.1.0 | 2019-03-08 | Vincent    // Updates: Support YouTube, youku.
 * @version 3.4.3.0 | 2019-03-12 | Vincent    // Updates: Support xiaomiyoupin, tudou, bilibili.
 * @version 3.5.0.0 | 2019-04-08 | Vincent    // Updates: Optimize url matching method;
 *                                            // Updates: Replace image filename extensions in 'srcRegExp' properties with macro '@IMG@';
 *                                            // Updates: Remove 'useParent' configuration item as mask hosting element is automatically detected;
 *                                            // Updates: Add 'amendStyles' configuration items.
 * @version 3.5.1.0 | 2019-04-11 | Vincent    // Updates: Support ArtStation;
 *                                            // Updates: Add 'Save large image' contextMenu item.
 * @version 3.5.1.1 | 2019-04-20 | Vincent    // Updates: Support more triggers for jd.com.
 * @version 3.5.2.0 | 2019-04-26 | Vincent    // Updates: Support 123rf, npic, huitu;
 *                                            // Updates: Fix supporting problem for Pinterest.
 * @version 3.5.2.1 | 2019-05-08 | Vincent    // Updates: Resume supporting huaban.
 * @version 3.6.0.1 | 2019-05-20 | Vincent    // Updates: Fix some tiny problems for taobao, twitter, weibo, youku and zhihu.
 * @version 3.7.0.0 | 2019-05-26 | Vincent    // Updates: Support Catch, Cudo, Deals.com.au, GroceryRun, LuxuryEscapes, Mumgo.com.au, Scoopon, TreatMe;
 *                                            // Updates: Parse srcset for images, optimize high-definition image src generating algorithm;
 *                                            // Updates: Support more triggers for douban, dribbble, Tumblr.
 * @version 3.8.0.0 | 2019-06-04 | Vincent    // Updates: Support fetching image src asynchronously;
 *                                            // Updates: Cache src for high-definition images;
 *                                            // Updates: Support Facebook and Quora;
 *                                            // Updates: Optimize for instagram, taobao and youku.
 * @version 3.8.1.0 | 2019-06-05 | Vincent    // Updates: Support image.baidu.com, graph.baidu.com, tuniu.com and travel associated websites on jd;
 *                                            // Updates: Fix supporting problem for facebook.
 * @version 3.8.1.1 | 2019-06-06 | Vincent    // Updates: Optimization for Facebook and Quora images.
 * @version 3.8.2.0 | 2019-06-08 | Vincent    // Updates: Port to firefox.
 * @version 3.8.3.0 | 2019-06-09 | Vincent    // Updates: Support open image in new tab with hotkey.
 * @version 3.8.3.2 | 2019-06-18 | Vincent    // Updates: Support more triggers for huaban.
 * @version 3.8.4.1 | 2019-06-23 | Vincent    // Updates: Support more location hosts for mi.com and xiaomiyoupin.
 * @version 3.8.4.2 | 2019-06-26 | Vincent    // Updates: Support more triggers for Pinterest, taobao and YouTube.
 * @version 3.8.4.3 | 2019-07-01 | Vincent    // Updates: Support more triggers for taobao;
 *                                            // Updates: Support Myprotein.
 * @version 3.8.5.0 | 2019-07-10 | Vincent    // Updates: Better support for triggers in iframes;
 *                                            // Updates: Support Qzone and DHGate;
 *                                            // Updates: Support more triggers for weibo and Twitter.
 * @version 3.8.6.0 | 2019-07-18 | Vincent    // Updates: Support more triggers for Amazon.
 * @version 3.8.6.2 | 2019-07-19 | Vincent    // Updates: Support more triggers for Ali series websites.
 * @version 3.8.8.0 | 2019-07-30 | Vincent    // Updates: Support image urls encoded in Base64;
 *                                            // Updates: Support Twipu and Google image search.
 * @version 3.8.8.1 | 2019-07-31 | Vincent    // Updates: Support Apple.
 * @version 3.9.0.0 | 2019-09-22 | Vincent    // Updates: Support Kmart, trademe;
 *                                            // Updates: Fix support problem for twitter;
 *                                            // Bug Fix: Fix the synchronization problem of the activation state of tabs with the same host.
 * @version 3.9.1.0 | 2019-09-25 | Vincent    // Updates: Support Flickr;
 *                                            // Updates: Add 'CROSS_ORIGIN_GET' method for websites that getting images via cross-origin APIs.
 * @version 3.9.1.1 | 2019-09-26 | Vincent    // Bug Fix: Fix api_key expiry problem for Flickr.
 * @version 4.0.0.0 | 2019-11-07 | Vincent    // Updates: Apply JavaScript Arrow functions;
 *                                            // Updates: Add VIEW MODE feature;
 *                                            // Updates: Add messages for dispatching hotkey actions between popup page and content pages;
 *                                            // Updates: Support more triggers for Weibo and Wiki.
 * @version 4.0.3.0 | 2019-11-23 | Vincent    // Updates: Support Briscoes, pixiv, BOOTH and VRoid;
 *                                            // Updates: Preload an image instead of using an ajax request to detect if an image exists (In firefox, these detecting ajax requests may fail without an explicit reason);
 *                                            // Updates: Support more triggers for Qzone and Tumblr.
 * @version 4.0.4.0 | 2019-12-12 | Vincent    // Updates: Support more triggers for facebook and google;
 *                                            // Updates: Support PBTech.
 * @version 4.0.4.1 | 2019-12-15 | Vincent    // Updates: Support more triggers for tieba.baidu.com in response to user feedback.
 * @version 4.0.5.1 | 2019-12-23 | Vincent    // Bug Fix: Fix support problem for feedback.
 * @version 4.0.6.0 | 2019-12-27 | Vincent    // Updates: Better support for pixiv and Quora.
 * @version 4.0.7.0 | 2019-12-31 | Vincent    // Updates: Better support for QZone;
 *                                            // Updates: Support DeviantArt in response to user feedback.
 * @version 4.0.8.0 | 2020-01-04 | Vincent    // Updates: Better support for Weibo and tuniu;
 *                                            // Updates: Support 1-day, 500px, Best Buy, Bing, noel leeming, POCO, TheMarket, thewarehouse, Torpedo7 and warehouse stationery.
 * @version 4.0.9.3 | 2020-01-08 | Vincent    // Updates: Port localStorage APIs to chrome.storage APIs;
 *                                            // Bug Fix: Fix the problem that causes the overlay buttons on the YouTube thumbnails not working, in response to user feedback;
 *                                            // Bug Fix: Better support for weibo.com.
 * @version 4.0.10.0 | 2020-01-09 | Vincent   // Updates: Support baidu search.
 * @version 4.0.11.0 | 2020-01-20 | Vincent   // Updates: Add basic support for pure image link;
 *                                            // Updates: Better support for reddit.
 * @version 4.0.12.0 | 2020-01-24 | Vincent   // Updates: Support GitHub;
 *                                            // Updates: Remove transitional code for storage API porting.
 * @version 4.0.13.0 | 2020-02-06 | Vincent   // Updates: Support WikiArt in response to user feedback;
 *                                            // Updates: Remove support for Google as the parsing rules are no longer applicable.
 * @version 4.0.14.0 | 2020-02-13 | Vincent   // Updates: Resume and optimize support for Google Play in response to user feedback.
 * @version 4.0.15.0 | 2020-02-20 | Vincent   // Updates: Add support for more localized hosts for AliExpress in response to user feedback.
 * @version 4.1.0.0 | 2020-03-13 | Vincent    // Updates: Support for image address copying;
 *                                            // Updates: Better support for GitHub;
 *                                            // Updates: Support Alimama in response to user feedback.
 * @version 4.2.0.0 | 2020-03-20 | Vincent    // Updates: PHOTOSHOW_CONFIGS supports nested data structure;
 *                                            // Updates: Replace string concatenation with template literals.
 * @version 4.2.2.0 | 2020-04-06 | Vincent    // Updates: Better support for Facebook.
 * @version 4.3.0.0 | 2020-04-10 | Vincent    // Updates: Add support for 'gifv' images used by Tumblr;
 *                                            // Updates: Support wekan.tv;
 *                                            // Bug Fix: Fix the problem that images might be downloaded with wrong file name suffixes.
 * @version 4.4.0.0 | 2020-04-18 | Vincent    // Updates: Add 'xhrDownload' field to the website-info-structure, for better image downloading support;
 *                                            // Updates: Support downloading images from websites that requires 'referer' HTTP header;
 *                                            // Updates: Better support for bilibili, Facebook, GitHub, imgur, and pixiv;
 *                                            // Updates: Add support for countdown, wsy.com.
 * @version 4.4.1.0 | 2020-04-21 | Vincent    // Bug Fix: Resume supporting for Briscoes as it has changed its image url rules;
 *                                            // Bug Fix: Fix the problem that user settings can not be saved in Firefox, caused by an unsupported value in parameter 'extraInfoSpec' of onBeforeSendHeaders event listener, in response to user feedback.
 * @version 4.4.1.1 | 2020-04-22 | Vincent    // Updates: Better support for ArtStation and Tumblr.
 * @version 4.4.2.0 | 2020-04-28 | Vincent    // Updates: Support WeChat webpages, in response to user feedback.
 * @version 4.4.3.0 | 2020-05-02 | Vincent    // Bug Fix: Fix the problem that causes video controls on Twitter unavailable, in response to user feedback;
 *                                            // Updates: Support NZSALE.
 * @version 4.5.0.0 | 2020-05-15 | Vincent    // Bug Fix: Fix supporting issues for Artstation;
 *                                            // Updates: Support davidnakayama.com;
 *                                            // Updates: Better support for Facebook and Pinterest.
 * @version 4.5.0.1 | 2020-05-24 | Vincent    // Updates: Support Andino in response to user feedback.
 * @version 4.5.1.0 | 2020-07-18 | Vincent    // Updates: Better support for Facebook, weibo, and bilibili.
 * @version 4.5.2.0 | 2020-08-23 | Vincent    // Bug Fix: Fix a bug reported by a user for bilibili (GitHub issue #7);
 *                                            // Bug Fix: Fix the avatar display problem on Twitter;
 *                                            // Updates: Resume supporting Google images;
 *                                            // Updates: Support ACP Journals, JAMA Network, NEJM, and jandan.net, in response to user requests;
 *                                            // Updates: Add 'noReferrer', 'onToggle' and 'onXhrLoad' fields to the website-info-structure;
 *                                            // Updates: Replace Object.assign with spread syntax.
 * @version 4.5.2.1 | 2020-08-24 | Vincent    // Bug Fix: Fix the video controller hidden problem on Twitter, introduced in previous update.
 */

// TODO: Extract websiteConfig to independent files and import them (after porting to webpack).
// TODO: Preload images (ideally, only for the thumbnails near the mouse cursor).
// TODO: Support all websites, displaying original images (if their intrinsic sizes are larger than they are displayed) for those not in websiteConfig.
// TODO: Add an extension `OPTIONS` page for more complex settings.
// TODO: Images in the searching result of Baidu have a scaled overlayer when mouse hovering which covers the mask on the trigger.
// TODO: Remove jQuery and deal with the event dispatching between frames.
// TODO: Disable 'Panoramic' mode for pure link triggers.
// TODO: IMDB.com Amazon.

// Website info structure:
// {
//   amendStyles: {                    // (Optional) Styles to amend to hosting pages.
//     pointerNone: {String},          // Selectors that are to be set to 'pointer-events:none'
//     pointerAuto: {String}           // Selectors that are to be set to 'pointer-events:auto'
//   },
//   srcMatching: {                    // (Required) Matching configuration.
//     selectors: {String},            // (Optional) Selectors for elements responsible for mouse-enter action. Default value: '' (equivalent to 'img,[style*=background-image]').
//     srcRegExp: {String},            // (Optional) Pattern for trigger image src matching in src replacement.
//     processor: {String|Function}    // (Optional) Replacement string or process function. ('this' -> the selected element. NOTE: Not applicable to arrow functions.)
//                                     // Arguments: trigger{Object}         // The selected element (jQuery object of 'this').
//                                     // Arguments: src{String}             // Src of the selected img (or the src of the largest image in its srcset list) or backgroundImage src of the selected element.
//                                     // Arguments: srcRegExpObj{RegExp}    // An RegExp object constructed by srcRegExp.
//                                     // Return Value: {String}             // Src of the high-definition image; return '' if not applicable.
//   },
//   xhrDownload: {String|Array},      // (Optional) If downloading images under certain hostnames on this website needs the 'referer' header of the HTTP request set, list the hostnames here.
//   noReferrer: {Boolean},            // (Optional) Set the 'referrerPolicy' field of the img element to 'no-referrer' when displaying the HD image, if this parameter is specified as true.
//   onToggle: {Function},             // (Optional) Callback when PhotoShow is toggled on/off on the hosting page.
//                                     // Arguments: isOn {Boolean}    // Specify whether PhotoShow is turnned on.
//   onXhrLoad: {Function}             // (Optional) Callback for any XHR load event triggered on the hosting page.
//                                     // Arguments: url{String}         // The url of the request.
//                                     // Arguments: response{String}    // The text content of the response.
// }
//
// NOTE:
// - onToggle:
// When PhotoShow is turnned on/off on the hosting page, this callback will be invoked with the current on/off state. Use this callback to do some initializing or destroying stuff.
//
// - onXhrLoad:
// If this parameter is provided and a callback is provided, all the xhr requests on the hosting page will be monitored and the callback will be called when any xhr load event happens.
//
// - xhrDownload:
// Some websites have strict access restrictions that downloading requests without the 'referer' header correctly set will fail.
// Specify the hostnames of these image URLs with this parameter so that PhotoShow will use special ways to download these images with the 'referer' header set to the hostname of their source pages.
//
// - srcMatching:
// 'selectors' is used to select the trigger element which can be any type of elements.
// 'processor' is used to generate the src of the 'large' image. If it is:
// · A function: It will be called to generate the src of the high-definition image, usually being used to process those non-image triggers;
//   Note: the processor function may return either a string (src of the high-definition image) or a Promise object which is going to 'resolve' an src string.
// · A String: It will be used alongside 'srcRegExp' (if there were) as arguments in src replacement;
// · Omitted: the original src or the src of the largest image in the srcset list (if applicable) will be used.

const websiteConfig = {
  '(?:www|[a-z]{2})\\.123rf\\.com': {    // de|es|fr|it|tr|hu|nl|pl|ru|pt|jp|kr|tw
    amendStyles: {
      pointerNone: '.imgThumbOverlay'
    },
    srcMatching: {
      srcRegExp: '//.+\\.123rf\\.com/\\d+\\w+/(.+@IMG@.*)',
      processor: '//previews.123rf.com/images/$1'
    }
  },
  '(?:web\\.)?500px\\.com': {
    srcMatching: [{
      selectors: 'img,[style*=background-image],a[href^="/photo/"],a.link_wrap',
      srcRegExp: '/photo/(\\d+)/',
      processor: (trigger, src, srcRegExpObj) => {
        var link = trigger.is('.link_wrap') ? tools.getBackgroundImgSrc(trigger.next('.top')) : trigger.attr('href') || src,
          photoId = srcRegExpObj.test(link) ? RegExp.$1 : '';

        return photoId ? new Promise(resolve => {
          chrome.runtime.sendMessage({
            cmd: 'CROSS_ORIGIN_GET',
            args: {
              url: 'https://api.500px.com/v1/photos',
              data: {
                ids: photoId,
                image_size: 4096
              }
            }
          }, response => resolve(response && response.photos && response.photos[photoId] && response.photos[photoId].image_url.length &&
            response.photos[photoId].image_url[0] || ''));
        }) : '';
      }
    }, {
      srcRegExp: '/user_(avatar|cover)/(\\d+)/',
      processor: (trigger, src, srcRegExpObj) => {
        var {
          type,
          userId
        } = srcRegExpObj.test(src) ? {
          type: RegExp.$1,
          userId: RegExp.$2
        } : {};

        return userId ? type == 'avatar' && tools.cacheImage(userId) || new Promise(resolve => {
          chrome.runtime.sendMessage({
            cmd: 'CROSS_ORIGIN_GET',
            args: {
              url: `https://api.500px.com/v1/users/${userId}`
            }
          }, response => resolve(response && response.user &&
            (type == 'avatar' && response.user.userpic_url && tools.cacheImage(userId, response.user.userpic_url) || response.user.cover_url) || ''));
        }) : '';
      }
    }, {
      srcRegExp: '/group_avatar/(\\d+)/',
      processor: (trigger, src, srcRegExpObj) => {
        var groupId = srcRegExpObj.test(src) ? RegExp.$1 : '';

        return groupId ? tools.cacheImage(groupId) || new Promise(resolve => {
          chrome.runtime.sendMessage({
            cmd: 'CROSS_ORIGIN_GET',
            args: {
              url: `https://legacy-api.500px.com/v1/groups/${groupId}`
            }
          }, response => resolve(response && response.group && response.group.avatars &&
            tools.cacheImage(groupId, response.group.avatars[Object.keys(response.group.avatars).sort((size1, size2) => parseInt(size2) - parseInt(size1))[0]].url) || ''));
        }) : '';
      }
    }, {
      srcRegExp: '/static/media/.+@IMG@'
    }]
  },
  '(?:.+\\.)?acpjournals\\.org': {
    srcMatching: [{
      srcRegExp: '/medium/(\\w+)\\.jpg',
      processor: '/large/$1.jpeg'
    },{
      srcRegExp: '\\.cover@IMG@'
    }]
  },
  'www\\.amazon(?:\\.(?:com|[a-z]{2}))+': {    // co|au|br|ca|cn|de|es|fr|hk|in|it|jp|mx|nl|tr|uk
    amendStyles: {
      pointerNone: '.backGround'
    },
    srcMatching: {
      selectors: 'img,.a-button-thumbnail .a-button-input,.a-link-normal,.floor-hotasin-item-image',
      srcRegExp: '(//.*\\.(?:ssl-images|media)-amazon\\.com/images/.*?)\\._.+(@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.parent().find('img').attr('src')) ? RegExp.$1 + RegExp.$2 : ''
    }
  },
  'andino\\.shop': {
    amendStyles: {
      pointerNone: '.dali-teaser'
    },
    srcMatching: [{
      srcRegExp: '.+?\\?remote=([^&]+)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? decodeURIComponent(RegExp.$1) : ''
    }, {
      srcRegExp: '(/storage/images/.+?\\?.+?)width=.*',
      processor: '$1'
    }]
  },
  'www\\.apple\\.com': {    // TODO: max size: 6000
    amendStyles: {
      pointerNone: '.gallery-nav-line'
    },
    srcMatching: {
      srcRegExp: '(store\\.storeimages\\.cdn-apple\\.com/[^?]+\\?).*',
      processor: '$1wid=1000&fmt=png-alpha'
    }
  },
  '(?:(?:www|magazine)\\.artstation|davidnakayama)\\.com': {
    amendStyles: {
      pointerNone: 'a .overlay,.project-image .overlay,.mature-content-label,.gallery-grid-overlay,.album-grid-item-overlay',
      pointerAuto: '.project-image .overlay .avatar,.gallery-grid-overlay .gallery-grid-info>img'
    },
    srcMatching: [{
      srcRegExp: '(cdn\\w?\\.artstation\\.com/p/users/covers/.+/)small(/.+@IMG@.*)',
      processor: '$1default$2'
    }, {
      srcRegExp: '(cdn\\w?\\.artstation\\.com/p/marketplace/.+/.+_)small(/.+@IMG@.*)',
      processor: '$1big$2'
    }, {
      srcRegExp: '(cdn\\w?\\.artstation\\.com/.+?/)(?:\\d{14}/)?(?:medium|\\w+_square|thumbnail)(/.+@IMG@.*)',
      processor: '$1large$2'
    }, {
      selectors: 'img,.overlay>a',
      srcRegExp: '(//magazine\\.artstation\\.com/.+)(?:-\\d+x\\d+)?(@IMG@.*)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.parent().next('img').attr('src')) ? RegExp.$1 + RegExp.$2 : ''
    }, {
      selectors: 'img,.overlay>a',
      srcRegExp: '//cdn\\w?\\.artstation\\.com/.*@IMG@.*',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.parent().next('img').attr('src')) ? RegExp['$&'] : ''
    }]
  },
  '(?:www|image)\\.baidu\\.com': {
    amendStyles: {
      pointerNone: '.imgbox+.hover,.opr-recommends-merge-mask,.op-short-video-pc-play-icon,.op-short-video-pc-duration-wrap,.op-img-address-hoverview',
      pointerAuto: '.imgbox+.hover a[href]'
    },
    srcMatching: [{
      selectors: '.op-short-video-pc-img',
      processor: trigger => trigger.data('src')
    }, {
      selectors: 'img,.imgavatar',
      srcRegExp: '(t\\d+\\.baidu\\.com/it/.+&fm=\\d+).*',
      processor: '$1'
    }, {
      selectors: 'a[href] img,.img-box img',
      processor: (trigger, src) => {
        var link = trigger.closest('a'),
        src = /objurl=([^&]+)/.test(link.attr('href')) ? decodeURIComponent(RegExp.$1) : (link.data('objurl') || src);

        return tools.detectImage(src).then(imgInfo => imgInfo.src ||
          tools.detectImage(`//timgsa.baidu.com/timg?quality=80&size=b9999_10000&imgtype=0&src=${encodeURIComponent(src)}`, '', img => img.width * img.height < 50).then(imgInfo => imgInfo.src ||
            new Promise((resolve, reject) => {
              $.ajax(trigger.closest('a').attr('href'), {
                success: response => resolve(/id="currentImg"[\s\S]*?src="([^"]+)"/.test(response) ? RegExp.$1.replace(/&amp;/g, '&') : src),
                error: () => resolve(src)
              });
            })));
      }
    }]
  },
  'tieba\\.baidu\\.com': {
    amendStyles: {
      pointerNone: '.threadlist_pic_highlight,.feed_highlight,.liveshow_slide_container .play_mask'
    },
    srcMatching: [{
      selectors: 'img[original]',
      processor: trigger => trigger.attr('original')
    }, {
      srcRegExp: '(.+\\.baidu\\.com/forum/).+?(/\\w+@IMG@)',
      processor: '$1pic/item$2'
    }, {
      srcRegExp: '(.+\\.(?:bdstatic|himg\\.baidu)\\.com/.+)/portrait/(.+)',
      processor: '$1/portraith/$2'
    }, {
      srcRegExp: '.+\\.bdstatic\\.com/.+\\bsrc=(.+@IMG@)',
      processor: (trigger, src, srcRegExpObj) => decodeURIComponent(srcRegExpObj.test(src) ? RegExp.$1 : '')
    }, {
      srcRegExp: '.+\\.(?:bdstatic|baidu)\\.com/.+@IMG@'
    }]
  },
  'www\\.behance\\.net': {
    srcMatching: [{
      selectors: 'img,.js-project-cover,[class^="Cover-wrapper-"]',
      srcRegExp: '(//mir-s\\d+-cdn-cf\\.behance\\.net/projects/)(?:\\w+_)?\\d+(/.+@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.find('img[class^="ProjectCoverNeue-image-"],img[class^="AppreciationCover-image-"]').attr('src')) ? (`${RegExp.$1}original${RegExp.$2}`) : ''
    }, {
      srcRegExp: '(//mir-s\\d+-cdn-cf\\.behance\\.net/(?:user|team)/)\\d+(/.+@IMG@)',
      processor: '$1276$2'
    }, {
      selectors: 'a[class^="Card-link-"]',
      processor: trigger => trigger.parent().find('img[class^="Card-image-"]').attr('src') || ''
    }]
  },
  'www\\.bestbuy(?:\\.(?:com|[a-z]{2}))+': {    // ca|mx
    amendStyles: {
      pointerNone: '[class^="sliderTarget_"]'
    },
    srcMatching: [{
      srcRegExp: '((?:pisces\\.bbystatic\\.com|merchandising-assets\\.bestbuy\\.ca)/.+@IMG@).*',
      processor: '$1'
    }, {
      srcRegExp: '(multimedia\\.bbycastatic\\.ca/.+?/)\\d+x\\d+(/.+@IMG@)',
      processor: '$1500x500$2'
    }]
  },
  '.+\\.bilibili\\.com': {
    amendStyles: {
      pointerNone: '.groom-module .card-mark,.spread-module .pic img~*,.spread-module .pic .lazy-img~*,.cover-ctn .cover-back,.hot-list-content .hover-mask,.play-mask,.recommend-box .info,.hover-cover-box *,.cover *:not(img),.image-area *:not(img),.face-pendants,.pendant,.user-decorator,.bilibili-player-ending-panel-box-recommend-cover,.van-framepreview,.fake-danmu,.fake-danmu-mask,.preview-bg,.pl__mask',
      pointerAuto: '.hover-cover-box .cover-ctnr,.image-area .see-later,.cover .i-watchlater'
    },
    srcMatching: [{
      selectors: 'img,[style*=background-image],.card-live-module .pic .mask,.cover-ctn .cover,.album-img,.user-container i,.drawer-card .img-ctn,.canvas-card .img-contain',
      srcRegExp: '(i\\d+\\.hdslb\\.com/.+?@IMG@)[^?]*(\\?.*)?',
      processor: '$1$2'
    }, {
      selectors: '.cardBangumibox .modal-box,.song-shadow',
      srcRegExp: '(//i\\d+\\.hdslb\\.com/.+?@IMG@)[^?]*(\\?.*)?',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(trigger.find('img').attr('src')) ? (RegExp.$1 + RegExp.$2) : ''
    }]
  },
  '.+\\.bing\\.com': {
    srcMatching: [{
      selectors: '.iusc img',
      srcRegExp: '(//.+\\.bing\\.(?:com|net)/th(?:/id/[^?]+)|\\?id=[^&]+)',
      processor: (trigger, src, srcRegExpObj) => {
        var data = JSON.parse(trigger.closest('.iusc').attr('m')),
          defaultSrc = srcRegExpObj.test(src) ? RegExp.$1 : (srcRegExpObj.test(data.turl) ? RegExp.$1 : '');

        return tools.detectImage(data.murl, defaultSrc).then(imgInfo => imgInfo.src);
      }
    }, {
      srcRegExp: '.+\\.bing\\.(?:com|net)/th\\?q=.+',
      processor: (trigger, src, srcRegExpObj) => {
        if (srcRegExpObj.test(src)) {
          var url = new URL(src),
            params = url.searchParams;

          if (params.getAll('q').length > 1) {
            params.set('w', parseInt(params.get('w')) * 4);
            params.set('h', parseInt(params.get('h')) * 4);
          } else {
            params.delete('w');
            params.delete('h');
          }

          params.set('qlt', 100);

          src = url.href;
        } else {
          src = '';
        }

        return src;
      }
    }, {
      srcRegExp: '.+\\.bing\\.(?:com|net)/th\\?id=.+',
      processor: (trigger, src, srcRegExpObj) => {
        if (srcRegExpObj.test(src)) {
          var url = new URL(src),
            params = url.searchParams;

          params.get('id').split(':').length > 1 && trigger.closest('li').length && params.set('id', params.get('id').split(':')[trigger.closest('li').index()]);
          params.delete('w');
          params.delete('h');
          params.set('qlt', 100);

          src = url.href;
        } else {
          src = '';
        }

        return src;
      }
    }]
  },
  '(?:.+\\.)?briscoes\\.co\\.nz': {
    srcMatching: {
      selectors: 'img,.productItem-image',
      srcRegExp: '(.+/productimages/.+@IMG@).*',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.find('img').attr('src')) ? RegExp.$1 : ''
    }
  },
  '(?:.+\\.)?(?:(?:catch(?:oftheday)?|treatme)\\.co\\.nz|(?:catch|cudo|deals|groceryrun|luxuryescapes|mumgo|scoopon)\\.com(?:\\.au)?)': {
    amendStyles: {
      pointerNone: '.product--buy-form--container',
      pointerAuto: '.product--buy-form--container a'
    },
    srcMatching: [{
      selectors: 'img,.cnt-deal-list',
      srcRegExp: '(.+\\.com/lux-group/image/upload/)[^/]+/(.+)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.find('img').attr('src')) ? (RegExp.$1 + RegExp.$2) : ''
    }, {
      srcRegExp: '(//s\\.catch\\.com\\.au/.+)_[^/]+(@IMG@)',
      processor: '$1$2'
    }, {
      srcRegExp: '(/magazine/.+?)(?:-\\d+x\\d+)?(@IMG@)',
      processor: '$1$2'
    }]
  },
  'shop\\.countdown\\.co\\.nz': {//TODO: detect 'large', fallback to 'big'
    srcMatching: {
      srcRegExp: '(//static.countdown.co.nz/assets/product-images/)\\w+(/\\w+@IMG@).*',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? tools.detectImage(`${RegExp.$1}zoom${RegExp.$2}`, `${RegExp.$1}large${RegExp.$2}`).then(imgInfo => imgInfo.src) : ''
    }
  },
  '(?:.+\\.)?dangdang\\.com': {
    srcMatching: [{
      srcRegExp: '.*\\.(?:ddimg\\.cn|dangdang\\.com)/digital/.+_cover@IMG@'
    }, {
      srcRegExp: '(.*\\.(?:ddimg\\.cn|dangdang\\.com)/[^_]+?)_[^oy]((?:_?\\w+)?@IMG@)',
      processor: '$1_o$2'
    }]
  },
  '(?:www|shop)\\.deviantart\\.com': {
    amendStyles: {
      pointerNone: '._3wSWI,a[href*="/gallery/"] ._3mYQ1,.shop-header .overlay-info,.shop-header [class*=figcaption]',
      pointerAuto: '._3wSWI a,._3wSWI button,.shop-header .overlay-info a,.shop-header [class*=figcaption] a'
    },
    srcMatching: [{
      selectors: 'a[data-super-full-img] img',
      processor: trigger => trigger.closest('a').data('super-full-img').replace(/,q_\d+/, ',q_100') || ''
    }, {
      selectors: 'a[data-hook="deviation_link"],a[href*="/art/"] img',
      processor: trigger => {
        var deviationId = /(\d+)$/.test(trigger.attr('href') || trigger.closest('a').attr('href')) ? RegExp.$1 : '';

        return deviationId && (trigger.is('img') || trigger.prev().find('>img,>[style*=background-image]').length) ? new Promise((resolve, reject) => {
          $.ajax('/_napi/shared_api/deviation/extended_fetch', {
            dataType: 'json',
            data: {
              deviationid: deviationId,
              type: 'art',
              include_session: false
            },
            success: response => {
              var mediaInfo = response && response.deviation && response.deviation.media,
                imgInfo = mediaInfo ? mediaInfo.types.pop() : null;

              mediaInfo && mediaInfo.baseUri && imgInfo ? resolve(`${mediaInfo.baseUri}${imgInfo.c ? `/${imgInfo.c.replace('<prettyName>', mediaInfo.prettyName || '').replace(/,q_\d+/, ',q_100')}` : ''}${mediaInfo.token ? `?token=${mediaInfo.token[0]}` : ''}`) : reject();
            },
            error: reject
          });
        }) : '';
      }
    }, {
      selectors: 'a[href*="/gallery/"] img,a[href*="/favourites/"] img',
      processor: trigger => {
        var {
          userName,
          folderType,
          folderId
        } = /\/([^/]+)\/(gallery|favourites)\/(\d+)\//.test(trigger.closest('a').attr('href')) ? {
          userName: RegExp.$1,
          folderType: RegExp.$2 == 'favourites' ? 'collection' : RegExp.$2,
          folderId: RegExp.$3
        } : {};

        return folderId ? new Promise((resolve, reject) => {
          $.ajax(`/_napi/da-user-profile/api/${folderType}/contents`, {
            data: {
              username: userName,
              folderid: folderId,
              offset: 0,
              limit: 1
            },
            success: response => {
              var mediaInfo = response && response.results && response.results[0].deviation.media,
                imgInfo = mediaInfo ? mediaInfo.types.pop() : null;

              mediaInfo && mediaInfo.baseUri && imgInfo ? resolve(`${mediaInfo.baseUri}${imgInfo.c ? `/${imgInfo.c.replace('<prettyName>', mediaInfo.prettyName || '').replace(/,q_\d+/, ',q_100')}` : ''}${mediaInfo.token ? `?token=${mediaInfo.token[0]}` : ''}`) : reject();
            },
            error: reject
          });
        }) : '';
      }
    }, {
      srcRegExp: '(//a\\.deviantart\\.net/avatars)(?:-\\w+)?(/.+@IMG@).*',
      processor: (trigger, src, srcRegExpObj) => {
        if (srcRegExpObj.test(src)) {
          var userId = trigger.closest('[data-userid]').data('userid') || trigger.closest('[gmi-userid]').attr('gmi-userid');

          src = tools.cacheImage(userId) || tools.detectImage(`${RegExp.$1}-original${RegExp.$2}`, `${RegExp.$1}-big${RegExp.$2}`).then(imgInfo => tools.cacheImage(userId, imgInfo.src));
        } else {
          src = '';
        }

        return src;
      }
    }, {
      srcRegExp: 'www\\.da-files\\.com/.+@IMG@'
    }]
  },
  '.+\\.dhgate\\.com': {
    amendStyles: {
      pointerNone: '.mask-bg'
    },
    srcMatching: [{
      srcRegExp: '(//www\\.dhresource\\.com/(?:.+/)?)\\d+x\\d+\\w?/((?:\\w+[-/]){6})(.+?@IMG@).*',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? RegExp.$1 + RegExp.$2.split('-').join('/') + RegExp.$3 : ''
    }, {
      srcRegExp: 'www\\.dhresource\\.com/.+@IMG@'
    }]
  },
  '(?:.+\\.)?douban\\.(?:com|fm)': {
    srcMatching: [{
      selectors: 'img,.programme-list .cover,.programme-cover,.songlist .cover',
      srcRegExp: 'img\\d+\\.doubanio\\.com/(?:view|img)/.*(?:large|raw|retina)/.+@IMG@',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.find('img').attr('src')) ? RegExp['$&'] : ''
    }, {
      selectors: 'img,.celebrities-list .avatar,.songlist .cover',
      srcRegExp: '(img\\d+\\.doubanio\\.com/view/\\w+/).*(/public/.+@IMG@)',
      processor: '$1l$2'
    }, {
      srcRegExp: '(img\\d+\\.doubanio\\.com/icon/)up?([-\\d]+@IMG@)',
      processor: '$1ul$2'
    }, {
      srcRegExp: '(img\\d+\\.doubanio\\.com/pview/\\w+_poster/)(?:small|median|large)(/public/.+@IMG@)',
      processor: '$1raw$2'
    }]
  },
  'dribbble\\.com': {
    amendStyles: {
      pointerNone: '.dribbble-over,.dribbble-video'
    },
    srcMatching: [{
      srcRegExp: '(cdn\\.dribbble\\.com/.+)(?:_teaser|_\\d+x)(@IMG@)',
      processor: '$1$2'
    }, {
      srcRegExp: '(cdn\\.dribbble\\.com/.+)/thumbnail/(.+)',
      processor: '$1/$2'
    }, {
      srcRegExp: '(cdn\\.dribbble\\.com/users/\\d+/avatars/)(?:mini|small|normal)(/(?:.+@IMG@|data))',
      processor: '$1original$2'
    }, {
      srcRegExp: 'cdn\\.dribbble\\.com/.+@IMG@.*'
    }]
  },
  'www\\.duokan\\.com': {
    srcMatching: {
      srcRegExp: '(cover\\.read\\.duokan\\.com/.+@IMG@)!.*',
      processor: '$1'
    }
  },
  '(?:.+\\.)?ebay(?:\\.(?:com|[a-z]{2}))+': {    // co|au|at|be|ca|ch|de|es|fr|hk|ie|it|my|nl|ph|pl|sg|uk
    amendStyles: {
      pointerNone: '.vi-filmstp .sel,.hl-image__background'
    },
    srcMatching: {
      selectors: 'img,.hl-image',
      srcRegExp: '(i\\.ebayimg\\.com/.+/s-l)\\d+(?:/p)?(@IMG@)',
      processor: '$12000$2'
    }
  },
  'www\\.etsy\\.com': {
    amendStyles: {
      pointerNone: '.wt-position-absolute.wt-position-top.wt-position-bottom.wt-position-left.wt-position-right'
    },
    srcMatching: [{
      srcRegExp: '(.*\\.etsystatic\\.com/isc/.+?_)\\d+x\\d+(.*@IMG@.*)',
      processor: '$1190x190$2'
    }, {
      srcRegExp: '(.*\\.etsystatic\\.com/.+?_)\\d+x(?:\\d+|N)(.*@IMG@.*)',
      processor: '$1fullxfull$2'
    }]
  },
  '\\w+\\.facebook\\.com': {
    amendStyles: {
      pointerNone: '._52d9,.uiMediaThumb+._53d,._3251,._7m4,#fbProfileCover .coverBorder,img+.pmk7jnqg',
      pointerAuto: '.uiMediaThumb+._53d a'
    },
    srcMatching: [{
      selectors: 'a[href^="/events/"] img',
      processor: (trigger, src) => {
        var link = trigger.closest('a[href^="/events/"]').attr('href');

        return new Promise((resolve, reject) => {
          $.ajax(link, {
            success: response => resolve(/id="event_header_primary".*?data-ploi="([^"]+)"/.test(response) ? RegExp.$1.replace(/&amp;/g, '&') : ''),
            error: reject
          });
        });
      }
    }, {
      srcRegExp: '//.+\\.fbcdn\\.net/safe_image\\.php\\?.+&url=([^&]+)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? decodeURIComponent(RegExp.$1) : ''
    }, {
      selectors: 'img,[style*=background-image],a[data-video-channel-id],image',
      srcRegExp: '/\\d+_(\\d+)_\\w+@IMG@\\?',
      processor: (trigger, src, srcRegExpObj) => {
        var bgSrc = tools.getBackgroundImgSrc(trigger);
        src = /\.gif$/.test(src) && bgSrc && !/\.gif$/.test(bgSrc) && bgSrc || src || trigger.find('img').attr('src');

        var link = trigger.closest('a').attr('ajaxify') || trigger.closest('a').attr('href'),
          asyncGetToken = /"async_get_token":"([^"]+)"/.test(document.documentElement.innerHTML) ? RegExp.$1 : '',
          profileId = ['', trigger.closest('[data-hovercard]').attr('data-hovercard'), trigger.closest('a').attr('href'), $(`#${trigger.closest('[data-ownerid]').data('ownerid')}`).attr('data-hovercard')].reduce((acc, cur) => acc ? acc : /\.php\?id=([^&]+)/.test(cur) ? RegExp.$1 : ''),
          fbId = '';

        return new Promise((resolve, reject) => {
          if (trigger.hasClass('scaledImageFitWidth') && /^https?:\/\/www\.facebook\.com\/\w+/.test(link)) {    // User profile card background image.
            $.ajax(link, {
              success: userProfileDoc => {
                link = /class="coverWrap\s.*?".*?href="([^"]+)"/.test(userProfileDoc) ? RegExp.$1 : link;
                resolve();
              },
              error: reject
            });
          } else {
            resolve();
          }
        })
        .then(() => {
          fbId = /www\.facebook\.com\/photo\.php\?.*fbid=([^&]+)/.test(link) ? RegExp.$1 :
            (/(?:www\.facebook\.com)?\/[^/]+\/photos\/(?:[^/]+\/)?(\d+)/.test(link) ? RegExp.$1 :
              (srcRegExpObj.test(src) ? RegExp.$1 : ''));

          var cachedHdImgSrc = fbId && tools.cacheImage(fbId);

          return cachedHdImgSrc ? {
            id: fbId,
            src: cachedHdImgSrc
          } : new Promise((resolve, reject) => {
            fbId && $.ajax('/ajax/pagelet/generic.php/PhotoViewerInitPagelet', {
              data: {
                fb_dtsg_ag: asyncGetToken,
                data: JSON.stringify({
                  fbid: fbId
                }),
                __a: 1
              },
              dataType: 'json',
              dataFilter: data => data.substr(9),
              success: response => {
                try {
                  resolve({
                    id: fbId,
                    src: response.jsmods.require[2][3][0].image[fbId].url
                  });
                } catch (error) {
                  reject();
                }
              },
              error: reject
            }) || reject();
          });
        })
        .catch(() => {
          var cachedHdImgSrc = profileId && tools.cacheImage(profileId);
          return cachedHdImgSrc ? {
            id: profileId,
            src: cachedHdImgSrc
          } : new Promise((resolve, reject) => {
            profileId && $.ajax('/profile/picture/view', {
              data: {
                fb_dtsg_ag: asyncGetToken,
                profile_id: profileId,
                __a: 1
              },
              dataType: 'json',
              dataFilter: data => data.substr(9),
              success: response => {
                try {
                  resolve({
                    id: fbId || profileId,
                    src: response.jsmods.require[1][3][1].query_results.edges[0].node.image2.uri
                  });
                } catch (error) {
                  reject();
                }
              },
              error: () => resolve('')
            }) || reject();
          });
        })
        .then(hdImgInfo => {
          hdImgInfo.src = hdImgInfo.src || src;
          tools.cacheImage(hdImgInfo.id, hdImgInfo.src);

          return hdImgInfo.src;
        }, () => src);
      }
    }]
  },
  '(?:www\\.)?flickr\\.com': {
    amendStyles: {
      pointerNone: '.facade-of-protection-neue,.photo-list-tag-view .overlay'
    },
    srcMatching: [{
      selectors: 'img,[style*="background-image"],.photo-list-description-view,.photo-list-gallery-photo-view .photo-container',
      srcRegExp: '//.+\\.static\\.?flickr\\.com/(?:\\d+/)+(\\d+)_.+@IMG@',
      processor: (trigger, src, srcRegExpObj) => {
        var apiKey = $('[photoshow-flickr-apikey]').val() || (/"site_key"\s*:\s*"(\w+)"/.test($('script:contains("site_key")').text()) ? RegExp.$1 : ''),
          photoId = srcRegExpObj.test(decodeURIComponent(src) || tools.getBackgroundImgSrc(trigger) || tools.getBackgroundImgSrc(trigger.find('.photo'))) ? RegExp.$1 : '';

        return apiKey && photoId ? new Promise(resolve => {
          $('[photoshow-flickr-apikey]').length || $('<input type="hidden" photoshow-flickr-apikey />').val(apiKey).appendTo(document.body);

          chrome.runtime.sendMessage({
            cmd: 'CROSS_ORIGIN_GET',
            args: {
              url: 'https://api.flickr.com/services/rest',
              data: {
                extras: 'sizes',
                photo_id: photoId,
                method: 'flickr.photos.getInfo',
                api_key: apiKey,
                csrf: /csrf=([^&]+)/.test($('[data-track="footer-language"]').attr('href')) ? RegExp.$1 : '',
                format: 'json',
                nojsoncallback: 1
              }
            }
          }, response => resolve(response && response.photo && response.photo.sizes && response.photo.sizes.size.length && response.photo.sizes.size.filter(medium => medium.media == 'photo').pop().source || ''));
        }) : '';
      }
    }, {
      selectors: 'img,.avatar,.thumbnail',
      srcRegExp: '(//.+\\.staticflickr\\.com/\\d+/buddyicons/.+?)(?:_\\w)?(@IMG@.*)',
      processor: '$1_r$2'
    }, {
      selectors: '.cover',
      srcRegExp: '(.+\\.static\\.?flickr\\.com/.*coverphoto.*?)(?:_\\w)?(@IMG@.*)',
      processor: '$1_h$2'
    }]
  },
  '(.+\\.)?github\\.(?:com|blog)': {
    srcMatching: [{
      selectors: '.js-navigation-open',
      srcRegExp: '(?://github\\.com/)?(.+/)(?:blob|raw)/(.+@IMG@).*',
      processor: '//raw.githubusercontent.com$1$2'
    }, {
      srcRegExp: '((?:avatars\\d+|marketplace-screenshots)\\.githubusercontent\\.com/[^?]+).*',
      processor: '$1'
    }, {}]
  },
  'play\\.google\\.com': {
    amendStyles: {
      pointerNone: '.rg_anbg,.rg_ilmbg'
    },
    srcMatching: {
      selectors: 'img,[style*="background-image"],.wXUyZd,.TdqJUe',
      srcRegExp: '(//(?:.*\\.googleusercontent|books\\.google)\\.com/[^=]+)=.*',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.parent().find('img[src]').attr('src')) ? `${RegExp.$1}=w10000` : ''
    }
  },
  'www\\.google\\.com': {
    srcMatching: [{
      selectors: 'img',
      processor: (trigger, src) => window.photoShowHdSrcCache[trigger.closest('[data-tbnid]').data('tbnid')] || trigger.closest('[data-photoshow-hd-src]').data('photoshow-hd-src') || ''
    }, {
      selectors: 'a[href*="#imgrc="] img',
      processor: trigger => {
        var link = trigger.closest('a').attr('href'),
          imgId = /#imgrc=(.*)/.test(link) ? RegExp.$1 : '';

        return /\/imgres\?imgurl=([^&]+)/.test(link) ? decodeURIComponent(RegExp.$1) : (/\/search\?.*\btbm=isch\b/.test(link) ? new Promise(resolve => {
          $.ajax(link, {
            success: imgSearchResultDoc => resolve(new RegExp(`"${imgId}",\\[.*?\\]\\n,\\["(https?:\/\/.+?)"(?:,\\d+)+\\]`).test(imgSearchResultDoc) ? JSON.parse(`"${RegExp.$1}"`) : ''),
            error: () => resolve('')
          });
        }) : '');
      }
    }],
    onToggle: isOn => {
      if (isOn) {
        window.photoShowHdSrcCache = window.photoShowHdSrcCache || {};

        [...document.scripts].filter(script => /^AF_initDataCallback\b/.test(script.text)).forEach(script => {
          [...script.text.matchAll(/"([-\w]{14})",\[.*?\]\n,\["(https?:\/\/.+?)"(?:,\d+)+\]/g)].forEach(([match, id, hdSrc]) => {
            try {
              window.photoShowHdSrcCache = {...window.photoShowHdSrcCache, [id]: JSON.parse(`"${hdSrc.replace(/\\\\(?=u[a-f\d]+)/ig, '\\')}"`)}
            } catch(error){}
          })
        });
      } else {
        $('[data-photoshow-hd-src]').removeAttr('data-photoshow-hd-src');
        delete window.photoShowHdSrcCache;
      }
    },
    onXhrLoad: (url, response) => {
      if (/\bbatchexecute\b/.test(url)) {
        [...response.matchAll(/\\"([-\w]{14})\\",\[.*?\]\\n,\[\\"(https?:\/\/.+?)\\"(?:,\d+)+\]/g)].forEach(([match, id, hdSrc], i) => {
          try {
            document.querySelector(`[data-tbnid="${id}"]`).setAttribute('data-photoshow-hd-src', JSON.parse(`"${hdSrc.replace(/\\\\(?=u[a-f\d]+)/ig, '\\')}"`));
          } catch(error){}
        })
      }
    }
  },
  'huaban\\.com': {
    amendStyles: {
      pointerNone: '.pin a.img .cover,.pin-view .board-piece .board-pins .cell .cover,.Board .link .over,.Board .link .shadows'
    },
    srcMatching: {
      srcRegExp: '(.*\\.(huabanimg|b\\d+\\.upaiyun)\\.com/\\w+-\\w{6})_/?(?:fw|sq)/?\\d+.*',
      processor: '$1'
    }
  },
  'imgur\\.com': {
    amendStyles: {
      pointerNone: '.post .point-info,.Post-item-meta:nth-child(2),.sg-list-image .sg-item-tag,.Tag .Tag-title'
    },
    srcMatching: {
      selectors: 'img,.Tag,.sg-list-image,.Suggestion-item .thumbnail',
      srcRegExp: '(i\\.imgur\\.com/\\w{7}).*?(@IMG@).*',
      processor: '$1$2'
    }
  },
  'www\\.instagram\\.com': {
    amendStyles: {
      pointerNone: '.qn-0x,._9AhH0'
    },
    srcMatching: [{
      selectors: 'a img',
      processor: (trigger, src) => new Promise(resolve => {
        var url = trigger.closest('a').attr('href');

        $.ajax(url, {
          data: {
            __a: 1
          },
          success: response => {
            if (response && response.graphql) {
              if (/^\/p\//.test(url)) {
                if (response.graphql.shortcode_media) {
                  src = response.graphql.shortcode_media || src;

                  if (response.graphql.shortcode_media.display_resources) {
                    src = response.graphql.shortcode_media.display_resources.sort((resource1, resource2) => resource2.config_width - resource1.config_width)[0].src;
                  }
                }
              } else if (response.graphql.user) {
                src = response.graphql.user.profile_pic_url_hd || profile_pic_url_hd.user.profile_pic_url || src;
              }
            }

            resolve(src);
          },
          error: () => resolve(src)
        });
      })
    }, {}]
  },
  '(?:.+\\.)?jamanetwork\\.com': {
    srcMatching: {
      srcRegExp: 'cdn\\.jamanetwork\\.com/.+@IMG@',
      processor: (trigger, src, srcRegExpObj) => {
        const link = trigger.closest('a').attr('href');
        return srcRegExpObj.test(src) && srcRegExpObj.test(link) ? link : src;
      }
    }
  },
  'jandan\\.net': {
    amendStyles: {
      pointerNone: '.gif-mask,.show_more'
    },
    noReferrer: true,
    srcMatching:[{
      srcRegExp: '(img\\.jandan\\.net/.+@IMG@).*',
      processor: '$1'
    }, {
      selectors: '.view_img_link~img',
      processor: trigger => trigger.siblings('.view_img_link').attr('href') || ''
    }]
  },
  '(?:.+\\.)?(jd|yhd|tuniu)\\.(?:com|hk)': {
    amendStyles: {
      pointerNone: '.d-soldout,.pic .picmask,.pic .words,.pic .sta,.gallery-mask,.gallery-thumb-play,.photograph .mask,a.pro_pic>:not(img),.pro_item .pro_pic>:not(a)'
    },
    srcMatching: [{
      srcRegExp: '(.+\\.360buyimg\\.com/).*((?:jfs|g\\d+)/.+@IMG@).*',
      processor: '$1n1/s800x800_$2'
    }, {
      srcRegExp: '(s\\.tuniu\\.net/.+@IMG@).*',
      processor: '$1'
    }, {
      srcRegExp: '(//(?:tuniupic\\.360buyimg|.+\\.tuniucdn)\\.com/.+?)(?:_w\\d+_h\\d+_c\\d+_t\\d+)*(@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? tools.detectImage(RegExp.$1 + RegExp.$2, `${RegExp.$1}_w800_h0_c0_t0${RegExp.$2}`).then(imgInfo => imgInfo.src) : ''
    }]
  },
  'www\\.kmart\\.com': {
    srcMatching: {
      srcRegExp: '(.+\\.shld\\.net/[^?]+)(?:\\?.*\\bsrc=([^&]+).*)?',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? (RegExp.$2 ? decodeURIComponent(RegExp.$2) : RegExp.$1) : ''
    }
  },
  'www\\.kmart\\.(?:com\\.au|co\\.nz)': {
    srcMatching: {
      srcRegExp: '(/wcsstore/Kmart/images/ncatalog/)\\w+(/.+-)\\w+(@IMG@)',
      processor: '$1sz$2sz$3'
    }
  },
  '(.+\\.(?:mi|xiaomiyoupin))\\.com': {
    amendStyles: {
      pointerNone: '.home-good-item-big .pro-text,'
    },
    srcMatching: [{
      srcRegExp: '((?:.+\\.mifile\\.cn|static\\.home\\.mi\\.com)/.+?)(?:!\\d+x\\d+)?(@IMG@).*',
      processor: '$1$2'
    }, {
      srcRegExp: '.+\\.(?:mifile\\.cn|files.xiaomi.net/.+/avatar)/.+(?!@IMG@)'
    }, {
      srcRegExp: '(.+\\.mi-img\\.com/.+@IMG@).*',
      processor: '$1'
    }]
  },
  '.+\\.myprotein(?:\\.(?:com|[a-z]{2}))+': {
    srcMatching: [{
      srcRegExp: '(s\\d+\\.thcdn\\.com/productimg/)\\d+/\\d+(/.+@IMG@)',
      processor: '$11600/1600$2'
    }, {
      srcRegExp: '(uploads-cdn\\.thgblogs\\.com/.+?)(?:-150x150)?(@IMG@)',
      processor: '$1$2'
    }, {}]
  },
  '(?:.+\\.)?nejm\\.org': {
    srcMatching:[{
      srcRegExp: '/img_\\w+/(\\w+@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? trigger.data('lg-src') : ''
    }, {
      srcRegExp: '(csvc\\.nejm\\.org/ContentServer/images\\?id=[^&]+).*',
      processor: '$1'
    }, {
      srcRegExp: '(.+-wpengine\\.netdna-ssl\\.com/.+)-\\d+x\\d+(@IMG@)',
      processor: '$1$2'
    }, {}]
  },
  '(?:.+\\.)?newegg(?:\\.(?:com|[a-z]{2}))+': {    // ca|cn
    srcMatching: [{
      srcRegExp: '((?:\\w*\\.neweggimages|(?:ssl-images|images\\d+)\\.newegg)\\.com/(?:.+/)?)productimage(?:compressall\\d*)?/(.+@IMG@)',
      processor: '$1productImagecompressall1280/$2'
    }, {
      srcRegExp: '(media\\.flixcar\\.com/.+)-[a-z]+(@IMG@)',
      processor: '$1$2'
    }, {
      srcRegExp: '(\\w*\\.neweggimages\\.com\\.cn/.+/)p\\d+(/.+@IMG@)',
      processor: '$1p640$2'
    }]
  },
  '.+\\.(nipic|huitu)\\.com': {
    srcMatching: [{
      srcRegExp: '(pic\\d+\\.nipic\\.com/)pic(/.+)_4(@IMG@)',
      processor: '$1file$2_2$3'
    }, {
      srcRegExp: '(pic\\w?\\d+\\.huitu\\.com/)(?:pic|img|res)(/.+?)_\\d(?:_\\w\\d+x\\d+)?(@IMG@)',
      processor: '$1res$2_1$3'
    }, {
      srcRegExp: '(show\\.huitu\\.com/avatar/)(?:\\d+/)?(\\d+@IMG@)',
      processor: '$1$2'
    }, {
      srcRegExp: 'taskupload\\d+\\.huitu\\.com/.+@IMG@'
    }]
  },
  'www\\.noelleeming\\.co\\.nz': {
    amendStyles: {
      pointerNone: '.overlay-container,.promo-overlay'
    },
    srcMatching: [{
      selectors: 'img,.product-list__cover-link',
      srcRegExp: '(/shop/)render-image(/.+)(?:\\.\\d+){2}(@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.siblings('.media__img').find('.media__productImg').attr('src')) ? `${RegExp.$1}content/images${RegExp.$2}${RegExp.$3}` : ''
    }, {
      srcRegExp: '(media\\.flixcar\\.com/.+)-preview(@IMG@)',
      processor: '$1$2'
    }]
  },
  'www\\.nzsale\\.co\\.nz': {
    srcMatching: {
      srcRegExp: '(cdn\\.mysalemarketplace\\.com/.+)_\\d+x\\d+(@IMG@).*',
      processor: '$1$2'
    }
  },
  'www\\.paknsaveonline\\.co\\.nz': {
    srcMatching: {
      srcRegExp: '(a\\.fsimg\\.co\\.nz/.+/)\\d+x\\d+(/\\d+@IMG@)',
      processor: '$1master$2'
    }
  },
  'www\\.pbtech\\.(?:com|co\\.nz)': {
    srcMatching: [{
      srcRegExp: '(www\\.pbtech\\.(?:com/au|co\\.nz)/)thumbs(/.+?@IMG@).*',
      processor: '$1imgprod$2'
    }, {
      selectors: 'img,[style*="background-image"]',
      srcRegExp: 'www\\.pbtech\\.(?:com/au|co\\.nz)/imgprod/.+@IMG@'
    }]
  },
  'www\\.pinterest(?:\\.(?:com|[a-z]{2}))+': {
    amendStyles: {
      pointerNone: 'img~.MIw.QLY.Rym.ojN.p6V'
    },
    srcMatching: {
      selectors: 'img,.pinWrapper a,[role="img"],.relative',
      srcRegExp: '(//i\\.pinimg\\.com/)(?:originals|\\d+x(?:\\d+(?:_\\w+)?)?)(/.+@IMG@)',
      processor: (trigger, src, srcRegExpObj) => trigger.find('video').attr('poster') || (srcRegExpObj.test(src || tools.getLargestImgSrc(trigger.closest('.pinWrapper').find('img'))) ? (`${RegExp.$1}originals${RegExp.$2}`) : '')
    }
  },
  '(?:.+\\.)?(?:pixiv(?:ision|-bungei)?\\.net|booth\\.pm|vroid\\.com)': {
    amendStyles: {
      pointerNone: '.dxCZpw,.TagImageMainBack,.search-guide-tablet-label',
      pointerAuto: '.thumb img'
    },
    srcMatching: [{
      selectors: 'img,[style*="background-image"]',
      srcRegExp: '(.+\\.pximg\\.net/user-profile/.+)_\\d+(@IMG@)',
      processor: '$1$2'
    }, {
      selectors: 'img,[style*="background-image"]',
      srcRegExp: '.+\\.pximg\\.net/(?:imgaz|img-novel)/.+@IMG@'
    }, {
      selectors: 'img,[style*="background-image"]',
      srcRegExp: '(.+\\.pximg\\.net/.+/.+_thumb/.+)_\\w+(@IMG@)',
      processor: '$1$2'
    }, {
      selectors: 'img,[style*="background-image"]',
      srcRegExp: '(.+\\.pximg\\.net)(?=/).+(/uploads/.+/)(?:.+_)?(\\d+@IMG@)',
      processor: '$1$2$3'
    }, {
      selectors: 'img,[style*="background-image"]',
      srcRegExp: '(.+\\.pixiv\\.net/images/post/\\d+)/w/\\d+(/.+@IMG@)',
      processor: '$1$2'
    }, {
      selectors: 'img,[style*="background-image"]',
      srcRegExp: '(.+\\.pximg\\.net)/c!?/[^/]+(/.+@IMG@)',
      processor: '$1$2'
    }, {
      selectors: 'img,[style*="background-image"]',
      srcRegExp: '(//.+\\.pximg\\.net/).+(/img/.+?)(_p\\d+)?_.+(@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? tools.detectImage(`${RegExp.$1}img-original${RegExp.$2}${RegExp.$3 || '_ugoira0'}${RegExp.$4}`, `${RegExp.$1}img-original${RegExp.$2}${RegExp.$3 || '_ugoira0'}.png`).then(imgInfo => imgInfo.src) : ''
    }, {
      selectors: 'img,[style*="background-image"]',
      srcRegExp: '.+\\.pximg\\.net/.+@IMG@'
    }],
    xhrDownload: 'i.pximg.net'
  },
  'www\\.poco\\.cn': {
    amendStyles: {
      pointerNone: '.fade-box,.cc-shadow-cover,.info-item,.cc_info_item,.pui_works_img_normal .txt,.swiper-slide [class^="cc-img-"],.pui_works_img_normal .info-shadow,.pui_works_img_normal .tag',
      pointerAuto: '.info-item .cc_user_item,.cc_info_item a,.pui_works_img_normal .info-shadow .info>*'
    },
    srcMatching: {
      srcRegExp: '.+(\\.pocoimg\\.cn/image/.+?)(?:_[A-Z]\\d+)?(@IMG@).*',
      processor: '//pic3$1$2'
    }
  },
  'www\\.quora.com': {
    amendStyles: {
      pointerNone: '.Toggle[id$="__truncated"] a.ui_overlay'
    },
    srcMatching: [{
      selectors: 'img[master_src]',
      processor: trigger => trigger.attr('master_src')
    }, {
      selectors: '.HyperLinkFeedStory [style*="background-image"],.HyperLinkPreview .link_overlay',
      processor: (trigger, src) => trigger.is('.link_overlay') ? tools.getBackgroundImgSrc(trigger.closest('.HyperLinkPreview').find('.hyperlink_image')) : src
    }, {
      selectors: 'img,.CarouselItem .ui_overlay,.switcher_item_image [style*="background-image"]',
      srcRegExp: '(//qph\\.fs\\.quoracdn\\.net/main-thumb-[-\\w]+-)\\d+(-\\w+@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.parent().find('img').attr('src')) ? (`${RegExp.$1}200${RegExp.$2}`) : ''
    }, {
      selectors: '.ui_layout_thumbnail',
      processor: (trigger, src) => {
        var expandedCon = $(`#${trigger.closest('.Toggle[id$="__truncated"]').attr('id').replace(/__truncated$/, '__expanded')}`),
          hasEmbededCon = $('.ui_qtext_embed_overlay_icon', trigger).length,
          imgs = $(hasEmbededCon ? '.ui_qtext_embed' : 'img.ui_qtext_image', expandedCon);

        return imgs.length ? (imgs.attr('master_src') || imgs.attr('src') || tools.getBackgroundImgSrc(imgs) || src) : new Promise(resolve => {
          var expandedConObserver = new MutationObserver(mutations => {
            imgs = $(hasEmbededCon ? '.ui_qtext_embed' : 'img.ui_qtext_image', expandedCon);
            if (imgs.length) {
              src = imgs.attr('master_src') || imgs.attr('src') || tools.getBackgroundImgSrc(imgs) || src;

              expandedConObserver.disconnect();
              expandedConObserver = null;
              clearTimeout(observerTimer);

              resolve(src);
            }
          });

          expandedConObserver.observe(expandedCon.get(0), {
            childList: true
          });

          var observerTimer = setTimeout(() => {
            expandedConObserver.disconnect();
            expandedConObserver = null;

            resolve(src);
          }, 3000);
        });
      }
    }]
  },
  '(?:user|h5)\\.qzone\\.qq\\.com': {
    amendStyles: {
      pointerNone: '.photo_commentcount,.user-name-bg,.head-dress,.pic-num-wrap,.skin_portrait_round,.layer-description,.mod-photo-item .item-ex',
      pointerAuto: '.layer-description a,.mod-photo-item .item-ex a'
    },
    srcMatching: [{
      srcRegExp: '(.+\\.(?:qpic\\.cn|photo\\.store\\.qq\\.com)/.+?/)[abcilm](/[^&]+).*',
      processor: '$1b$2'
    }, {
      srcRegExp: '(.+\\.(?:qpic\\.cn|photo\\.store\\.qq\\.com)/.+?/)[abcilm]&.*',
      processor: '$1b'
    }, {
      srcRegExp: '(qlogo\\d+\\.store\\.qq\\.com/qzone/(?:\\d+/){2})\\d+.*',
      processor: '$1100'
    }, {
      srcRegExp: '(.+\\.qpic\\.cn/.+/)\\d+(?:\\?.*)?',
      processor: '$1'
    }]
  },
  'www\\.reddit\\.com': {
    srcMatching: [{
      srcRegExp: '@IMG@$',
      processor: (trigger, src, srcRegExpObj) => {
        var externalImgUrl = trigger.closest('.Post').find('.styled-outbound-link').attr('href');
        return srcRegExpObj.test(externalImgUrl) ? externalImgUrl : src;
      }
    }, {
      srcRegExp: '(?:preview|i)(\\.redd\\.it/.+@IMG@)',
      processor: 'i$1'
    }, {
      srcRegExp: '.*\\.(?:redditmedia|redditstatic)\\.com/.+@IMG@'
    }]
  },
  '(?:.+\\.)?suning\\.com': {
    amendStyles: {
      pointerNone: '.ju-prodlist-item .border,.ju-prodlist-item .mask,.icon-soldout,.recBrandTwo-item ul .mask,.floor-list .goods-cover'
    },
    srcMatching: [{
      srcRegExp: '((?:image|imgservice)\\d*\\.suning\\.cn/.+?)\\d+([wh]_|x)\\d+(.*)',
      processor: '$1800$2800$3'
    }, {
      selectors: 'img,.floor-hots .main li a',
      srcRegExp: '//image\\d*\\.suning\\.cn/uimg/cms/.+@IMG@',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.siblings('img').attr('src')) ? RegExp['$&'] : ''
    }]
  },
  'www\\.target\\.com': {
    amendStyles: {
      pointerNone: '.storycard--text'
    },
    srcMatching: {
      selectors: 'img,.ruleOfTwelve--tileImgInner',
      srcRegExp: '(//target\\.scene7\\.com/is/image/[^?]+)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(trigger.is('img') && trigger.siblings('source[srcset]').attr('srcset') || src) ? (`${RegExp.$1}?wid=1000`) : ''
    }
  },
  'themarket\\.com': {
    srcMatching: [{
      srcRegExp: '(themarket\\.azureedge\\.net/.+?)(?:&[wh]=[\\d.]+)+',
      processor: '$1&s=0'
    }, {
      srcRegExp: '(themarket\\.com/.+)(?:-\\d+x\\d+)?(@IMG@)',
      processor: '$1$2'
    }]
  },
  'www\\.(?:thewarehouse|warehousestationery)\\.co\\.nz': {
    srcMatching: {
      srcRegExp: '(.+\\.co\\.nz/)(?:dw/.+/)?(on/.+@IMG@).*',
      processor: '$1$2'
    }
  },
  '(?:.+\\.)?(tmall|taobao|etao|fliggy|alitrip|1688|alibaba|aliexpress|liangxinyao|alipay|alicdn|alimama|wsy)\\.(?:com|[a-z]{2})': {
    amendStyles: {
      pointerNone: '.mask,.itemSoldout .product-mask,.ju-itemlist .link-box .detail,.tb-img li span,.offerImg .offerMask,.NervModuleKjIndexCateOfferUi>div:first-child>div:last-child,.imageGallery .imgItem .imgBg,.img-box .img-bg-layer,.img-zhe,.img-mask,.product .shadow,.item .shade'
    },
    srcMatching: [{
      selectors: 'img,.zhibo-show-list .img-item,.abs.jibbg,.item-list .item-img,.act-list .itemLink',
      srcRegExp: '(//.+\\.(?:alicdn|china\\.alibaba)\\.com/.*?(?:bao|t[fp]s(?:com)?|upload|simba|i\\d+|bttopic|sc\\d+|nonpublic|kf)/.+?(?:@IMG@|.(?=_\\d+x\\d+.*))).*',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) || srcRegExpObj.test(trigger.parent().find('img').attr('src')) ? RegExp.$1 : ''
    }, {
      srcRegExp: '(.+\\.(?:alicdn|taobao)\\.com/avatar/get_?Avatar\\.do\\?user(?:Id(?:Str)?|Nick)=[^&]+).*',
      processor: '$1&width=1280&height=1280'
    }, {
      srcRegExp: '(.+\\.(?:alicdn|china\\.alibaba)\\.com/img/(?:(?:back_)?ibank|order)/.+?)\\.(?:\\d+x\\d+[a-z]*|search|summ)(@IMG@).*',
      processor: '$1$2'
    }, {
      selectors: 'img,.abs.jibbg,.tb-select-goods a,.tb-img li a[style]',
      srcRegExp: '(.+\\.(?:alicdn|china\\.alibaba)\\.com/(?:imgextra|kf|img/(?:(?:back_)?ibank|order))/.+?@IMG@)(?!_\\.webp|$).+',
      processor: '$1'
    }, {
      selectors: '.tb-select-goods a,.tb-img li a[style]',
      srcRegExp: '(.+\\.(?:alicdn|china\\.alibaba)\\.com/imgextra/.+)_\\d+x\\d+.*?@IMG@.*',
      processor: '$1'
    }, {
      selectors: 'img,.process-item-bigImg',
      srcRegExp: '.+\\.(?:alicdn|china\\.alibaba)\\.com/(?:kf/[^/]+|imgextrai\\d+/.+)@IMG@'
    }, {
      srcRegExp: '.+\\.(?:alicdn|china\\.alibaba)\\.com/montage/.+@IMG@\\?.*&img_path2=(.+?@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? decodeURIComponent(RegExp.$1) : ''
    }, {    // This is for www.wsy.com that links a lot of images under ali's hostnames.
      srcRegExp: '(imgcdn\\.wsy\\.com/.+?@IMG@).*',
      processor: '$1'
    }]
  },
  '(?:www\\.)?trademe(?:\\.co)?\\.nz': {
    amendStyles: {
      pointerNone: '.tm-marketplace-search-card-summary-image__gradient',
      pointerAuto: '[size="thumbnail"]'
    },
    srcMatching: [{
      selectors: 'img,.supergrid-bucket .supergrid-listing',
      srcRegExp: '(//trademe\\.tmcdn\\.co\\.nz/photoserver/)\\w+(/\\d+@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) || srcRegExpObj.test(tools.getBackgroundImgSrc(trigger.find('.image'))) ? (`${RegExp.$1}plusw${RegExp.$2}`) : ''
    }, {
      selectors: '[style*="background-image"]',
      srcRegExp: '(//trademe\\.tmcdn\\.co\\.nz/photoserver/)\\w+(/\\d+@IMG@)',
      processor: '$1plusw$2'
    }, {
      srcRegExp: '(trademe\\.tmcdn\\.co\\.nz/).+(/agent_individual_profile.+@IMG@)',
      processor: '$1tm/property/agent_individual_profile$2'
    }, {
      srcRegExp: 'trademe\\.tmcdn\\.co\\.nz/property/agent_branding/.+@IMG@'
    }]
  },
  'www\\.(?:torpedo7|1-day)\\.co\\.nz': {
    srcMatching: {
      selectors: 'img,a[href*="/products/"]',
      srcRegExp: '(/images/products/.+?)_[a-z]+(.*@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.next('.c-card-product__image-wrap').find('img').attr('src')) ? tools.detectImage(RegExp.$1 + RegExp.$2, `${RegExp.$1}_zoom${RegExp.$2}`, img => img.width * img.height <= 1).then(imgInfo => imgInfo.src) : ''
    }
  },
  '1-day\\.winecentral\\.co\\.nz': {
    srcMatching: {
      srcRegExp: '(cdn\\.shopify\\.com/.+?)_[a-z]+(@IMG@)',
      processor: '$1$2'
    }
  },
  '.+\\.tumblr\\.com': {
    amendStyles: {
      pointerAuto: '.post_avatar_image,.post_sub_avatar_image,.search_results_container .header_image'
    },
    srcMatching: [{
      selectors: 'img,.user-avatar,.search_popover .result_thumb,.tumblelog_avatar',
      srcRegExp: '(.*\\.media\\.tumblr\\.com/avatar_.*)_\\d+(?:sq)?(@IMG@)',
      processor: '$1_128$2'
    }, {
      selectors: 'img,.post .post_glass,.post .post-glass,.radar_content .photo_post,.search_popover .result_thumb,.post--photo__link',
      srcRegExp: '(//(?:.*\\.media|static)\\.tumblr\\.com/.*?)_\\d+(?:sq)?((?:_v\\d+)?@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src ||
        trigger.parent().find('.post_content img,.post-content img').attr('src') ||
        trigger.closest('.post__content').find('img').attr('src') ||
        tools.getBackgroundImgSrc(trigger.parent().find('.post_thumbnail_container,.post-thumbnail-container,.thumbnail_anchor'))
      ) ? (`${RegExp.$1}_1280${RegExp.$2}`) : ''
    }, {
      selectors: 'img,.post .post_glass,.post .post-glass,.post_media .video_embed',
      srcRegExp: '//(?:.*\\.media|static)\\.tumblr\\.com/.*_frame\\d+@IMG@',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src ||
        trigger.parent().find('.post_content img,.post-content img').attr('src') ||
        trigger.find('[poster]').attr('poster') ||
        tools.getBackgroundImgSrc(trigger.parent().find('.post_thumbnail_container,.post-thumbnail-container'))
      ) ? RegExp['$&'] : ''
    }, {
      selectors: '[data-lightbox]>img',
      processor: trigger => trigger.parent().data('lightbox').high_res || src
    }, {
      selectors: 'img,.post_media .video_poster',
      processor: (trigger, src) => trigger.parent().data('big-photo') || src
    }]
  },
  '(?:(?:mobile\\.)?twitter|www\\.twipu)\\.com': {
    amendStyles: {
      pointerNone: '.PlayableMedia-player [data-testid="posterPlayBtn"],.PlayableMedia-player [data-testid="poster"]~div,.LastSeenProfiles__shadow,.css-1dbjc4n.r-u8s1d:empty:not(.r-1loqt21)',    // :not(.r-1loqt21): filter out video controller
      pointerAuto: '.MomentMediaItem'
    },
    srcMatching: [{
      srcRegExp: '(\\w+\\.twimg\\.com/(?:(?:[^/]+/)?default_)?profile_images/.+)_\\w+(?=@IMG@)(@IMG@)',
      processor: '$1$2'
    }, {
      selectors: '.ProfileCard-bg',
      srcRegExp: '(\\w+\\.twimg\\.com/profile_banners/.+)/\\d+x\\d+',
      processor: '$1'
    }, {
      srcRegExp: '(\\w+\\.twimg\\.com/media/.+@IMG@)(?::(?:small|thumb))?',
      processor: '$1:large'
    }, {
      srcRegExp: '(\\w+\\.twimg\\.com/.+\\?format=.*&name=).+',
      processor: '$1orig'
    }, {
      selectors: 'img,.PlayableMedia-player',
      srcRegExp: '\\w+\\.twimg\\.com/.+@IMG@'
    }]
  },
  'www\\.walmart\\.com': {
    srcMatching: [{
      selectors: 'img,.u-focusTile',
      srcRegExp: '(//i\\d+\\.walmartimages\\.com/.+@IMG@)\\?.*',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.parent().find('img').attr('src')) ? RegExp.$1 : ''
    }]
  },
  '(?:.+\\.)?weibo\\.com': {
    amendStyles: {
      pointerNone: '.weibo_player .outerline,.icon_playvideo,.WB_gif_video_box,.bot_cover,.WB_feed_detail,.W_icon_tag_9p',
      pointerAuto: '.bot_cover a,.WB_feed_detail *'
    },
    srcMatching: [{
      srcRegExp: '(mu\\d+\\.sinaimg\\.cn/)(?:(?:square|crop|frame)\\.[^/]+|original)/(.+@IMG@).*',
      processor: '$1$2'
    }, {
      selectors: 'img,.layer_personcard .nc_head',
      srcRegExp: '((?:.+\\.sinaimg\\.cn|image\\.storage\\.weibo\\.com)(?:/.+)?/)(?:small|large|thumbnail|c?mw\\d+|small|sq\\d+|thumb\\d+|bmiddle|orj\\d+|crop\\.[^/]+|square|wap\\d+)(/.+(?:@IMG@)?).*',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? tools.detectImage(`${RegExp.$1}original${RegExp.$2}`, `${RegExp.$1}large${RegExp.$2}`, img => img.width == 75 && img.height == 75).then(imgInfo => imgInfo.src) : ''
    }, {
      selectors: '.layer_personcard .nc_head',
      srcRegExp: '(img\\.t\\.sinajs\\.cn/.+)_[ms](@IMG@).*',
      processor: '$1$2'
    }, {
      srcRegExp: '(.+\\.sinaedge\\.com/cimg/.+/)(?:\\d+x?)+(@IMG@).*',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? tools.detectImage(`${RegExp.$1}1${RegExp.$2}`, `${RegExp.$1}180x240x75x0x0x1${RegExp.$2}`).then(imgInfo => imgInfo.src) : ''
    }, {
      srcRegExp: '(upload\\.api\\.weibo\\.com/.+/msget)_thumbnail\\?.*(fid=\\w+).*(source=\\w+).*',
      processor: '$1?$2&$3'
    }, {}]
  },
  'mp\\.weixin\\.qq\\.com': {
    srcMatching: [{
      srcRegExp: '(mmbiz\\.qpic\\.cn/mmbiz\\w*/\\w+/).*',
      processor: '$1'
    }, {
      srcRegExp: '(mp\\.weixin\\.qq\\.com/mp/qrcode\?.*?&size=)\\d+(.*)',
      processor: '$1980$2'
    }]
  },
  'www\\.wekan\\.tv': {
    amendStyles: {
      pointerNone: '[class$="poster"] [class$="poster__pic"]~*'
    },
    srcMatching: {
      srcRegExp: '(.+?@IMG@).*',
      processor: '$1'
    }
  },
  'www\\.wikiart\\.org': {
    srcMatching: {
      srcRegExp: '(uploads\\d+\\.wikiart\\.org/.+?@IMG@).*',
      processor: '$1'
    }
  },
  '(?:.+\\.)?(?:wiki\\w+|wiktionary|mediawiki)\\.org': {
    srcMatching: {
      selectors: 'img,image',
      srcRegExp: '(//upload\\.wikimedia\\.org/.*?)\\bthumb/(.+?@IMG@).*',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.attr('href')) ? (RegExp.$1 + RegExp.$2) : ''
    }
  },
  '(?:.+\\.)?yelp(?:\\.(?:com|[a-z]{2}))+': {
    amendStyles: {
      pointerNone: '.collection-card_photo-box .collection-card_text-overlay'
    },
    srcMatching: [{
      selectors: 'img,.collection-card_photo-box,.photo-box--background,.feed-item_photo',
      srcRegExp: '(s\\d+-media\\d+\\.fl\\.yelpcdn\\.com/\\w*photo/.+/)\\d*[sml]{1,2}(@IMG@)',
      processor: '$1o$2'
    }, {
      selectors: '.photo-box .biz-shim',
      srcRegExp: '(//s\\d+-media\\d+\\.fl\\.yelpcdn\\.com/\\w*photo/.+/)\\d*[sml]{1,2}(@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(trigger.siblings('img').attr('src')) ? (`${RegExp.$1}o${RegExp.$2}`) : ''
    }, {
      srcRegExp: '//s\\d+-media\\d+\\.fl\\.yelpcdn\\.com/assets/.+@IMG@'
    }]
  },
  '(?:\\w+\\.)?(?:youku|tudou)\\.com': {
    amendStyles: {
      pointerNone: '[class^="index-module_bg_"],.rank-content .tab-item li .info,.movie-card-module .movie-cont .play-btn,.subscribe-square-pc__content__rec__episode__item__mask,.subscribe-square-pc__content__rec__episode__item__info,.td_pc-card-image .image-desc',
      pointerAuto: '.subscribe-square-pc__content__rec__episode__item__info button'
    },
    srcMatching: [{
      srcRegExp: '(static\\.youku\\.com/\\w+/img/avatar/)\\d+(/.*)',
      processor: '$1310$2'
    }, {
      srcRegExp: '(.+\\.alicdn\\.com/avatar/getAvatar\\.do\\?userId=\\d+).*',
      processor: '$1&width=1280&height=1280'
    }, {
      srcRegExp: '((?:tfs\\.alipayobjects\.com/images|cdnsf\\.tudou\\.com/img/avatar|image\\.9xsecndns\\.cn/image/uicon)/.+@IMG@).*',
      processor: '$1'
    }, {
      selectors: 'img,.p-thumb a,.item-cover,.item-icon,.subscribe-square-pc__card a,.img-box .play-btn,.td-video__thumb__link,.v-thumb__link',
      srcRegExp: '//(?:.+\\.ykimg|.+\\.alicdn|image\\.planet\\.youku)\\.com/[^?]+',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src || trigger.parent().find('img').attr('src')) ? RegExp['$&'] : ''
    }, {
      selectors: '.v .v-link a',
      srcRegExp: '//.+\\.ykimg\\.com/.*',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(trigger.closest('.v').find('.v-thumb img').attr('src')) ? RegExp['$&'] : ''
    }]
  },
  'www\\.youtube\\.com': {
    amendStyles: {
      pointerNone: 'yt-img-shadow~[id$="overlay"],yt-img-shadow~[id$="overlays"]',
      pointerAuto: 'yt-img-shadow~[id$="overlay"] [role="button"],yt-img-shadow~[id$="overlays"] [role="button"]'
    },
    srcMatching: [{
      selectors: 'img,.ytp-cued-thumbnail-overlay-image',
      srcRegExp: '(//i\\d*\\.ytimg\\.com/vi/.+/).+(@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? tools.detectImage(`${RegExp.$1}hq720${RegExp.$2}`, `${RegExp.$1}hqdefault${RegExp.$2}`, img => img.width == 120 && img.height == 90).then(imgInfo => imgInfo.src) : ''
    }, {
      srcRegExp: 'i\\d*\\.ytimg\\.com/.+@IMG@.*'
    }, {
      srcRegExp: '(yt\\d+\\.ggpht\\.com/.+[/=][sw])\\d+-.*',
      processor: '$10'
    }, {
      srcRegExp: 'lh3\\.googleusercontent\\.com/[-\\w]+',
      processor: '$&=w0'
    }]
  },
  '(?:(?:.+\\.)?zcool\\.com\\.cn|www\\.hellorf\\.com)': {
    amendStyles: {
      pointerNone: '.title__wrapper'
    },
    srcMatching: [{
      srcRegExp: '(img\\.zcool\\.cn/.+?@IMG@)@(?!1280|3000|2o).*',
      processor: '$1'
    }, {
      srcRegExp: 'hellorfimg\\.zcool\\.cn/preview\\d*/(.+@IMG@)',
      processor: 'image.shutterstock.com/z/stock-photo-$1'
    }, {
      srcRegExp: '(hellorfimg\\.zcool\\.cn/.+/)preview\\d*(/.+@IMG@)',
      processor: '$1large$2'
    }, {
      srcRegExp: '(ali\\.image\\.hellorf\\.com/.+@IMG@).*',
      processor: '$1'
    }]
  },
  '(?:www|zhuanlan)\\.zhihu\\.com': {
    amendStyles: {
      pointerNone: '.Thumbnail-Surplus-Sign,.RichContent-cover-play'
    },
    srcMatching: {
      srcRegExp: '(//pic\\d+\\.zhimg\\.com/)(?:\\d+/)?(.+)_(?:\\d+x\\d+|[^.]+)(@IMG@)',
      processor: (trigger, src, srcRegExpObj) => srcRegExpObj.test(src) ? (RegExp.$1 + RegExp.$2 + (trigger.hasClass('column-gif') ? '.gif' : RegExp.$3)) : ''
    }
  }
};

let WEBSITE_INFO = {},
  DISABLED_WEBSITES = [],
  XHR_DOWNLOAD_REQUIRED_HOSTNAMES = [],
  XHR_DOWNLOAD_ITMES = {},
  PHOTOSHOW_CONFIGS = {};

const tools = {
  getUrlHostname: function(url) {
    return new URL(url).hostname || '';
  },
  getDateStr: function() {
    const padNum = num => (num > 9 ? '' : '0') + num,
      now = new Date();

    return `${now.getFullYear()}${padNum(now.getMonth() + 1)}${padNum(now.getDate())}${padNum(now.getHours())}${padNum(now.getMinutes())}${padNum(now.getSeconds())}`;
  },
  getImgFileName: function(src, hostname) {
    return `${chrome.i18n.getMessage('imageSavingNamePrefix')}_${hostname}_${this.getDateStr()}.${/\b(jpe?g|gif|png|bmp|webp|svg)\b/.test(src) ? RegExp.$1 : 'jpg'}`;    // Explicitly ignore 'pnj' type.
  },
  downloadImg: function(imgSrc, tabUrl) {
    if (imgSrc) {
      tabUrl = new URL(tabUrl);
      imgSrc = imgSrc.replace(/\b(gif)v\b/, 'gif');    // Replace 'gifv' suffix used by Tumblr with 'gif' as otherwise it causes downloading problems in Firefox.

      if (XHR_DOWNLOAD_REQUIRED_HOSTNAMES.includes(new URL(imgSrc).hostname)) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', imgSrc, true);
        xhr.responseType = 'blob';
        xhr.setRequestHeader('photoshow-added-referer', tabUrl.origin);

        xhr.addEventListener('load', e => {
          if (e.target.status == 200) {
            const blobUrl = URL.createObjectURL(xhr.response);

            chrome.downloads.download({
              url: blobUrl,
              filename: this.getImgFileName(imgSrc, tabUrl.hostname),
              conflictAction: 'uniquify'
            }, downloadItemId => {
              if (chrome.runtime.lastError || !downloadItemId) {
                URL.revokeObjectURL(blobUrl);
              } else {
                XHR_DOWNLOAD_ITMES[downloadItemId] = {
                  blobUrl: blobUrl
                }
              }
            });

            xhr = null;
          }
        });

        xhr.send();
      } else {
        chrome.downloads.download({
          url: imgSrc,
          filename: this.getImgFileName(imgSrc, tabUrl.hostname),
          conflictAction: 'uniquify'
        });
      }
    }
  },
  openImgInNewTab: function(imgSrc, curTabIndex) {
    imgSrc && chrome.tabs.create({
      url: imgSrc,
      index: curTabIndex + 1,
      active: false
    });
  }
};

var photoShow = {
  checkWebsiteState: function(tabUrl) {
    var urlHostname = tools.getUrlHostname(tabUrl);

    if (!WEBSITE_INFO[urlHostname]) {
      WEBSITE_INFO[urlHostname] = {
        isPhotoShowAvailable: false,
        isPhotoShowEnabled: false
      };

      for (let website in websiteConfig) {
        if (new RegExp(`^${website}$`).test(urlHostname)) {
          WEBSITE_INFO[urlHostname].isPhotoShowAvailable = true;
          WEBSITE_INFO[urlHostname].isPhotoShowEnabled = !DISABLED_WEBSITES.includes(urlHostname);
          WEBSITE_INFO[urlHostname].websiteConfig = websiteConfig[website];
          WEBSITE_INFO[urlHostname].websiteConfig.srcMatching = [].concat(WEBSITE_INFO[urlHostname].websiteConfig.srcMatching || {});

          for (let i = 0; i < WEBSITE_INFO[urlHostname].websiteConfig.srcMatching.length; ++i) {
            WEBSITE_INFO[urlHostname].websiteConfig.srcMatching[i].srcRegExp && (WEBSITE_INFO[urlHostname].websiteConfig.srcMatching[i].srcRegExp = WEBSITE_INFO[urlHostname].websiteConfig.srcMatching[i].srcRegExp.replace(/@IMG@/g, '\\.(?:jpe?g|gifv?|pn[gj]|bmp|webp|svg)'));
            WEBSITE_INFO[urlHostname].websiteConfig.srcMatching[i].processor && (WEBSITE_INFO[urlHostname].websiteConfig.srcMatching[i].processor = '' + WEBSITE_INFO[urlHostname].websiteConfig.srcMatching[i].processor);
          }

          WEBSITE_INFO[urlHostname].websiteConfig.onToggle && (WEBSITE_INFO[urlHostname].websiteConfig.onToggle = '' + WEBSITE_INFO[urlHostname].websiteConfig.onToggle);
          WEBSITE_INFO[urlHostname].websiteConfig.onXhrLoad && (WEBSITE_INFO[urlHostname].websiteConfig.onXhrLoad = '' + WEBSITE_INFO[urlHostname].websiteConfig.onXhrLoad);

          break;
        }
      }
    }

    return WEBSITE_INFO[urlHostname];
  },
  setWebsiteState: function(tabIds, tabUrl) {
    var urlHostname = tools.getUrlHostname(tabUrl);
    tabIds = [].concat(tabIds);

    for (let i = 0; i < tabIds.length; ++i) {
      if (urlHostname) {
        if (WEBSITE_INFO[urlHostname].isPhotoShowAvailable) {
          chrome.browserAction.enable(tabIds[i]);

          if (WEBSITE_INFO[urlHostname].isPhotoShowEnabled) {
            photoShow.enable(tabIds[i], urlHostname);
          } else {
            photoShow.disable(tabIds[i], urlHostname);
          }
        } else {
          photoShow.shutdown(tabIds[i]);
        }
      } else {
        photoShow.shutdown(tabIds[i]);
      }
    }
  },
  enable: function(tabId) {
    chrome.browserAction.setIcon({
      tabId: tabId,
      path: 'resources/icon32.png'
    });
    chrome.browserAction.setTitle({
      tabId: tabId,
      title: chrome.i18n.getMessage('photoShowEnabledMsg')
    });
  },
  disable: function(tabId) {
    chrome.browserAction.setIcon({
      tabId: tabId,
      path: 'resources/icon32_disabled.png'
    });
    chrome.browserAction.setTitle({
      tabId: tabId,
      title: chrome.i18n.getMessage('photoShowDisabledMsg')
    });
  },
  shutdown: function(tabId) {
    chrome.browserAction.setIcon({
      tabId: tabId,
      path: 'resources/icon32_unavailable.png'
    });
    chrome.browserAction.setTitle({
      tabId: tabId,
      title: chrome.i18n.getMessage('photoShowUnavailableMsg')
    });
    chrome.browserAction.disable(tabId);

    photoShowContextMenus.remove();
  },
  getPreservedImgSrc: function(tabId, callback) {
    chrome.tabs.sendMessage(tabId, {
      cmd: 'GET_PRESERVED_IMG_SRC'
    }, {
      frameId: 0
    }, callback);
  },
  copyImgSrc: function(hostTabId) {
    chrome.tabs.sendMessage(hostTabId, {
      cmd: 'COPY_IMG_SRC'
    }, {
      frameId: 0
    });
  }
};

var photoShowContextMenus = {
  hasMenuCreated: false,
  hasMenuShown: false,    // Works in firefox only.
  create: function() {
    if (!this.hasMenuCreated) {
      chrome.contextMenus.create({
        id: 'photoShowContextMenu_open',
        title: chrome.i18n.getMessage('contextMenuTitle_open'),
        contexts: ['all'],
        onclick: (contextMenuInfo, tab) => chrome.runtime.lastError || photoShow.getPreservedImgSrc(tab.id, imgSrc => tools.openImgInNewTab(imgSrc, tab.index))
      });

      chrome.contextMenus.create({
        id: 'photoShowContextMenu_save',
        title: chrome.i18n.getMessage('contextMenuTitle_save'),
        contexts: ['all'],
        onclick: (contextMenuInfo, tab) => chrome.runtime.lastError || photoShow.getPreservedImgSrc(tab.id, imgSrc => tools.downloadImg(imgSrc, tab.url))
      });

      chrome.contextMenus.create({
        id: 'photoShowContextMenu_copy',
        title: chrome.i18n.getMessage('contextMenuTitle_copy'),
        contexts: ['all'],
        onclick: (contextMenuInfo, tab) => chrome.runtime.lastError || photoShow.copyImgSrc(tab.id)
      });

      this.hasMenuCreated = true;
    }
  },
  remove: function() {
    if (!this.hasMenuShown) {
      this.hasMenuCreated = false;
      chrome.contextMenus.removeAll();
    }
  }
};

// Response to tab actions.
chrome.tabs.onActivated.addListener(tabInfo => {
  chrome.tabs.get(tabInfo.tabId, tab => {
    if (!chrome.runtime.lastError && tab.url) {
      photoShow.checkWebsiteState(tab.url);
      photoShow.setWebsiteState(tab.id, tab.url);
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'loading') {
    photoShow.checkWebsiteState(tab.url);
    photoShow.setWebsiteState(tab.id, tab.url);
  }
});

// Response to contextmenu show/hide actions (for firefox only).
try {
  browser.contextMenus.onShown.addListener(() => {
    photoShowContextMenus.hasMenuShown = true;
  });

  browser.contextMenus.onHidden.addListener((info, tab) => {
    photoShowContextMenus.hasMenuShown = false;
  });
} catch (error) {}

// Response to messages.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  var needAsyncResponse;

  switch (request.cmd) {
    case 'GET_INITIAL_STATE_AND_CONFIGS':    // Args: tabUrl (optional)
      sendResponse({
        ...photoShow.checkWebsiteState(request.args && request.args.tabUrl || sender.url),
        photoShowConfigs: PHOTOSHOW_CONFIGS
      });

      break;

    case 'SET_PHOTOSHOW_STATE':    // Args: tabUrl, isPhotoShowEnabled
      var urlHostname = tools.getUrlHostname(request.args.tabUrl);

      if (WEBSITE_INFO[urlHostname] && WEBSITE_INFO[urlHostname].isPhotoShowAvailable) {
        var newDisabledWebsitesList = DISABLED_WEBSITES.slice(),
          urlHostnameIndex = newDisabledWebsitesList.indexOf(urlHostname);

        !!request.args.isPhotoShowEnabled ^ !!~urlHostnameIndex || (~urlHostnameIndex ? newDisabledWebsitesList.splice(urlHostnameIndex, 1) : newDisabledWebsitesList.push(urlHostname));

        chrome.storage.sync.set({
          disabledWebsites: newDisabledWebsitesList
        });
      }

      break;

    case 'SET_PHOTOSHOW_CONFIGS':    // Args: item, value
      var reservedConfig = {...PHOTOSHOW_CONFIGS};

      request.args.item.split('.').reduce((item, key, i, itemArray) => item[key] = i < itemArray.length - 1 ? (typeof item[key] == 'object' ? item[key] : {}) : request.args.value, PHOTOSHOW_CONFIGS);

      chrome.storage.sync.set({
        photoShowConfigs: PHOTOSHOW_CONFIGS
      }, () => chrome.runtime.lastError && (PHOTOSHOW_CONFIGS = reservedConfig));


      break;

    case 'OPEN_IMG_IN_NEW_TAB':    // Args: imgSrc
      tools.openImgInNewTab(request.args.imgSrc, sender.tab.index);

      break;

    case 'DOWNLOAD_IMG':    // Args: imgSrc, tabUrl (optional)
      tools.downloadImg(request.args.imgSrc, sender.tab ? sender.url : '');

      break;

    case 'UPDATE_PHOTOSHOW_CONTEXTMENU':    // Args: isEnabled
      photoShowContextMenus[request.args.isEnabled ? 'create' : 'remove'].call(photoShowContextMenus, sender.tab.id);

      break;

    case 'CROSS_ORIGIN_GET':    // Args: url, data
      needAsyncResponse = true;

      $.ajax(request.args.url, {
        data: request.args.data,
        success: response => sendResponse(response),
        error: () => sendResponse()
      });

      break;

    case 'DISPATCH_HOTKEY_EVENT':    // Args: type, which
      chrome.tabs.query({
        currentWindow: true,
        active: true
      }, tabs => {
        if (!chrome.runtime.lastError) {
          photoShow.checkWebsiteState(tabs[0].url).isPhotoShowAvailable && chrome.tabs.sendMessage(tabs[0].id, {
            cmd: 'DISPATCH_HOTKEY_EVENT',
            args: request.args
          });
        }
      });

      break;

    default:
  }

  return needAsyncResponse;
});

// Response to storage changes.
chrome.storage.onChanged.addListener(changes => {
  if (changes.disabledWebsites) {
    DISABLED_WEBSITES = changes.disabledWebsites.newValue;

    Object.keys(WEBSITE_INFO).forEach(hostname => WEBSITE_INFO[hostname].isPhotoShowEnabled = !DISABLED_WEBSITES.includes(hostname));

    chrome.tabs.query({
      active: true
    }, tabs => {
      if (!chrome.runtime.lastError) {
        for (let i = 0; i < tabs.length; ++i) {
          photoShow[photoShow.checkWebsiteState(tabs[i].url).isPhotoShowEnabled ? 'enable' : 'disable'].call(photoShow, tabs[i].id);
        }
      }
    });
  }

  changes.photoShowConfigs && (PHOTOSHOW_CONFIGS = changes.photoShowConfigs.newValue);
});

// Deal with xhr-downloading requests.
XHR_DOWNLOAD_REQUIRED_HOSTNAMES = Object.values(websiteConfig)
  .filter(config => config.hasOwnProperty('xhrDownload'))
  .flatMap(config => config.xhrDownload);

// Note:
// The value 'extraHeaders' of the third argument is not supported (neither needed) by Firefox,
// it will be removed in the compiling procedure.
chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    for(let header of details.requestHeaders) {
      if (header.name == 'photoshow-added-referer') {
        header.name = 'referer';
        break;
      }
    }

    return {
      requestHeaders: details.requestHeaders
    };
  }, {
    urls: XHR_DOWNLOAD_REQUIRED_HOSTNAMES.map(hostname => `*://${hostname}/*`),
    types: ['xmlhttprequest']
  }, ['requestHeaders', 'blocking', 'extraHeaders']);

// Response to download items change.
chrome.downloads.onChanged.addListener(downloadInfo => {
  const matchedDownloadItem = XHR_DOWNLOAD_ITMES[downloadInfo.id];

  if (matchedDownloadItem && downloadInfo.state && downloadInfo.state.current != 'in_progress') {
    URL.revokeObjectURL(matchedDownloadItem.blobUrl);
    delete XHR_DOWNLOAD_ITMES[downloadInfo.id];
  }
});

// Initialization.
chrome.storage.sync.get(['disabledWebsites', 'photoShowConfigs'], response => {
  if (!chrome.runtime.lastError && response) {
    DISABLED_WEBSITES = response.disabledWebsites || [];
    PHOTOSHOW_CONFIGS = response.photoShowConfigs || {};
  }
});