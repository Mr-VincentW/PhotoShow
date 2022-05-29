/**
 * Copyright (c) 2012-2022 Vincent W., MIT-licensed.
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
 *                                            // Bug Fix: Fix the problem that images might be downloaded with wrong filename extension.
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
 * @version 4.5.3.0 | 2020-09-03 | Vincent    // Updates: Support baike.baidu.com, in response to user feedback;
 *                                            // Updates: Better support for baidu and youku.
 * @version 4.5.4.0 | 2020-10-05 | Vincent    // Updates: Better support for pixiv (GitHub issue #10) and baike.baidu.com, in response to user feedback.
 * @version 4.5.5.0 | 2020-11-01 | Vincent    // Updates: Support duitang.com, in response to user feedback;
 *                                            // Updates: Better support for amazon.cn.
 * @version 4.5.6.0 | 2020-12-31 | Vincent    // Updates: Support adnmb2.com, gamer.com.tw, IMDb, ixigua.com, nga.cn, wattpad, in response to user feedback;
 *                                            // Updates: Support Sportsfuel.
 *                                            // Updates: Better support for jandan.net.
 * @version 4.6.0.0 | 2021-01-24 | Vincent    // Updates: Support displaying HD image size in the viewer;
 *                                            // Updates: Remove the feature of displaying PhotoShow logo in the viewer;
 *                                            // Updates: Better support for Amazon, Instagram and wekan.
 * @version 4.6.1.0 | 2021-02-06 | Vincent    // Updates: Remove support for wekan.tv which is no longer accessible;
 *                                            // Updates: Support TapTap, in response to user feedback (GitHub issue #13).
 * @version 4.6.2.0 | 2021-03-01 | Vincent    // Updates: Support DuckDuckGo, in response to user feedback (GitHub issue #14);
 *                                            // Updates: Better support for GitHub;
 *                                            // Updates: Remove cleaning code for deprecated 'logoDisplay' setting item.
 * @version 4.6.3.0 | 2021-03-04 | Vincent    // Updates: Better support for Google.
 * @version 4.6.4.0 | 2021-03-27 | Vincent    // Updates: Support 115.com, toutiao.com, in response to user feedback.
 * @version 4.6.5.0 | 2021-04-28 | Vincent    // Updates: Support Google.hk, InterPals, and wallhaven, in response to user feedback.
 * @version 4.6.6.0 | 2021-05-09 | Vincent    // Updates: Support zhisheji.com, in response to user feedback;
 *                                            // Updates: Add statistics.
 * @version 4.6.7.0 | 2021-05-30 | Vincent    // Updates: Better support for douban and jandan.
 * @version 4.6.8.0 | 2021-06-02 | Vincent    // Updates: Better support for bilibili and nga.178.com, in response to user feedback;
 *                                            // Updates: Optimize statistics sync frequency and correct a typo.
 * @version 4.6.9.0 | 2021-06-27 | Vincent    // Updates: Support allhistory.com, Discogs, haokan.baidu.com, bandcamp.com, Fandango, Flixter, Rotten Tomatoes, and metal-archives.com, in response to user feedback;
 *                                            // Updates: Better support for eBay;
 *                                            // Updates: Stop supporting Quora.
 * @version 4.7.0.0 | 2021-07-04 | Vincent    // Updates: Fix Google compatibility issue;
 *                                            // Updates: Support TweetDeck, in response to user feedback;
 *                                            // Updates: Allow user to disable adding context menu items.
 * @version 4.7.1.0 | 2021-07-07 | Vincent    // Updates: Better support for Pinterest, in response to user feedback.
 * @version 4.7.2.0 | 2021-07-17 | Vincent    // Updates: Support iStock, Pexels, and Unsplash, in response to user feedback (GitHub issue #23).
 * @version 4.7.3.0 | 2021-07-30 | Vincent    // Updates: Better support for Sportsfuel and Google, in response to user feedback.
 * @version 4.7.4.0 | 2021-08-03 | Vincent    // Bug Fix: Gif play button failure on jandan.net, in response to user feedback;
 *                                            // Updates: Support lofter.com and soutushenqi.com, in response to user feedback.
 * @version 4.8.0.0 | 2021-08-14 | Vincent    // Updates: Support Baidu map, ctrip, dianping, Google books, Google map, mafengwo, maoyan, and meituan;
 *                                            // Updates: Better support for bilibili, in response to user feedback; pixiv, and Ali series websites.
 * @version 4.8.1.0 | 2021-08-20 | Vincent    // Bug Fix: An issue for bilibili, in response to user feedback (GitHub issue #24);
 *                                            // Updates: Better support for bilibili, InterPals and weixin.qq.com;
 *                                            // Updates: Support biligame and Pornhub.
 * @version 4.9.0.0 | 2021-08-22 | Vincent    // Updates: Support Acfun, kuaishou.com, douyin.com, mi-store, and TikTok;
 *                                            // Updates: Better support for mi.com, Myprotein, and Tumblr;
 *                                            // Updates: Offer basic support for unknown websites.
 * @version 4.9.2.0 | 2021-08-27 | Vincent    // Bug Fix: A initialization error when PhotoShow is firstly installed or upgraded.
 * @version 4.10.0.0 | 2021-09-18 | Vincent   // Updates: Support coupang and instacart;
 *                                            // Updates: Better support for Amazon, Facebook and weibo;
 *                                            // Updates: Disable PhotoShow on websites where browser extensions are not allowed (e.g. extension stores);
 *                                            // Updates: Optimize PhotoShow config items naming.
 * @version 4.10.1.0 | 2021-10-05 | Vincent   // Bug Fix: Fetching incorrect images issue on Facebook, in response to user feedback;
 *                                            // Updates: Resupport iframes (for YouTube live chatting pane), in response to user feedback;
 *                                            // Updates: Better support for weibo's new look;
 *                                            // Updates: Support PAK'nSAVE's new domain.
 * @version 4.11.0.0 | 2021-10-21 | Vincent   // Updates: Remove parsing rules for ixigua as it's no longer valid (GitHub issue #30);
 *                                            // Updates: Support music.163.com, in response to user feedback (GitHub issue #31);
 *                                            // Updates: Better support for weibo.
 * @version 4.11.1.0 | 2021-10-27 | Vincent   // Updates: Better support for Pinterest in user-unlogged-in state.
 * @version 4.12.0.0 | 2021-11-07 | Vincent   // Updates: Allow user to suspend PhotoShow when in developer mode, in response to user feedback.
 * @version 4.14.0.0 | 2021-12-14 | Vincent   // Updates: Support adnmb3.com, e621.net, and figma.com, in response to user feedback;
 *                                            // Updates: Support douyu.com and vvic.com, in response to user feedback (GitHub issue #34, #35);
 *                                            // Bug Fix: Wrong default value for config item 'worksEverywhere'.
 * @version 4.15.0.0 | 2022-03-27 | Vincent   // Updates: Support file naming;
 *                                            // Updates: Better support for YouTube;
 *                                            // Bug Fix: Supporting issue for Flickr due to its website updates, in response to user feedback.
 * @version 4.15.1.0 | 2022-03-30 | Vincent   // Updates: Support save-as-dialog for file downloading;
 *                                            // Updates: Remove default filename;
 *                                            // Bug Fix: Download file naming compatibility issue for Firefox.
 * @version 4.16.0.0 | 2022-04-10 | Vincent   // Updates: Better support for bilibili, Google;
 *                                            // Updates: Support yande.re, yiigle.com, in response to user feedback;
 *                                            // Updates: Allow user to turn off file-naming.
 * @version 4.16.1.0 | 2022-04-25 | Vincent   // Updates: Better support for bilibili, in response to user feedback;
 *                                            // Updates: Support cangku, in response to user feedback (GitHub issue #43);
 *                                            // Updates: Support Konachan, in response to user feedback (GitHub issue #45).
 * @version 4.16.2.0 | 2022-04-30 | Vincent   // Updates: Resupport huaban for its new version;
 *                                            // Updates: Support jfif format.
 * @version 4.17.0.0 | 2022-05-28 | Vincent   // Updates: Add 'ignoreHDSrcCaching' feature;
 *                                            // Updates: Better support for bilibili, IMDb, and YouTube;
 *                                            // Updates: Support zhipin.com, in response to user feedback;
 *                                            // Bug Fix: Side effects on music.163.com (GitHub issue #50);
 *                                            // Bug Fix: Incorrect time zone issue in file naming (GitHub issue #51).
 *
 */

// TODO: Extract websiteConfig to independent files and import them (after porting to webpack).
// TODO: Preload images (ideally, only for the thumbnails near the mouse cursor).
// TODO: Add an extension `OPTIONS` page for more complex settings.
// TODO: Images in the searching result of Baidu have a scaled overlayer when mouse hovering on, which covers the mask on the trigger.
// TODO: Remove jQuery and deal with the events dispatching between frames.
// TODO: Disable 'panoramic' mode for pure link triggers.
// TODO: jandan.net uses sina image.
// TODO: gamer.com.tw uses YouTube image.
// TODO: rules for all shopify websites.
// TODO: duckduckgo.com uses Bing image.
// TODO: Image viewer positioning issue on https://m.xiaomiyoupin.com/w/universal?_rt=weex&pageid=5545&sign=e34c2d8dde5fe25ef83112cbaa154e76&pdl=jianyu&spmref=YouPinPC.$Home$.list.0.86425397
// TODO: Bulk download.
// TODO: Some abstraction is needed for onXhrLoad, like providing a url filter, unifying try...catch, removing 'data-photoshow-hd-src' when PhotoShow is toggled off, etc.
// TODO: After 'data-photoshow-hd-src' is removed by toggling off PhotoShow, it won't work when PhotoShow's toggled on again. Need other ways to cache data.
// TODO: Prefix 'img,[style*=background]' by default as selectors for all matching rules.
// TODO: Handle invalid download filename.
// TODO: Figure out a better way to do ignoreHDSrcCaching. (This rule should be applied at rule level instead of website level.)

// Website info structure:
// {
//   amendStyles: {                    // (Optional) Styles to amend to hosting pages.
//     pointerNone: {String},          // Selectors that are to be set to 'pointer-events:none'
//     pointerAuto: {String}           // Selectors that are to be set to 'pointer-events:auto'
//   },
//   srcMatching: {                    // (Required) Matching configuration.
//     selectors: {String},            // (Optional) Selectors for elements responsible for mouse-enter action. Default value: '' (equivalent to 'img,[style*=background],image,a[href],video[poster]').
//     srcRegExp: {String},            // (Optional) Pattern for trigger image src matching in src replacement.
//     processor: {String|Function}    // (Optional) Replacement string or process function. ('this' -> the selected element. NOTE: Not applicable to arrow functions.)
//                                     // Arguments: trigger{Object}         // The selected element (jQuery object of 'this').
//                                     // Arguments: src{String}             // Src of the selected img (or the src of the largest image in its srcset list) or backgroundImage src of the selected element.
//                                     // Arguments: srcRegExpObj{RegExp}    // An RegExp object constructed by srcRegExp.
//                                     // Return Value: {String}             // Src of the high-definition image; return '' if not applicable.
//   },
//   ignoreHDSrcCaching: {Boolean},    // (Optional) Specify if the 'photoshow-hd-src' cached on triggers should be ignored when detecting new HD image srcs. Default: false.
//   xhrDownload: {String|Array},      // (Optional) If downloading images under certain hostnames on this website needs the 'referer' header of the HTTP(S) request set, list the hostnames here.
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
// · A String: It will be used alongside 'srcRegExp' (if present) as arguments in src replacement;
// · Omitted: the original src or the src of the largest image in the srcset list (if applicable) will be used.

