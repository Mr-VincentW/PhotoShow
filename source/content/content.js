/**
 * Copyright (c) 2012-2021 Vincent W., MIT-licensed.
 * @fileOverview PhotoShow content script for main frame.
 * @author Vincent | vincentwang863@gmail.com
 * @version 1.0.0.0 | 2012-12-01 | Vincent    // Initial version.
 * @version 2.0.0.0 | 2013-01-03 | Vincent    // Updates: Change image url matching algorithm, supporting more images and more websites;
 *                                            // Updates: Support image saving;
 *                                            // Updates: Support turnning on/off PhotoShow for individual website;
 *                                            // Updates: Add PhotoShow tag to the photo viewer.
 * @version 3.0.0.0 | 2018-11-08 | Vincent    // Updates: Reconstruction.
 * @version 3.0.1.0 | 2018-11-13 | Vincent    // Updates: Optimize image viewer behavior for page scrolling action.
 * @version 3.0.2.0 | 2018-11-14 | Vincent    // Updates: Support using function in 'srcRepl' property for websiteConfig.
 * @version 3.1.0.0 | 2018-11-17 | Vincent    // Updates: Replace image resources with font icons.
 * @version 3.2.0.0 | 2018-11-19 | Vincent    // Updates: Support non-image triggers.
 * @version 3.2.1.0 | 2018-12-01 | Vincent    // Updates: Add argument 'srcRegExpObj' to 'srcRepl' callback function;
 *                                            // Bug Fix: Fix image url matching problem for those image srcs without location protocol.
 * @version 3.2.2.0 | 2018-12-06 | Vincent    // Updates: Optimize website config structure.
 * @version 3.4.0.0 | 2019-01-24 | Vincent    // Updates: Add activation mode control;
 *                                            // Updates: Add context menu;
 *                                            // Bug Fix: Fix download problem for image srcs without location protocol.
 * @version 3.4.1.0 | 2019-03-08 | Vincent    // Bug Fix: Fix a problem that will cause scroll event triggering invalid.
 * @version 3.4.3.0 | 2019-03-12 | Vincent    // Bug Fix: Fix size calculation error for the trigger host.
 * @version 3.5.0.0 | 2019-04-08 | Vincent    // Updates: Optimize image detect method when page scrolling;
 *                                            // Updates: Detect proper mask hosting element automatically;
 *                                            // Updates: Inject and remove styles programmatically.
 * @version 3.6.0.1 | 2019-05-20 | Vincent    // Updates: Move photoshow icon outsite the view box;
 *                                            // Updates: Remove redundant initialization code.
 * @version 3.7.0.0 | 2019-05-26 | Vincent    // Updates: Parse srcset for images, optimize high-definition image src generating algorithm.
 * @version 3.8.0.0 | 2019-06-04 | Vincent    // Updates: Support fetching image src asynchronously;
 *                                            // Updates: Cache src for high-definition images.
 * @version 3.8.1.1 | 2019-06-06 | Vincent    // Updates: Optimize mask hosting element detecting algorithm.
 * @version 3.8.3.0 | 2019-06-09 | Vincent    // Updates: Support open image in new tab with hotkey.
 * @version 3.8.3.1 | 2019-06-10 | Vincent    // Bug Fix: Fix the problem that stops mouseover event bubbling.
 * @version 3.8.5.0 | 2019-07-10 | Vincent    // Updates: Better support for triggers in iframes;
 *                                            // Updates: Optimize mask hosting element detecting algorithm.
 * @version 3.8.6.0 | 2019-07-18 | Vincent    // Updates: Add mouse wheel action for image viewer update;
 *                                            // Updates: Limit window scroll and mouse wheel events action only to top window;
 *                                            // Bug Fix: Avoid exception when cross-origin access happens between frames.
 *                                            // Bug Fix: Enclose jQuery to avoid conflict.
 * @version 3.8.6.2 | 2019-07-19 | Vincent    // Updates: Optimize calculation for image viewer's size and position.
 * @version 3.8.7.0 | 2019-07-22 | Vincent    // Updates: Remove high-definition image cache when the trigger image changes its src.
 * @version 3.8.8.0 | 2019-07-30 | Vincent    // Updates: Support image urls encoded in Base64.
 * @version 3.8.8.1 | 2019-07-31 | Vincent    // Bug Fix: Fix a window size calculating bug.
 * @version 3.9.0.0 | 2019-09-22 | Vincent    // Bug Fix: Fix style problem caused by globally appended pointerNone style for all pseudo elements.
 * @version 3.9.1.0 | 2019-09-25 | Vincent    // Bug Fix: Fix the problem that PhotoShow does not work on websites that do not have a 'pointerNone' configuration item;
 *                                            // Bug Fix: Fix uncaught error that may occur when getting image src through a Promise.
 * @version 4.0.0.0 | 2019-11-07 | Vincent    // Bug Fix: Fix the locating problem of the viewer when the trigger image is in multi-nested iframes;
 *                                            // Updates: Apply JavaScript Arrow functions;
 *                                            // Updates: Add VIEW MODE feature;
 *                                            // Updates: Add shadow for the viewer and allow it to be hidden by user settings;
 *                                            // Updates: Allow PhotoShow logo in the viewer to be hidden by user settings;
 *                                            // Updates: Locate the viewer automatically on all sides of the trigger image;
 *                                            // Updates: Add acceleration for image scrolling;
 *                                            // Updates: Add end-reach prompt for image scrolling;
 *                                            // Updates: Add new hotkeys 'Esc', 'Home', 'End', 'PageUp', 'PageDown', 'Arrow Left', 'Arrow Right', 'M', 'L', 'A' and 'P';
 *                                            // Updates: Change hotkeys for image rotation;
 *                                            // Updates: Allow all images to be rotated;
 *                                            // Updates: Optimize the popup page styles;
 *                                            // Updates: Hide PhotoShow logo in the viewer when the image is too small;
 *                                            // Updates: Optimize viewer displaying animation;
 *                                            // Updates: Optimize all the icons.
 * @version 4.0.3.0 | 2019-11-23 | Vincent    // Bug Fix: Fix an ajax-url-patching mistake for firefox;
 *                                            // Updates: Optimize image loading procedure.
 * @version 4.0.4.0 | 2019-12-12 | Vincent    // Bug Fix: Fix the problem of getting wrong image src when it contains spaces.
 * @version 4.0.6.0 | 2019-12-27 | Vincent    // Bug Fix: Fix a viewer locating problem when the page content is not enough to fill the whole browser viewport;
 *                                            // Updates: Optimize viewer shadow displaying animation.
 * @version 4.0.7.0 | 2019-12-31 | Vincent    // Updates: Optimize mask hosting element detecting algorithm;
 *                                            // Updates: Add global image caching method.
 * @version 4.0.8.0 | 2020-01-04 | Vincent    // Updates: Add [style*=background-image] selector by default;
 *                                            // Updates: Optimize detectImage(), loadImage(), implementing with Promise;
 *                                            // Updates: Optimize getBackgroundImgSrc(), supporting for the case of multiple background images.
 * @version 4.0.9.3 | 2020-01-08 | Vincent    // Bug Fix: Fix the problem that image rotates without animation when in panoramic mode;
 *                                            // Bug Fix: Fix the keydown events dispatching failure derived from the popup page;
 *                                            // Updates: Port localStorage APIs to chrome.storage APIs.
 * @version 4.0.10.0 | 2020-01-09 | Vincent   // Bug Fix: Remount photoShow elements after they are removed by the host page;
 *                                            // Bug Fix: Fix background image src parsing error (split by ',' causes problems when the srcs themselves contain commas).
 * @version 4.0.11.0 | 2020-01-20 | Vincent   // Updates: Add basic support for pure image link;
 *                                            // Updates: Replace spread syntax with Object.assign to support older browsers, in response to user feedback.
 * @version 4.0.14.0 | 2020-02-13 | Vincent   // Updates: Optimize mask hosting element detecting algorithm (bad cases: twitter).
 * @version 4.1.0.0 | 2020-03-13 | Vincent    // Updates: Support for image address copying;
 *                                            // Updates: Add global message.
 * @version 4.1.2.0 | 2020-03-14 | Vincent    // Updates: Allow certain hotkey actions when the image viewer is not shown.
 * @version 4.2.0.0 | 2020-03-20 | Vincent    // Updates: PHOTOSHOW_CONFIGS supports nested data structure;
 *                                            // Updates: Replace string concatenation with template literals;
 *                                            // Updates: Optimize hotkey actions for better user inputting experience;
 *                                            // Updates: Support disabling hotkeys.
 * @version 4.2.1.0 | 2020-03-26 | Vincent    // Bug Fix: Fix the problem that hotkey actions still trigger when the currently focused element is a 'contenteditable' one.
 * @version 4.2.2.0 | 2020-04-06 | Vincent    // Updates: Support parsing SVG image elements.
 * @version 4.3.0.0 | 2020-04-10 | Vincent    // Updates: Add support for 'gifv' imags used by Tumblr;
 *                                            // Bug Fix: Fix performance issue that might be caused by page scrolling event;
 *                                            // Bug Fix: Fix a spelling error that will cause an exception in domMutateAction.
 * @version 4.4.0.0 | 2020-04-18 | Vincent    // Updates: Optimize triggers parsing, images downloading, and opening-in-new-tab procedures, allowing these actions to work on parsing-unfinished triggers;
 *                                            // Bug Fix: Resolve the instability of image downloading actions (either repeatedly or not-happened), in response to user feedback;
 *                                            // Updates: Better support for 'a' link triggers;
 *                                            // Updates: Optimize mask hosting element detecting algorithm;
 *                                            // Updates: Optimize hotkey actions;
 *                                            // Updates: Optimize the destruction procedure when PhotoShow is toggled off;
 *                                            // Bug Fix: Fix the problem that image src fails to be preserved for contextmenu actions.
 * @version 4.4.1.1 | 2020-04-22 | Vincent    // Bug Fix: Fix the problem that some non-image-url 'a' link triggers might not work, caused by the optimization for 'a' link parsing rules in version 4.4.0.0.
 * @version 4.4.3.0 | 2020-05-02 | Vincent    // Bug Fix: Fix the problem that PhotoShow-injected styles fail to be removed when it is toggled off;
 *                                            // Updates: Optimize mask hosting element detecting algorithm.
 * @version 4.5.2.0 | 2020-08-23 | Vincent    // Updates: Fit 'onToggle' and 'onXhrLoad' callbacks;
 *                                            // Updates: Replace Object.assign with spread syntax.
 * @version 4.6.0.0 | 2021-01-24 | Vincent    // Updates: Support displaying HD image size in the viewer;
 *                                            // Updates: Remove the feature of displaying PhotoShow logo in the viewer.
 * @version 4.6.1.0 | 2021-02-06 | Vincent    // Bug Fix: Fix the problem of image not updating when only the src attribute of the trigger changes;
 *                                            // Updates: Increase delay time for image loader displaying;
 *                                            // Updates: Optimize background image src parsing method.
 * @version 4.6.2.0 | 2021-03-01 | Vincent    // Updates: Partly replace using of e.which to e.key in keyboard events, for better usability (GitHub issue #15).
 * @version 4.6.3.0 | 2021-03-04 | Vincent    // Updates: Toggle on/off PhotoShow initially after the document is ready.
 * @version 4.6.6.0 | 2021-05-09 | Vincent    // Bug Fix: Prevent working on links that contain image-file-extension-name keywords in their href but actually are not image links;
 *                                            // Updates: Add statistics.
 * @version 4.7.0.0 | 2021-07-04 | Vincent    // Updates: Allow users to disable transition animation;
 *                                            // Updates: Allow users to disable loading status display;
 *                                            // Updates: Resolve hotkey conflicts (with original document) issue;
 *                                            // Updates: Add activation exemption feature.
 * @version 4.7.4.0 | 2021-08-03 | Vincent    // Updates: Works better with data-photoshow-hd-src cache.
 * @version 4.8.0.0 | 2021-08-14 | Vincent    // Bug Fix: Trigger style mutations cause image viewer hiding;
 *                                            // Updates: Compatible with triggers having 'background' rather than 'background-image' styles.
 * @version 4.8.1.0 | 2021-08-20 | Vincent    // Bug Fix: Compatibility issue for background-image url that contains brackets;
 *                                            // Updates: Normalize image urls;
 *                                            // Updates: Handle exceptions that occur during image loading.
 * @version 4.9.0.0 | 2021-08-22 | Vincent    // Updates: Parse video poster attribute by default;
 *                                            // Updates: Offer basic support for unknown websites.
 * @version 4.9.1.0 | 2021-08-23 | Vincent    // Bug Fix: The visual area scrolling issue for long images, reported by users;
 *                                            // Updates: Optimize image viewer displaying behaviour on unknown websites.
 * @version 4.9.2.0 | 2021-08-27 | Vincent    // Bug Fix: Fail to parse background image url, reported by users (GitHub issue #26);
 *                                            // Bug Fix: Enabling/disabling PhotoShow doesn't reset the hotkey deconflict agent;
 *                                            // Updates: Allow users to toggle between the last two view modes used recently, in response to user feedback (GitHub issue #25);
 *                                            // Updates: Optimize the view mode switch tip styles.
 * @version 4.10.0.0 | 2021-09-18 | Vincent   // Updates: Improve viewer displaying performance;
 *                                            // Updates: Indicate image loading/loading-failure status via trigger mask animation instead of bubble messages;
 *                                            // Updates: Optimize image caching method;
 *                                            // Updates: Use CSS mask to implement viewer mask;
 *                                            // Updates: Allow user to set viewer location;
 *                                            // Updates: Optimize user interaction on certain websites by changing events binding method;
 *                                            // Bug Fix: Xhr hook error when 'responseType' of the request is not text.
 * @version 4.10.1.0 | 2021-10-05 | Vincent   // Updates: Optimize mask hosting element detecting algorithm.
 * @version 4.11.0.0 | 2021-10-21 | Vincent   // Updates: Optimize background image detecting rule, reducing the chances of displaying css-sprite images;
 *                                            // Bug Fix: Deconflict key events for activation mode hot key actions;
 *                                            // Bug Fix: A frame-dom-mutation event error;
 *                                            // Updates: Optimize mask hosting element detecting algorithm.
 */