const websiteConfig = {
  '(?:.+\\.)?115\\.com': {
    amendStyles: {
      pointerNone: '[class^="icon-picture-"]'
    },
    srcMatching: [
      {
        selectors: 'img,.select-box',
        srcRegExp: '//thumb\\.115\\.com/.+/(\\w+)_(.+?)\\?(.+)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src || trigger.next('.pic').find('img').attr('src')) && parseInt(RegExp.$2) > 0
            ? `//imgjump.115.com/?sha1=${RegExp.$1}&${RegExp.$3}&size=0`
            : ''
      },
      {
        srcRegExp: '//.+\\.115\\.com/.*?\\bimgload\\?.*',
        processor: (trigger, src, srcRegExpObj) => {
          if (srcRegExpObj.test(src) && !/\braw=1\b/.test(src)) {
            const url = new URL(src);
            url.searchParams.set('raw', '1');
            url.searchParams.set('i', '1');
            return url.href;
          } else {
            return '';
          }
        }
      },
      {
        srcRegExp: '(avatars\\.115\\.com/.+_)\\w+(@IMG@)',
        processor: '$1l$2'
      }
    ]
  },
  '(?:www|[a-z]{2})\\.123rf\\.com': {
    // de|es|fr|it|tr|hu|nl|pl|ru|pt|jp|kr|tw
    amendStyles: {
      pointerNone: '.imgThumbOverlay'
    },
    srcMatching: {
      srcRegExp: '//.+\\.123rf\\.com/\\d+\\w+/(.+@IMG@.*)',
      processor: '//previews.123rf.com/images/$1'
    }
  },
  '(?:web\\.)?500px\\.com': {
    srcMatching: [
      {
        selectors: 'img,[style*=background],a[href^="/photo/"],a.link_wrap',
        srcRegExp: '/photo/(\\d+)/',
        processor: (trigger, src, srcRegExpObj) => {
          var link = trigger.is('.link_wrap')
              ? tools.getBackgroundImgSrc(trigger.next('.top'))
              : trigger.attr('href') || src,
            photoId = srcRegExpObj.test(link) ? RegExp.$1 : '';

          return photoId
            ? new Promise(resolve => {
                chrome.runtime.sendMessage(
                  {
                    cmd: 'CROSS_ORIGIN_GET',
                    args: {
                      url: 'https://api.500px.com/v1/photos',
                      data: {
                        ids: photoId,
                        image_size: 4096
                      }
                    }
                  },
                  response =>
                    resolve(
                      (response?.photos &&
                        response.photos[photoId]?.image_url.length &&
                        response.photos[photoId].image_url[0]) ||
                        ''
                    )
                );
              })
            : '';
        }
      },
      {
        srcRegExp: '/user_(avatar|cover)/(\\d+)/',
        processor: (trigger, src, srcRegExpObj) => {
          var { type, userId } = srcRegExpObj.test(src)
            ? {
                type: RegExp.$1,
                userId: RegExp.$2
              }
            : {};

          return userId
            ? (type == 'avatar' && tools.cacheImage(userId)) ||
                new Promise(resolve => {
                  chrome.runtime.sendMessage(
                    {
                      cmd: 'CROSS_ORIGIN_GET',
                      args: {
                        url: `https://api.500px.com/v1/users/${userId}`
                      }
                    },
                    response =>
                      resolve(
                        (response?.user &&
                          ((type == 'avatar' &&
                            response.user.userpic_url &&
                            tools.cacheImage(userId, response.user.userpic_url)) ||
                            response.user.cover_url)) ||
                          ''
                      )
                  );
                })
            : '';
        }
      },
      {
        srcRegExp: '/group_avatar/(\\d+)/',
        processor: (trigger, src, srcRegExpObj) => {
          var groupId = srcRegExpObj.test(src) ? RegExp.$1 : '';

          return groupId
            ? tools.cacheImage(groupId) ||
                new Promise(resolve => {
                  chrome.runtime.sendMessage(
                    {
                      cmd: 'CROSS_ORIGIN_GET',
                      args: {
                        url: `https://legacy-api.500px.com/v1/groups/${groupId}`
                      }
                    },
                    response =>
                      resolve(
                        (response?.group?.avatars &&
                          tools.cacheImage(
                            groupId,
                            response.group.avatars[
                              Object.keys(response.group.avatars).sort(
                                (size1, size2) => parseInt(size2) - parseInt(size1)
                              )[0]
                            ].url
                          )) ||
                          ''
                      )
                  );
                })
            : '';
        }
      },
      {
        srcRegExp: '/static/media/.+@IMG@'
      }
    ]
  },
  '(?:.+\\.)?(?:acfun\\.cn|(?:aixifan|kuaishou)\\.com)': {
    amendStyles: {
      pointerNone:
        '.danmaku-mask,.list-content-data,.live-status,.normal-video-cover .block-top,.normal-video-cover .tag,.block-left span:first-child,.recommend-video .video-mask,.recommend-video .video-title,.video-image :not(img),.mask-gradient,.rank-list-main .number,.video-item .block-top,.block-img .action-data,.header-banner .pointer,.side-item .item-cover~*,.up-avatar :not(img),[class*="avatar-bg-"]'
    },
    srcMatching: [
      {
        srcRegExp: '(.+\\.kwimgs\\.com/uhead/.+_)\\w+(@IMG@)',
        processor: '$1o$2'
      },
      {
        srcRegExp: '(.+\\.(?:acfun\\.cn|(?:aixifan|kwimgs)\\.com)/[^?]+)\\?image.*',
        processor: '$1'
      }
    ]
  },
  '(?:.+\\.)?acpjournals\\.org': {
    srcMatching: [
      {
        srcRegExp: '/medium/(\\w+)\\.jpg',
        processor: '/large/$1.jpeg'
      },
      {
        srcRegExp: '\\.cover@IMG@'
      }
    ]
  },
  'adnmb\\d+\\.com': {
    // Can be adnmb2.com or adnmb3.com
    srcMatching: {
      srcRegExp: '(nmbimg\\.fastmirror\\.org/)thumb(/.+@IMG@)',
      processor: '$1image$2'
    }
  },
  '(?:.+\\.)?allhistory\\.com': {
    amendStyles: {
      pointerAuto: '.period-item *',
      pointerNone:
        '.imageonhoverbackground,.book-cover *:not(.book-cover-image),.mask,.period-item,.article-desc-wrapper'
    },
    srcMatching: {
      srcRegExp: '((?:pic|img)\\.allhistory\\.com/[^?]+).*',
      processor: '$1'
    }
  },
  'www\\.amazon(?:\\.(?:com|[a-z]{2}))+': {
    // co|au|br|ca|cn|de|es|fr|hk|in|it|jp|mx|nl|tr|uk
    amendStyles: {
      pointerNone: '.backGround,.imgTagWrapper,a [class*="-shield"]'
    },
    srcMatching: {
      selectors:
        'img,[style*=background],.a-button-thumbnail .a-button-input,.floor-hotasin-item-image,.thumnail,.thumbnailPreviewTile',
      srcRegExp: '(//.*\\.(?:ssl-images|media)-amazon\\.(?:com|[a-z]{2})/images/.*?([-\\w]+))\\..+(@IMG@)',
      processor: (trigger, src, srcRegExpObj) => {
        if (
          /'initial'\s*:\s*(\[\{.+\}\])/.test(
            $('script:contains("ImageBlockATF"):not([photoshow-parsed])').attr('photoshow-parsed', '').get(0)
              ?.textContent
          )
        ) {
          try {
            JSON.parse(RegExp.$1).forEach(imgData => {
              srcRegExpObj.test(imgData.thumb) &&
                tools.cacheImage(RegExp.$2, imgData.hiRes.replace(srcRegExpObj, '$1$3'));
            });
          } catch (error) {}
        }

        if (srcRegExpObj.test(src || trigger.parent().find('img').attr('src'))) {
          return tools.cacheImage(RegExp.$2) || RegExp.$1 + RegExp.$3;
        } else {
          return '';
        }
      }
    }
  },
  'andino\\.shop': {
    amendStyles: {
      pointerNone: '.dali-teaser'
    },
    srcMatching: [
      {
        srcRegExp: '.+?\\?remote=([^&]+)',
        processor: (trigger, src, srcRegExpObj) => (srcRegExpObj.test(src) ? decodeURIComponent(RegExp.$1) : '')
      },
      {
        srcRegExp: '(/storage/images/.+?\\?.+?)width=.*',
        processor: '$1'
      }
    ]
  },
  'www\\.apple\\.com': {
    // TODO: max size: 6000
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
      pointerNone:
        'a .overlay,.project-image .overlay,.mature-content-label,.gallery-grid-overlay,.album-grid-item-overlay',
      pointerAuto: '.project-image .overlay .avatar,.gallery-grid-overlay .gallery-grid-info>img'
    },
    srcMatching: [
      {
        srcRegExp: '(cdn\\w?\\.artstation\\.com/p/users/covers/.+/)small(/.+@IMG@.*)',
        processor: '$1default$2'
      },
      {
        srcRegExp: '(cdn\\w?\\.artstation\\.com/p/marketplace/.+/.+_)small(/.+@IMG@.*)',
        processor: '$1big$2'
      },
      {
        srcRegExp: '(cdn\\w?\\.artstation\\.com/.+?/)(?:\\d{14}/)?(?:medium|\\w+_square|thumbnail)(/.+@IMG@.*)',
        processor: '$1large$2'
      },
      {
        selectors: 'img,.overlay>a',
        srcRegExp: '(//magazine\\.artstation\\.com/.+)(?:-\\d+x\\d+)?(@IMG@.*)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src || trigger.parent().next('img').attr('src')) ? RegExp.$1 + RegExp.$2 : ''
      },
      {
        selectors: 'img,.overlay>a',
        srcRegExp: '//cdn\\w?\\.artstation\\.com/.*@IMG@.*',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src || trigger.parent().next('img').attr('src')) ? RegExp['$&'] : ''
      }
    ]
  },
  '(?:www|image)\\.baidu\\.com': {
    amendStyles: {
      pointerNone:
        '.imgbox+.hover,.opr-recommends-merge-mask,.op-short-video-pc-img-new *:not(img),.c-img-border,.s-img-mask',
      pointerAuto: '.imgbox+.hover a[href]'
    },
    srcMatching: [
      {
        selectors: '.op-short-video-pc-img',
        processor: trigger => trigger.data('src')
      },
      {
        selectors: 'img,.imgavatar',
        srcRegExp: '(t\\d+\\.baidu\\.com/it/.+&fm=\\d+).*',
        processor: '$1'
      },
      {
        selectors: 'a[href] img,.img-box img',
        processor: (trigger, src) => {
          var link = trigger.closest('a'),
            src = /objurl=([^&]+)/.test(link.attr('href')) ? decodeURIComponent(RegExp.$1) : link.data('objurl') || src;

          return tools.detectImage(src).then(
            imgInfo =>
              imgInfo.src ||
              tools
                .detectImage(
                  `//timgsa.baidu.com/timg?quality=80&size=b9999_10000&imgtype=0&src=${encodeURIComponent(src)}`,
                  '',
                  img => img.width * img.height < 50
                )
                .then(
                  imgInfo =>
                    imgInfo.src ||
                    new Promise((resolve, reject) => {
                      $.ajax(trigger.closest('a').attr('href'), {
                        success: response =>
                          resolve(
                            /id="currentImg"[\s\S]*?src="([^"]+)"/.test(response)
                              ? RegExp.$1.replace(/&amp;/g, '&')
                              : src
                          ),
                        error: () => resolve(src)
                      });
                    })
                )
          );
        }
      }
    ]
  },
  'baike\\.baidu\\.com': {
    amendStyles: {
      pointerNone:
        '.sl-player-list-item__overlay,.picture img,.seleced-cover,.next-album span,.avator_shd,.tashuo-multiple .cover *:not(img),.tashuo-item-cover a *:not(img)'
    },
    srcMatching: {
      srcRegExp: '(bkimg\\.cdn\\.bcebos\\.com/[^?]+).*',
      processor: '$1'
    }
  },
  '(?:haokan|sv)\\.baidu\\.com': {
    amendStyles: {
      pointerNone: '.video-time,a *[class*="-top"]>*:not(picture),a *[class*="-bottom"]'
    },
    srcMatching: [
      {
        srcRegExp: '(.+)@(?:\\w_\\w+,?)+.*',
        processor: '$1'
      },
      {
        srcRegExp: '((?:.+\\.)?(?:bdstatic|himg\\.(?:baidu|bdimg))\\.com/.+)/portrait/(.+)',
        processor: '$1/portraith/$2'
      }
    ]
  },
  'map\\.baidu\\.com': {
    amendStyles: {
      pointerNone: '.photo-li .tag,.indoor-pano,.video-greybg'
    },
    srcMatching: [
      {
        srcRegExp: 'webmap\\d+\\.bdimg\\.com/client/services/thumbnails\\?.*\\bsrc=([^&]+)',
        processor: (trigger, src, srcRegExpObj) => (srcRegExpObj.test(src) ? decodeURIComponent(RegExp.$1) : '')
      },
      {
        srcRegExp: '(.+\\.cdn\\.bcebos\\.com/images/[^?]+).*',
        processor: '$1'
      },
      {
        srcRegExp: '((?:.+\\.)?(?:bdstatic|himg\\.(?:baidu|bdimg))\\.com/.+)/portrait/(.+)',
        processor: '$1/portraith/$2'
      }, // TODO: Duplicated.
      {
        srcRegExp: '(.+\\.(?:mafengwo|meituan)\\.net/)(?:[\\d.]+/)?(.+?@IMG@).*',
        processor: '$1$2'
      }, // TODO: Duplicated.
      {
        srcRegExp: 'store\\.is\\.autonavi\\.com/showpic/.+',
        processor: '$&'
      },
      {
        srcRegExp: '(.+\\.(?:c-ctrip|tripcdn)\\.com/.+?)(?:_\\w+)*(@IMG@)',
        processor: '$1$2'
      } // TODO: Duplicated.
    ],
    xhrDownload: 'userimg.qunar.com'
  },
  'tieba\\.baidu\\.com': {
    amendStyles: {
      pointerNone: '.threadlist_pic_highlight,.feed_highlight,.liveshow_slide_container .play_mask'
    },
    srcMatching: [
      {
        selectors: 'img[original]',
        processor: trigger => trigger.attr('original')
      },
      {
        srcRegExp: '(.+\\.baidu\\.com/forum/).+?(/\\w+@IMG@)',
        processor: '$1pic/item$2'
      },
      {
        srcRegExp: '((?:.+\\.)?(?:bdstatic|himg\\.(?:baidu|bdimg))\\.com/.+)/portrait/(.+)',
        processor: '$1/portraith/$2' // TODO: Duplicated.
      },
      {
        srcRegExp: '.+\\.bdstatic\\.com/.+\\bsrc=(.+@IMG@)',
        processor: (trigger, src, srcRegExpObj) => decodeURIComponent(srcRegExpObj.test(src) ? RegExp.$1 : '')
      },
      {
        srcRegExp: '.+\\.(?:bdstatic|baidu)\\.com/.+@IMG@'
      }
    ]
  },
  '(?:.+\\.)?bandcamp\\.com': {
    amendStyles: {
      pointerNone: '.plb-btn,.art-play,.item_link_play,.play-button'
    },
    srcMatching: {
      srcRegExp: '(f\\d+\\.bcbits\\.com/img/.+_)\\d+(@IMG@)?',
      processor: '$10$2'
    }
  },
  'www\\.behance\\.net': {
    srcMatching: [
      {
        selectors: 'img,.js-project-cover,[class^="Cover-wrapper-"]',
        srcRegExp: '(//mir-s\\d+-cdn-cf\\.behance\\.net/projects/)(?:\\w+_)?\\d+(/.+@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(
            src ||
              trigger.find('img[class^="ProjectCoverNeue-image-"],img[class^="AppreciationCover-image-"]').attr('src')
          )
            ? `${RegExp.$1}original${RegExp.$2}`
            : ''
      },
      {
        srcRegExp: '(//mir-s\\d+-cdn-cf\\.behance\\.net/(?:user|team)/)\\d+(/.+@IMG@)',
        processor: '$1276$2'
      },
      {
        selectors: 'a[class^="Card-link-"]',
        processor: trigger => trigger.parent().find('img[class^="Card-image-"]').attr('src') || ''
      }
    ]
  },
  'www\\.bestbuy(?:\\.(?:com|[a-z]{2}))+': {
    // ca|mx
    amendStyles: {
      pointerNone: '[class^="sliderTarget_"]'
    },
    srcMatching: [
      {
        srcRegExp: '((?:pisces\\.bbystatic\\.com|merchandising-assets\\.bestbuy\\.ca)/.+@IMG@).*',
        processor: '$1'
      },
      {
        srcRegExp: '(multimedia\\.bbycastatic\\.ca/.+?/)\\d+x\\d+(/.+@IMG@)',
        processor: '$1500x500$2'
      }
    ]
  },
  '.+\\.bili(?:bili|game)\\.com': {
    amendStyles: {
      pointerNone:
        '.biref-img img~*,.bili-avatar img~*,.groom-module .card-mark,.spread-module .pic img~*,.spread-module .pic .common-lazy-img~*,.cover-ctn .cover-back,.hot-list-content .hover-mask,.play-mask,.recommend-box .info,.hover-cover-box *,.image-area *:not(img),.face-pendants,.pendant,.user-decorator,.bilibili-player-ending-panel-box-recommend-cover,.van-framepreview,.fake-danmu,.fake-danmu-mask,.preview-bg,.pl__mask,.video-card-reco .info,.card-pic a *:not(img),.rib-info,.video-mask,.cover-mask',
      pointerAuto: '.hover-cover-box .cover-ctnr,.image-area .see-later,.cover .i-watchlater'
    },
    srcMatching: [
      {
        selectors:
          'img,[style*=background],.card-live-module .pic .mask,.cover-ctn .cover,.album-img,.user-container i,.drawer-card .img-ctn,.canvas-card .img-contain',
        srcRegExp: '(.+\\.hdslb\\.com/.+?@IMG@)[^?]*(\\?.*)?',
        processor: '$1$2'
      },
      {
        selectors: '.cardBangumibox .modal-box,.song-shadow,.pic-box,.bili-dyn-card-video__cover',
        srcRegExp: '(//.+\\.hdslb\\.com/.+?@IMG@)[^?]*(\\?.*)?',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(tools.getLargestImgSrc(trigger.find('img,[style*=background]')))
            ? RegExp.$1 + RegExp.$2
            : ''
      },
      {
        srcRegExp: '(//patchwiki\\.biligame\\.com/.+/)\\d+(px-.+@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src)
            ? tools
                .detectImage(`${RegExp.$1}180${RegExp.$2}`, `${RegExp.$1}60${RegExp.$2}`)
                .then(imgInfo => imgInfo.src)
            : ''
      },
      {
        srcRegExp: 'patchwiki\\.biligame\\.com/.+@IMG@'
      }
    ]
  },
  '.+\\.bing\\.com': {
    srcMatching: [
      {
        selectors: '.iusc img',
        srcRegExp: '(//.+\\.bing\\.(?:com|net)/th(?:/id/[^?]+)|\\?id=[^&]+)',
        processor: (trigger, src, srcRegExpObj) => {
          var data = JSON.parse(trigger.closest('.iusc').attr('m')),
            defaultSrc = srcRegExpObj.test(src) ? RegExp.$1 : srcRegExpObj.test(data.turl) ? RegExp.$1 : '';

          return tools.detectImage(data.murl, defaultSrc).then(imgInfo => imgInfo.src);
        }
      },
      {
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
      },
      {
        srcRegExp: '.+\\.bing\\.(?:com|net)/th\\?id=.+',
        processor: (trigger, src, srcRegExpObj) => {
          if (srcRegExpObj.test(src)) {
            var url = new URL(src),
              params = url.searchParams;

            params.get('id').split(':').length > 1 &&
              trigger.closest('li').length &&
              params.set('id', params.get('id').split(':')[trigger.closest('li').index()]);
            params.delete('w');
            params.delete('h');
            params.set('qlt', 100);

            src = url.href;
          } else {
            src = '';
          }

          return src;
        }
      }
    ]
  },
  '(?:.+\\.)?briscoes\\.co\\.nz': {
    srcMatching: {
      selectors: 'img,.productItem-image',
      srcRegExp: '(.+/productimages/.+@IMG@).*',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(src || trigger.find('img').attr('src')) ? RegExp.$1 : ''
    }
  },
  'cangku\\.icu': {
    amendStyles: {
      pointerNone: '.post-card-content .cover'
    },
    srcMatching: {
      selectors: '.post-card-content',
      srcRegExp: '.*(https?://.+@IMG@).*',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(trigger.find('.cover').data('src')) ? RegExp.$1 : ''
    }
  },
  '(?:.+\\.)?(?:(?:catch(?:oftheday)?|treatme)\\.co\\.nz|(?:catch|cudo|deals|groceryrun|luxuryescapes|mumgo|scoopon)\\.com(?:\\.au)?)':
    {
      amendStyles: {
        pointerNone: '.product--buy-form--container',
        pointerAuto: '.product--buy-form--container a'
      },
      srcMatching: [
        {
          selectors: 'img,.cnt-deal-list',
          srcRegExp: '(.+\\.com/lux-group/image/upload/)[^/]+/(.+)',
          processor: (trigger, src, srcRegExpObj) =>
            srcRegExpObj.test(src || trigger.find('img').attr('src')) ? RegExp.$1 + RegExp.$2 : ''
        },
        {
          srcRegExp: '(//s\\.catch\\.com\\.au/.+)_[^/]+(@IMG@)',
          processor: '$1$2'
        },
        {
          srcRegExp: '(/magazine/.+?)(?:-\\d+x\\d+)?(@IMG@)',
          processor: '$1$2'
        }
      ]
    },
  '(?:.+\\.)?coupang\\.com': {
    amendStyles: {
      pointerNone: '.prod-image__item__border'
    },
    srcMatching: {
      srcRegExp: 'thumbnail(\\d+\\.coupangcdn\\.com)/.+?(/image\\d*/.+@IMG@)',
      processor: 'image$1$2'
    }
  },
  'shop\\.countdown\\.co\\.nz': {
    //TODO: detect 'large', fallback to 'big'
    srcMatching: {
      srcRegExp: '(//static.countdown.co.nz/assets/product-images/)\\w+(/\\w+@IMG@).*',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(src)
          ? tools
              .detectImage(`${RegExp.$1}zoom${RegExp.$2}`, `${RegExp.$1}large${RegExp.$2}`)
              .then(imgInfo => imgInfo.src)
          : ''
    }
  },
  '(?:.+\\.)?c?trip\\.com': {
    amendStyles: {
      pointerNone:
        '.img_tit,.list_tips,.list_address,.productcard_imgmask,a .item-thumbnail~*,.m_aroundcity_img_mask,.m_desc_con,.taglist_img,.gl-poi-top-list_head-mask,.gl-poi-top-list_sidebar-item-mask,.m-popularDistinations_itemMask,.carousel-list,.carousel-wrapper .top-area',
      pointerAuto: '.ct-review-photo-item img,.carousel-list>[style*=background]'
    },
    srcMatching: {
      srcRegExp: '(.+\\.(?:c-ctrip|tripcdn)\\.com/.+?)(?:_\\w+)*(@IMG@)',
      processor: '$1$2'
    }
  },
  '(?:.+\\.)?dangdang\\.com': {
    srcMatching: [
      {
        srcRegExp: '.*\\.(?:ddimg\\.cn|dangdang\\.com)/digital/.+_cover@IMG@'
      },
      {
        srcRegExp: '(.*\\.(?:ddimg\\.cn|dangdang\\.com)/[^_]+?)_[^oy]((?:_?\\w+)?@IMG@)',
        processor: '$1_o$2'
      }
    ]
  },
  '(?:www|shop)\\.deviantart\\.com': {
    amendStyles: {
      pointerNone: '._3wSWI,a[href*="/gallery/"] ._3mYQ1,.shop-header .overlay-info,.shop-header [class*=figcaption]',
      pointerAuto: '._3wSWI a,._3wSWI button,.shop-header .overlay-info a,.shop-header [class*=figcaption] a'
    },
    srcMatching: [
      {
        selectors: 'a[data-super-full-img] img',
        processor: trigger =>
          trigger
            .closest('a')
            .data('super-full-img')
            .replace(/,q_\d+/, ',q_100') || ''
      },
      {
        selectors: 'a[data-hook="deviation_link"],a[href*="/art/"] img',
        processor: trigger => {
          var deviationId = /(\d+)$/.test(trigger.attr('href') || trigger.closest('a').attr('href')) ? RegExp.$1 : '';

          return deviationId && (trigger.is('img') || trigger.prev().find('>img,>[style*=background]').length)
            ? new Promise((resolve, reject) => {
                $.ajax('/_napi/shared_api/deviation/extended_fetch', {
                  dataType: 'json',
                  data: {
                    deviationid: deviationId,
                    type: 'art',
                    include_session: false
                  },
                  success: response => {
                    var mediaInfo = response?.deviation?.media,
                      imgInfo = mediaInfo?.types.pop() || null;

                    mediaInfo?.baseUri && imgInfo
                      ? resolve(
                          `${mediaInfo.baseUri}${
                            imgInfo.c
                              ? `/${imgInfo.c
                                  .replace('<prettyName>', mediaInfo.prettyName || '')
                                  .replace(/,q_\d+/, ',q_100')}`
                              : ''
                          }${mediaInfo.token ? `?token=${mediaInfo.token[0]}` : ''}`
                        )
                      : reject();
                  },
                  error: reject
                });
              })
            : '';
        }
      },
      {
        selectors: 'a[href*="/gallery/"] img,a[href*="/favourites/"] img',
        processor: trigger => {
          var { userName, folderType, folderId } = /\/([^/]+)\/(gallery|favourites)\/(\d+)\//.test(
            trigger.closest('a').attr('href')
          )
            ? {
                userName: RegExp.$1,
                folderType: RegExp.$2 == 'favourites' ? 'collection' : RegExp.$2,
                folderId: RegExp.$3
              }
            : {};

          return folderId
            ? new Promise((resolve, reject) => {
                $.ajax(`/_napi/da-user-profile/api/${folderType}/contents`, {
                  data: {
                    username: userName,
                    folderid: folderId,
                    offset: 0,
                    limit: 1
                  },
                  success: response => {
                    var mediaInfo = response?.results && response.results[0].deviation.media,
                      imgInfo = mediaInfo?.types.pop() || null;

                    mediaInfo?.baseUri && imgInfo
                      ? resolve(
                          `${mediaInfo.baseUri}${
                            imgInfo.c
                              ? `/${imgInfo.c
                                  .replace('<prettyName>', mediaInfo.prettyName || '')
                                  .replace(/,q_\d+/, ',q_100')}`
                              : ''
                          }${mediaInfo.token ? `?token=${mediaInfo.token[0]}` : ''}`
                        )
                      : reject();
                  },
                  error: reject
                });
              })
            : '';
        }
      },
      {
        srcRegExp: '(//a\\.deviantart\\.net/avatars)(?:-\\w+)?(/.+@IMG@).*',
        processor: (trigger, src, srcRegExpObj) => {
          if (srcRegExpObj.test(src)) {
            var userId =
              trigger.closest('[data-userid]').data('userid') || trigger.closest('[gmi-userid]').attr('gmi-userid');

            src =
              tools.cacheImage(userId) ||
              tools
                .detectImage(`${RegExp.$1}-original${RegExp.$2}`, `${RegExp.$1}-big${RegExp.$2}`)
                .then(imgInfo => tools.cacheImage(userId, imgInfo.src));
          } else {
            src = '';
          }

          return src;
        }
      },
      {
        srcRegExp: 'www\\.da-files\\.com/.+@IMG@'
      }
    ]
  },
  '.+\\.dhgate\\.com': {
    amendStyles: {
      pointerNone: '.mask-bg'
    },
    srcMatching: [
      {
        srcRegExp: '(//www\\.dhresource\\.com/(?:.+/)?)\\d+x\\d+\\w?/((?:\\w+[-/]){6})(.+?@IMG@).*',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src) ? RegExp.$1 + RegExp.$2.split('-').join('/') + RegExp.$3 : ''
      },
      {
        srcRegExp: 'www\\.dhresource\\.com/.+@IMG@'
      }
    ]
  },
  '(?:.+\\.)?(?:dianping|gewara|maoyan|meituan)\\.com': {
    amendStyles: {
      pointerNone:
        '.film-mark,.film-info,.abstract-item>.abstract-pic span,.review-pictures .mask,.pic-overlay,.movie-overlay,.movie-ver,.ranking-top-icon,.ranking-index,.hotlist-item-location,a[data-act$="-click"] :not(img),.news-header'
    },
    srcMatching: [
      {
        srcRegExp: '(.+\\.meituan\\.net/)(?:[\\d.]+/)?(.+?@IMG@).*',
        processor: '$1$2'
      },
      {
        srcRegExp: '(.+\\.meituan\\.net/.+?=@).*',
        processor: '$10w'
      },
      {
        srcRegExp: '(.+\\.pipi\\.cn/.+?@IMG@).*',
        processor: '$1'
      },
      {
        selectors: 'img,.block-link',
        srcRegExp: 'qcloud\\.dpfile\\.com/.+@IMG@',
        processor: (trigger, src, srcRegExpObj) =>
          trigger.data('big') || /\/photos\/\d+/.test(trigger.closest('a').attr('href'))
            ? new Promise((resolve, reject) => {
                $.ajax(RegExp['$&'], {
                  dataType: 'html',
                  success: response => {
                    resolve($('#J_main-img', response).attr('src') || '');
                  },
                  error: reject
                });
              })
            : srcRegExpObj.test(src) || srcRegExpObj.test(trigger.parent().find('img').attr('src'))
            ? RegExp.$_
            : ''
      }
    ]
  },
  'www\\.discogs\\.com': {
    srcMatching: [
      {
        srcRegExp: 'img\\.discogs\\.com/.+/discogs-images/((A|L|R)-(\\d+).+@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src)
            ? new Promise((resolve, reject) => {
                const imageName = RegExp.$1,
                  imageType = ['artist', 'label', 'release'].find(type => type[0].toUpperCase() === RegExp.$2);

                $.ajax(`/${imageType}/${RegExp.$3}/images`, {
                  dataType: 'html',
                  success: response => {
                    const allImages = $('#view_images img', response).toArray(),
                      matchedImage = allImages.find(img => ~img.src.indexOf(imageName));

                    resolve(matchedImage?.src || '');
                  },
                  error: reject
                });
              })
            : ''
      },
      {
        srcRegExp: 'img\\.discogs\\.com/.+/discogs-avatars/.+@IMG@',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src)
            ? new Promise((resolve, reject) => {
                $.ajax(trigger.closest('a').attr('href'), {
                  dataType: 'html',
                  success: response => {
                    resolve($('.user_avatar[data-large-avatar]', response).data('large-avatar') || '');
                  },
                  error: reject
                });
              })
            : ''
      }
    ]
  },
  '(?:.+\\.)?douban\\.(?:com|fm)': {
    srcMatching: [
      {
        selectors: 'img,.programme-list .cover,.programme-cover,.songlist .cover,.related-pic-video',
        srcRegExp: '//img\\d+\\.doubanio\\.com/(?:view|img)/.*(?:medium|large|raw|retina)/.+@IMG@',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src || trigger.find('img').attr('src')) ? RegExp['$&'] : ''
      },
      {
        selectors: 'img,.celebrities-list .avatar,.songlist .cover',
        srcRegExp: '(img\\d+\\.doubanio\\.com/view/\\w+/).*(/public/.+@IMG@)',
        processor: '$1l$2'
      },
      {
        srcRegExp: '(img\\d+\\.doubanio\\.com/icon/)up?([-\\d]+@IMG@)',
        processor: '$1ul$2'
      },
      {
        srcRegExp: '(img\\d+\\.doubanio\\.com/pview/\\w+_poster/)(?:small|median|large)(/public/.+@IMG@)',
        processor: '$1raw$2'
      }
    ]
  },
  '(?:.+\\.)?douyin\\.com': {
    amendStyles: {
      pointerNone:
        '._46cb4690b43b2c3500c78191b9c87d80-scss~*,._49ee5f1e4cac7106a58702ced0e36540-scss,._5b630f3ad5eb8d49496dc2895ca5ebdc-scss'
    },
    srcMatching: {
      srcRegExp: 'p\\d+.*(\\.douyinpic\\.com/.+?~).+?(\\.image|@IMG@).*',
      processor: 'p3$1noop$2'
    }
  },
  '(?:.+\\.)?douyu\\.com': {
    amendStyles: {
      pointerAuto: '.DyListCover-wrap.is-hover .DyImg',
      pointerNone: '.DyImg ~ *,douyu-img ~ *,.DyListCover-wrap.is-hover'
    },
    srcMatching: [
      {
        srcRegExp: '(apic\\.douyucdn\\.cn/.+_)\\w+(@IMG@).*',
        processor: '$1big$2'
      },
      {
        selectors: 'img,[style*=background],video[poster],douyu-img,douyu-img .img',
        srcRegExp: '(.+\\.douyucdn\\.cn/.+@IMG@).*',
        processor: '$1'
      }
    ]
  },
  'dribbble\\.com': {
    amendStyles: {
      pointerNone: '.dribbble-over,.dribbble-video'
    },
    srcMatching: [
      {
        srcRegExp: '(cdn\\.dribbble\\.com/.+)(?:_teaser|_\\d+x)(@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: '(cdn\\.dribbble\\.com/.+)/thumbnail/(.+)',
        processor: '$1/$2'
      },
      {
        srcRegExp: '(cdn\\.dribbble\\.com/users/\\d+/avatars/)(?:mini|small|normal)(/(?:.+@IMG@|data))',
        processor: '$1original$2'
      },
      {
        srcRegExp: 'cdn\\.dribbble\\.com/.+@IMG@.*'
      }
    ]
  },
  'duckduckgo\\.com': {
    amendStyles: {
      pointerNone: '.tile--img__dimensions,.place-list-item__image__img'
    },
    srcMatching: [
      {
        selectors: 'img,.place-list-item__image,.module--carousel__image,.result__image__img',
        srcRegExp: '(//external-content\\.duckduckgo\\.com/iu/\\?u=)([^&]+)',
        processor: (trigger, src, srcRegExpObj) => {
          if (srcRegExpObj.test(src)) {
            const proxySrcPrefix = RegExp.$1,
              externalSrc = decodeURIComponent(RegExp.$2),
              dataHdSrc = trigger.data('photoshow-hd-src');

            if (dataHdSrc) {
              src = tools
                .detectImage(dataHdSrc, `${proxySrcPrefix}${encodeURIComponent(dataHdSrc)}`)
                .then(imgInfo => imgInfo.src);
            } else if (/.+\.bing\.(?:com|net)\/th\?id=.+/.test(externalSrc)) {
              const url = new URL(RegExp['$&']),
                params = url.searchParams;

              params.delete('w');
              params.delete('h');
              params.set('qlt', 100);

              src = url.href;
            } else {
              src = tools.detectImage(externalSrc, src).then(imgInfo => imgInfo.src);
            }
          } else {
            src = '';
          }

          return src;
        }
      },
      {
        srcRegExp: '/i/.+(@IMG@)'
      }
    ],
    onXhrLoad: (url, response) => {
      if (/^\/?i\.js\b/.test(url)) {
        try {
          JSON.parse(response).results.forEach(({ image, thumbnail }) =>
            document
              .querySelector(
                `img[data-src*="${encodeURIComponent('?id=')}${new URL(thumbnail).searchParams.get('id')}"]`
              )
              ?.setAttribute('data-photoshow-hd-src', image)
          );
        } catch (error) {}
      }
    }
  },
  'www\\.duitang\\.com': {
    amendStyles: {
      pointerNone: 'u,.album-mask'
    },
    srcMatching: {
      srcRegExp: '(c-ssl\\.duitang\\.com/uploads/[/\\w]+).*(@IMG@).*',
      processor: '$1$2'
    }
  },
  'www\\.duokan\\.com': {
    srcMatching: {
      srcRegExp: '(cover\\.read\\.duokan\\.com/.+@IMG@)!.*',
      processor: '$1'
    }
  },
  'e621\\.net': {
    srcMatching: {
      srcRegExp: '(//static\\d*\\.e621\\.net/data/)(?:crop|preview|sample)/(.+)(@IMG@)',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(src)
          ? (/\.webm$/.test(trigger.closest('[data-file-url]').data('fileUrl'))
              ? trigger.closest('[data-large-file-url]').data('largeFileUrl')
              : trigger.closest('[data-file-url]').data('fileUrl')) ||
            tools
              .detectImage(`${RegExp.$1}${RegExp.$2}.png`, `${RegExp.$1}${RegExp.$2}${RegExp.$3}`)
              .then(imgInfo => imgInfo.src)
          : ''
    }
  },
  '(?:.+\\.)?ebay(?:desc)?(?:\\.(?:com|[a-z]{2}))+': {
    // co|au|at|be|ca|ch|de|es|fr|hk|ie|it|my|nl|ph|pl|sg|uk
    amendStyles: {
      pointerNone: '.vi-filmstp .sel,.hl-image__background'
    },
    srcMatching: [
      {
        selectors: 'img,.hl-image',
        srcRegExp: '(i\\.ebayimg\\.com/.+/s-l)\\d+(?:/p)?(@IMG@)',
        processor: '$12000$2'
      },
      {
        srcRegExp: '(thumbs\\d+\\.ebaystatic\\.com/.+/l)\\d+(/.+@IMG@)',
        processor: '$12000$2'
      },
      {
        srcRegExp: '(i\\.ebayimg\\.com/.+/\\$_)\\d+(@IMG@)',
        processor: '$110$2'
      }
    ]
  },
  'www\\.etsy\\.com': {
    amendStyles: {
      pointerNone: '.wt-position-absolute.wt-position-top.wt-position-bottom.wt-position-left.wt-position-right'
    },
    srcMatching: [
      {
        srcRegExp: '(.+\\.etsystatic\\.com/isc/.+?_)\\d+x\\d+(.*@IMG@.*)',
        processor: '$1190x190$2'
      },
      {
        srcRegExp: '(.+\\.etsystatic\\.com/.+?_)\\d+x(?:\\d+|N)(.*@IMG@.*)',
        processor: '$1fullxfull$2'
      }
    ]
  },
  '\\w+\\.facebook\\.com': {
    amendStyles: {
      pointerNone: '._52d9,.uiMediaThumb+._53d,._3251,._7m4,#fbProfileCover .coverBorder,img+.pmk7jnqg,image~circle',
      pointerAuto: '.uiMediaThumb+._53d a'
    },
    srcMatching: [
      {
        selectors: 'a[href^="/events/"] img',
        processor: (trigger, src) => {
          var link = trigger.closest('a[href^="/events/"]').attr('href');

          return new Promise((resolve, reject) => {
            $.ajax(link, {
              dataType: 'html',
              success: response => {
                if (/"url"\s*:\s*"[^"]+?\\\/photos\\\/(?:[^/"]+\/)?(\d+)[^"]*"/.test(response)) {
                  $.ajax('/photo/', {
                    data: {
                      fbid: RegExp.$1
                    },
                    dataType: 'html',
                    success: response => {
                      if (/"image"\s*:\s*\{.*?"uri"\s*:\s*"(.*?)"/.test(response)) {
                        resolve(RegExp.$1.replaceAll('\\', ''));
                      } else {
                        reject();
                      }
                    },
                    error: reject
                  });
                } else {
                  reject();
                }
              },
              error: reject
            });
          }).catch(() => src);
        }
      },
      {
        selectors:
          'img,[style*=background-image],a[data-video-channel-id],image,.i09qtzwb.n7fi1qx3.pmk7jnqg.j9ispegn.kr520xx4',
        processor: (trigger, src, srcRegExpObj) => {
          var bgSrc = tools.getBackgroundImgSrc(trigger);
          src = (/\.gif$/.test(src) && !/\.gif$/.test(bgSrc) && bgSrc) || src || trigger.find('img').attr('src');

          var link = trigger.closest('a').attr('href'),
            fbId = /\/photo\b.*?\?.*fbid=([^&]+)/.test(link)
              ? RegExp.$1
              : /\/photos\/(?:[^/]+\/)?(\d+)/.test(link)
              ? RegExp.$1
              : '',
            profileId = /^(?:https?:\/\/www\.facebook\.com)?\/(?:profile\.php\?id=(\d+)|(.+?)\/?(?:\?|$))/.test(link)
              ? RegExp.$1 || RegExp.$2
              : '',
            commercePicId =
              /^commerce\/products\//.test(profileId) && /\/(\d+_\d+_\d+)[^/]*\?/.test(src) ? RegExp.$1 : '';

          return fbId || profileId
            ? tools.cacheImage(fbId || commercePicId || profileId) ||
                new Promise((resolve, reject) => {
                  if (fbId) {
                    $.ajax('/photo/', {
                      data: {
                        fbid: fbId
                      },
                      dataType: 'html',
                      success: response => {
                        if (/"image"\s*:\s*\{.*?"uri"\s*:\s*"(.*?)"/.test(response)) {
                          resolve({
                            id: fbId,
                            src: RegExp.$1.replaceAll('\\', '')
                          });
                        } else {
                          reject();
                        }
                      },
                      error: reject
                    });
                  } else {
                    $.ajax(link, {
                      dataType: 'html',
                      success: response => {
                        if (
                          (/^groups\//.test(profileId) &&
                            /\\?"profileCoverPhoto\\?"[^>]*?src=\\?"(.*?)\\?"/.test(response)) ||
                          (/^marketplace\/item\//.test(profileId) &&
                            /data-pagelet=\\?"MainFeed\\?".*?<img[^>]*?src=\\?"(.*?)\\?"/.test(response))
                        ) {
                          resolve({
                            id: profileId,
                            src: RegExp.$1.replaceAll('&amp;', '&')
                          });
                        } else if (
                          /^commerce\/products\//.test(profileId) &&
                          /"ordered_images":(\[[^\]]+\])/.test(response)
                        ) {
                          try {
                            JSON.parse(RegExp.$1)?.forEach(({ image: { uri } }) => {
                              /\/(\d+_\d+_\d+)[^/]*\?/.test(uri) && tools.cacheImage(RegExp.$1, uri);
                            });
                          } catch (error) {
                            reject();
                          }

                          if (tools.cacheImage(commercePicId)) {
                            resolve({
                              id: commercePicId,
                              src: tools.cacheImage(commercePicId)
                            });
                          } else {
                            reject();
                          }
                        } else if (/"profile_photo"\s*:\s*\{.*?"url"\s*:\s*"(.*?)"/.test(response)) {
                          $.ajax(RegExp.$1.replaceAll('\\', ''), {
                            dataType: 'html',
                            success: response => {
                              if (/"image"\s*:\s*\{.*?"uri"\s*:\s*"(.*?)"/.test(response)) {
                                resolve({
                                  id: profileId,
                                  src: RegExp.$1.replaceAll('\\', '')
                                });
                              } else {
                                reject();
                              }
                            },
                            error: reject
                          });
                        } else if (
                          /"profilePic\d*"\s*:\s*\{.*?"uri"\s*:\s*"(.*?)"/.test(response) ||
                          /"image"\s*:\s*\{.*?"uri"\s*:\s*"(.*?)"/.test(response)
                        ) {
                          resolve({
                            id: profileId,
                            src: RegExp.$1.replaceAll('\\', '')
                          });
                        } else {
                          reject();
                        }
                      },
                      error: reject
                    });
                  }
                })
                  .then(
                    hdImgInfo => {
                      const hdSrc = hdImgInfo.src || src;
                      /^(?:media|friends)\//.test(hdImgInfo.id) || tools.cacheImage(hdImgInfo.id, hdSrc);
                      return hdSrc;
                    },
                    () => src
                  )
                  .catch(() => src)
            : src;
        }
      }
    ]
  },
  '(?:.+\\.)?(?:fandango|flixster|rottentomatoes)\\.com': {
    amendStyles: {
      pointerNone: 'rt-icon-cta-video'
    },
    srcMatching: [
      {
        srcRegExp: '(images\\.fandango\\.com)(?:/.+)?((?<!/)/images/.+@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: 'statcdn\\.fandango\\.com/.+@IMG@',
        processor: '$&'
      },
      {
        selectors: 'img,button[slot="imageAction"]',
        srcRegExp: 'resizing\\.flixster\\.com/.*?(https?://.+)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src || trigger.prev('img').attr('src')) ? RegExp.$1 : ''
      },
      {
        srcRegExp: 'resizing\\.flixster\\.com/(?:.(?!\\d+x\\d+))+$',
        processor: '$&'
      }
    ]
  },
  '(?:www\\.)?figma\\.com': {
    amendStyles: {
      pointerNone: 'none' // Figma.com makes use of pseudo elements in an unusual way (as menu item labels), needing to remove the default blocking of them.
    }
  },
  '(?:www\\.)?flickr\\.com': {
    amendStyles: {
      pointerNone: '.facade-of-protection-neue,.photo-list-tag-view .overlay'
    },
    srcMatching: [
      {
        selectors:
          'img,[style*=background],.photo-list-description-view,.photo-list-gallery-photo-view .photo-container',
        srcRegExp: '//.+\\.static\\.?flickr\\.com/(?:\\d+/)+(\\d+)_.+@IMG@',
        processor: (trigger, src, srcRegExpObj) => {
          var apiKey =
              window.photoShowFlickrApiKey ||
              (/site_key\s*=\s*"(\w+)"/.test($('script:contains("site_key")').text()) ? RegExp.$1 : ''),
            photoId = srcRegExpObj.test(
              decodeURIComponent(src) ||
                tools.getBackgroundImgSrc(trigger) ||
                tools.getBackgroundImgSrc(trigger.find('.photo'))
            )
              ? RegExp.$1
              : '';

          return apiKey && photoId
            ? new Promise(resolve => {
                window.photoShowFlickrApiKey = apiKey;

                chrome.runtime.sendMessage(
                  {
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
                  },
                  response =>
                    resolve(response?.photo?.sizes?.size?.filter(medium => medium.media == 'photo').pop().source || '')
                );
              })
            : '';
        }
      },
      {
        selectors: 'img,.avatar,.thumbnail',
        srcRegExp: '(//.+\\.staticflickr\\.com/\\d+/buddyicons/.+?)(?:_\\w)?(@IMG@.*)',
        processor: '$1_r$2'
      },
      {
        selectors: '.cover',
        srcRegExp: '(.+\\.static\\.?flickr\\.com/.*coverphoto.*?)(?:_\\w)?(@IMG@.*)',
        processor: '$1_h$2'
      }
    ]
  },
  '(.+\\.)?gamer\\.com\\.tw': {
    amendStyles: {
      pointerNone: '.spectator'
    },
    srcMatching: [
      {
        srcRegExp: '(.+\\.bahamut\\.com\\.tw/avataruserpic/.+)_\\w+(@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: '(.+\\.bahamut\\.com\\.tw/.+@IMG@).*',
        processor: '$1'
      },
      {
        selectors: 'img,.ytp-cued-thumbnail-overlay-image',
        srcRegExp: '(//i\\d*\\.ytimg\\.com/vi.*?/.+/).+(@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src)
            ? tools
                .detectImage(
                  `${RegExp.$1}maxresdefault${RegExp.$2}`,
                  `${RegExp.$1}hqdefault${RegExp.$2}`,
                  img => img.width == 120 && img.height == 90
                )
                .then(imgInfo => imgInfo.src)
            : ''
      } // TODO: YouTube image, duplicated, need to be removed.
    ]
  },
  '(.+\\.)?github\\.(?:com|blog)': {
    srcMatching: [
      {
        selectors: '.js-navigation-open',
        srcRegExp: '(?://github\\.com/)?(.+/)(?:blob|raw)/(.+@IMG@).*',
        processor: '//raw.githubusercontent.com$1$2'
      },
      {
        srcRegExp: '((?:avatars\\d*|marketplace-screenshots)\\.githubusercontent\\.com/[^?]+).*',
        processor: '$1'
      }
    ]
  },
  'play\\.google\\.com': {
    amendStyles: {
      pointerNone: '.rg_anbg,.rg_ilmbg'
    },
    srcMatching: {
      selectors: 'img,[style*=background],.wXUyZd,.TdqJUe',
      srcRegExp: '(//(.*\\.googleusercontent|books\\.google)\\.com/[^=]+)=.*',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(src || trigger.parent().find('img[src]').attr('src'))
          ? `${RegExp.$1}=w${~RegExp.$2.indexOf('books') ? '10000' : '0'}`
          : ''
    }
  },
  'www\\.google(?:\\.(?:com|[a-z]{2}))+': {
    amendStyles: {
      pointerNone:
        '.fWhgmd,.ZUQgzb,.hNLpDc-HiaYvf-DWDkFd-HiaYvf-haAclf~label,.a4izxd-tUdTXb-xJzy8c-haAclf-UDotu,.gallery-image-highlight,.HgKUEe,.d6JfQc,.LLO8yd'
    },
    srcMatching: [
      {
        selectors: 'img,[style*=background],.hNLpDc-HiaYvf-DWDkFd-HiaYvf-haAclf+*,.a4gq8e-aVTXAb-haAclf-jRmmHf-hSRGPd', // Google map images.
        srcRegExp: '(//streetviewpixels-pa\\.googleapis\\.com/.+?&w=)(\\d+)&h=(\\d+)(.*)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(
            src ||
              trigger
                .siblings('.hNLpDc-HiaYvf-DWDkFd-HiaYvf-haAclf,.MVVflb-haAclf-uxVfW-hSRGPd')
                .find('.CJY91c-jRmmHf-aVTXAb-haAclf-HiaYvf img,img')
                .attr('src')
          )
            ? `${RegExp.$1}1024&h=${Math.round((parseInt(RegExp.$3) * 1024) / parseInt(RegExp.$2))}${RegExp.$4}`
            : ''
      },
      {
        selectors: 'img,[style*=background],.a4gq8e-aVTXAb-haAclf-jRmmHf-hSRGPd,.jtJMuf', // Google map images.
        srcRegExp: '(//lh\\d+\\.googleusercontent\\.com/.+[/=])(?:-?[\\w\\d]+)+',
        processor: (trigger, src, srcRegExpObj) => {
          return srcRegExpObj.test(
            src ||
              trigger
                .siblings('.MVVflb-haAclf-uxVfW-hSRGPd')
                .find('.CJY91c-jRmmHf-aVTXAb-haAclf-HiaYvf img')
                .attr('src') ||
              trigger.find('img').attr('src')
          )
            ? `${RegExp.$1}w0`
            : '';
        }
      },
      {
        selectors: 'img',
        processor: trigger =>
          /books\.google\..+\bid=([^&]+)|books\/edition\/.+\/([^?]+)/.test(trigger.closest('a').attr('href'))
            ? `/books/publisher/content/images/frontcover/${RegExp.$1 || RegExp.$2}?fife=w100000`
            : '' // Google books images.
      },
      {
        selectors: 'img',
        processor: trigger =>
          window.photoShowHdSrcCache[trigger.closest('[data-id]').data('tbnid')] ||
          trigger.closest('[data-photoshow-hd-src]').data('photoshow-hd-src') ||
          ''
      },
      {
        selectors: 'a[href*="#imgrc="] img',
        processor: trigger => {
          var link = trigger.closest('a').attr('href'),
            imgId = /#imgrc=(.*)/.test(link) ? RegExp.$1 : '';

          return /\/imgres\?imgurl=([^&]+)/.test(link)
            ? decodeURIComponent(RegExp.$1)
            : /\/search\?.*\btbm=isch\b/.test(link)
            ? new Promise(resolve => {
                $.ajax(link, {
                  success: imgSearchResultDoc =>
                    resolve(
                      new RegExp(`"${imgId}",\\[.*?\\],\\["(https?:\/\/.+?)"(?:,\\d+)+\\]`).test(imgSearchResultDoc)
                        ? JSON.parse(`"${RegExp.$1}"`)
                        : ''
                    ),
                  error: () => resolve('')
                });
              })
            : '';
        }
      }
    ],
    onToggle: isOn => {
      if (isOn) {
        window.photoShowHdSrcCache = window.photoShowHdSrcCache || {};

        [...document.scripts]
          .filter(script => /^AF_initDataCallback\b/.test(script.text))
          .forEach(script => {
            [...script.text.matchAll(/"([-\w]{14})",\[.*?\],\["(https?:\/\/.+?)"(?:,\d+)+\]/g)].forEach(
              ([match, id, hdSrc]) => {
                try {
                  window.photoShowHdSrcCache = {
                    ...window.photoShowHdSrcCache,
                    [id]: JSON.parse(`"${hdSrc.replace(/\\\\(?=u[a-f\d]+)/gi, '\\')}"`)
                  };
                } catch (error) {}
              }
            );
          });
      } else {
        $('[data-photoshow-hd-src]').removeAttr('data-photoshow-hd-src');
        delete window.photoShowHdSrcCache;
      }
    },
    onXhrLoad: (url, response) => {
      if (/\bbatchexecute\b/.test(url)) {
        [...`${response}`.matchAll(/\\"([-\w]{14})\\",\[.*?\],\[\\"(https?:\/\/.+?)\\"(?:,\d+)+\]/g)].forEach(
          ([match, id, hdSrc], i) => {
            try {
              // Using 'data-photoshow-hd-src' instead of directly writing 'photoshow-hd-src' attribute on triggers is because in this stage the image triggers may not exist.
              document
                .querySelector(`[data-id="${id}"]`)
                ?.setAttribute('data-photoshow-hd-src', JSON.parse(`"${hdSrc.replace(/\\\\(?=u[a-f\d]+)/gi, '\\')}"`));
            } catch (error) {}
          }
        );
      }
    }
  },
  'huaban\\.com': {
    // TODO: Remove amendStyles and the second matching rule when the new version of huaban has been consolidated. (26/04/2022)
    //       Reserve pointerNone configs from '.UZ2n6I_I'.
    amendStyles: {
      pointerNone:
        '.pin a.img .cover,.pin-view .board-piece .board-pins .cell .cover,.Board .link .over,.Board .link .shadows,.UZ2n6I_I'
    },
    srcMatching: [
      {
        srcRegExp: '(hbimg\\.huaban\\.com/[-a-z0-9]+).*',
        processor: '$1'
      },
      {
        srcRegExp: '(hbfile\\.huaban\\.com/.+)!/.*',
        processor: '$1'
      },
      {
        srcRegExp: '(.*\\.(huabanimg|b\\d+\\.upaiyun)\\.com/\\w+-\\w{6})_/?(?:fw|sq)/?\\d+.*',
        processor: '$1'
      }
    ]
  },
  '(.+\\.)?imdb\\.com': {
    amendStyles: {
      pointerNone: '.image_overlay,.ipc-lockup-overlay__screen'
    },
    srcMatching: {
      selectors: 'img,.ipc-poster,.ipc-slate,.ipc-avatar,.ipc-photo',
      srcRegExp: '(//.*\\.media-amazon\\.com/images/.*?)\\._.+(@IMG@)',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(src || tools.getLargestImgSrc(trigger.find('img'))) ? RegExp.$1 + RegExp.$2 : ''
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
  '(?:www\\.)?interpals\\.net': {
    srcMatching: {
      srcRegExp: '(ipstatic\\.net/)thumbs/\\d+x\\d+(/.+?)(?:_\\d{1,2})?(@IMG@).*',
      processor: '$1photos$2$3'
    }
  },
  '(?:.+\\.)?(?:istockphoto|pexels|unsplash)\\.com': {
    srcMatching: [
      {
        srcRegExp: '(.+\\.(?:istockphoto|pexels|unsplash)\\.com/(?:[^?](?!video-id))+)(?:\\?.*)?$',
        processor: '$1'
      },
      {
        selectors: 'video',
        srcRegExp: '(.+\\.pexels\\.com/[^?]+).*',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(trigger.parent().find('img').attr('src')) ? RegExp.$1 : ''
      }
    ]
  },
  '(?:.+\\.)?instacart\\.com': {
    srcMatching: {
      srcRegExp: '.+/(\\w+\\.cloudfront\\.net/.+/file/)\\w+?_(.+@IMG@)',
      processor: '//$1$2'
    }
  },
  'www\\.instagram\\.com': {
    amendStyles: {
      pointerNone: '.qn-0x,._9AhH0,._7Tu5q'
    },
    srcMatching: [
      {
        selectors: '[aria-label="Control"][role="button"',
        processor: trigger => tools.getLargestImgSrc(trigger.parent().find('video')) || ''
      },
      {
        selectors: 'a img',
        processor: (trigger, src) =>
          new Promise(resolve => {
            var url = trigger.closest('a').attr('href');

            $.ajax(url, {
              data: {
                __a: 1
              },
              success: response => {
                if (response?.graphql) {
                  if (/^\/p\//.test(url)) {
                    if (response.graphql.shortcode_media) {
                      src = response.graphql.shortcode_media || src;

                      if (response.graphql.shortcode_media.display_resources) {
                        src = response.graphql.shortcode_media.display_resources.sort(
                          (resource1, resource2) => resource2.config_width - resource1.config_width
                        )[0].src;
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
      }
    ]
  },
  '(.+\\.)?ixigua\\.com': {
    amendStyles: {
      pointerAuto: '.HorizontalFeedCard__coverWrapper__garbage__icon',
      pointerNone:
        '.feed-card__cover .mask,.feed-card__cover__opacity-mask,.HorizontalFeedCard__coverWrapper__garbage,.BU-MagicImage__shadow,.HorizontalFeedCard__coverWrapper__shadow'
    }
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
      pointerNone: '.hotcomment .show_more'
    },
    noReferrer: true,
    srcMatching: [
      {
        srcRegExp: '(.+\\.jandan\\.net/.+@IMG@).*',
        processor: '$1'
      },
      {
        selectors: 'img,.gif-mask',
        srcRegExp:
          '((?:.+\\.sinaimg\\.cn|image\\.storage\\.weibo\\.com)(?:/.+)?/)(?:small|large|thumbnail|\\wmw\\d+|small|sq\\d+|thumb\\d+|bmiddle|orj\\d+|crop\\.[^/]+|square|wap\\d+)(/\\w+)(?:@IMG@)?.*',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src || trigger.prev('img').attr('src'))
            ? tools
                .detectImage(
                  `${RegExp.$1}original${RegExp.$2}${RegExp.$2[22] === 'g' ? '.gif' : '.jpg'}`,
                  `${RegExp.$1}large${RegExp.$2}${RegExp.$2[22] === 'g' ? '.gif' : '.jpg'}`,
                  img => img.width == 75 && img.height == 75
                )
                .then(imgInfo => imgInfo.src)
            : ''
      }, // TODO: Sina image, duplicated, need to be removed.
      {
        srcRegExp: '(.+\\.360buyimg\\.com/).*((?:jfs|g\\d+)/.+@IMG@).*',
        processor: '$1n1/s800x800_$2'
      }, // TODO: Jd image, duplicated, need to be removed.
      {
        srcRegExp: '(//.+\\.(?:alicdn|china\\.alibaba)\\.com/.+?@IMG@).*',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src) || srcRegExpObj.test(trigger.parent().find('img').attr('src')) ? RegExp.$1 : ''
      } // TODO: Ali image, duplicated, need to be removed.
    ]
  },
  '(?:.+\\.)?(jd|yhd|tuniu)\\.(?:com|hk)': {
    amendStyles: {
      pointerNone:
        '.d-soldout,.pic .picmask,.pic .words,.pic .sta,.gallery-mask,.gallery-thumb-play,.photograph .mask,a.pro_pic>:not(img),.pro_item .pro_pic>:not(a)'
    },
    srcMatching: [
      {
        srcRegExp: '(.+\\.360buyimg\\.com/).*((?:jfs|g\\d+)/.+@IMG@).*',
        processor: '$1n1/s800x800_$2'
      },
      {
        srcRegExp: '(s\\.tuniu\\.net/.+@IMG@).*',
        processor: '$1'
      },
      {
        srcRegExp: '(//(?:tuniupic\\.360buyimg|.+\\.tuniucdn)\\.com/.+?)(?:_w\\d+_h\\d+_c\\d+_t\\d+)*(@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src)
            ? tools
                .detectImage(RegExp.$1 + RegExp.$2, `${RegExp.$1}_w800_h0_c0_t0${RegExp.$2}`)
                .then(imgInfo => imgInfo.src)
            : ''
      }
    ]
  },
  'www\\.kmart\\.com': {
    srcMatching: {
      srcRegExp: '(.+\\.shld\\.net/[^?]+)(?:\\?.*\\bsrc=([^&]+).*)?',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(src) ? (RegExp.$2 ? decodeURIComponent(RegExp.$2) : RegExp.$1) : ''
    }
  },
  'www\\.kmart\\.(?:com\\.au|co\\.nz)': {
    srcMatching: {
      srcRegExp: '(/wcsstore/Kmart/images/ncatalog/)\\w+(/.+-)\\w+(@IMG@)',
      processor: '$1sz$2sz$3'
    }
  },
  '(?:.+\\.)?lofter\\.com': {
    amendStyles: {
      pointerNone: 'img~*:empty,.picnum,.vicon,._1QbO27i89o9oNUgIiATHoz'
    },
    srcMatching: {
      selectors: 'img,.layer,[style*=background]',
      srcRegExp: '(//.+\\.lf\\d+\\.net/.+?@IMG@).*',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(
          src || tools.getLargestImgSrc(trigger.prev('.pic')) || trigger.parent().find('img').attr('src')
        )
          ? RegExp.$1
          : ''
    }
  },
  '(?:.+\\.)?mafengwo\\.cn': {
    amendStyles: {
      pointerNone: 'a .pic~*,.pic a~*,.per_avatar i,a img~:not(img)'
    },
    srcMatching: {
      srcRegExp: '(.+\\.mafengwo\\.net/.+?@IMG@).*',
      processor: '$1'
    }
  },
  '(?:.+\\.)?metal-archives\\.com': {
    srcMatching: {
      srcRegExp: 'www\\.metal-archives\\.com/images/.+@IMG@'
    }
  },
  '(.+\\.(?:mi|xiaomiyoupin))\\.com': {
    amendStyles: {
      pointerNone: '.home-good-item-big .pro-text'
    },
    srcMatching: [
      {
        srcRegExp: '((?:.+\\.(?:app)?mifile\\.(?:com|cn)|static\\.home\\.mi\\.com)/.+?)(?:!\\d+x\\d+)?(@IMG@).*',
        processor: '$1$2'
      },
      {
        srcRegExp: '.+\\.(?:(?:app)?mifile\\.(?:com|cn)|files.xiaomi.net/.+/avatar)/.+(?!@IMG@)'
      },
      {
        srcRegExp: '(.+\\.(?:(?:app)?mifile|mi-img)\\.(?:com|cn)/.+@IMG@).*',
        processor: '$1'
      }
    ]
  },
  '(?:.+\\.)?mi-store(?:\\.(?:com|[a-z]{2}))+': {
    srcMatching: {
      srcRegExp: '(.+\\.mi-store(?:\\.(?:com|[a-z]{2}))+/.+/products/)thumbs(/.+@IMG@)',
      processor: '$1images$2'
    }
  },
  'music\\.163\\.com': {
    amendStyles: {
      pointerAuto: '.u-cover .bottom a',
      pointerNone: '.msk:not(a),.mask,.m-product .cover .spec,.u-cover .bottom'
    },
    srcMatching: {
      selectors: 'img,a.msk,.u-cover',
      srcRegExp: '(//.+\\.music\\.126\\.net/.+@IMG@).*',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(trigger.parent().find('img').attr('src') || src) ? RegExp.$1 : ''
    }
  },
  '.+\\.myprotein(?:\\.(?:com|[a-z]{2}))+': {
    srcMatching: [
      {
        srcRegExp: '(.+\\.thcdn\\.com/).+(/[-\\d]+@IMG@)',
        processor: '$1productimg/original$2'
      },
      {
        srcRegExp: '(.+\\.thcdn\\.com/images/)(?:x?small|medium|large)(/.+@IMG@)',
        processor: '$1large$2'
      },
      {
        srcRegExp: '(uploads-cdn\\.thgblogs\\.com/.+?)(?:-150x150)?(@IMG@)',
        processor: '$1$2'
      }
    ]
  },
  '(?:.+\\.)?nejm\\.org': {
    srcMatching: [
      {
        srcRegExp: '/img_\\w+/(\\w+@IMG@)',
        processor: (trigger, src, srcRegExpObj) => (srcRegExpObj.test(src) ? trigger.data('lg-src') : '')
      },
      {
        srcRegExp: '(csvc\\.nejm\\.org/ContentServer/images\\?id=[^&]+).*',
        processor: '$1'
      },
      {
        srcRegExp: '(.+-wpengine\\.netdna-ssl\\.com/.+)-\\d+x\\d+(@IMG@)',
        processor: '$1$2'
      }
    ]
  },
  '(?:.+\\.)?newegg(?:\\.(?:com|[a-z]{2}))+': {
    // ca|cn
    srcMatching: [
      {
        srcRegExp:
          '((?:\\w*\\.neweggimages|(?:ssl-images|images\\d+)\\.newegg)\\.com/(?:.+/)?)productimage(?:compressall\\d*)?/(.+@IMG@)',
        processor: '$1productImagecompressall1280/$2'
      },
      {
        srcRegExp: '(media\\.flixcar\\.com/.+)-[a-z]+(@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: '(\\w*\\.neweggimages\\.com\\.cn/.+/)p\\d+(/.+@IMG@)',
        processor: '$1p640$2'
      }
    ]
  },
  '(?:.+\\.)?nga\\.cn|nga\\.178\\.com': {
    srcMatching: {
      srcRegExp: '(img\\d*\\.nga\\.178\\.com/.+?@IMG@).*',
      processor: '$1'
    }
  },
  '.+\\.(nipic|huitu)\\.com': {
    srcMatching: [
      {
        srcRegExp: '(pic\\d+\\.nipic\\.com/)pic(/.+)_4(@IMG@)',
        processor: '$1file$2_2$3'
      },
      {
        srcRegExp: '(pic\\w?\\d+\\.huitu\\.com/)(?:pic|img|res)(/.+?)_\\d(?:_\\w\\d+x\\d+)?(@IMG@)',
        processor: '$1res$2_1$3'
      },
      {
        srcRegExp: '(show\\.huitu\\.com/avatar/)(?:\\d+/)?(\\d+@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: 'taskupload\\d+\\.huitu\\.com/.+@IMG@'
      }
    ]
  },
  'www\\.noelleeming\\.co\\.nz': {
    amendStyles: {
      pointerNone: '.overlay-container,.promo-overlay'
    },
    srcMatching: [
      {
        selectors: 'img,.product-list__cover-link',
        srcRegExp: '(/shop/)render-image(/.+)(?:\\.\\d+){2}(@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src || trigger.siblings('.media__img').find('.media__productImg').attr('src'))
            ? `${RegExp.$1}content/images${RegExp.$2}${RegExp.$3}`
            : ''
      },
      {
        srcRegExp: '(media\\.flixcar\\.com/.+)-preview(@IMG@)',
        processor: '$1$2'
      }
    ]
  },
  'www\\.nzsale\\.co\\.nz': {
    srcMatching: {
      srcRegExp: '(cdn\\.mysalemarketplace\\.com/.+)_\\d+x\\d+(@IMG@).*',
      processor: '$1$2'
    }
  },
  'www\\.paknsave(?:online)?\\.co\\.nz': {
    srcMatching: {
      srcRegExp: '(a\\.fsimg\\.co\\.nz/.+/)\\d+x\\d+(/\\d+@IMG@)',
      processor: '$1master$2'
    }
  },
  'www\\.pbtech\\.(?:com|co\\.nz)': {
    srcMatching: [
      {
        srcRegExp: '(www\\.pbtech\\.(?:com/au|co\\.nz)/)thumbs(/.+?@IMG@).*',
        processor: '$1imgprod$2'
      },
      {
        srcRegExp: 'www\\.pbtech\\.(?:com/au|co\\.nz)/imgprod/.+@IMG@'
      }
    ]
  },
  '(?:.+\\.)?pinterest(?:\\.(?:com|[a-z]{2}))+': {
    amendStyles: {
      pointerAuto: 'button,[role="button"],a',
      pointerNone: 'img~.MIw.QLY.Rym.ojN.p6V,[data-test-id="pointer-events-wrapper"],.MIw.QLY.Rym.ojN.p6V.prG.Hsu'
    },
    srcMatching: {
      selectors: 'a,img,[data-test-id="pinWrapper"]',
      srcRegExp: '(//i\\.pinimg\\.com/)(?:originals|\\d+x(?:\\d+(?:_\\w+)?)?)(/.+@IMG@)',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(
          src || trigger.find('video').attr('poster') || tools.getLargestImgSrc(trigger.find('[role="img"]'))
        )
          ? tools
              .detectImage(`${RegExp.$1}originals${RegExp.$2}`, `${RegExp.$1}736x${RegExp.$2}`)
              .then(imgInfo => imgInfo.src)
          : ''
    }
  },
  '(?:.+\\.)?(?:pixiv(?:ision|-bungei)?\\.net|booth\\.pm|vroid\\.com)': {
    amendStyles: {
      pointerNone: '.dxCZpw,.TagImageMainBack,.search-guide-tablet-label,.feypLD',
      pointerAuto: '.thumb img'
    },
    srcMatching: [
      {
        srcRegExp: '(.+\\.pximg\\.net/user-profile/.+)_\\d+(@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: '.+\\.pximg\\.net/(?:imgaz|img-novel)/.+@IMG@'
      },
      {
        srcRegExp: '(.+\\.pximg\\.net/.+/.+_thumb/.+)_\\w+(@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: '(.+\\.pximg\\.net)(?=/).+(/uploads/.+/)(?:.+_)?(\\d+@IMG@)',
        processor: '$1$2$3'
      },
      {
        srcRegExp: '(.+\\.pixiv\\.net/images/post/\\d+)/w/\\d+(/.+@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: '(.+\\.pximg\\.net/)\\w+/\\d+x\\d+/(.+@IMG@)',
        processor: '$1$2'
      },
      {
        selectors: 'img,[style*=background],.kTOQSN',
        srcRegExp: '(//.+\\.pximg\\.net/).+(/img/.+?)(_p\\d+)?_.+(@IMG@)',
        processor: (trigger, src, srcRegExpObj) => {
          src = src || tools.getLargestImgSrc(trigger.find('img'));
          return srcRegExpObj.test(src)
            ? tools
                .detectImage(
                  `${RegExp.$1}img-original${RegExp.$2}${RegExp.$3 || '_ugoira0'}${RegExp.$4}`,
                  `${RegExp.$1}img-original${RegExp.$2}${RegExp.$3 || '_ugoira0'}.png`
                )
                .then(imgInfo => imgInfo.src)
            : '';
        }
      },
      {
        srcRegExp: '(.+\\.pximg\\.net)/c!?/[^/]+(/.+@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: '.+\\.pximg\\.net/.+@IMG@'
      }
    ],
    xhrDownload: 'i.pximg.net'
  },
  'www\\.poco\\.cn': {
    amendStyles: {
      pointerNone:
        '.fade-box,.cc-shadow-cover,.info-item,.cc_info_item,.pui_works_img_normal .txt,.swiper-slide [class^="cc-img-"],.pui_works_img_normal .info-shadow,.pui_works_img_normal .tag',
      pointerAuto: '.info-item .cc_user_item,.cc_info_item a,.pui_works_img_normal .info-shadow .info>*'
    },
    srcMatching: {
      srcRegExp: '.+(\\.pocoimg\\.cn/image/.+?)(?:_[A-Z]\\d+)?(@IMG@).*',
      processor: '//pic3$1$2'
    }
  },
  '(?:.+\\.)?pornhub\\.com': {
    amendStyles: {
      pointerNone: '.videoPreviewEl,.marker-overlays,.pornstar_label'
    },
    srcMatching: [
      {
        selectors: 'a[href^="/photo/"],.thumbImage a[href^="/photo/"] img,.photoAlbumListBlock',
        srcRegExp: '.+\\.ph(?:n|pr)cdn\\.com/pics/.+?_(\\d+)@IMG@',
        processor: (trigger, src, srcRegExpObj) => {
          const url = srcRegExpObj.test(src)
            ? `/photo/${RegExp.$1}`
            : /\/photo\/\d+/.test(trigger.closest('a[href^="/photo/"]').attr('href'))
            ? RegExp.$_
            : '';

          return url
            ? new Promise((resolve, reject) => {
                $.ajax(url, {
                  dataType: 'html',
                  success: response => {
                    resolve($('#photoImageSection .centerImage img', response).attr('src') || '');
                  },
                  error: reject
                });
              })
            : '';
        }
      },
      {
        srcRegExp: '(.+\\.ph(?:n|pr)cdn\\.com/images/categories/)\\d+x\\d+/(.+@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: '(//.+\\.ph(?:n|pr)cdn\\.com/.+?)\\(.+\\)(\\d+@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src) ? tools.detectImage(`${RegExp.$1}${RegExp.$2}`, src).then(imgInfo => imgInfo.src) : ''
      },
      {
        srcRegExp: '(.+\\.nsimg\\.net/biopic/)\\d+x\\d+(/\\d+)',
        processor: '$1320x240$2'
      },
      {
        srcRegExp: '.+\\.ph(?:n|pr)cdn\\.com/.+@IMG@'
      }
    ]
  },
  '(?:user|h5)\\.qzone\\.qq\\.com': {
    amendStyles: {
      pointerNone:
        '.photo_commentcount,.user-name-bg,.head-dress,.pic-num-wrap,.skin_portrait_round,.layer-description,.mod-photo-item .item-ex',
      pointerAuto: '.layer-description a,.mod-photo-item .item-ex a'
    },
    srcMatching: [
      {
        srcRegExp: '(.+\\.(?:qpic\\.cn|photo\\.store\\.qq\\.com)/.+?/)[abcilm](/[^&]+).*',
        processor: '$1b$2'
      },
      {
        srcRegExp: '(.+\\.(?:qpic\\.cn|photo\\.store\\.qq\\.com)/.+?/)[abcilm]&.*',
        processor: '$1b'
      },
      {
        srcRegExp: '(qlogo\\d+\\.store\\.qq\\.com/qzone/(?:\\d+/){2})\\d+.*',
        processor: '$1100'
      },
      {
        srcRegExp: '(.+\\.qpic\\.cn/.+/)\\d+(?:\\?.*)?',
        processor: '$1'
      }
    ]
  },
  'www\\.reddit\\.com': {
    srcMatching: [
      {
        srcRegExp: 'external-preview\\.redd\\.it/.+'
      },
      {
        srcRegExp: '(?:preview|i)(\\.redd\\.it/.+@IMG@).*',
        processor: 'i$1'
      },
      {
        srcRegExp: '(.*\\.(?:redditmedia|redditstatic)\\.com/.+@IMG@).*',
        processor: '$1'
      }
    ]
  },
  'soutushenqi\\.com': {
    amendStyles: {
      pointerNone: '[class^=goodItemLayout_Resolution_]'
    },
    srcMatching: {
      selectors: '.detail_page_footer_more_img img',
      processor: (trigger, src) => {
        const imgListName = /\btime=(\d+)/.test(new URLSearchParams(location.search).get('img'))
          ? `imgList${RegExp.$1}`
          : '';

        if (imgListName) {
          try {
            return JSON.parse(sessionStorage[imgListName])?.imgList.reduce((acc, { largeUrl, thumbUrl }) => {
              document.querySelector(`img[src="${thumbUrl}"]`)?.setAttribute('data-photoshow-hd-src', largeUrl);
              return thumbUrl === src ? largeUrl : acc;
            }, '');
          } catch (error) {
            return '';
          }
        } else {
          return '';
        }
      }
    },
    onXhrLoad: (url, response) => {
      try {
        if (/\/UserActionImage\?/.test(url)) {
          JSON.parse(response).results.forEach(({ largeImageUrl, smallImageUrl }) =>
            document.querySelector(`img[src="${smallImageUrl}"]`)?.setAttribute('data-photoshow-hd-src', largeImageUrl)
          );
        } else if (/server\.jianzhuxuezhang\.com\/api\/v\d\/imageFlow\//.test(url)) {
          JSON.parse(response).data.forEach(({ largeUrl, thumbUrl }) =>
            document.querySelector(`img[src="${thumbUrl}"]`)?.setAttribute('data-photoshow-hd-src', largeUrl)
          );
        }
      } catch (error) {}
    }
  },
  '(?:.+\\.)?(?:sportsfuel|1-day\\.winecentral)\\.co\\.nz': {
    srcMatching: [
      {
        srcRegExp: '(cdn\\.shopify\\.com/.+)_(?:small|medium|large|grande|\\d+x(?:\\d+)?)(@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: 'cdn\\.shopify\\.com/.+@IMG@'
      }
    ]
  },
  '(?:.+\\.)?suning\\.com': {
    amendStyles: {
      pointerNone:
        '.ju-prodlist-item .border,.ju-prodlist-item .mask,.icon-soldout,.recBrandTwo-item ul .mask,.floor-list .goods-cover'
    },
    srcMatching: [
      {
        srcRegExp: '((?:image|imgservice)\\d*\\.suning\\.cn/.+?)\\d+([wh]_|x)\\d+(.*)',
        processor: '$1800$2800$3'
      },
      {
        selectors: 'img,.floor-hots .main li a',
        srcRegExp: '//image\\d*\\.suning\\.cn/uimg/cms/.+@IMG@',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src || trigger.siblings('img').attr('src')) ? RegExp['$&'] : ''
      }
    ]
  },
  'www\\.target\\.com': {
    amendStyles: {
      pointerNone: '.storycard--text'
    },
    srcMatching: {
      selectors: 'img,.ruleOfTwelve--tileImgInner',
      srcRegExp: '(//target\\.scene7\\.com/is/image/[^?]+)',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test((trigger.is('img') && trigger.siblings('source[srcset]').attr('srcset')) || src)
          ? `${RegExp.$1}?wid=1000`
          : ''
    }
  },
  '(?:.+\\.)?taptap\\.com': {
    amendStyles: {
      pointerNone: '.video-duration,.video-item-vertical__definition,.editor-choice__banner-info'
    },
    srcMatching: {
      selectors: 'img,.lb-container,.video-thumb-box',
      srcRegExp: '(//(?:img\\d*\\.tapimg\\.com|static-tapad\\.tapdb\\.net)/.+@IMG@).*',
      processor: (trigger, src, srcRegExpObj) => {
        return srcRegExpObj.test(src) || srcRegExpObj.test(trigger.find('img').attr('src')) ? RegExp.$1 : '';
      }
    }
  },
  'themarket\\.com': {
    srcMatching: [
      {
        srcRegExp: '(themarket\\.azureedge\\.net/.+?)(?:&[wh]=[\\d.]+)+',
        processor: '$1&s=0'
      },
      {
        srcRegExp: '(themarket\\.com/.+)(?:-\\d+x\\d+)?(@IMG@)',
        processor: '$1$2'
      }
    ]
  },
  'www\\.(?:thewarehouse|warehousestationery)\\.co\\.nz': {
    srcMatching: {
      srcRegExp: '(.+\\.co\\.nz/)(?:dw/.+/)?(on/.+@IMG@).*',
      processor: '$1$2'
    }
  },
  '(?:.+\\.)?tiktok\\.com': {
    srcMatching: [
      {
        srcRegExp: '(p\\d+).*(\\.tiktokcdn\\.com/.+/)\\d+x\\d+(/.+(?:\\.image|@IMG@)).*',
        processor: '$1$2720x720$3'
      },
      {
        srcRegExp: '(//p\\d+).*(\\.tiktokcdn\\.com/.+?~).+?(\\.image|@IMG@).*',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src)
            ? tools.detectImage(`${RegExp.$1}${RegExp.$2}noop${RegExp.$3}`, src).then(imgInfo => imgInfo.src)
            : ''
      }
    ]
  },
  '(?:.+\\.)?(tmall|taobao|etao|fliggy|alitrip|1688|alibaba|aliexpress|liangxinyao|alipay|alicdn|alimama|vvic|wsy)\\.(?:com|[a-z]{2})':
    {
      amendStyles: {
        pointerNone:
          '.mask,.itemSoldout .product-mask,.ju-itemlist .link-box .detail,.tb-img li span,.offerImg .offerMask,.NervModuleKjIndexCateOfferUi>div:first-child>div:last-child,.imageGallery .imgItem .imgBg,.img-box .img-bg-layer,.img-zhe,.img-mask,.product .shadow,.item .shade,.changhuo_pank,img~div:empty,[style*=background]~div:empty,.lazyload-wrapper~div:empty'
      },
      srcMatching: [
        {
          srcRegExp: 'union-etao\\.aliyuncs\\.com|gcodex\\.alicdn\\.com/qrcode.do'
        },
        {
          srcRegExp: '(gqrcode\\.alicdn\\.com/img\\?.*?)&w=\\d+(.*?)&h=\\d+(.*)',
          processor: '$1&w=300$2&h=300$3'
        },
        {
          srcRegExp: '(.+\\.(?:alicdn|taobao)\\.com/avatar/get_?Avatar\\.do\\?user(?:Id(?:Str)?|Nick)=[^&]+).*',
          processor: '$1&width=1280&height=1280'
        },
        {
          srcRegExp: '(.+\\.(?:alicdn|china\\.alibaba)\\.com/.+?)\\.(?:\\d+x\\d+[a-z]*|search|summ)(@IMG@).*',
          processor: '$1$2'
        },
        {
          srcRegExp: '(.+\\.(?:alicdn|china\\.alibaba)\\.com/.+?@IMG@).*',
          processor: '$1'
        },
        {
          selectors: '.itemLink',
          srcRegExp: '(.+\\.(?:alicdn|china\\.alibaba)\\.com/.+?@IMG@).*',
          processor: (trigger, src, srcRegExpObj) =>
            srcRegExpObj.test(trigger.parent().find('img').attr('src')) ? RegExp.$1 : ''
        },
        {
          // This is for www.vvic.com and www.wsy.com that link a lot of images under ali's hostnames.
          srcRegExp: '(.+?@IMG@).*',
          processor: '$1'
        }
      ]
    },
  'www\\.toutiao\\.com': {
    amendStyles: {
      pointerNone: '.pic-tip'
    },
    srcMatching: [
      {
        srcRegExp: '(p\\d*\\.pstatp\\.com/)list/\\d+x\\d+(/.+)',
        processor: '$1origin$2'
      },
      {
        srcRegExp: '(.+?~).+(\\.image)',
        processor: '$1noop$2'
      },
      {
        srcRegExp: '(.+\\.byteimg\\.com/)[^/]+(/.+)',
        processor: '$1origin$2'
      }
    ]
  },
  '(?:www\\.)?trademe(?:\\.co)?\\.nz': {
    amendStyles: {
      pointerNone: '.tm-marketplace-search-card-summary-image__gradient',
      pointerAuto: '[size="thumbnail"]'
    },
    srcMatching: [
      {
        selectors: 'img,.supergrid-bucket .supergrid-listing',
        srcRegExp: '(//trademe\\.tmcdn\\.co\\.nz/photoserver/)\\w+(/\\d+@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src) || srcRegExpObj.test(tools.getBackgroundImgSrc(trigger.find('.image')))
            ? `${RegExp.$1}plusw${RegExp.$2}`
            : ''
      },
      {
        selectors: '[style*=background]',
        srcRegExp: '(//trademe\\.tmcdn\\.co\\.nz/photoserver/)\\w+(/\\d+@IMG@)',
        processor: '$1plusw$2'
      },
      {
        srcRegExp: '(trademe\\.tmcdn\\.co\\.nz/).+(/agent_individual_profile.+@IMG@)',
        processor: '$1tm/property/agent_individual_profile$2'
      },
      {
        srcRegExp: 'trademe\\.tmcdn\\.co\\.nz/property/agent_branding/.+@IMG@'
      }
    ]
  },
  'www\\.(?:torpedo7|1-day)\\.co\\.nz': {
    srcMatching: {
      selectors: 'img,a[href*="/products/"]',
      srcRegExp: '(/images/products/.+?)_[a-z]+(.*@IMG@)',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(src || trigger.next('.c-card-product__image-wrap').find('img').attr('src'))
          ? tools
              .detectImage(RegExp.$1 + RegExp.$2, `${RegExp.$1}_zoom${RegExp.$2}`, img => img.width * img.height <= 1)
              .then(imgInfo => imgInfo.src)
          : ''
    }
  },
  '.+\\.tumblr\\.com': {
    amendStyles: {
      pointerNone: '.ks50i',
      pointerAuto: '.post_avatar_image,.post_sub_avatar_image,.search_results_container .header_image'
    },
    srcMatching: [
      {
        selectors: 'img,.user-avatar,.search_popover .result_thumb,.tumblelog_avatar',
        srcRegExp: '(.*\\.media\\.tumblr\\.com/avatar_.*)_\\d+(?:sq)?(@IMG@)',
        processor: '$1_128$2'
      },
      {
        selectors:
          'img,.post .post_glass,.post .post-glass,.radar_content .photo_post,.search_popover .result_thumb,.post--photo__link',
        srcRegExp: '(//(?:.*\\.media|static)\\.tumblr\\.com/.*?)_\\d+(?:sq)?((?:_v\\d+)?@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(
            src ||
              trigger.parent().find('.post_content img,.post-content img').attr('src') ||
              trigger.closest('.post__content').find('img').attr('src') ||
              tools.getBackgroundImgSrc(
                trigger.parent().find('.post_thumbnail_container,.post-thumbnail-container,.thumbnail_anchor')
              )
          )
            ? `${RegExp.$1}_1280${RegExp.$2}`
            : ''
      },
      {
        selectors: 'img,.post .post_glass,.post .post-glass,.post_media .video_embed',
        srcRegExp: '//(?:.*\\.media|static)\\.tumblr\\.com/.*_frame\\d+@IMG@',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(
            src ||
              trigger.parent().find('.post_content img,.post-content img').attr('src') ||
              tools.getBackgroundImgSrc(trigger.parent().find('.post_thumbnail_container,.post-thumbnail-container'))
          )
            ? RegExp['$&']
            : ''
      },
      {
        selectors: '[data-lightbox]>img',
        processor: trigger => trigger.parent().data('lightbox').high_res || src
      },
      {
        selectors: 'img,.post_media .video_poster',
        processor: (trigger, src) => trigger.parent().data('big-photo') || src
      }
    ]
  },
  '(?:(?:.+\\.)?twitter|www\\.twipu)\\.com': {
    amendStyles: {
      pointerNone:
        '.PlayableMedia-player [data-testid="posterPlayBtn"],.PlayableMedia-player [data-testid="poster"]~div,.LastSeenProfiles__shadow,.css-1dbjc4n.r-u8s1d:empty:not(.r-1loqt21)', // :not(.r-1loqt21): filter out video controller
      pointerAuto: '.MomentMediaItem'
    },
    srcMatching: [
      {
        srcRegExp: '(\\w+\\.twimg\\.com/(?:(?:[^/]+/)?default_)?profile_images/.+)_\\w+(?=@IMG@)(@IMG@)',
        processor: '$1$2'
      },
      {
        srcRegExp: '(\\w+\\.twimg\\.com/profile_banners/.+)/\\d+x\\d+',
        processor: '$1'
      },
      {
        srcRegExp: '(\\w+\\.twimg\\.com/media/.+?)(?:@IMG@:\\w+)?(.+[?&]name=)[^&]+(.*)',
        processor: '$1$2large$3'
      },
      {
        srcRegExp: '(\\w+\\.twimg\\.com/.+\\?format=.*&name=).+',
        processor: '$1orig'
      },
      {
        selectors: 'img,.PlayableMedia-player',
        srcRegExp: '\\w+\\.twimg\\.com/.+@IMG@'
      }
    ]
  },
  'wallhaven\\.cc': {
    srcMatching: [
      {
        selectors: 'img,a',
        srcRegExp: '(wallhaven\\.cc/)w/((\\w{2})\\w+)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(trigger.closest('a').attr('href'))
            ? tools
                .detectImage(
                  `//w.${RegExp.$1}full/${RegExp.$3}/wallhaven-${RegExp.$2}.jpg`,
                  `//w.${RegExp.$1}full/${RegExp.$3}/wallhaven-${RegExp.$2}.png`
                )
                .then(imgInfo => imgInfo.src)
            : ''
      },
      {
        srcRegExp: '(wallhaven\\.cc/images/user/avatar/)\\d+(/.+@IMG@)',
        processor: '$1200$2'
      }
    ]
  },
  'www\\.walmart\\.com': {
    srcMatching: [
      {
        selectors: 'img,.u-focusTile',
        srcRegExp: '(//i\\d+\\.walmartimages\\.com/.+@IMG@)\\?.*',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src || trigger.parent().find('img').attr('src')) ? RegExp.$1 : ''
      }
    ]
  },
  'www\\.wattpad\\.com': {
    amendStyles: {
      pointerNone: '.story-rank'
    },
    srcMatching: [
      {
        srcRegExp: '(.+\\.wattpad\\.com/cover/\\d+-).+(@IMG@)',
        processor: '$1512$2'
      },
      {
        srcRegExp: '(.+\\.wattpad\\.com/useravatar/\\w+\\.).+(@IMG@)',
        processor: '$1256$2'
      },
      {
        srcRegExp: '(.+\\.wattpad\\.com/userbgs/\\w+\\.).+(@IMG@)',
        processor: '$11920$2'
      },
      {
        srcRegExp: '(.+\\.wattpad\\.com/[^?]+).*',
        processor: '$1'
      }
    ]
  },
  '(?:.+\\.)?weibo\\.com': {
    amendStyles: {
      pointerNone: '.picture-cover,.hoverMask,.wbs-pic .img_info,.avator img+i'
    },
    srcMatching: [
      {
        srcRegExp: '.+/(weiyinyue\\.music\\.sina\\.com\\.cn/.+@IMG@).*',
        processor: '//$1'
      },
      {
        srcRegExp: '(mu\\d+\\.sinaimg\\.cn/)(?:(?:square|crop|frame)\\.[^/]+|original)/(.+@IMG@).*',
        processor: '$1$2'
      },
      {
        selectors: 'img,.woo-picture-main,.wbpv-poster',
        srcRegExp:
          '((?:.+\\.sinaimg\\.cn|image\\.storage\\.weibo\\.com)(?:/.+)?/)(?:small|large|thumbnail|\\w?mw\\d+|small|sq\\d+|thumb\\d+|bmiddle|orj\\d+|crop\\.[^/]+|square|wap\\d+)(/\\w+)(?:@IMG@)?.*',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src || trigger.find('img').attr('src'))
            ? tools
                .detectImage(
                  `${RegExp.$1}original${RegExp.$2}${RegExp.$2[22] === 'g' ? '.gif' : '.jpg'}`,
                  `${RegExp.$1}large${RegExp.$2}${RegExp.$2[22] === 'g' ? '.gif' : '.jpg'}`,
                  img => img.width == 75 && img.height == 75
                )
                .then(imgInfo => imgInfo.src)
            : ''
      }
    ]
  },
  'mp\\.weixin\\.qq\\.com': {
    srcMatching: [
      {
        srcRegExp: '(mmbiz\\.q(?:logo|pic)\\.cn/(?:\\w*/){2}).*',
        processor: '$1'
      },
      {
        srcRegExp: '(mp\\.weixin\\.qq\\.com/mp/qrcode?.*?&size=)\\d+(.*)',
        processor: '$1980$2'
      }
    ]
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
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(src || trigger.attr('href')) ? RegExp.$1 + RegExp.$2 : ''
    }
  },
  'konachan\\.(?:com|net)|yande\\.re': {
    srcMatching: [
      {
        selectors: '.avatar',
        srcRegExp: '//(?:.+\\.)?(konachan\\.(?:com|net)|yande\\.re)/.+/(\\w+)(?:/.*)?(@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          trigger.parent().is('a')
            ? new Promise((resolve, reject) => {
                $.ajax(trigger.parent().attr('href'), {
                  dataType: 'html',
                  success: response => {
                    return srcRegExpObj.test($('#image', response).attr('src'))
                      ? tools
                          .detectImage(
                            `//${RegExp.$1}/image/${RegExp.$2}/${RegExp.$1}${RegExp.$3}`,
                            `//${RegExp.$1}/jpeg/${RegExp.$2}/${RegExp.$1}${RegExp.$3}`
                          )
                          .then(imgInfo => resolve(imgInfo.src))
                      : Promise.reject();
                  },
                  error: reject
                });
              })
            : ''
      },
      {
        srcRegExp: '//(?:.+\\.)?(konachan\\.(?:com|net)|yande\\.re)/.+/(\\w+)(?:/.*)?(@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src)
            ? tools
                .detectImage(
                  `//${RegExp.$1}/image/${RegExp.$2}/${RegExp.$1}${RegExp.$3}`,
                  `//${RegExp.$1}/jpeg/${RegExp.$2}/${RegExp.$1}${RegExp.$3}`
                )
                .then(imgInfo => imgInfo.src)
            : ''
      }
    ]
  },
  '(?:.+\\.)?yelp(?:\\.(?:com|[a-z]{2}))+': {
    amendStyles: {
      pointerNone: '.collection-card_photo-box .collection-card_text-overlay'
    },
    srcMatching: [
      {
        selectors: 'img,.collection-card_photo-box,.photo-box--background,.feed-item_photo',
        srcRegExp: '(s\\d+-media\\d+\\.fl\\.yelpcdn\\.com/\\w*photo/.+/)\\d*[sml]{1,2}(@IMG@)',
        processor: '$1o$2'
      },
      {
        selectors: '.photo-box .biz-shim',
        srcRegExp: '(//s\\d+-media\\d+\\.fl\\.yelpcdn\\.com/\\w*photo/.+/)\\d*[sml]{1,2}(@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(trigger.siblings('img').attr('src')) ? `${RegExp.$1}o${RegExp.$2}` : ''
      },
      {
        srcRegExp: '//s\\d+-media\\d+\\.fl\\.yelpcdn\\.com/assets/.+@IMG@'
      }
    ]
  },
  '(?:.+\\.)?yiigle\\.com': {
    srcMatching: {
      selectors: '.graphic',
      srcRegExp: '(/img(?:content|source).jspx\\?.+?)c?(@IMG@).*',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(trigger.parent().find('img').attr('src')) ? `${RegExp.$1}${RegExp.$2}` : ''
    }
  },
  '(?:.+\\.)?(?:youku|tudou)\\.com': {
    amendStyles: {
      pointerNone:
        '[class^="index-module_bg_"],.rank-content .tab-item li .info,.movie-card-module .movie-cont .play-btn,.subscribe-square-pc__content__rec__episode__item__mask,.subscribe-square-pc__content__rec__episode__item__info,.td_pc-card-image .image-desc,.mask-img',
      pointerAuto: '.subscribe-square-pc__content__rec__episode__item__info button'
    },
    srcMatching: [
      {
        srcRegExp: '(static\\.youku\\.com/\\w+/img/avatar/)\\d+(/.*)',
        processor: '$1310$2'
      },
      {
        srcRegExp: '(.+\\.alicdn\\.com/avatar/getAvatar\\.do\\?userId=\\d+).*',
        processor: '$1&width=1280&height=1280'
      },
      {
        srcRegExp:
          '((?:tfs\\.alipayobjects.com/images|cdnsf\\.tudou\\.com/img/avatar|image\\.9xsecndns\\.cn/image/uicon)/.+@IMG@).*',
        processor: '$1'
      },
      {
        selectors:
          'img,.p-thumb a,.item-cover,.item-icon,.subscribe-square-pc__card a,.img-box .play-btn,.td-video__thumb__link,.v-thumb__link',
        srcRegExp: '//(?:.+\\.ykimg|.+\\.alicdn|image\\.planet\\.youku)\\.com/[^?]+',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(src || trigger.parent().find('img').attr('src')) ? RegExp['$&'] : ''
      },
      {
        selectors: '.v .v-link a',
        srcRegExp: '//.+\\.ykimg\\.com/.*',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(trigger.closest('.v').find('.v-thumb img').attr('src')) ? RegExp['$&'] : ''
      }
    ]
  },
  'www\\.youtube\\.com': {
    amendStyles: {
      pointerNone: 'yt-img-shadow~[id$="overlay"],yt-img-shadow~[id$="overlays"]',
      pointerAuto: 'yt-img-shadow~[id$="overlay"] [role="button"],yt-img-shadow~[id$="overlays"] [role="button"]'
    },
    srcMatching: [
      {
        selectors:
          'img,[style*=background-image],.ytp-cued-thumbnail-overlay-image,.ytp-videowall-still-info,.ytp-ce-covering-overlay,#player-container',
        srcRegExp: '(//i\\d*\\.ytimg\\.com/vi.*?/.+/).+(@IMG@)',
        processor: (trigger, src, srcRegExpObj) =>
          srcRegExpObj.test(
            src ||
              tools.getLargestImgSrc(trigger.siblings('[class*="-image"]')) ||
              tools.getLargestImgSrc(trigger.siblings('#thumbnail-container').find('img.yt-img-shadow'))
          )
            ? tools
                .detectImage(
                  `${RegExp.$1}maxresdefault${RegExp.$2}`,
                  `${RegExp.$1}hqdefault${RegExp.$2}`,
                  img => img.width == 120 && img.height == 90
                )
                .then(imgInfo => imgInfo.src)
            : ''
      },
      {
        srcRegExp: 'i\\d*\\.ytimg\\.com/.+@IMG@.*'
      },
      {
        srcRegExp: '(yt\\d+\\.ggpht\\.com/.+[/=][sw])\\d+-.*',
        processor: '$10'
      },
      {
        srcRegExp: '(lh\\d+\\.googleusercontent\\.com/[^=]+=).*',
        processor: '$1w0' // TODO: Google images, duplicated, need to be removed.
      }
    ],
    ignoreHDSrcCaching: true
  },
  '(?:(?:.+\\.)?zcool\\.com\\.cn|www\\.hellorf\\.com)': {
    amendStyles: {
      pointerNone: '.title__wrapper'
    },
    srcMatching: [
      {
        srcRegExp: '(img\\.zcool\\.cn/.+?@IMG@)@(?!1280|3000|2o).*',
        processor: '$1'
      },
      {
        srcRegExp: 'hellorfimg\\.zcool\\.cn/preview\\d*/(.+@IMG@)',
        processor: 'image.shutterstock.com/z/stock-photo-$1'
      },
      {
        srcRegExp: '(hellorfimg\\.zcool\\.cn/.+/)preview\\d*(/.+@IMG@)',
        processor: '$1large$2'
      },
      {
        srcRegExp: '(ali\\.image\\.hellorf\\.com/.+@IMG@).*',
        processor: '$1'
      }
    ]
  },
  '(?:.+\\.)?zhipin\\.com': {
    srcMatching: {
      srcRegExp: '(img\\.bosszhipin\\.com/.+?)(?:_s)?(@IMG@).*',
      processor: '$1$2'
    }
  },
  'www\\.zhisheji\\.com': {
    amendStyles: {
      pointerNone: '.zsj-box .desc'
    },
    srcMatching: [
      {
        srcRegExp: '(img\\.zhisheji\\.com/[^?]+).*',
        processor: '$1'
      },
      {
        srcRegExp: '(zhisheji\\.com/uc_server/data/avatar/.+_avatar_)(?:big|middle|small)(@IMG@).*',
        processor: '$1big$2'
      }
    ]
  },
  '(?:www|zhuanlan)\\.zhihu\\.com': {
    amendStyles: {
      pointerNone: '.Thumbnail-Surplus-Sign,.RichContent-cover-play'
    },
    srcMatching: {
      srcRegExp: '(//pic\\d+\\.zhimg\\.com/)(?:\\d+/)?(.+)_(?:\\d+x\\d+|[^.]+)(@IMG@)',
      processor: (trigger, src, srcRegExpObj) =>
        srcRegExpObj.test(src) ? RegExp.$1 + RegExp.$2 + (trigger.hasClass('column-gif') ? '.gif' : RegExp.$3) : ''
    }
  }
};

let WEBSITE_INFO = {},
  DISABLED_WEBSITES = [],
  XHR_DOWNLOAD_REQUIRED_HOSTNAMES = [],
  DOWNLOAD_ITMES = {},
  PHOTOSHOW_CONFIGS = {},
  ALL_TABS_IN_DEVELOPER_MODE = new Set();

const tools = {
  getUrlHostname: function (sourceUrl) {
    const url = sourceUrl && new URL(sourceUrl);
    return (url && /^http/.test(url.protocol) && url.hostname) || '';
  },
  getDownloadFilename: function (hostname, imgSrc, originalFilename, downloadTime) {
    const timestamp = new Date(downloadTime || Date.now()),
      filename =
        originalFilename ||
        (/([^/]+?(?:\.(?:jpe?g|jfif|gif|pn[gj]|bmp|webp|svg))?(?=(?:\?|$)))/i.test(imgSrc) ? RegExp.$1 : ''),
      filenamePatterns = {
        ...(/(?<y>\d+)-(?<M>\d+)-(?<d>\d+)T(?<h>\d+):(?<m>\d+):(?<s>\d+)/.exec(
          new Date(timestamp - timestamp.getTimezoneOffset() * 60 * 1000).toISOString()
        )?.groups || {}),
        H: hostname || this.getUrlHostname(imgSrc),
        O: filename.split('.')[0]
      },
      extFilename = /(\.(?:jpe?g|gif|png|bmp|webp|svg)$)/i.test(filename)
        ? RegExp.$1.toLowerCase()
        : /(\.(?:jpe?g|gif|png|bmp|webp|svg))(?=(?:\?|$))/i.test(imgSrc)
        ? RegExp.$1.toLowerCase()
        : '.jpg';

    return `${
      (PHOTOSHOW_CONFIGS.fileNaming?.pattern || '<O>').replaceAll(
        /<([dHhMmOsy])>/g,
        (_, pattern) => filenamePatterns[pattern] || ''
      ) || filenamePatterns.O
    }${extFilename}`;
  },
  downloadImg: function (imgSrc, tabUrl) {
    if (imgSrc) {
      tabUrl = new URL(tabUrl);
      imgSrc = imgSrc.replace(/\b(gif)v\b/, 'gif'); // Replace 'gifv' suffix used by Tumblr with 'gif' as otherwise it causes downloading problems in Firefox.

      // For Firefox when not using original filename.
      const filename =
          !chrome.downloads.onDeterminingFilename && !/<O>/.test(PHOTOSHOW_CONFIGS.fileNaming?.pattern || '<O>')
            ? this.getDownloadFilename(tabUrl.hostname, imgSrc)
            : undefined,
        alwaysAsk = PHOTOSHOW_CONFIGS.fileNaming?.alwaysAsk || false;

      if (XHR_DOWNLOAD_REQUIRED_HOSTNAMES.includes(new URL(imgSrc).hostname)) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', imgSrc, true);
        xhr.responseType = 'blob';
        xhr.setRequestHeader('photoshow-added-referer', tabUrl.origin);

        xhr.addEventListener('load', e => {
          if (e.target.status == 200) {
            const blobUrl = URL.createObjectURL(xhr.response);

            chrome.downloads.download(
              {
                filename,
                url: blobUrl,
                conflictAction: 'uniquify',
                saveAs: alwaysAsk
              },
              downloadItemId => {
                if (chrome.runtime.lastError || !downloadItemId) {
                  URL.revokeObjectURL(blobUrl);
                } else {
                  DOWNLOAD_ITMES[downloadItemId] = {
                    blobUrl: blobUrl,
                    src: imgSrc,
                    hostname: tabUrl.hostname
                  };
                }
              }
            );

            xhr = null;
          }
        });

        xhr.send();
      } else {
        chrome.downloads.download(
          {
            filename,
            url: imgSrc,
            conflictAction: 'uniquify',
            saveAs: alwaysAsk
          },
          downloadItemId => {
            if (!chrome.runtime.lastError && downloadItemId) {
              DOWNLOAD_ITMES[downloadItemId] = {
                hostname: tabUrl.hostname
              };
            }
          }
        );
      }

      statistics.update('imageDownloaded');
    }
  },
  openImgInNewTab: function (imgSrc, curTabIndex) {
    imgSrc &&
      chrome.tabs.create({
        url: imgSrc,
        index: curTabIndex + 1,
        active: false
      });
  }
};

var photoShow = {
  validateAvailability: function (tabId, callback) {
    chrome.tabs.get(tabId, tab => {
      chrome.tabs.sendMessage(
        tab.id,
        {
          cmd: 'VALIDATE_PHOTOSHOW_AVAILABILITY'
        },
        {
          frameId: 0
        },
        () => {
          if (!chrome.runtime.lastError) {
            callback();
          } else {
            photoShow.setWebsiteState(tab.id); // Shut down when unavailable.
          }
        }
      );
    });
  },
  checkWebsiteState: function (tabUrl) {
    var urlHostname = tools.getUrlHostname(tabUrl);

    if (!WEBSITE_INFO[urlHostname]) {
      WEBSITE_INFO[urlHostname] = {
        isWebsiteUnknown: true,
        isPhotoShowEnabled: !DISABLED_WEBSITES.includes(urlHostname)
      };

      for (const website in websiteConfig) {
        if (new RegExp(`^${website}$`).test(urlHostname)) {
          WEBSITE_INFO[urlHostname].isWebsiteUnknown = false;
          WEBSITE_INFO[urlHostname].websiteConfig = websiteConfig[website];
          WEBSITE_INFO[urlHostname].websiteConfig.srcMatching = [].concat(
            WEBSITE_INFO[urlHostname].websiteConfig.srcMatching || {}
          );

          for (const matchingRule of WEBSITE_INFO[urlHostname].websiteConfig.srcMatching) {
            if (matchingRule.srcRegExp) {
              matchingRule.srcRegExp = matchingRule.srcRegExp.replace(
                /@IMG@/g,
                '\\.(?:jpe?g|gifv?|pn[gj]|bmp|webp|svg)'
              );
            }

            if (matchingRule.processor) {
              matchingRule.processor = '' + matchingRule.processor;
            }
          }

          WEBSITE_INFO[urlHostname].websiteConfig.onToggle &&
            (WEBSITE_INFO[urlHostname].websiteConfig.onToggle = '' + WEBSITE_INFO[urlHostname].websiteConfig.onToggle);
          WEBSITE_INFO[urlHostname].websiteConfig.onXhrLoad &&
            (WEBSITE_INFO[urlHostname].websiteConfig.onXhrLoad =
              '' + WEBSITE_INFO[urlHostname].websiteConfig.onXhrLoad);

          break;
        }
      }
    }

    return WEBSITE_INFO[urlHostname];
  },
  setWebsiteState: function (tabId, tabUrl) {
    var urlHostname = tools.getUrlHostname(tabUrl);

    if (urlHostname) {
      chrome.browserAction.enable(tabId);

      if (WEBSITE_INFO[urlHostname]?.isWebsiteUnknown && PHOTOSHOW_CONFIGS.worksEverywhere === false) {
        photoShow.shutDown(tabId);
      } else if (ALL_TABS_IN_DEVELOPER_MODE.has(tabId) && PHOTOSHOW_CONFIGS.developerModeSuspension !== false) {
        photoShow.shutDown(tabId, 'SUSPENDED');
      } else if (WEBSITE_INFO[urlHostname]?.isPhotoShowEnabled) {
        photoShow.enable(tabId, WEBSITE_INFO[urlHostname].isWebsiteUnknown);
      } else {
        photoShow.disable(tabId);
      }
    } else {
      photoShow.shutDown(tabId, 'UNAVAILABLE');
    }
  },
  enable: function (tabId, isWebsiteUnknown) {
    chrome.browserAction.setIcon({
      tabId: tabId,
      path: 'resources/icon32.png'
    });
    chrome.browserAction.setTitle({
      tabId: tabId,
      title: chrome.i18n.getMessage(`photoShowEnabledMsg${isWebsiteUnknown ? '_basic' : ''}`)
    });
  },
  disable: function (tabId) {
    chrome.browserAction.setIcon({
      tabId: tabId,
      path: 'resources/icon32_disabled.png'
    });
    chrome.browserAction.setTitle({
      tabId: tabId,
      title: chrome.i18n.getMessage('photoShowDisabledMsg')
    });
  },
  shutDown: function (tabId, reason) {
    chrome.browserAction.setIcon({
      tabId: tabId,
      path: 'resources/icon32_unavailable.png'
    });

    switch (reason) {
      case 'SUSPENDED':
        chrome.browserAction.setTitle({
          tabId: tabId,
          title: chrome.i18n.getMessage('photoShowSuspendedMsg')
        });
        break;

      case 'UNAVAILABLE':
        chrome.browserAction.setTitle({
          tabId: tabId,
          title: chrome.i18n.getMessage('photoShowUnavailableMsg')
        });
        chrome.browserAction.disable(tabId);
        break;

      default:
        chrome.browserAction.setTitle({
          tabId: tabId,
          title: chrome.i18n.getMessage('photoShowShutdownMsg')
        });
    }

    photoShowContextMenus.remove();
  },
  getPreservedImgSrc: function (tabId, callback) {
    chrome.tabs.sendMessage(
      tabId,
      {
        cmd: 'GET_PRESERVED_IMG_SRC'
      },
      {
        frameId: 0
      },
      callback
    );
  },
  copyImgSrc: function (hostTabId) {
    chrome.tabs.sendMessage(
      hostTabId,
      {
        cmd: 'COPY_IMG_SRC'
      },
      {
        frameId: 0
      }
    );
  }
};

var photoShowContextMenus = {
  hasMenuCreated: false,
  create: function () {
    if (PHOTOSHOW_CONFIGS.contextMenu !== false && !this.hasMenuCreated) {
      chrome.contextMenus.create({
        id: 'photoShowContextMenu_open',
        title: chrome.i18n.getMessage('contextMenuTitle_open'),
        contexts: ['all'],
        onclick: (contextMenuInfo, tab) =>
          chrome.runtime.lastError ||
          photoShow.getPreservedImgSrc(tab.id, imgSrc => tools.openImgInNewTab(imgSrc, tab.index))
      });

      chrome.contextMenus.create({
        id: 'photoShowContextMenu_save',
        title: chrome.i18n.getMessage('contextMenuTitle_save'),
        contexts: ['all'],
        onclick: (contextMenuInfo, tab) =>
          chrome.runtime.lastError || photoShow.getPreservedImgSrc(tab.id, imgSrc => tools.downloadImg(imgSrc, tab.url))
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
  remove: function () {
    this.hasMenuCreated = false;
    chrome.contextMenus.removeAll();
  }
};

var statistics = {
  data: {
    imageViewed: 0,
    imageDownloaded: 0
  },
  syncTime: 0,
  sync: function () {
    if (new Date() - this.syncTime > 30 * 1000) {
      chrome.storage.sync.set(
        {
          statistics: this.data
        },
        () => !chrome.runtime.lastError && (this.syncTime = new Date())
      );
    }
  },
  init: function (initialData) {
    if (initialData) {
      this.data = initialData;
      this.syncTime = new Date();
    }
  },
  update: function (item) {
    this.data[item] += 1;
    this.sync();
  }
};

// Response to tab actions.
chrome.tabs.onActivated.addListener(tabInfo => {
  chrome.tabs.get(tabInfo.tabId, tab => {
    photoShow.validateAvailability(tab.id, () => {
      photoShow.checkWebsiteState(tab.url);
      photoShow.setWebsiteState(tab.id, tab.url);
    });
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status == 'complete') {
    photoShow.validateAvailability(tab.id, () => {
      photoShow.checkWebsiteState(tab.url);
      photoShow.setWebsiteState(tab.id, tab.url);
    });
  }
});

// Response to messages.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  var needAsyncResponse;

  switch (request.cmd) {
    case 'GET_PHOTOSHOW_STATE_AND_CONFIGS': // Args: tabId (optional), tabUrl (optional)
      const senderSiteState = photoShow.checkWebsiteState(request.args?.tabUrl || sender.url),
        { isPhotoShowEnabled } = sender.frameId ? photoShow.checkWebsiteState(sender.tab.url) : senderSiteState;

      sendResponse({
        ...senderSiteState,
        isPhotoShowEnabled,
        isInDeveloperMode: ALL_TABS_IN_DEVELOPER_MODE.has(request.args?.tabId || sender.tab.id),
        photoShowConfigs: PHOTOSHOW_CONFIGS
      });

      break;

    case 'SET_PHOTOSHOW_STATE': // Args: tabUrl, isPhotoShowEnabled
      var urlHostname = tools.getUrlHostname(request.args.tabUrl);

      if (WEBSITE_INFO[urlHostname]) {
        var newDisabledWebsitesList = DISABLED_WEBSITES.slice(),
          urlHostnameIndex = newDisabledWebsitesList.indexOf(urlHostname);

        !!request.args.isPhotoShowEnabled ^ !!~urlHostnameIndex ||
          (~urlHostnameIndex
            ? newDisabledWebsitesList.splice(urlHostnameIndex, 1)
            : newDisabledWebsitesList.push(urlHostname));

        chrome.storage.sync.set({
          disabledWebsites: newDisabledWebsitesList
        });
      }

      break;

    case 'SET_PHOTOSHOW_CONFIGS': // Args: item, value
      var reservedConfig = { ...PHOTOSHOW_CONFIGS };

      request.args.item
        .split('.')
        .reduce(
          (item, key, i, itemArray) =>
            (item[key] =
              i < itemArray.length - 1 ? (typeof item[key] == 'object' ? item[key] : {}) : request.args.value),
          PHOTOSHOW_CONFIGS
        );

      chrome.storage.sync.set(
        {
          photoShowConfigs: PHOTOSHOW_CONFIGS
        },
        () => chrome.runtime.lastError && (PHOTOSHOW_CONFIGS = reservedConfig)
      );

      break;

    case 'OPEN_IMG_IN_NEW_TAB': // Args: imgSrc
      tools.openImgInNewTab(request.args.imgSrc, sender.tab.index);

      break;

    case 'DOWNLOAD_IMG': // Args: imgSrc, tabUrl (optional)
      tools.downloadImg(request.args.imgSrc, sender.tab ? sender.url : '');

      break;

    case 'VIEW_IMAGE': // Args: hasSrc
      photoShowContextMenus[request.args.hasSrc ? 'create' : 'remove'].call(photoShowContextMenus, sender.tab.id);
      request.args.hasSrc && statistics.update('imageViewed');

      break;

    case 'CROSS_ORIGIN_GET': // Args: url, data
      needAsyncResponse = true;

      $.ajax(request.args.url, {
        data: request.args.data,
        success: response => sendResponse(response),
        error: () => sendResponse()
      });

      break;

    case 'DISPATCH_EVENT': // Args: (event object)
      chrome.tabs.query(
        {
          currentWindow: true,
          active: true
        },
        tabs => {
          if (!chrome.runtime.lastError) {
            chrome.tabs.sendMessage(tabs[0].id, {
              cmd: 'DISPATCH_EVENT',
              args: request.args
            });
          }
        }
      );

      break;

    default:
  }

  return needAsyncResponse;
});

// Response to long-lived connections.
chrome.runtime.onConnect.addListener(function (port) {
  if (/^DEVTOOLS_PAGE_(\d+)$/.test(port.name)) {
    const tabId = parseInt(RegExp.$1);

    ALL_TABS_IN_DEVELOPER_MODE.add(tabId);

    chrome.tabs.sendMessage(tabId, {
      cmd: 'TOGGLE_DEVELOPER_MODE',
      args: {
        isInDeveloperMode: true
      }
    });

    chrome.tabs.get(tabId, tab => {
      photoShow.setWebsiteState(tab.id, tab.url);
    });

    port.onDisconnect.addListener(() => {
      ALL_TABS_IN_DEVELOPER_MODE.delete(tabId);

      chrome.tabs.sendMessage(tabId, {
        cmd: 'TOGGLE_DEVELOPER_MODE',
        args: {
          isInDeveloperMode: false
        }
      });

      chrome.tabs.get(tabId, tab => {
        photoShow.setWebsiteState(tab.id, tab.url);
      });
    });
  }
});

// Response to storage changes.
chrome.storage.onChanged.addListener(changes => {
  if (changes.disabledWebsites) {
    DISABLED_WEBSITES = changes.disabledWebsites.newValue;

    Object.keys(WEBSITE_INFO).forEach(
      hostname => (WEBSITE_INFO[hostname].isPhotoShowEnabled = !DISABLED_WEBSITES.includes(hostname))
    );
  }

  if (changes.photoShowConfigs) {
    PHOTOSHOW_CONFIGS = changes.photoShowConfigs.newValue;

    if (PHOTOSHOW_CONFIGS.fileNaming?.pattern !== changes.photoShowConfigs.oldValue?.fileNaming?.pattern) {
      setPhotoShowDeterminingFilenameHandler(!!PHOTOSHOW_CONFIGS.fileNaming?.pattern);
    }
  }

  chrome.tabs.query(
    {
      active: true
    },
    tabs => {
      if (!chrome.runtime.lastError) {
        tabs.forEach(tab => {
          photoShow.setWebsiteState(tab.id, tab.url);
        });
      }
    }
  );
});

// Deal with xhr-downloading requests.
XHR_DOWNLOAD_REQUIRED_HOSTNAMES = Object.values(websiteConfig)
  .filter(config => config.hasOwnProperty('xhrDownload'))
  .flatMap(config => config.xhrDownload);

// Note:
// The value 'extraHeaders' of the third argument is not supported (neither needed) by Firefox,
// it will be removed during compilation.
chrome.webRequest.onBeforeSendHeaders.addListener(
  details => {
    for (let header of details.requestHeaders) {
      if (header.name == 'photoshow-added-referer') {
        header.name = 'referer';
        break;
      }
    }

    return {
      requestHeaders: details.requestHeaders
    };
  },
  {
    urls: XHR_DOWNLOAD_REQUIRED_HOSTNAMES.map(hostname => `*://${hostname}/*`),
    types: ['xmlhttprequest']
  },
  ['requestHeaders', 'blocking', 'extraHeaders']
);

// Response to downloading actions.
chrome.downloads.onChanged.addListener(downloadInfo => {
  const matchedDownloadItem = DOWNLOAD_ITMES[downloadInfo.id];

  if (matchedDownloadItem && downloadInfo.state?.current != 'in_progress') {
    if (matchedDownloadItem.blobUrl) {
      URL.revokeObjectURL(matchedDownloadItem.blobUrl);
    }

    delete DOWNLOAD_ITMES[downloadInfo.id];
  }
});

const setPhotoShowDeterminingFilenameHandler = (() => {
  const photoShowOnDeterminingFilename = ({ byExtensionId, filename, id, startTime, url }, suggest) => {
    if (byExtensionId === chrome.runtime.id) {
      suggest({
        filename: tools.getDownloadFilename(
          DOWNLOAD_ITMES[id]?.hostname || tools.getUrlHostname(url),
          url,
          filename,
          startTime
        )
      });
    }
  };

  return isEnabled => {
    // Note: Firefox doesn't support downloads.onDeterminingFilename method.
    if (isEnabled) {
      chrome.downloads.onDeterminingFilename?.addListener(photoShowOnDeterminingFilename);
    } else {
      chrome.downloads.onDeterminingFilename?.removeListener(photoShowOnDeterminingFilename);
    }
  };
})();

// Initialization.
chrome.storage.sync.get(['disabledWebsites', 'photoShowConfigs', 'statistics'], response => {
  if (!chrome.runtime.lastError && response) {
    DISABLED_WEBSITES = response.disabledWebsites || [];
    PHOTOSHOW_CONFIGS = response.photoShowConfigs || {};
    statistics.init(response.statistics);

    setPhotoShowDeterminingFilenameHandler(!!PHOTOSHOW_CONFIGS.fileNaming?.pattern);
  }
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.query(
    {
      active: true
    },
    tabs => {
      if (!chrome.runtime.lastError) {
        tabs.forEach(tab => {
          photoShow.setWebsiteState(tab.id, tab.url);
        });
      }
    }
  );
});