// TODO: Extract common tool methods to external modules.
// TODO: Optimise image loading speed by picking proper image sources according to their final displaying dimensions.
// TODO: Exclude background images with a repeating pattern.
// TODO: Render viewer in absolute position so that it can scroll with the viewport.
// TODO: Might need to replace all the usecases of e.which to e.key.
// TODO: Might need to check the hotkey de-conflict feature for iframes.

($ => {
  $.ajaxSetup({
    timeout: 10000,
    beforeSend: function () {
      // An ajax to a relative path url would not work in firefox.
      this.url = /^(?:https?:|data:image\/)/.test(this.url)
        ? this.url
        : (/^\/\//.test(this.url) ? location.protocol : location.origin) + this.url;
    }
  });

  const tools = {
    _cachedImages: {},
    setStyle: function () {
      // el, styles, useAni || [el, styles, useAni]
      for (let [el, styles, useAni = false] of arguments.length > 1 ? [arguments] : arguments[0]) {
        if (styles) {
          $(el).css('transition', useAni && photoShow.config.enableAnimation ? '0.2s ease-out' : '');
          $(el).css(styles);
        }
      }
    },
    swapDimensions: function (obj) {
      return {
        ...obj,
        width: obj.height,
        height: obj.width
      };
    },
    detectImage: function (preferredSrc, defaultSrc, isImgInvalid) {
      defaultSrc = defaultSrc || '';

      return new Promise(resolve => {
        var img = new Image(),
          imgLoadTimer = null;

        img.onload = () => {
          clearTimeout(imgLoadTimer);
          img.onload = img.onerror = null;

          resolve(
            (({ src, naturalWidth: width, naturalHeight: height }) => ({ src, width, height }))(
              isImgInvalid && isImgInvalid(img) ? { src: defaultSrc } : img
            )
          );
        };

        img.onerror = () => {
          clearTimeout(imgLoadTimer);
          img.onload = img.onerror = null;

          resolve({ src: defaultSrc });
        };

        clearTimeout(imgLoadTimer);
        imgLoadTimer = setTimeout(() => img.onerror(), 20 * 1000);

        photoShow.websiteConfig.noReferrer && (img.referrerPolicy = 'no-referrer');

        img.src = preferredSrc;
      });
    },
    loadImage: function (oriSrc) {
      return this.resolveImgSrc(oriSrc).then(imgSrc =>
        this.detectImage(imgSrc).then(imgInfo => ({ ...imgInfo, oriSrc }))
      );
    },
    cacheImage: function (id, imgSrc) {
      return imgSrc ? (this._cachedImages[id] = imgSrc) : this._cachedImages[id] || '';
    },
    addStyle: function (styleName, selectors) {
      if (!$(`#photoShowStyles_${styleName}`).length) {
        var rules = [];

        switch (styleName) {
          case 'pointerAuto':
            rules.push('pointer-events:auto !important');

            break;

          case 'pointerNone':
            rules.push('pointer-events:none !important');

            break;

          default:
        }

        $('<style type="text/css"></style>')
          .attr('id', `photoShowStyles_${styleName}`)
          .append(`${selectors}{${rules.join(';')}}`)
          .appendTo($('head')[0]);
      }
    },
    getBackgroundImgSrc: function (target) {
      return /(?:^|background[^;]*)url\(['"]?([^'"]+)['"]?\)/i.test(
        typeof target == 'string' ? target : $(target).attr('style')
      )
        ? new URL(RegExp.$1, location.origin).href
        : '';
    },
    getLargestImgSrc: function (target) {
      var srcSetRegex = /([\d.]+)[wx]$/,
        src = '';

      target = $(target);

      if (target.is('img')) {
        src = (target[0].srcset || target[0].src || '')
          .split(/,\s*(?=(?:\w+:)?\/\/)/)
          .sort(
            (src1, src2) =>
              (srcSetRegex.test(src2) ? parseFloat(RegExp.$1) : 0) -
              (srcSetRegex.test(src1) ? parseFloat(RegExp.$1) : 0)
          )[0]
          .split(/,?\s+/)[0];
      } else if (target.is('image')) {
        // SVG image elements.
        src = target.attr('href') || target.attr('xlink:href');
      } else if (target.is('video')) {
        src = target.attr('poster');
      } else {
        src = this.getBackgroundImgSrc(target);
      }

      !src &&
        target.is('a') &&
        /\.(?:jpe?g|gifv?|pn[gj]|bmp|webp|svg)\b/.test(target.attr('href')) &&
        (src = target.attr('href')); // Get link address if it doesn't have a background image.

      return src ? new URL(src, location.origin).href : '';
    },
    getBoundingClientRectToTopWin: function (element) {
      var clientRect = $.extend({}, element.getBoundingClientRect()); // TODO: Find better ways to transfer DOMRect object to plain JavaScript object.

      if (element.ownerDocument.defaultView != window.top) {
        let curFrameRect = arguments.callee(element.ownerDocument.defaultView.frameElement);

        clientRect.top += curFrameRect.top;
        clientRect.bottom += curFrameRect.top;
        clientRect.left += curFrameRect.left;
        clientRect.right += curFrameRect.left;
      }

      return { ...clientRect, area: clientRect.width * clientRect.height };
    },
    copyText: function (text) {
      let preservedActiveElement = $(document.activeElement),
        textbox = $('<input type="text" class="photoshow-hidden-elements" />')
          .val(text)
          .appendTo(document.documentElement)
          .select();

      document.execCommand('copy');
      textbox.remove();

      preservedActiveElement.focus();
    },
    resolveImgSrc: function (src) {
      return Promise.resolve(src)
        .then(src => (/^\/\//.test(src) ? location.protocol : '') + src)
        .catch(error => '');
    },
    executeScript: function (scriptText) {
      const nonce = document.scripts[0]?.nonce || '',
        script = document.createElement('script');

      script.type = 'text/javascript';
      script.text = scriptText;
      script.nonce = nonce;

      (document.head || document.documentElement).appendChild(script);
      script.remove();
    }
  };

  const POSITIONS = ['top', 'right', 'bottom', 'left'],
    POS_FOR_KEYCODE = POSITIONS.concat(POSITIONS).slice(3, 7),
    MODIFIER_KEYS = Array(16).concat(['shift', 'ctrl', 'alt']),
    VIEW_MODES = {
      a: {
        name: 'auto',
        scale: Infinity
      },
      m: {
        name: 'mini',
        scale: 0.125 // Image size scaling rate under this mode.
      },
      l: {
        name: 'lite',
        scale: 0.25
      },
      p: {
        name: 'panoramic',
        scale: Infinity
      }
    },
    MASK_THRESHOLD = 100; // The original image size should larger (either width or height) than its maximum displaying size at least by this value so that a mask would apply.

  const photoShowGlobalMsg = {
    element: $(
      '<div class="photoshow-global-msg-layer"><div class="photoshow-global-msg"><em class="photoshow-icons photoshow-icons-logo"></em><i></i></div></div>'
    ),
    show: function (msg) {
      this.hide();

      $('i', this.element).text(msg);
      this.element.appendTo(document.documentElement);
    },
    hide: function () {
      this.element.remove();
    }
  };

  const photoShow = {
    isEnabled: false, // PhotoShow availability flag.
    websiteConfig: {}, // Configuration for current website.
    recentViewModes: ['a', 'p'], // Last two view modes that were used recently.
    config: {
      // PhotoShow configuration.
      update: function (config) {
        // Update PhotoShow configuration.
        (function (item, config) {
          Object.entries(config).forEach(
            ([key, value]) =>
              item.hasOwnProperty(key) &&
              (typeof item[key] == 'object' && !Array.isArray(item[key])
                ? arguments.callee(item[key], value)
                : (item[key] = value))
          );
        })(this, config);

        // Reset hotkey deconflict agent.
        if (photoShow.isEnabled) {
          photoShow.toggleHotkeyDeconflictAgent(false);
          photoShow.toggleHotkeyDeconflictAgent(true);
        }
      },
      isWebsiteUnknown: true,
      activationMode: '', // Activation mode ('', 'shift', 'ctrl', 'alt').
      activationExemption: true, // Activation exemption.
      _viewMode: VIEW_MODES['a'], // View mode.
      get viewMode() {
        return this._viewMode.name;
      },
      set viewMode(modeName) {
        if (this._viewMode.name != modeName) {
          photoShowViewer.viewModeSwitchTip && photoShowViewer.viewModeSwitchTip.text(modeName[0]);
          this._viewMode = VIEW_MODES[modeName[0]];
          photoShowViewer.hasImgShown && photoShowViewer.update();
        } else {
          photoShowViewer.isViewerChanged = false;
        }

        // Trick: To show() is only for triggering a reflow on the viewerBox element so that the keyframe animation can restart, useful when the view mode is frequently switched.
        photoShowViewer.hasImgShown &&
          !photoShowViewer.isViewerChanged &&
          photoShowViewer.viewerBox.removeClass('view-mode-switching').show().addClass('view-mode-switching');

        photoShow.recentViewModes = [modeName[0], photoShow.recentViewModes.find(mode => mode !== modeName[0])];
      },
      viewerLocation: ['top', 'right', 'bottom', 'left'],
      _imageSizeDisplay: true, // ImageSize display.
      get imageSizeDisplay() {
        return this._imageSizeDisplay;
      },
      set imageSizeDisplay(isVisible) {
        (this._imageSizeDisplay = isVisible)
          ? photoShowViewer.viewerImgSizeTip.appendTo(photoShowViewer.viewerBox)
          : photoShowViewer.viewerImgSizeTip.remove();
      },
      _shadowDisplay: true, // Shadow display.
      get shadowDisplay() {
        return this._shadowDisplay;
      },
      set shadowDisplay(isVisible) {
        (this._shadowDisplay = isVisible)
          ? photoShowViewer.viewerShadow.prependTo(photoShowViewer.viewerBox)
          : photoShowViewer.viewerShadow.remove();
      },
      loadingStatusDisplay: true, // Loading status display.
      enableAnimation: true, // Transition animation.
      hotkeys: {
        // Hotkey toggles.
        closeViewer: {
          isEnabled: true
        },
        rotateImage: {
          isEnabled: true
        },
        scrollImage: {
          isEnabled: true
        },
        scrollImageByPage: {
          isEnabled: true
        },
        scrollImageToEnds: {
          isEnabled: true
        },
        switchViewMode: {
          isEnabled: true
        },
        toggleViewMode: {
          isEnabled: true
        },
        openImageInNewTab: {
          isEnabled: true
        },
        saveImage: {
          isEnabled: true
        },
        copyImageAddress: {
          isEnabled: true
        }
      }
    },
    getImgHDSrc: function (element) {
      // Get HD src for the element (return either a string or a promise).
      var imgSrc = '',
        target = $(element);

      if (
        element &&
        !(imgSrc =
          target.attr('photoshow-hd-src') || target.closest('[data-photoshow-hd-src]').data('photoshow-hd-src'))
      ) {
        // The default empty srcMatching rule ensures all images are parsed.
        for (srcMatchingRule of (this.websiteConfig.srcMatching || []).concat({})) {
          if (
            target.is(srcMatchingRule.selectors || 'img,[style*=background],image,a[href],video[poster]') &&
            target.css('pointerEvents') != 'none'
          ) {
            let targetSrc = tools.getLargestImgSrc(element),
              srcRegExpObj = srcMatchingRule.srcRegExp ? new RegExp(srcMatchingRule.srcRegExp, 'i') : undefined;

            if (/^(?:function|\(?[\w,\s]*\)?\s*=>)/.test(srcMatchingRule.processor)) {
              imgSrc = eval(`(${srcMatchingRule.processor})`).call(element, target, targetSrc, srcRegExpObj) || '';
            } else if (srcRegExpObj) {
              if (srcRegExpObj.test(targetSrc)) {
                imgSrc = srcMatchingRule.processor
                  ? targetSrc.replace(srcRegExpObj, srcMatchingRule.processor)
                  : targetSrc;
              }
            } else {
              imgSrc = srcMatchingRule.processor || targetSrc;
            }
          }

          if (imgSrc) {
            typeof imgSrc === 'string' && (imgSrc = new URL(imgSrc, location.origin).href);

            break;
          }
        }
      }

      return imgSrc;
    },
    toggleXhrHook: function () {
      if (this.websiteConfig.onXhrLoad) {
        tools.executeScript(
          this.isEnabled
            ? `
              if (!window.photoShowOriXhrOpen) {
                window.photoShowOriXhrOpen = window.XMLHttpRequest.prototype.open;

                window.XMLHttpRequest.prototype.open = function(method, url) {
                  this.addEventListener('load', function() {
                    (!this.responseType || this.responseType === 'text') && (${this.websiteConfig.onXhrLoad})(url, this.responseText);
                  });
                  return window.photoShowOriXhrOpen.apply(this, arguments);
                }
              }`
            : `
              if (window.photoShowOriXhrOpen) {
                window.XMLHttpRequest.prototype.open = window.photoShowOriXhrOpen;
                delete window.photoShowOriXhrOpen;
              }`
        );
      }
    },
    toggleHotkeyDeconflictAgent: function (isEnabled = this.isEnabled) {
      if (isEnabled) {
        tools.executeScript(`
          if (!window.photoShowHotkeyDeconflictHook) {
            window.photoShowHotkeyDeconflictHook = e => {
              const eventKey = e.key?.toUpperCase(),
              imgViewer = document.getElementById('photoShowViewer'),
              isViewerActive = imgViewer?.dataset.active != undefined,
              hasImgShown = imgViewer?.dataset.imgShown != undefined,
              hasMask = imgViewer?.dataset.hasMask != undefined,
              isActiveElementAnInput = /^text(?:area)?$/.test(document.activeElement.type) || document.activeElement.isContentEditable;

              if (isViewerActive) {
                if(eventKey === 'TAB' && ${this.config.hotkeys.openImageInNewTab.isEnabled} ||
                  eventKey === 'C' && ${this.config.hotkeys.copyImageAddress.isEnabled} ||
                  eventKey === 'S' && ${this.config.hotkeys.saveImage.isEnabled} ||
                  eventKey === '${this.config.activationMode?.toUpperCase()}') {
                  isActiveElementAnInput || e.preventDefault();
                }

                if (hasImgShown) {
                  if(eventKey == 'ESCAPE' && ${this.config.hotkeys.closeViewer.isEnabled} ||
                    /^ARROW(?:LEFT|RIGHT)$/.test(eventKey) && e.shiftKey && e.ctrlKey && ${
                      this.config.hotkeys.rotateImage.isEnabled
                    }) {
                    isActiveElementAnInput || e.preventDefault();
                  }

                  if (hasMask && (
                      /^PAGE(?:UP|DOWN)$/.test(eventKey) && ${this.config.hotkeys.scrollImageByPage.isEnabled} ||
                      /^(?:END|HOME)$/.test(eventKey) && ${this.config.hotkeys.scrollImageToEnds.isEnabled} ||
                      /^ARROW(?:UP|RIGHT|DOWN|LEFT)$/.test(eventKey) && ${this.config.hotkeys.scrollImage.isEnabled} ||
                      /^(?:A|L|M|P)$/.test(eventKey) && ${this.config.hotkeys.switchViewMode.isEnabled})
                    ) {
                    isActiveElementAnInput || e.preventDefault();
                  }
                }
              }
            };

            document.addEventListener('keydown', window.photoShowHotkeyDeconflictHook, true);
            document.addEventListener('keyup', window.photoShowHotkeyDeconflictHook, true);
          }
        `);
      } else {
        tools.executeScript(`
          if (window.photoShowHotkeyDeconflictHook) {
            document.removeEventListener('keydown', window.photoShowHotkeyDeconflictHook, true);
            document.removeEventListener('keyup', window.photoShowHotkeyDeconflictHook, true);
            delete window.photoShowHotkeyDeconflictHook;
          }`);
      }
    },
    updateStateAndConfigs: function () {
      chrome.runtime.sendMessage(
        {
          cmd: 'GET_PHOTOSHOW_STATE_AND_CONFIGS'
        },
        response => {
          this.websiteConfig = response.websiteConfig || {};
          this.config.update(response.photoShowConfigs);

          const newEnableState = !!(
            response.isPhotoShowEnabled &&
            !response.isWebsiteUnknown | (response.photoShowConfigs.worksEverywhere !== false)
          );

          if (this.isEnabled != newEnableState) {
            this.isEnabled = newEnableState;
            photoShowViewer.toggle();
          }
        }
      );
    }
  };

  const photoShowViewer = {
    mouseClientPos: {
      // Mouse position (relative to viewport top-left).
      x: -1,
      y: -1
    },
    mouseOriClientPos: {
      // Original mouse position (before being moved in keyboard actions).
      x: -1,
      y: -1
    },
    viewerBox: $(
      `<div id="photoShowViewer" class="sb_BingCA photoShow">
        <div class="photoshow-viewer-shadow"></div>
        <div class="photoshow-img-wrapper">
          <img />
          <div class="photoshow-view-mode-switch-tip">a</div>
        </div>
        <i class="photoshow-img-size"></i>
      </div>`
    ), // Main container of the image viewer. (To avoid being automatically removed on https://www.bing.com/?mkt=en-ca, a class name prefixed with 'sb_' is needed.)
    viewerShadow: null, // Shadow element.
    viewerImg: null, // Image element.
    viewerImgSizeTip: null, // Image size tip.
    viewModeSwitchTip: null, // View mode switch tip element.
    isViewerPosHor: true, // Indicates if the displaying position of the image viewer is on either the LEFT or RIGHT side of the trigger element.
    isViewerChanged: true, // Indicates if the displaying features of the image viewer changes frome last time it was displayed.
    prevViewerDisplayFeatures: null, // Displaying features of the image viewer when it displayed last time.
    curTrigger: null, // Element that triggers image preview.
    imgSrc: '', // Src for the high-definition image (can be either a string or a Promise object).
    preservedImgSrc: '', // Preserved image src for context menu items (can be either a string or a Promise object).
    imgRotation: {
      // Properties of viewerImg rotation.
      angle: 0, // Rotation angle.
      isVertical: false, // Rotation direction flag.
      angleSin: 0, // Rotation angle sine value.
      angleCos: 1 // Rotation angle cosine value.
    },
    imgOriginalSize: null, // Original size of the high-definition image.
    hasMask: false, // Image mask display flag.
    maskAcceleration: 0, // Acceleration of image mask moving.
    maskHost: null, // Host element for image mask (curTrigger or its parent).
    maskHostRect: {
      // Position and size of the maskHost; viewer location; mouse moving scope; viewport size.
      area: 0, // Mask host element area.
      width: 0, // Mask host element width.
      height: 0, // Mask host element height.
      top: 0, // Top position of the mask host element (relative to viewport top).
      right: 0, // Right position of the mask host element (relative to viewport left).
      bottom: 0, // Bottom position of the mask host element (relative to viewport top).
      left: 0, // Left position of the mask host element (relative to viewport left).
      mouseEnds: {
        // Mouse moving scope within the mask host element.
        top: 0, // Topmost position (relative to viewport top).
        right: 0, // Rightmost position (relative to viewport left).
        bottom: 0, // Bottommost position (relative to viewport top).
        left: 0 // Leftmost position (relative to viewport left).
      },
      viewport: {
        // Dimensions of the visible area within the maskHost.
        width: 0, // Viewport width.
        height: 0 // Viewport height.
      }
    },
    viewerBoxOffset: 25, // Offset of the viewerBox (relative to the mask host element).
    viewerBoxBorderWidth: 1, // Border width of the viewerBox.
    hasImgViewerShown: false, // ViewerBox display flag.
    hasImgShown: false, // ViewerImg display flag.
    isModifierKeyDown: false, // Modifier key flag.
    domObserver: null, // Observer for the document.
    viewerDisplayTimer: null, // Timer to prevent image viewer from being over-triggered to display.
    isActiveElementAnInput: false, // Indicates whether the currently focused element is an element for user input.
    _evtHandlers: { document: {}, window: {} }, // Event handlers.
    _bindEvent: function (host, evtTypes, handler) {
      const _handler = e => {
        handler.bind(this)(e.detail || e);
      };

      evtTypes
        .split(' ')
        .forEach(evtType =>
          (host === 'window' ? window : document).addEventListener(
            evtType,
            (this._evtHandlers[host][evtType] = _handler),
            true
          )
        );
    },
    _unbindAllEvents: function () {
      Object.entries(this._evtHandlers.window).forEach(([evtType, evtHandler]) =>
        window.removeEventListener(evtType, evtHandler, true)
      );
      Object.entries(this._evtHandlers.document).forEach(([evtType, evtHandler]) =>
        document.removeEventListener(evtType, evtHandler, true)
      );
    },
    isPreferedViewerLocationAvailable: function () {
      if (this.maskHost) {
        this.maskHostRect = tools.getBoundingClientRectToTopWin(this.maskHost);

        return photoShow.config.viewerLocation.some(
          location =>
            (location === 'right'
              ? window.innerWidth - this.maskHostRect.right
              : location === 'bottom'
              ? window.innerHeight - this.maskHostRect.bottom
              : this.maskHostRect[location]) >=
            this.viewerBoxOffset * 2 + 100
        );
      } else {
        return false;
      }
    },
    getDisplayingStyles: function () {
      var oriImgSize = this.imgOriginalSize;

      if (!oriImgSize) {
        // When displaying a loading or failure message.
        tools.setStyle(this.viewerBox, {
          width: '',
          height: ''
        });

        oriImgSize = {
          width: this.viewerBox.outerWidth(false),
          height: this.viewerBox.outerHeight(false)
        };
      }

      this.imgRotation.isVertical && (oriImgSize = tools.swapDimensions(oriImgSize));

      var winSize = {
        width: Math.min(
          window.innerWidth > 0 ? window.innerWidth : Infinity,
          document.documentElement.clientWidth > 0 ? document.documentElement.clientWidth : Infinity
        ),
        height: Math.min(
          window.innerHeight > 0 ? window.innerHeight : Infinity,
          document.documentElement.clientHeight > 0 ? document.documentElement.clientHeight : Infinity
        )
      };

      this.maskHostRect = tools.getBoundingClientRectToTopWin(this.maskHost);

      // Find best displaying space.
      var curViewMode = VIEW_MODES[photoShow.config.viewMode[0]],
        oriImgRatio = oriImgSize.width / oriImgSize.height,
        chosenSpace = [
          [winSize.width, this.maskHostRect.top],
          [winSize.width - this.maskHostRect.right, winSize.height],
          [winSize.width, winSize.height - this.maskHostRect.bottom],
          [this.maskHostRect.left, winSize.height]
        ]
          .map(([spaceWidth, spaceHeight], i) => {
            var spaceRatio = (spaceWidth -= this.viewerBoxOffset * 2) / (spaceHeight -= this.viewerBoxOffset * 2),
              area = spaceWidth * spaceHeight,
              maxImgWidth = Math.max(
                Math.min(Math.sqrt(area * curViewMode.scale * oriImgRatio), oriImgSize.width, spaceWidth),
                0
              ),
              maxImgHeight = Math.max(
                Math.min(Math.sqrt((area * curViewMode.scale) / oriImgRatio), oriImgSize.height, spaceHeight),
                0
              ),
              viewerWidth = (imgWidth = maxImgWidth),
              viewerHeight = (imgHeight = maxImgHeight),
              needMask = false;

            if (
              curViewMode.name == 'panoramic' &&
              (oriImgSize.width - maxImgWidth > MASK_THRESHOLD || oriImgSize.height - maxImgHeight > MASK_THRESHOLD)
            ) {
              if (oriImgSize.width - maxImgWidth <= MASK_THRESHOLD) {
                imgWidth = maxImgWidth;
                imgHeight = imgWidth / oriImgRatio;
              } else if (oriImgSize.height - maxImgHeight <= MASK_THRESHOLD) {
                imgHeight = maxImgHeight;
                imgWidth = imgHeight * oriImgRatio;
              } else {
                imgWidth = oriImgSize.width;
                imgHeight = oriImgSize.height;
              }

              needMask = true;
            } else if (
              !(needMask =
                (oriImgRatio > 2 && (imgWidth = maxImgHeight * oriImgRatio) - maxImgWidth > MASK_THRESHOLD) ||
                (oriImgRatio < 0.5 &&
                  (imgHeight = (imgWidth = maxImgWidth) / oriImgRatio) - maxImgHeight > MASK_THRESHOLD))
            ) {
              oriImgRatio > spaceRatio
                ? (viewerHeight = imgHeight = (imgWidth = maxImgWidth) / oriImgRatio)
                : (viewerWidth = imgWidth = (imgHeight = maxImgHeight) * oriImgRatio);
            }

            return {
              i,
              area,
              viewerWidth,
              viewerHeight,
              imgWidth,
              imgHeight,
              needMask,
              weight:
                (photoShow.config.viewerLocation.includes(POSITIONS[i]) &&
                  Math.round(viewerWidth * viewerHeight * (spaceRatio / Math.abs(spaceRatio)) * 100)) ||
                -Infinity
            };
          })
          .sort((space1, space2) => space2.weight - space1.weight || space2.area - space1.area)[0];

      this.isViewerPosHor = !!(chosenSpace.i % 2);

      var chosenPos = {
          anchor: POSITIONS[chosenSpace.i], // Position that the viewer displays, relative to the trigger image. (e.g. TOP)
          idle: POSITIONS[(chosenSpace.i % 2) + 1], // Opposite position to offset position, keeping idle when positioning. (e.g. RIGHT)
          opposite: POSITIONS[(chosenSpace.i + 2) % 4], // Opposite position to anchor postion. (e.g. BOTTOM)
          offset: POSITIONS[((chosenSpace.i + 1) % 2) * 3] // Offset position for the viewer under current anchor position. (e.g. LEFT)
        },
        anchorDimension = this.isViewerPosHor ? 'width' : 'height',
        offsetDimension = this.isViewerPosHor ? 'height' : 'width',
        viewerAnchor = {
          top: winSize.height - this.maskHostRect.top,
          right: this.maskHostRect.right,
          bottom: this.maskHostRect.bottom,
          left: winSize.width - this.maskHostRect.left
        },
        viewerSize = {
          width: chosenSpace.viewerWidth,
          height: chosenSpace.viewerHeight
        },
        viewerOffset = Math.min(
          Math.max(
            this.maskHostRect[chosenPos.offset] -
              (viewerSize[offsetDimension] - this.maskHostRect[offsetDimension]) / 2,
            this.viewerBoxOffset
          ),
          winSize[offsetDimension] - viewerSize[offsetDimension] - this.viewerBoxOffset
        );

      var displayingStyles = {
        viewerFinal: {
          ...viewerSize,
          [chosenPos.anchor]: '',
          [chosenPos.idle]: '',
          [chosenPos.opposite]: viewerAnchor[chosenPos.anchor],
          [chosenPos.offset]: viewerOffset,
          opacity: 1,
          transform: `translate3d(${[`${this.viewerBoxOffset * (/top|left/.test(chosenPos.anchor) ? -1 : 1)}px`, 0]
            [this.isViewerPosHor ? 'slice' : 'reverse']()
            .join()},0) scale3d(1,1,1)`,
          transformOrigin: [
            chosenPos.opposite,
            `${
              ((this.maskHostRect[chosenPos.offset] + this.maskHostRect[offsetDimension] / 2 - viewerOffset) /
                viewerSize[offsetDimension]) *
              100
            }%`
          ]
            [this.isViewerPosHor ? 'slice' : 'reverse']()
            .join(' ')
        },
        img: {
          top: '',
          left: '',
          width:
            (this.imgRotation.isVertical ? chosenSpace.imgHeight : chosenSpace.imgWidth) -
            this.viewerBoxBorderWidth * 2,
          height:
            (this.imgRotation.isVertical ? chosenSpace.imgWidth : chosenSpace.imgHeight) -
            this.viewerBoxBorderWidth * 2,
          transform: `translate(-50%,-50%) rotate(${this.imgRotation.angle}deg)`
        },
        viewModeSwitchTip: {
          fontSize: Math.min(chosenSpace.viewerWidth, chosenSpace.viewerHeight) / 2.5
        }
      };

      // Calculate viewer styles.
      if (this.prevViewerDisplayFeatures?.displayPos != chosenPos.anchor) {
        displayingStyles.viewerInitial = {
          ...displayingStyles.viewerFinal,
          opacity: 0,
          transform: `translate3d(0,0,0) scale3d(${[
            0,
            this.maskHostRect[offsetDimension] / displayingStyles.viewerFinal[offsetDimension]
          ]
            [this.isViewerPosHor ? 'slice' : 'reverse']()
            .join()},1)`
        };
      }

      // Calculate viewer shadow styles.
      if (photoShow.config.shadowDisplay) {
        var viewerRect = {
            [chosenPos.anchor]: displayingStyles.viewerFinal[chosenPos.opposite] - viewerSize[anchorDimension],
            [chosenPos.idle]: displayingStyles.viewerFinal[chosenPos.offset] + viewerSize[offsetDimension],
            [chosenPos.opposite]: displayingStyles.viewerFinal[chosenPos.opposite],
            [chosenPos.offset]: displayingStyles.viewerFinal[chosenPos.offset]
          },
          shadowCalcPosFactor = (POSITIONS.indexOf(chosenPos.anchor) - POSITIONS.indexOf(chosenPos.opposite)) / 2,
          shadowClacKeyValues = [
            Math.max((this.maskHostRect[chosenPos.offset] - viewerRect[chosenPos.offset]) * shadowCalcPosFactor, 0),
            Math.max((viewerRect[chosenPos.offset] - this.maskHostRect[chosenPos.offset]) * shadowCalcPosFactor, 0),
            Math.max((viewerRect[chosenPos.idle] - this.maskHostRect[chosenPos.idle]) * shadowCalcPosFactor, 0),
            Math.max((this.maskHostRect[chosenPos.idle] - viewerRect[chosenPos.idle]) * shadowCalcPosFactor, 0)
          ];

        displayingStyles = {
          ...displayingStyles,
          shadow: {
            top: '',
            right: '',
            bottom: '',
            left: '',
            [offsetDimension]: 'auto',
            [anchorDimension]: this.viewerBoxOffset,
            [chosenPos.anchor]: `calc(100% + ${this.viewerBoxBorderWidth}px)`,
            [chosenPos.idle]: Math.min(viewerRect[chosenPos.idle] - this.maskHostRect[chosenPos.idle], 0),
            [chosenPos.offset]: Math.min(this.maskHostRect[chosenPos.offset] - viewerRect[chosenPos.offset], 0),
            mask: `linear-gradient(${chosenPos.opposite}, rgba(128,128,128,0.2), rgba(128,128,128,0.8))`,
            webkitMask: `-webkit-linear-gradient(${chosenPos.opposite}, rgba(128,128,128,0.2), rgba(128,128,128,0.8))`,
            clipPath: `polygon(${[
              `${this.isViewerPosHor ? 0 : `${shadowClacKeyValues[0]}px`} ${
                this.isViewerPosHor ? `${shadowClacKeyValues[1]}px` : 0
              }`,
              `${this.isViewerPosHor ? '100%' : `calc(100% - ${shadowClacKeyValues[2]}px)`} ${
                this.isViewerPosHor ? `${shadowClacKeyValues[0]}px` : 0
              }`,
              `${this.isViewerPosHor ? '100%' : `calc(100% - ${shadowClacKeyValues[3]}px)`} ${
                this.isViewerPosHor ? `calc(100% - ${shadowClacKeyValues[2]}px)` : '100%'
              }`,
              `${this.isViewerPosHor ? 0 : `${shadowClacKeyValues[1]}px`} ${
                this.isViewerPosHor ? `calc(100% - ${shadowClacKeyValues[3]}px)` : '100%'
              }`
            ].join()})`
          }
        };
      }

      // Calculate MaskHost properties.
      this.maskHostRect.viewport = {
        width:
          (((this.imgRotation.isVertical ? chosenSpace.viewerHeight : chosenSpace.viewerWidth) -
            this.viewerBoxBorderWidth * 2) /
            displayingStyles.img.width) *
          this.maskHostRect.width,
        height:
          (((this.imgRotation.isVertical ? chosenSpace.viewerWidth : chosenSpace.viewerHeight) -
            this.viewerBoxBorderWidth * 2) /
            displayingStyles.img.height) *
          this.maskHostRect.height
      };
      this.maskHostRect.mouseEnds = {
        top: this.maskHostRect.top + this.maskHostRect.viewport.height / 2,
        right: this.maskHostRect.right - this.maskHostRect.viewport.width / 2,
        bottom: this.maskHostRect.bottom - this.maskHostRect.viewport.height / 2,
        left: this.maskHostRect.left + this.maskHostRect.viewport.width / 2
      };
      this.hasMask = chosenSpace.needMask;

      // Check if the viewer displaying features changes.
      this.isViewerChanged = this.prevViewerDisplayFeatures
        ? this.prevViewerDisplayFeatures.displayPos != chosenPos.anchor ||
          this.prevViewerDisplayFeatures.viewerWidth != displayingStyles.viewerFinal.width ||
          this.prevViewerDisplayFeatures.viewerHeight != displayingStyles.viewerFinal.height ||
          this.prevViewerDisplayFeatures.imgWidth != displayingStyles.img.width ||
          this.prevViewerDisplayFeatures.imgHeight != displayingStyles.img.height
        : true;

      this.prevViewerDisplayFeatures = {
        displayPos: chosenPos.anchor,
        viewerWidth: displayingStyles.viewerFinal.width,
        viewerHeight: displayingStyles.viewerFinal.height,
        imgWidth: displayingStyles.img.width,
        imgHeight: displayingStyles.img.height
      };

      return displayingStyles;
    },
    parseTriggers: function (sourceElement) {
      return [sourceElement].concat($(sourceElement).parents().get()).reduce(
        (result, element, i, sourceElements) => {
          const src = photoShow.getImgHDSrc(element);
          return src
            ? (sourceElements.splice(i),
              {
                element,
                src
              })
            : result;
        },
        {
          element: null,
          src: ''
        }
      );
    },
    update: function () {
      this.mouseClientPos = { ...this.mouseOriClientPos };

      var curElementUnderMouse = document.elementFromPoint(this.mouseClientPos.x, this.mouseClientPos.y);

      if (curElementUnderMouse) {
        if ($(curElementUnderMouse).is('iframe')) {
          try {
            var frameRect = curElementUnderMouse.getBoundingClientRect();

            curElementUnderMouse.contentWindow
              .jQuery(curElementUnderMouse.contentWindow.document)
              .trigger('topWinScroll', {
                x: this.mouseClientPos.x - frameRect.left,
                y: this.mouseClientPos.y - frameRect.top
              });
          } catch (error) {
            // Usually a cross-origin exception.
          }
        } else {
          this.mouseOverAction({
            target: curElementUnderMouse
          });
        }
      }
    },
    showViewer: function (displayingStyles) {
      if (photoShow.config.enableAnimation && displayingStyles.viewerInitial) {
        tools.setStyle(this.viewerBox, displayingStyles.viewerInitial);

        // Trick: To show() is only for triggering a reflow on the viewerBox element to make sure the initial styles are applied before setting the final styles.
        this.viewerBox.show();
      }
      photoShow.config.shadowDisplay &&
        tools.setStyle(this.viewerShadow, displayingStyles.shadow, !displayingStyles.viewerInitial);
      tools.setStyle(this.viewerBox, displayingStyles.viewerFinal, true);

      this.hasImgViewerShown = true;
    },
    refreshImgViewer: function () {
      if (this.isPreferedViewerLocationAvailable()) {
        var displayingStyles = this.getDisplayingStyles();

        this.showViewer(displayingStyles);

        tools.setStyle([
          [
            this.maskHost,
            {
              mask: '',
              webkitMask: ''
            }
          ],
          [this.viewerImg, displayingStyles.img, !displayingStyles.viewerInitial],
          [this.viewModeSwitchTip, displayingStyles.viewModeSwitchTip, true]
        ]);

        this.hasMask && this.moveAction(true);
      } else {
        this.mouseLeaveAction();
      }
    },
    displayViewer: function (srcTarget) {
      if (!this.curTrigger) {
        // Get src of the high-definition image.
        const triggersParsingResult = this.parseTriggers(srcTarget);
        this.preservedImgSrc = this.imgSrc = triggersParsingResult.src;

        chrome.runtime.sendMessage({
          cmd: 'VIEW_IMAGE',
          args: {
            hasSrc: !!this.preservedImgSrc
          }
        });

        if (this.imgSrc) {
          this.viewerBox.attr('data-active', '');
        } else {
          this.viewerBox.removeAttr('data-active');
        }

        // Show high-definition image.
        if (
          this.imgSrc &&
          (!photoShow.config.activationMode || this.isModifierKeyDown) &&
          !$(triggersParsingResult.element).is('[photoshow-trigger-blocked]')
        ) {
          this.curTrigger = this.maskHost = triggersParsingResult.element;

          // Get mask host.
          $(triggersParsingResult.element)
            .parents()
            .toArray()
            .reduce((maskHostBBox, curAncestor, i, ancestors) => {
              var maskHostArea = maskHostBBox.width * maskHostBBox.height,
                curAncestorBBox = curAncestor.getBoundingClientRect(),
                curAncestorArea = curAncestorBBox.width * curAncestorBBox.height;

              if (
                $(curAncestor).css('position') != 'static' &&
                !/^(?:contents|inline|none)$/.test($(curAncestor).css('display')) &&
                (!maskHostArea || (curAncestorArea && curAncestorArea <= maskHostArea)) &&
                curAncestorBBox.left <= maskHostBBox.right &&
                curAncestorBBox.right >= maskHostBBox.left &&
                curAncestorBBox.top <= maskHostBBox.bottom &&
                curAncestorBBox.bottom >= maskHostBBox.top &&
                $(curAncestor).css('overflow').includes('hidden')
              ) {
                this.maskHost = curAncestor;
                maskHostBBox = curAncestorBBox;
                ancestors.splice(i);
              }

              return maskHostBBox;
            }, this.maskHost.getBoundingClientRect());

          if (
            this.isPreferedViewerLocationAvailable() && // Check this before the following this.maskHostRect.area checking, as it will initialize this.maskHostRect.
            (!photoShow.config.activationExemption ||
              this.maskHostRect.area <= (window.innerWidth * window.innerHeight) / 4)
          ) {
            // Reset image viewer.
            this.viewerBox
              .removeClass('img-shown img-size-hidden has-mask top-end right-end bottom-end left-end')
              .appendTo(document.documentElement)
              .add(this.viewerShadow, this.viewerImg)
              .removeAttr('style');

            this.hasMask = false;
            this.imgRotation = {
              angle: 0,
              isVertical: false,
              angleSin: 0,
              angleCos: 1
            };
            this.imgOriginalSize = null;

            // Set image loading status.
            var imgLoadingTipTimer = photoShow.config.loadingStatusDisplay
              ? setTimeout(() => {
                  imgLoadingTipTimer = null;
                  $(this.maskHost).removeClass('photoshow-img-loading-fail').addClass('photoshow-img-loading');
                }, 200)
              : null;

            // Load image.
            tools.loadImage(this.imgSrc).then(imgInfo => {
              if (imgInfo.src) {
                // Loading succeeds.
                if (
                  this.imgSrc &&
                  this.imgSrc == imgInfo.oriSrc &&
                  ((imgInfo.width * imgInfo.height || 0) >= this.maskHostRect.area * 1.2 || /\.gif\b/.test(imgInfo.src))
                ) {
                  // Note: Both the photoShowViewer.imgSrc and the imgInfo.oriSrc may be either a string or a Promise object.
                  this.imgSrc = imgInfo.src; // Assign the actual image src to the photoShowViewer.imgSrc, in case it may be a Promise object.

                  // Cache the actual src of the high-definition image.
                  $(this.curTrigger)
                    .attr('photoshow-hd-src', this.imgSrc)
                    .closest('[data-photoshow-hd-src]')
                    .removeAttr('data-photoshow-hd-src')
                    .removeData('photoshow-hd-src');

                  this.viewerBox.addClass('img-shown');
                  this.viewerImg.attr('src', this.imgSrc);

                  this.imgOriginalSize = {
                    width: imgInfo.width,
                    height: imgInfo.height
                  };
                  this.viewerImgSizeTip.attr('size', Object.values(this.imgOriginalSize).join('×'));

                  var displayingStyles = this.getDisplayingStyles();

                  photoShow.config.imageSizeDisplay &&
                    (displayingStyles.viewerFinal.width < 100 || displayingStyles.viewerFinal.height < 50) &&
                    this.viewerBox.addClass('img-size-hidden');

                  if (imgLoadingTipTimer) {
                    clearTimeout(imgLoadingTipTimer);
                    imgLoadingTipTimer = null;
                  }
                  $(this.maskHost).removeClass('photoshow-img-loading photoshow-img-loading-fail');

                  tools.setStyle([
                    [this.viewerImg, displayingStyles.img],
                    [this.viewModeSwitchTip, displayingStyles.viewModeSwitchTip]
                  ]);

                  this.showViewer(displayingStyles);
                  this.hasImgShown = true;
                  this.viewerBox.attr('data-img-shown', '');

                  // Show image mask initially.
                  if (this.hasMask) {
                    this.viewerBox.addClass('has-mask').attr('data-has-mask', '');
                    this.moveAction();
                  }
                } else {
                  if (imgLoadingTipTimer) {
                    clearTimeout(imgLoadingTipTimer);
                    imgLoadingTipTimer = null;
                  }
                  $(this.maskHost).removeClass('photoshow-img-loading photoshow-img-loading-fail');
                }
              } else if (photoShow.config.loadingStatusDisplay) {
                // Loading fails.
                if (this.imgSrc && this.imgSrc == imgInfo.oriSrc) {
                  if (imgLoadingTipTimer) {
                    clearTimeout(imgLoadingTipTimer);
                    imgLoadingTipTimer = null;
                  }

                  $(this.maskHost).removeClass('photoshow-img-loading').addClass('photoshow-img-loading-fail');
                }
              }
            });
          } else {
            this.mouseLeaveAction();
          }
        }
      }
    },
    toggle: function () {
      if (photoShow.isEnabled) {
        this.viewerBox.appendTo(document.documentElement);

        photoShow.websiteConfig.noReferrer && this.viewerImg.prop('referrerPolicy', 'no-referrer');

        this.imgSrc = this.preservedImgSrc = '';

        // Trigger actions.
        // Handle events in capture phases.
        // This ensures proper behaviors when it comes to triggers in iframes or on some certain websites (e.g. Google Map).
        this._bindEvent('document', 'mouseover', this.mouseOverAction);
        this._bindEvent('document', 'mousemove', function (e) {
          this.mouseOriClientPos.x = this.mouseClientPos.x = e.clientX;
          this.mouseOriClientPos.y = this.mouseClientPos.y = e.clientY;

          if (e.target.ownerDocument.defaultView != window.top) {
            var frameRect = tools.getBoundingClientRectToTopWin(e.target.ownerDocument.defaultView.frameElement);
            this.mouseClientPos.x += frameRect.left;
            this.mouseClientPos.y += frameRect.top;
            this.mouseOriClientPos.x += frameRect.left;
            this.mouseOriClientPos.y += frameRect.top;
          }

          this.hasMask && this.moveAction();
        });
        this._bindEvent('document', 'mouseleave', function (e) {
          var target = $(e.currentTarget);
          if (this.curTrigger) {
            this.curTrigger.contains(e.currentTarget) || // This may occur when leaving current element's children.
              $(e.relatedTarget).closest(this.curTrigger).length || // This may occur when the viewer has already displayed in the updating procedure.
              this.mouseLeaveAction();
          }

          if (target.is('[photoshow-trigger-blocked]') || target.find('[photoshow-trigger-blocked]')) {
            $('[photoshow-trigger-blocked]').removeAttr('photoshow-trigger-blocked');
          }

          if (target.is('html') && e.currentTarget.ownerDocument.defaultView == window.top) {
            Object.assign(this, {
              mouseClientPos: {
                x: -1,
                y: -1
              },
              mouseOriClientPos: {
                x: -1,
                y: -1
              }
            });
          }
        });
        this._bindEvent('document', 'keydown', this.keydownAction);
        this._bindEvent('document', 'keyup', this.keyupAction);
        this._bindEvent('document', 'focusin focusout', function () {
          this.isActiveElementAnInput = $(document.activeElement).is(
            'textarea,input:not([type="button"],[type="checkbox"],[type="color"],[type="file"],[type="image"],[type="radio"],[type="range"],[type="reset"],[type="submit"]),[contenteditable]'
          );
        });
        this._bindEvent('document', 'frameDomMutate', function (mutations) {
          return this.domMutateAction(mutations);
        });
        this._bindEvent('document', 'animationend', function (e) {
          if (/photoshow-viewer-(.+)-ani/.test(e.animationName)) {
            this.viewerBox.removeClass(RegExp.$1);
          } else if (e.animationName === 'photoshow-img-loading-fail-ani') {
            $(e.target).removeClass('photoshow-img-loading-fail');
          }
        });

        // Window actions.
        this._bindEvent(
          'window',
          'scroll wheel resize',
          (() => {
            let updateTimer;

            return () => {
              clearTimeout(updateTimer);
              updateTimer = setTimeout(() => this.update(), 20);
            };
          })()
        );
        this._bindEvent('window', 'blur', this.winBlurAction);

        // Add amend styles.
        photoShow.websiteConfig = {
          ...photoShow.websiteConfig,
          amendStyles: {
            ...(photoShow.websiteConfig.amendStyles || {}),
            pointerNone: ['*:before,*:after']
              .concat((photoShow.websiteConfig.amendStyles && photoShow.websiteConfig.amendStyles.pointerNone) || [])
              .join(',')
          }
        };

        for (let styleName in photoShow.websiteConfig.amendStyles) {
          tools.addStyle(styleName, photoShow.websiteConfig.amendStyles[styleName]);
        }

        // Start observing the document.
        this.domObserver = new MutationObserver(mutations => this.domMutateAction(mutations));
        this.domObserver.observe(document, {
          childList: true,
          subtree: true,
          attributeFilter: ['src', 'srcset', 'style'],
          attributeOldValue: true
        });
      } else {
        // Destruction.
        this.viewerBox.remove();

        // Unbind event handlers.
        this._unbindAllEvents();

        // Remove contents generated by PhotoShow.
        $('[photoshow-hd-src]').removeAttr('photoshow-hd-src');
        $('[photoshow-trigger-blocked]').removeAttr('photoshow-trigger-blocked');
        $('[id^="photoShowStyles_"]').remove();
        $('[photoshow-cache-id]').remove();

        // Stop observing the document.
        if (this.domObserver) {
          this.domMutateAction(this.domObserver.takeRecords());
          this.domObserver.disconnect();
          this.domObserver = null;
        }
      }

      // Handle xhr hook.
      photoShow.toggleXhrHook();

      // Handle hotkey conflict agent.
      photoShow.toggleHotkeyDeconflictAgent();

      // Construction/Destruction callbacks.
      photoShow.websiteConfig.onToggle && eval(`(${photoShow.websiteConfig.onToggle})`)(photoShow.isEnabled);
    },
    mouseOverAction: function (e) {
      clearTimeout(this.viewerDisplayTimer);

      e &&
        typeof e[`${photoShow.config.activationMode}Key`] == 'boolean' &&
        (this.isModifierKeyDown = e[`${photoShow.config.activationMode}Key`]);

      var evtTarget = $(e.target);

      if (this.hasImgViewerShown && evtTarget.is(this.curTrigger)) {
        this.refreshImgViewer();
      } else if (this.curTrigger) {
        if (
          !evtTarget.is(this.curTrigger) &&
          (!this.curTrigger.contains(e.target) || photoShow.getImgHDSrc(e.target))
        ) {
          this.viewerDisplayTimer = setTimeout(() => {
            this.mouseLeaveAction();
            this.displayViewer(e.target);
          }, 200);
        }
      } else {
        this.viewerDisplayTimer = setTimeout(() => this.displayViewer(e.target), 200);
      }
    },
    mouseLeaveAction: function (keepTriggerBlocked) {
      clearTimeout(this.viewerDisplayTimer);

      tools.setStyle([
        [
          this.viewerBox,
          {
            opacity: 0,
            transform: ''
          },
          true
        ],
        [
          this.viewerShadow,
          {
            [this.isViewerPosHor ? 'width' : 'height']: ''
          },
          true
        ],
        [
          this.maskHost,
          {
            mask: '',
            webkitMask: ''
          }
        ]
      ]);
      $(this.maskHost).removeClass('photoshow-img-loading photoshow-img-loading-fail');

      keepTriggerBlocked || $('[photoshow-trigger-blocked]').removeAttr('photoshow-trigger-blocked');

      Object.assign(this, {
        imgSrc: '',
        curTrigger: null,
        hasImgViewerShown: false,
        hasImgShown: false,
        imgOriginalSize: null,
        prevViewerDisplayFeatures: null,
        isViewerChanged: true,
        maskHost: null,
        maskAcceleration: 0,
        hasMask: false
      });

      this.viewerBox.removeAttr('data-img-shown data-has-mask');
    },
    moveAction: function (useAni) {
      window.requestAnimationFrame(() => {
        if (this.hasImgShown && this.hasMask) {
          this.mouseClientPos = {
            x: Math.min(
              Math.max(this.mouseClientPos.x, this.maskHostRect.mouseEnds.left),
              this.maskHostRect.mouseEnds.right
            ),
            y: Math.min(
              Math.max(this.mouseClientPos.y, this.maskHostRect.mouseEnds.top),
              this.maskHostRect.mouseEnds.bottom
            )
          };

          var maskPos = {
              top: this.mouseClientPos.y - this.maskHostRect.mouseEnds.top,
              left: this.mouseClientPos.x - this.maskHostRect.mouseEnds.left
            },
            imgOffset = {
              top:
                (this.maskHostRect.height - this.maskHostRect.viewport.height) / 2 / this.maskHostRect.viewport.height -
                maskPos.top / this.maskHostRect.viewport.height,
              left:
                (this.maskHostRect.width - this.maskHostRect.viewport.width) / 2 / this.maskHostRect.viewport.width -
                maskPos.left / this.maskHostRect.viewport.width
            },
            maskStyles = `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), linear-gradient(#000, #000) ${maskPos.left}px ${maskPos.top}px / ${this.maskHostRect.viewport.width}px ${this.maskHostRect.viewport.height}px no-repeat`;

          tools.setStyle([
            [
              this.maskHost,
              {
                mask: maskStyles,
                webkitMask: maskStyles
              }
            ],
            [
              this.viewerImg,
              {
                ...(this.imgRotation.isVertical
                  ? {
                      top: `${(0.5 + imgOffset.left * this.imgRotation.angleSin) * 100}%`,
                      left: `${(0.5 - imgOffset.top * this.imgRotation.angleSin) * 100}%`
                    }
                  : {
                      top: `${(0.5 + imgOffset.top * this.imgRotation.angleCos) * 100}%`,
                      left: `${(0.5 + imgOffset.left * this.imgRotation.angleCos) * 100}%`
                    }),
                transform: `translate(-50%, -50%) rotate(${this.imgRotation.angle}deg)`
              },
              useAni
            ]
          ]);
        }
      });
    },
    rotateAction: function (e) {
      this.mouseClientPos = { ...this.mouseOriClientPos };
      this.imgRotation.angle += (e.which - 38) * 90;
      this.imgRotation = {
        ...this.imgRotation,
        isVertical: !!(this.imgRotation.angle % 180),
        angleSin: Math.sin((this.imgRotation.angle * Math.PI) / 180),
        angleCos: Math.cos((this.imgRotation.angle * Math.PI) / 180)
      };

      this.refreshImgViewer();
    },
    openInNewTabAction: function () {
      const imgSrc =
        this.parseTriggers(document.elementFromPoint(this.mouseClientPos.x, this.mouseClientPos.y)).src || this.imgSrc;

      if (imgSrc) {
        photoShowGlobalMsg.show(chrome.i18n.getMessage('globalMsg_imgWillOpenInNewTab'));

        tools.resolveImgSrc(imgSrc).then(imgSrc => {
          imgSrc &&
            chrome.runtime.sendMessage({
              cmd: 'OPEN_IMG_IN_NEW_TAB',
              args: {
                imgSrc: imgSrc
              }
            });
        });
      }
    },
    copyAction: function () {
      tools.resolveImgSrc(this.preservedImgSrc).then(imgSrc => {
        if (imgSrc) {
          tools.copyText(imgSrc);
          photoShowGlobalMsg.show(chrome.i18n.getMessage('globalMsg_imgSrcCopied'));
        }
      });
    },
    savingAction: function () {
      const imgSrc =
        this.parseTriggers(document.elementFromPoint(this.mouseClientPos.x, this.mouseClientPos.y)).src || this.imgSrc;

      if (imgSrc) {
        photoShowGlobalMsg.show(chrome.i18n.getMessage('globalMsg_imgWillStartDownloading'));

        tools.resolveImgSrc(imgSrc).then(imgSrc => {
          imgSrc &&
            chrome.runtime.sendMessage({
              cmd: 'DOWNLOAD_IMG',
              args: {
                imgSrc: imgSrc
              }
            });
        });
      }
    },
    keydownAction: function (e) {
      const easeInOutSine = (t, b, c, d) => (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;

      const getMoveStep = scrollMode =>
        scrollMode == 'PAGE'
          ? this.imgRotation.isVertical
            ? this.maskHostRect.viewport.width
            : this.maskHostRect.viewport.height
          : scrollMode == 'ENDS'
          ? Infinity
          : easeInOutSine(Math.min(this.maskAcceleration++, 40), 1, 20, 40);

      const scrollImg = (oriKeyCode, scrollMode) => {
        let keyCode = oriKeyCode;

        if (this.imgRotation.angleSin == 1) {
          // Case 90°
          keyCode = 40 - ((41 - oriKeyCode) % 4);
        } else if (this.imgRotation.angleSin == -1) {
          // Case 180°
          keyCode = 37 + ((oriKeyCode - 36) % 4);
        } else if (this.imgRotation.angleCos == -1) {
          // Case -90°
          keyCode = 78 - (oriKeyCode % 2) * 2 - oriKeyCode;
        }

        let shiftingPos = keyCode % 2 ? 'x' : 'y',
          shiftingWeight = keyCode > 38 ? -1 : 1;

        (this.mouseClientPos[shiftingPos] - this.maskHostRect.mouseEnds[POS_FOR_KEYCODE[keyCode - 37]]) *
          shiftingWeight <=
          0 &&
          this.viewerBox
            .removeClass('top-end right-end bottom-end left-end')
            .addClass(`${POS_FOR_KEYCODE[oriKeyCode - 37]}-end`);
        this.mouseClientPos[shiftingPos] -= getMoveStep(scrollMode) * shiftingWeight;
        this.moveAction(!!scrollMode);
      };

      const eventKey = e.key.toUpperCase();

      switch (eventKey) {
        case 'TAB':
          photoShow.config.hotkeys.openImageInNewTab.isEnabled &&
            (!this.isActiveElementAnInput || this.hasImgShown) &&
            this.openInNewTabAction();

          break;

        case 'SHIFT':
        case 'CONTROL':
        case 'ALT':
          if (!this.isModifierKeyDown && e.which == $.inArray(photoShow.config.activationMode, MODIFIER_KEYS)) {
            this.isModifierKeyDown = true;
            $('[photoshow-trigger-blocked]').removeAttr('photoshow-trigger-blocked');
            this.update();
          }

          break;

        case 'C':
          photoShow.config.hotkeys.copyImageAddress.isEnabled &&
            (!this.isActiveElementAnInput || this.hasImgShown) &&
            this.copyAction();

          break;

        case 'S':
          photoShow.config.hotkeys.saveImage.isEnabled &&
            (!this.isActiveElementAnInput || this.hasImgShown) &&
            this.savingAction();

          break;

        default:
      }

      if (this.hasImgViewerShown) {
        switch (eventKey) {
          case 'ESCAPE':
            if (photoShow.config.hotkeys.closeViewer.isEnabled) {
              $(this.curTrigger).attr('photoshow-trigger-blocked', '');
              this.mouseLeaveAction(true);
            }

            break;

          case 'PAGEUP':
            photoShow.config.hotkeys.scrollImageByPage.isEnabled &&
              this.hasImgShown &&
              this.hasMask &&
              scrollImg(38, 'PAGE');

            break;

          case 'PAGEDOWN':
            photoShow.config.hotkeys.scrollImageByPage.isEnabled &&
              this.hasImgShown &&
              this.hasMask &&
              scrollImg(40, 'PAGE');

            break;

          case 'END':
            photoShow.config.hotkeys.scrollImageToEnds.isEnabled &&
              this.hasImgShown &&
              this.hasMask &&
              scrollImg(40, 'ENDS');

            break;

          case 'HOME':
            photoShow.config.hotkeys.scrollImageToEnds.isEnabled &&
              this.hasImgShown &&
              this.hasMask &&
              scrollImg(38, 'ENDS');

            break;

          case 'ARROWLEFT':
          case 'ARROWRIGHT':
            if (this.hasImgShown) {
              if (e.shiftKey && e.ctrlKey) {
                photoShow.config.hotkeys.rotateImage.isEnabled && this.rotateAction(e);
              } else {
                photoShow.config.hotkeys.scrollImage.isEnabled &&
                  this.hasImgShown &&
                  this.hasMask &&
                  scrollImg(e.which);
              }
            }

            break;

          case 'ARROWUP':
          case 'ARROWDOWN':
            photoShow.config.hotkeys.scrollImage.isEnabled && this.hasImgShown && this.hasMask && scrollImg(e.which);

            break;

          case 'A':
          case 'L':
          case 'M':
          case 'P':
            if (photoShow.config.hotkeys.switchViewMode.isEnabled && this.hasImgShown) {
              if (VIEW_MODES[eventKey.toLowerCase()].name == photoShow.config.viewMode) {
                // The storage APIs will not trigger a change event in which case the update of the viewMode property is not going to happen.
                // However, the viewModeSwitchTip is still need to be displayed, so a manual update is required here.
                photoShow.config.viewMode = photoShow.config.viewMode;
              } else {
                chrome.runtime.sendMessage({
                  cmd: 'SET_PHOTOSHOW_CONFIGS',
                  args: {
                    item: 'viewMode',
                    value: VIEW_MODES[eventKey.toLowerCase()].name
                  }
                });
              }
            }

            break;

          case 'V':
            photoShow.config.hotkeys.toggleViewMode.isEnabled &&
              this.hasImgShown &&
              chrome.runtime.sendMessage({
                cmd: 'SET_PHOTOSHOW_CONFIGS',
                args: {
                  item: 'viewMode',
                  value: VIEW_MODES[photoShow.recentViewModes[1]].name
                }
              });

            break;

          default:
        }
      }
    },
    keyupAction: function (e) {
      this.maskAcceleration = 0;

      const eventKey = e.key.toUpperCase();

      switch (eventKey) {
        case 'SHIFT':
        case 'CONTROL':
        case 'ALT':
          this.isModifierKeyDown = false;

          this.curTrigger &&
            e.which == $.inArray(photoShow.config.activationMode, MODIFIER_KEYS) &&
            this.mouseLeaveAction();

          break;

        default:
      }
    },
    winBlurAction: function () {
      this.isModifierKeyDown = false;
    },
    domMutateAction: function (mutations) {
      // Some websites update images only by changing their src attributes instead of replacing the whole img elements,
      // which could cause problems when the triggers have had their high-definition image srcs cached.
      // Some websites remove photoShow's elements when updating their page contents, in which case those elements need to be added back again.
      mutations.forEach(mutation => {
        var target = $(mutation.target);

        if (!target.closest('.photoShow').length) {
          switch (mutation.type) {
            case 'childList':
              if (mutation.removedNodes.length) {
                var removedPhotoShowStyleNodes = Array.from(mutation.removedNodes).filter(node =>
                  $(node).is('[id^="photoShowStyles_"]')
                );

                removedPhotoShowStyleNodes.length && target.append(removedPhotoShowStyleNodes);

                // CAUTION: DO NOT check whether the curTrigger is in document with jQuery closest() method which will cause serious performance problem.
                this.curTrigger && !this.curTrigger.ownerDocument.contains(this.curTrigger) && this.mouseLeaveAction();
              }

              break;

            case 'attributes':
              if (
                (~mutation.attributeName.indexOf('src') && target.is('img,source')) ||
                (mutation.attributeName == 'style' &&
                  tools.getBackgroundImgSrc(mutation.oldValue) &&
                  tools.getBackgroundImgSrc(target) != tools.getBackgroundImgSrc(mutation.oldValue))
              ) {
                const srcCacheHost = target.closest('[photoshow-hd-src],[data-photoshow-hd-src]');

                this.hasImgViewerShown &&
                  srcCacheHost.attr('photoshow-hd-src') == this.imgSrc &&
                  this.refreshImgViewer();

                srcCacheHost
                  .removeAttr('photoshow-hd-src')
                  .removeAttr('data-photoshow-hd-src')
                  .removeData('photoshow-hd-src');
              }

              break;

            default:
          }
        }
      });
    }
  };

  $(document).ready(() => {
    // Initialize viewer.
    photoShowViewer.viewerShadow = $('.photoshow-viewer-shadow', photoShowViewer.viewerBox);
    photoShowViewer.viewerImg = $('img', photoShowViewer.viewerBox);
    photoShowViewer.viewModeSwitchTip = $('.photoshow-view-mode-switch-tip', photoShowViewer.viewerBox);
    photoShowViewer.viewerImgSizeTip = $('.photoshow-img-size', photoShowViewer.viewerBox);

    // Response to messages.
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      var needAsyncResponse;

      switch (request.cmd) {
        case 'VALIDATE_PHOTOSHOW_AVAILABILITY':
          needAsyncResponse = true;
          sendResponse(true);

          break;

        case 'GET_PRESERVED_IMG_SRC':
          needAsyncResponse = true;
          tools.resolveImgSrc(photoShowViewer.preservedImgSrc).then(sendResponse);

          break;

        case 'COPY_IMG_SRC':
          photoShowViewer.copyAction();

          break;

        case 'DISPATCH_EVENT':
          document.dispatchEvent(
            new CustomEvent(request.args.type, {
              detail: request.args
            })
          );

          break;

        default:
      }

      return needAsyncResponse;
    });

    // Response to storage change event.
    chrome.storage.onChanged.addListener(changes => {
      if (['disabledWebsites', 'photoShowConfigs'].some(item => Object.keys(changes).includes(item))) {
        photoShow.updateStateAndConfigs();
      }
    });

    // Get initial state.
    photoShow.updateStateAndConfigs();
  });
})(jQuery.noConflict());
