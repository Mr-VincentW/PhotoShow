/**
 * Copyright (c) 2012-2020 Vincent W., MIT-licensed.
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
 * @version 4.0.9.3 | 2020-01-08 | Vincent    // Bug Fix: Fix the problem that image rotates without animation when in Panorama mode;
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
 */

// TODO: Extract common tool methods to external modules.
// TODO: Optimise image loading speed by picking proper image sources according to their final displaying dimensions.
// TODO: Exclude background images in repeating pattern.

($ => {
  $.ajaxSetup({
    timeout: 10000,
    beforeSend: function() {
      // An ajax to a relative path url would not work in firefox.
      this.url = /^(?:https?:|data:image\/)/.test(this.url) ? this.url : ((/^\/\//.test(this.url) ? location.protocol : location.origin) + this.url);
    }
  });

  const tools = {
    setStyle: function() {    // el, styles, useAni || [el, styles, useAni]
      for (let [el, styles, useAni = false] of arguments.length > 1 ? [arguments] : arguments[0]) {
        if (styles) {
          $(el).css('transition', useAni ? '0.2s ease-out' : '');
          $(el).css(styles);
        }
      }
    },
    swapDimensions: function(obj) {
      return Object.assign({}, obj, {
        width: obj.height,
        height: obj.width
      });
    },
    detectImage: function(preferredSrc, defaultSrc, isImgInvalid) {
      defaultSrc = defaultSrc || '';

      return new Promise(resolve => {
        var img = new Image(),
          imgLoadTimer = null;

        img.onload = () => {
          clearTimeout(imgLoadTimer);
          img.onload = img.onerror = null;

          resolve((({src, width, height}) => ({src, width, height}))(isImgInvalid && isImgInvalid(img) ? {src: defaultSrc} : img));
        };

        img.onerror = () => {
          clearTimeout(imgLoadTimer);
          img.onload = img.onerror = null;

          resolve({src: defaultSrc});
        };

        clearTimeout(imgLoadTimer);
        imgLoadTimer = setTimeout(() => img.onerror(), 20 * 1000);

        img.src = preferredSrc;
      });
    },
    loadImage: function(oriSrc) {
      return Promise.resolve(oriSrc).then(imgSrc => this.detectImage(imgSrc).then(imgInfo => Promise.resolve(Object.assign({oriSrc}, imgInfo))));
    },
    cacheImage: function(id, imgSrc) {
      return imgSrc && !$(`[photoshow-cache-id="${id}"]`).length ? ($('<input type="hidden" />').attr('photoshow-cache-id', id).val(imgSrc).appendTo(document.body), imgSrc) : ($(`[photoshow-cache-id="${id}"]`).val() || '');
    },
    addStyle: function(styleName, selectors) {
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

        $('<style type="text/css"></style>').attr('id', `photoShowStyles_${styleName}`)
          .append(`${selectors}{${rules.join(';')}}`)
          .appendTo($('head')[0]);
      }
    },
    getBackgroundImgSrc: function(img) {
      return /^url\([\'"]?((?:https?:|data:image\/)?\/\/.+?)[\'"]?\)$/i.test($(img).css('backgroundImage').split(/,\s*(?=url\()/)[0]) ? RegExp.$1 : '';
    },
    getLargestImgSrc: function(target) {
      var srcSetRegex = /([\d.]+)[wx]$/;
      target = $(target);

      return target.is('img') ?
        (target[0].srcset || target[0].src || '').split(/,\s*(?=(?:\w+:)?\/\/)/).sort((src1, src2) => (srcSetRegex.test(src2) ? parseFloat(RegExp.$1) : 0) - (srcSetRegex.test(src1) ? parseFloat(RegExp.$1) : 0))[0].split(/,?\s+/)[0] :
        this.getBackgroundImgSrc(target);
    },
    getBoundingClientRectToTopWin: function(element) {
      var clientRect = $.extend({}, element.getBoundingClientRect());    // TODO: Find better ways to transfer DOMRect object to plain JavaScript object.

      if (element.ownerDocument.defaultView != window.top) {
        let curFrameRect = arguments.callee(element.ownerDocument.defaultView.frameElement);

        clientRect.top += curFrameRect.top;
        clientRect.bottom += curFrameRect.top;
        clientRect.left += curFrameRect.left;
        clientRect.right += curFrameRect.left;
      }

      return clientRect;
    },
    copyText: function(text) {
      let preservedActiveElement = $(document.activeElement),
        textbox = $('<input type="text" class="photoshow-hidden-elements" />').val(text).appendTo(document.body).select();

      document.execCommand('copy');
      textbox.remove();

      preservedActiveElement.focus();
    }
  };

  const POSITIONS = ['top', 'right', 'bottom', 'left'],
    POS_FOR_KEYCODE = POSITIONS.concat(POSITIONS).slice(3, 7),
    MODIFIER_KEYS = Array(16).concat(['shift', 'ctrl', 'alt']),
    VIEW_MODES = {
      'M': {
        name: 'Mini',
        scale: 0.125    // Image size scaling rate under this mode.
      },
      'L': {
        name: 'Light',
        scale: 0.25
      },
      'A': {
        name: 'Auto',
        scale: Infinity
      },
      'P': {
        name: 'Panoramic',
        scale: Infinity
      }
    },
    MASK_THRESHOLD = 100,    // The original image size should larger (either width or height) than its maximum displaying size at least by this value so that a mask would apply.
    IS_BROWSER_FIREFOX = /Firefox/.test(navigator.userAgent);

  const photoShowGlobalMsg = {
    element: $('<div class="photoshow-global-msg-layer"><div class="photoshow-global-msg"><em class="photoshow-icons photoshow-icons-logo"></em><i></i></div></div>'),
    show: function(msg) {
      this.hide();

      $('i', this.element).text(msg);
      this.element.appendTo(document.body);
    },
    hide: function() {
      this.element.remove();
    }
  };

  const photoShow = {
    isEnabled: false,                // PhotoShow availability flag.
    websiteConfig: {},               // Configuration for current website.
    config: {                        // PhotoShow configuration.
      update: function(config) {     // Update PhotoShow configuration.
        (function(item, config) {
          Object.entries(config).forEach(([key, value]) => item.hasOwnProperty(key) && (typeof item[key] == 'object' ? arguments.callee(item[key], value) : (item[key] = value)));
        })(this, config);
      },
      activationMode: '',            // Activation mode ('', 'shift', 'ctrl', 'alt').
      _viewMode: VIEW_MODES['A'],    // View mode.
      get viewMode() {               // View mode getter.
        return this._viewMode.name;
      },
      set viewMode(modeName) {       // View mode setter.
        if (this._viewMode.name != modeName) {
          photoShowViewer.viewModeSwitchTip && photoShowViewer.viewModeSwitchTip.text(modeName[0]);
          this._viewMode = VIEW_MODES[modeName[0]];
          photoShowViewer.hasImgShown && photoShowViewer.update();
        } else {
          photoShowViewer.isViewerChanged = false;
        }

        // Trick: To show() is only for triggering a reflow on the viewerBox element so that the keyframe animation can restart, useful when the view mode is frequently switched.
        photoShowViewer.hasImgShown && !photoShowViewer.isViewerChanged && photoShowViewer.viewerBox.removeClass('view-mode-switching').show().addClass('view-mode-switching');
      },
      _logoDisplay: true,            // Logo display.
      get logoDisplay() {
        return this._logoDisplay;
      },
      set logoDisplay(isVisible) {
        (this._logoDisplay = isVisible) ? photoShowViewer.viewerLogo.appendTo(photoShowViewer.viewerBox) : photoShowViewer.viewerLogo.remove();
      },
      _shadowDisplay: true,          // Shadow display.
      get shadowDisplay() {
        return this._shadowDisplay;
      },
      set shadowDisplay(isVisible) {
        (this._shadowDisplay = isVisible) ? photoShowViewer.viewerShadow.prependTo(photoShowViewer.viewerBox) : photoShowViewer.viewerShadow.remove();
      },
      hotkeys: {                     // Hotkey toggles.
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
    }
  };

  const photoShowViewer = {
    mouseClientPos: {                    // Mouse position (relative to viewport top-left).
      x: -1,
      y: -1
    },
    mouseOriClientPos: {                 // Original mouse position (before being moved in keyboard actions).
      x: -1,
      y: -1
    },
    viewerBox: $('<div id="photoShowViewer" class="sb_BingCA photoShow"><div class="photoshow-viewer-shadow"></div><div class="photoshow-img-wrapper"><img /><div class="photoshow-view-mode-switch-tip">A</div></div><div class="photoshow-msg"><em class="photoshow-icons"></em><i></i></div><em class="photoshow-icons photoshow-icons-logo"></em></div>'),    // Main container of the image viewer. (To avoid being automatically removed on https://www.bing.com/?mkt=en-ca, a class name prefixed with 'sb_' is needed.)
    viewerMask: $('<svg xmlns="http://www.w3.org/2000/svg" id="photoShowViewerMaskDef" class="photoShow photoshow-hidden-elements"><defs><mask id="photoShowViewerMask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox"><rect fill="#FFF" opacity="0.25" width="1" height="1" x="0" y="0"></rect><rect fill="#FFF"></rect></mask></defs></svg>'),    // Viewer mask.
    viewerShadow: null,                  // Shadow element.
    viewerLogo: null,                    // PhotoShow logo element.
    viewerImg: null,                     // Image element.
    viewerMsg: null,                     // Message container.
    viewModeSwitchTip: null,             // View mode switch tip element.
    isViewerPosHor: true,                // Indicates if the displaying position of the image viewer is on either the LEFT or RIGHT side of the trigger element.
    isViewerChanged: true,               // Indicates if the displaying features of the image viewer changes frome last time it was displayed.
    preViewerDisplayFeatures: null,      // Displaying features of the image viewer when it displayed last time.
    curTrigger: null,                    // Element that triggers image preview.
    imgSrc: '',                          // Src for the high-definition image (can be either a string or a Promise object).
    preservedImgSrc: '',                 // Preserved image src for context menu items (can be either a string or a Promise object).
    imgRotation: {                       // Properties of viewerImg rotation.
      angle: 0,                          // Rotation angle.
      isVertical: false,                 // Rotation direction flag.
      angleSin: 0,                       // Rotation angle sine value.
      angleCos: 1                        // Rotation angle cosine value.
    },
    imgOriginalSize: null,               // Original size of the high-definition image.
    hasMask: false,                      // Image mask display flag.
    maskAcceleration: 0,                 // Acceleration of image mask moving.
    maskHost: null,                      // Host element for image mask (curTrigger or its parent).
    maskHostRect: {                      // Position and size of the maskHost; viewer location; mouse moving scope; viewport size.
      width: 0,                          // Trigger element width.
      height: 0,                         // Trigger element height.
      top: 0,                            // Top position of the trigger element (relative to viewport top).
      right: 0,                          // Right position of the trigger element (relative to viewport left).
      bottom: 0,                         // Bottom position of the trigger element (relative to viewport top).
      left: 0,                           // Left position of the trigger element (relative to viewport left).
      viewerAnchor: {                    // Anchor position of the viewer.
        top: 0,                          // Bottom position of the viewer when it displays on top of the trigger element (relative to viewport top).
        right: 0,                        // Left position of the viewer when it displays on right of the trigger element (relative to viewport left).
        bottom: 0,                       // Top position of the viewer when it displays on bottom of the trigger element (relative to viewport top).
        left: 0,                         // Right position of the viewer when it displays on left of the trigger element (relative to viewport left).
      },
      mouseEnds: {                       // Mouse moving scope within the trigger element.
        top: 0,                          // Topmost position (relative to viewport top).
        right: 0,                        // Rightmost position (relative to viewport left).
        bottom: 0,                       // Bottommost position (relative to viewport top).
        left: 0                          // Leftmost position (relative to viewport left).
      },
      viewport: {                        // Dimensions of the visible area within the maskHost.
        width: 0,                        // Viewport width.
        height: 0,                       // Viewport height.
        widthRatio: 1,                   // Viewport width : maskHostRect width
        heightRatio: 1                   // Viewport height : maskHostRect height
      }
    },
    viewerBoxOffset: 25,                 // Offset of the viewerBox (relative to the trigger element).
    viewerBoxBorderWidth: 1,             // Border width of the viewerBox.
    hasImgViewerShown: false,            // ViewerBox display flag.
    hasImgShown: false,                  // ViewerImg display flag.
    isModifierKeyDown: false,            // Modifier key flag.
    domObserver: null,                   // Observer for the document.
    viewerDisplayTimer: null,            // Timer to prevent image viewer from being over-triggered to display.
    _mouseoverEvtHandler: null,          // Mouseover event handler with 'this' bound to photoShowViewer.
    getDisplayingStyles: function() {
      var oriImgSize = this.imgOriginalSize;

      if (!oriImgSize) {    // When displaying a loading or failure message.
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
        width: Math.min(window.innerWidth > 0 ? window.innerWidth : Infinity, document.documentElement.clientWidth > 0 ? document.documentElement.clientWidth : Infinity),
        height: Math.min(window.innerHeight > 0 ? window.innerHeight : Infinity, document.documentElement.clientHeight > 0 ? document.documentElement.clientHeight : Infinity)
      };

      this.maskHostRect = tools.getBoundingClientRectToTopWin(this.maskHost);
      this.maskHostRect.viewerAnchor = {
        top: winSize.height - this.maskHostRect.top,
        right: this.maskHostRect.right,
        bottom: this.maskHostRect.bottom,
        left: winSize.width - this.maskHostRect.left
      };

      // Find best displaying space.
      var curViewMode = VIEW_MODES[photoShow.config.viewMode[0]],
        oriImgRatio = oriImgSize.width / oriImgSize.height,
        chosenSpace = [
          [winSize.width, this.maskHostRect.top],
          [winSize.width - this.maskHostRect.right, winSize.height],
          [winSize.width, winSize.height - this.maskHostRect.bottom],
          [this.maskHostRect.left, winSize.height]
        ].map(([spaceWidth, spaceHeight], i) => {
          var spaceRatio = (spaceWidth -= this.viewerBoxOffset * 2) / (spaceHeight -= this.viewerBoxOffset * 2),
            area = spaceWidth * spaceHeight,
            maxImgWidth = Math.max(Math.min(Math.sqrt(area * curViewMode.scale * oriImgRatio), oriImgSize.width, spaceWidth), 0),
            maxImgHeight = Math.max(Math.min(Math.sqrt(area * curViewMode.scale / oriImgRatio), oriImgSize.height, spaceHeight), 0),
            viewerWidth = imgWidth = maxImgWidth,
            viewerHeight = imgHeight = maxImgHeight,
            needMask = false;

          if (curViewMode.name == 'Panoramic' && (oriImgSize.width - maxImgWidth > MASK_THRESHOLD || oriImgSize.height - maxImgHeight > MASK_THRESHOLD)) {
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
          } else if (!(needMask = oriImgRatio > 2 && (imgWidth = maxImgHeight * oriImgRatio) - maxImgWidth > MASK_THRESHOLD ||
              oriImgRatio < 0.5 && (imgHeight = (imgWidth = maxImgWidth) / oriImgRatio) - maxImgHeight > MASK_THRESHOLD)) {
            oriImgRatio > spaceRatio ? (viewerHeight = imgHeight = (imgWidth = maxImgWidth) / oriImgRatio) : (viewerWidth = imgWidth = (imgHeight = maxImgHeight) * oriImgRatio);
          }

          return {
            i,
            area,
            viewerWidth,
            viewerHeight,
            imgWidth,
            imgHeight,
            needMask,
            weight: Math.round(viewerWidth * viewerHeight * (spaceRatio / Math.abs(spaceRatio)) * 100) || -Infinity
          };
        }).sort((space1, space2) => space2.weight - space1.weight || space2.area - space1.area)[0];

      this.isViewerPosHor = !!(chosenSpace.i % 2);

      var chosenPos = {
          anchor: POSITIONS[chosenSpace.i],                 // Position that the viewer displays, relative to the trigger image. (e.g. TOP)
          idle: POSITIONS[chosenSpace.i % 2 + 1],           // Opposite position to offset position, keeping idle when positioning. (e.g. RIGHT)
          opposite: POSITIONS[(chosenSpace.i + 2) % 4],     // Opposite position to anchor postion. (e.g. BOTTOM)
          offset: POSITIONS[(chosenSpace.i + 1) % 2 * 3]    // Offset position for the viewer under current anchor position. (e.g. LEFT)
        },
        anchorDimension = this.isViewerPosHor ? 'width' : 'height',
        offsetDimension = this.isViewerPosHor ? 'height' : 'width';

      var displayingStyles = {
        viewerFinal: {
          width: chosenSpace.viewerWidth,
          height: chosenSpace.viewerHeight
        },
        img: {
          top: '',
          left: '',
          width: (this.imgRotation.isVertical ? chosenSpace.imgHeight : chosenSpace.imgWidth) - this.viewerBoxBorderWidth * 2,
          height: (this.imgRotation.isVertical ? chosenSpace.imgWidth : chosenSpace.imgHeight) - this.viewerBoxBorderWidth * 2,
          transform: `translate(-50%,-50%) rotate(${this.imgRotation.angle}deg)`
        },
        viewModeSwitchTip: {
          lineHeight: `${chosenSpace.viewerHeight}px`,
          fontSize: Math.min(chosenSpace.viewerWidth, chosenSpace.viewerHeight) / 2
        }
      };

      // Calculate viewer styles.
      if (!this.hasImgViewerShown || this.preViewerDisplayFeatures.displayPos != chosenPos.anchor) {
        displayingStyles.viewerInitial = {
          opacity: 0,
          margin: '0 0 0 0',
          [anchorDimension]: 0,
          [offsetDimension]: this.maskHostRect[offsetDimension],
          [chosenPos.anchor]: '',
          [chosenPos.idle]: '',
          [chosenPos.opposite]: this.maskHostRect.viewerAnchor[chosenPos.anchor],
          [chosenPos.offset]: this.maskHostRect[chosenPos.offset]
        };
      }

      Object.assign(displayingStyles.viewerFinal, {
        opacity: 1,
        margin: [0, 0, 0, 0].concat(`${this.viewerBoxOffset}px`, 0, 0, 0).splice(4 - (chosenSpace.i + 2) % 4, 4).join(' '),
        [chosenPos.anchor]: '',
        [chosenPos.idle]: '',
        [chosenPos.opposite]: this.maskHostRect.viewerAnchor[chosenPos.anchor],
        [chosenPos.offset]: Math.min(Math.max(this.maskHostRect[chosenPos.offset] - (displayingStyles.viewerFinal[offsetDimension] - this.maskHostRect[offsetDimension]) / 2, this.viewerBoxOffset), winSize[offsetDimension] - displayingStyles.viewerFinal[offsetDimension] - this.viewerBoxOffset)
      });

      // Calculate viewer shadow styles.
      if (photoShow.config.shadowDisplay) {
        var viewerRect = {
            [chosenPos.anchor]: displayingStyles.viewerFinal[chosenPos.opposite] - displayingStyles.viewerFinal[anchorDimension],
            [chosenPos.idle]: displayingStyles.viewerFinal[chosenPos.offset] + displayingStyles.viewerFinal[offsetDimension],
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

        Object.assign(displayingStyles, {
          shadowInitial: Object.assign({
            top: '',
            right: '',
            bottom: '',
            left: ''
          }, {
            [chosenPos.idle]: 0,
            [chosenPos.offset]: 0
          }),
          shadow: Object.assign({
            top: '',
            right: '',
            bottom: '',
            left: ''
          }, {
            [offsetDimension]: 'auto',
            [anchorDimension]: this.viewerBoxOffset,
            [chosenPos.anchor]: `calc(100% + ${this.viewerBoxBorderWidth}px)`,
            [chosenPos.idle]: Math.min(viewerRect[chosenPos.idle] - this.maskHostRect[chosenPos.idle], 0),
            [chosenPos.offset]: Math.min(this.maskHostRect[chosenPos.offset] - viewerRect[chosenPos.offset], 0),
            mask: `linear-gradient(${chosenPos.opposite}, rgba(128,128,128,0.2), rgba(128,128,128,0.8))`,
            webkitMask: `-webkit-linear-gradient(${chosenPos.opposite}, rgba(128,128,128,0.2), rgba(128,128,128,0.8))`,
            clipPath: `polygon(${[
              `${this.isViewerPosHor ? 0 : `${shadowClacKeyValues[0]}px`} ${this.isViewerPosHor ? `${shadowClacKeyValues[1]}px` : 0}`,
              `${this.isViewerPosHor ? '100%' : `calc(100% - ${shadowClacKeyValues[2]}px)`} ${this.isViewerPosHor ? `${shadowClacKeyValues[0]}px` : 0}`,
              `${this.isViewerPosHor ? '100%' : `calc(100% - ${shadowClacKeyValues[3]}px)`} ${this.isViewerPosHor ? `calc(100% - ${shadowClacKeyValues[2]}px)` : '100%'}`,
              `${this.isViewerPosHor ? 0 : `${shadowClacKeyValues[1]}px`} ${this.isViewerPosHor ? `calc(100% - ${shadowClacKeyValues[3]}px)` : '100%'}`
            ].join()})`
          })
        });
      }

      // Calculate MaskHost properties.
      this.maskHostRect.viewport = {
        width: ((this.imgRotation.isVertical ? chosenSpace.viewerHeight : chosenSpace.viewerWidth) - this.viewerBoxBorderWidth * 2) / displayingStyles.img.width * this.maskHostRect.width,
        height: ((this.imgRotation.isVertical ? chosenSpace.viewerWidth : chosenSpace.viewerHeight) - this.viewerBoxBorderWidth * 2) / displayingStyles.img.height * this.maskHostRect.height
      };
      Object.assign(this.maskHostRect.viewport, {
        widthRatio: this.maskHostRect.viewport.width / this.maskHostRect.width,
        heightRatio: this.maskHostRect.viewport.height / this.maskHostRect.height
      });
      this.maskHostRect.mouseEnds = {
        top: this.maskHostRect.top + this.maskHostRect.viewport.height / 2,
        right: this.maskHostRect.right - this.maskHostRect.viewport.width / 2,
        bottom: this.maskHostRect.bottom - this.maskHostRect.viewport.height / 2,
        left: this.maskHostRect.left + this.maskHostRect.viewport.width / 2
      };
      this.hasMask = chosenSpace.needMask;

      // Check if the viewer displaying features changes.
      this.isViewerChanged = this.preViewerDisplayFeatures ?
        this.preViewerDisplayFeatures.displayPos != chosenPos.anchor ||
        this.preViewerDisplayFeatures.viewerWidth != displayingStyles.viewerFinal.width ||
        this.preViewerDisplayFeatures.viewerHeight != displayingStyles.viewerFinal.height ||
        this.preViewerDisplayFeatures.imgWidth != displayingStyles.img.width ||
        this.preViewerDisplayFeatures.imgHeight != displayingStyles.img.height : true;

      this.preViewerDisplayFeatures = {
        displayPos: chosenPos.anchor,
        viewerWidth: displayingStyles.viewerFinal.width,
        viewerHeight: displayingStyles.viewerFinal.height,
        imgWidth: displayingStyles.img.width,
        imgHeight: displayingStyles.img.height
      };

      return displayingStyles;
    },
    isTrigger: function(element) {
      var imgSrc = '',
        target = $(element);

      if (element && !(imgSrc = target.attr('photoshow-hd-img-src'))) {
        for (let i = 0; i < photoShow.websiteConfig.srcMatching.length; ++i) {
          let curMatchingRule = photoShow.websiteConfig.srcMatching[i];

          if ((target.is(curMatchingRule.selectors || 'img,[style*=background-image]')) && target.css('pointerEvents') != 'none') {
            let targetSrc = tools.getLargestImgSrc(element),
              srcRegExpObj = curMatchingRule.srcRegExp ? new RegExp(curMatchingRule.srcRegExp, 'i') : undefined;

            if (/^(?:function|\(?[\w,\s]*\)?\s*=>)/.test(curMatchingRule.processor)) {
              imgSrc = eval(`(${curMatchingRule.processor})`).call(element, target, targetSrc, srcRegExpObj) || '';
            } else if (srcRegExpObj) {
              if (srcRegExpObj.test(targetSrc)) {
                imgSrc = curMatchingRule.processor ? targetSrc.replace(srcRegExpObj, curMatchingRule.processor) : targetSrc;
              }
            } else {
              imgSrc = curMatchingRule.processor || targetSrc;
            }
          } else if (target.is('a') && /\.(?:jpe?g|gif|pn[gj]|webp|svg)$/.test(target.attr('href'))) {
            imgSrc = target.attr('href');
          }

          if (imgSrc) {
            $.type(imgSrc) == 'string' && (imgSrc = (/^(?:https?:|data:image\/)/.test(imgSrc) ? '' : location.protocol) + imgSrc);

            break;
          }
        }
      }

      return imgSrc ? {target, imgSrc} : false;
    },
    initViewerMask: function() {
      $('rect:last-child', this.viewerMask).attr({
        width: Math.max(this.maskHostRect.viewport.widthRatio, 0),
        height: Math.max(this.maskHostRect.viewport.heightRatio, 0)
      });

      IS_BROWSER_FIREFOX && $(this.maskHost).css('mask', 'url(#photoShowViewerMask)');
    },
    update: function() {
      clearTimeout(this.update.timer);
      this.mouseClientPos = Object.assign({}, this.mouseOriClientPos);

      var curElementUnderMouse = document.elementFromPoint(this.mouseClientPos.x, this.mouseClientPos.y);

      if (curElementUnderMouse) {
        if ($(curElementUnderMouse).is('iframe')) {
          try {
            var frameRect = curElementUnderMouse.getBoundingClientRect();

            curElementUnderMouse.contentWindow.jQuery(curElementUnderMouse.contentWindow.document).trigger('topWinScroll', {
              x: this.mouseClientPos.x - frameRect.left,
              y: this.mouseClientPos.y - frameRect.top
            });
          } catch (error) {
            // Usually an cross-origin exception.
          }
        } else if (this.curTrigger && ($(curElementUnderMouse).is(this.curTrigger) || this.curTrigger.contains(curElementUnderMouse) && !this.isTrigger(curElementUnderMouse))) {
          this.hasImgViewerShown && this.refreshImgViewer();
        } else {
          this.mouseLeaveAction(true);
          this.mouseOverAction({
            target: curElementUnderMouse
          });
        }
      }
    },
    refreshImgViewer: function() {
      var displayingStyles = this.getDisplayingStyles();

      tools.setStyle([
        [this.maskHost, {
          mask: '',
          webkitMask: ''
        }],
        [this.viewerShadow, displayingStyles.shadow, true],
        [this.viewerBox, displayingStyles.viewerFinal, true],
        [this.viewerImg, displayingStyles.img, true],
        [this.viewModeSwitchTip, displayingStyles.viewModeSwitchTip, true]
      ]);

      if (this.hasMask) {
        this.initViewerMask();
        this.moveAction(true);
      }
    },
    displayViewer: function(srcTarget) {
      if (!this.curTrigger) {
        var evtTarget = $(srcTarget);

        // Get src of the high-definition image.
        this.imgSrc = '';

        for (let element of [srcTarget].concat(evtTarget.parents().get())) {
          var triggerTestResult = this.isTrigger(element);

          if (triggerTestResult) {
            evtTarget = triggerTestResult.target;
            this.imgSrc = triggerTestResult.imgSrc;

            break;
          }
        }
        this.preservedImgSrc = this.imgSrc;

        chrome.runtime.sendMessage({
          cmd: 'UPDATE_PHOTOSHOW_CONTEXTMENU',
          args: {
            isEnabled: !!this.imgSrc
          }
        });

        // Show high-definition image.
        if (this.imgSrc && (!photoShow.config.activationMode || this.isModifierKeyDown)) {
          if (!evtTarget.is('[photoshow-trigger-blocked]')) {
            this.curTrigger = this.maskHost = evtTarget.get(0);

            var evtTargetArea = evtTarget.width() * evtTarget.height();

            evtTarget.parents().each((i, ancestor) => {
              ancestor = $(ancestor);
              var ancestorArea = ancestor.width() * ancestor.height();

              if (ancestor.css('position') != 'static' &&
                ancestor.css('display') != 'inline' &&
                (!evtTargetArea || ancestorArea && ancestorArea < evtTargetArea)) {
                this.maskHost = ancestor.get(0);
                return false;
              }
            });

            var imgLoadingTipTimer = null;

            // Reset image viewer.
            this.viewerBox
              .removeClass('img-shown has-mask top-end right-end bottom-end left-end')
              .appendTo(document.body)
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

            // Set image loading state.
            imgLoadingTipTimer = setTimeout(() => {
              imgLoadingTipTimer = null;

              if (this.curTrigger) {
                // Show image loading state.
                $('.photoshow-icons', this.viewerMsg).removeClass('photoshow-icons-bubble-warn').addClass('photoshow-icons-load')
                  .next('i').text(chrome.i18n.getMessage('imageLoadingTip'));

                tools.setStyle(this.viewerBox, this.getDisplayingStyles().viewerFinal, true);
                this.hasImgViewerShown = true;
              }
            }, 100);

            // Load image.
            tools.loadImage(this.imgSrc).then(imgInfo => {
              if (imgInfo.src) {    // Loading succeeds.
                // Note: Both the photoShowViewer.imgSrc and the imgInfo.oriSrc may be either a string or a Promise object.
                if (this.imgSrc && this.imgSrc == imgInfo.oriSrc) {
                  this.imgSrc = imgInfo.src;    // Assign the actual image src to the photoShowViewer.imgSrc, in case it may be a Promise object.
                  $(this.curTrigger).attr('photoshow-hd-img-src', this.imgSrc);    // Cache the actual src of the high-definition image.

                  this.viewerBox.addClass('img-shown');
                  this.viewerImg.attr('src', this.imgSrc);

                  this.imgOriginalSize = {
                    width: imgInfo.width,
                    height: imgInfo.height
                  };

                  var displayingStyles = this.getDisplayingStyles();

                  photoShow.config.logoDisplay && (displayingStyles.viewerFinal.width < 50 || displayingStyles.viewerFinal.height < 50) && this.viewerBox.addClass('logo-hidden');

                  if (imgLoadingTipTimer) {
                    clearTimeout(imgLoadingTipTimer);
                    imgLoadingTipTimer = null;
                  }

                  tools.setStyle([
                    [this.viewerImg, displayingStyles.img],
                    [this.viewModeSwitchTip, displayingStyles.viewModeSwitchTip]
                  ]);

                  if (displayingStyles.viewerInitial) {
                    tools.setStyle(this.viewerBox, displayingStyles.viewerInitial);
                    photoShow.config.shadowDisplay && tools.setStyle(this.viewerShadow, displayingStyles.shadowInitial);

                    // Trick: To show() is only for triggering a reflow on the viewerBox element to make sure the initial styles are applied before setting the final styles.
                    this.viewerBox.show();
                  }
                  tools.setStyle(this.viewerBox, displayingStyles.viewerFinal, true);
                  photoShow.config.shadowDisplay && tools.setStyle(this.viewerShadow, displayingStyles.shadow, true);

                  this.hasImgViewerShown = true;
                  this.hasImgShown = true;

                  // Show image mask initially.
                  if (this.hasMask) {
                    this.initViewerMask();
                    this.viewerBox.addClass('has-mask');
                    this.moveAction();
                  }
                }
              } else {    // Loading fails.
                if (this.imgSrc && this.imgSrc == imgInfo.oriSrc) {
                  $('.photoshow-icons', this.viewerMsg).removeClass('photoshow-icons-load').addClass('photoshow-icons-bubble-warn')
                    .next('i').text(chrome.i18n.getMessage('imageLoadingFailTip'));

                  var displayingStyles = this.getDisplayingStyles();

                  if (imgLoadingTipTimer) {
                    clearTimeout(imgLoadingTipTimer);
                    imgLoadingTipTimer = null;

                    tools.setStyle(this.viewerBox, displayingStyles.viewerFinal, true);
                  } else {
                    tools.setStyle(this.viewerBox, displayingStyles.viewerFinal);
                  }

                  this.hasImgViewerShown = true;
                }
              }
            });

            // Bind mouse leave event handler.
            // For websites on which the mouseleave event handler binded on the document will not be triggered for unknown reasons (e.g. Google Image).
            $(this.curTrigger).one('mouseleave.photoShow', () => this.mouseLeaveAction());
          }
        }
      }
    },
    toggle: function() {
      if (photoShow.isEnabled) {
        IS_BROWSER_FIREFOX && this.viewerMask.appendTo(document.body);
        this.viewerBox.appendTo(document.body);

        this.imgSrc = this.preservedImgSrc = '';

        // Trigger actions.
        // Handle mouseover event in capture phase.
        // This ensures a proper behavior when it comes to a trigger in iframes.
        document.addEventListener('mouseover', this._mouseoverEvtHandler = this.mouseOverAction.bind(this), true);

        $(document).on('mousemove.photoShow', e => {
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
          })
          .on('mouseleave.photoShow', '*', e => {
            var target = $(e.currentTarget);
            if (this.curTrigger) {
              this.curTrigger.contains(e.currentTarget) ||               // This may occur when leaving current element's children.
                $(e.relatedTarget).closest(this.curTrigger).length ||    // This may occur when the viewer has already displayed in the updating procedure.
                this.mouseLeaveAction();
            } else if (target.is('[photoshow-trigger-blocked]')) {
              target.removeAttr('photoshow-trigger-blocked');
            }

            if (target.is('html')) {
              e.currentTarget.ownerDocument.defaultView == window.top && Object.assign(this, {
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
          })
          .on('keydown.photoShow keyup.photoShow', (e) => {
            e.detail && Object.assign(e, e.detail);
            this[`${e.type}Action`](e);
          })
          .on('frameDomMutate.photoShow', (e, mutations) => this.domMutateAction(mutations))
          .on('animationend.photoShow', e => /photoshow-viewer-(.+)-ani/.test(e.originalEvent.animationName) && this.viewerBox.removeClass(RegExp.$1));

        // Window actions.
        $(window).on('scroll.photoShow resize.photoShow', () => this.update())
        .on('blur.photoShow', () => this.winBlurAction());

        // Add amend styles.
        Object.assign(photoShow.websiteConfig, {
          amendStyles: Object.assign(photoShow.websiteConfig.amendStyles || {}, {
            pointerNone: ['*:before,*:after'].concat(photoShow.websiteConfig.amendStyles && photoShow.websiteConfig.amendStyles.pointerNone || []).join(',')
          })
        });

        for (let styleName in photoShow.websiteConfig.amendStyles) {
          tools.addStyle(styleName, photoShow.websiteConfig.amendStyles[styleName]);
        }

        // Start observing the document.
        this.domObserver = new MutationObserver(mutations => this.domMutateAction(mutations));
        this.domObserver.observe(document, {
          childList: true,
          subtree: true,
          attributeFilter: ['src', 'srcset', 'style']
        });
      } else {
        // Destruction.
        IS_BROWSER_FIREFOX && this.viewerMask.remove();
        this.viewerBox.remove();

        document.removeEventListener('mouseover', this._mouseoverEvtHandler, true);
        $(document).off('.photoShow');
        $(window).off('.photoShow');

        // Remove amend styles.
        $('[id^="photoShowStyles_"]').remove();

        // Remove cached hd-image srcs.
        $('[photoshow-hd-img-src]').removeAttr('photoshow-hd-img-src');

        // Stop observing the document.
        if (this.domObserver) {
          this.domMutateAction(this.domObserver.takeRecords());
          this.domObserver.disconnect();
          this.domObserver = null;
        }
      }
    },
    mouseOverAction: function(e) {
      clearTimeout(this.viewerDisplayTimer);

      e && typeof e[`${photoShow.config.activationMode}Key`] == 'boolean' && (this.isModifierKeyDown = e[`${photoShow.config.activationMode}Key`]);

      var srcTarget = e.detail ? e.detail.target : e.target,
        evtTarget = $(srcTarget);

      if (this.hasImgViewerShown && $(e.detail.target).is(this.curTrigger)) {    // Refresh viewer for triggers in iframes.
        this.refreshImgViewer();
      } else if (this.curTrigger) {
        if (!evtTarget.is(this.curTrigger) && (!this.curTrigger.contains(srcTarget) || this.isTrigger(srcTarget))) {
          this.viewerDisplayTimer = setTimeout(() => {
            this.mouseLeaveAction();
            this.displayViewer(srcTarget);
          }, 200);
          evtTarget.one('mouseleave.photoShow', () => clearTimeout(this.viewerDisplayTimer));
        }
      } else {
        this.viewerDisplayTimer = setTimeout(() => this.displayViewer(srcTarget), 200);
        evtTarget.one('mouseleave.photoShow', () => clearTimeout(this.viewerDisplayTimer));
      }
    },
    mouseLeaveAction: function(keepTriggerBlocked) {
      clearTimeout(this.viewerDisplayTimer);

      tools.setStyle([
        [this.viewerBox, {
          opacity: 0,
          margin: '0 0 0 0'
        }, true],
        [this.viewerShadow, {
          [this.isViewerPosHor ? 'width' : 'height']: ''
        }, true],
        [this.maskHost, {
          mask: '',
          webkitMask: ''
        }]
      ]);
      photoShow.config.logoDisplay && this.viewerBox.removeClass('logo-hidden');
      $(this.curTrigger).off('.photoShow');

      keepTriggerBlocked || $('[photoshow-trigger-blocked]').removeAttr('photoshow-trigger-blocked');

      Object.assign(this, {
        imgSrc: '',
        curTrigger: null,
        hasImgViewerShown: false,
        hasImgShown: false,
        imgOriginalSize: null,
        preViewerDisplayFeatures: null,
        isViewerChanged: true,
        maskHost: null,
        maskAcceleration: 0,
        hasMask: false
      });
    },
    moveAction: function(useAni) {
      window.requestAnimationFrame(() => {
        if (this.hasImgShown && this.hasMask) {
          this.mouseClientPos = {
            x: Math.min(Math.max(this.mouseClientPos.x, this.maskHostRect.mouseEnds.left), this.maskHostRect.mouseEnds.right),
            y: Math.min(Math.max(this.mouseClientPos.y, this.maskHostRect.mouseEnds.top), this.maskHostRect.mouseEnds.bottom)
          };

          var maskPos = {
              top: this.mouseClientPos.y - this.maskHostRect.mouseEnds.top,
              left: this.mouseClientPos.x - this.maskHostRect.mouseEnds.left
            },
            imgOffset = {
              top: (this.maskHostRect.height - this.maskHostRect.viewport.height) / 2 / this.maskHostRect.viewport.height - maskPos.top / this.maskHostRect.viewport.height,
              left: (this.maskHostRect.width - this.maskHostRect.viewport.width) / 2 / this.maskHostRect.viewport.width - maskPos.left / this.maskHostRect.viewport.width
            };

          $('rect:last-child', this.viewerMask).attr({
            x: maskPos.left / this.maskHostRect.width,
            y: maskPos.top / this.maskHostRect.height
          });

          var maskForWebkit = `url('data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1 1">${$('mask', this.viewerMask).html()}</svg>`)}')`;

          tools.setStyle((IS_BROWSER_FIREFOX ? [] : [
            [this.maskHost, {
              webkitMask: maskForWebkit
            }]
          ]).concat([
            [this.viewerImg, Object.assign({
              transform: `translate(-50%, -50%) rotate(${this.imgRotation.angle}deg)`
            }, this.imgRotation.isVertical ? {
              top: `${(0.5 + imgOffset.left * this.imgRotation.angleSin) * 100}%`,
              left: `${(0.5 - imgOffset.top * this.imgRotation.angleSin) * 100}%`
            } : {
              top: `${(0.5 + imgOffset.top * this.imgRotation.angleCos) * 100}%`,
              left: `${(0.5 + imgOffset.left * this.imgRotation.angleCos) * 100}%`
            }), useAni]
          ]));
        }
      });
    },
    rotateAction: function(e) {
      this.mouseClientPos = Object.assign({}, this.mouseOriClientPos);
      this.imgRotation.angle += (e.which - 38) * 90;
      Object.assign(this.imgRotation, {
        isVertical: !!(this.imgRotation.angle % 180),
        angleSin: Math.sin(this.imgRotation.angle * Math.PI / 180),
        angleCos: Math.cos(this.imgRotation.angle * Math.PI / 180)
      });

      this.refreshImgViewer();
    },
    copyAction: function() {
      Promise.resolve(this.imgSrc).then(imgSrc => {
        if (imgSrc) {
          tools.copyText(imgSrc);
          photoShowGlobalMsg.show(chrome.i18n.getMessage('globalMsg_imgSrcCopied'));
        }
      });
    },
    savingAction: function() {
      this.imgSrc && photoShowGlobalMsg.show(chrome.i18n.getMessage('globalMsg_imgWillStartDownloading'));
      Promise.resolve(this.imgSrc).then(imgSrc => {
        if (imgSrc) {
          chrome.runtime.sendMessage({
            cmd: 'DOWNLOAD_IMG',
            args: {
              imgSrc: imgSrc
            }
          });
        }
      });
    },
    keydownAction: function(e) {
      const easeInOutSine = (t, b, c, d) => -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;

      const getMoveStep = (scrollMode) => scrollMode == 'PAGE' ?
        (this.imgRotation.isVertical ? this.maskHostRect.viewport.width : this.maskHostRect.viewport.height) :
        (scrollMode == 'ENDS' ? Infinity : easeInOutSine(Math.min(this.maskAcceleration++, 40), 1, 20, 40));

      const scrollImg = (oriKeyCode, scrollMode) => {
        let keyCode = oriKeyCode;

        if (this.imgRotation.angleSin == 1) {            // Case 90°
          keyCode = 40 - (41 - oriKeyCode) % 4;
        } else if (this.imgRotation.angleSin == -1) {    // Case 180°
          keyCode = 37 + (oriKeyCode - 36) % 4;
        } else if (this.imgRotation.angleCos == -1) {    // Case -90°
          keyCode = 78 - oriKeyCode % 2 * 2 - oriKeyCode;
        }

        let shiftingPos = keyCode % 2 ? 'x' : 'y',
          shiftingWeight = keyCode > 38 ? -1 : 1;

        (this.mouseClientPos[shiftingPos] - this.maskHostRect.mouseEnds[POS_FOR_KEYCODE[keyCode - 37]]) * shiftingWeight <= 0 && this.viewerBox.removeClass('top-end right-end bottom-end left-end').addClass(`${POS_FOR_KEYCODE[oriKeyCode - 37]}-end`);
        this.mouseClientPos[shiftingPos] -= getMoveStep(scrollMode) * shiftingWeight;
        this.moveAction(!!scrollMode);
      };

      const isActiveElementAnInput = $(document.activeElement).is(':input');

      switch (e.which) {
        case 9:    // Key 'Tab'
          if (!isActiveElementAnInput && photoShow.config.hotkeys.openImageInNewTab.isEnabled) {
            this.hasImgViewerShown && e.preventDefault();
            this.imgSrc && photoShowGlobalMsg.show(chrome.i18n.getMessage('globalMsg_imgWillOpenInNewTab'));
            Promise.resolve(this.imgSrc).then(imgSrc => {
              if (imgSrc) {
                chrome.runtime.sendMessage({
                  cmd: 'OPEN_IMG_IN_NEW_TAB',
                  args: {
                    imgSrc: imgSrc
                  }
                });
              }
            });
          }

          break;

        case 16:    // Key 'SHIFT'
        case 17:    // Key 'CTRL'
        case 18:    // Key 'ALT'
          if (!this.isModifierKeyDown && e.which == $.inArray(photoShow.config.activationMode, MODIFIER_KEYS)) {
            e.preventDefault();

            this.isModifierKeyDown = true;
            $('[photoshow-trigger-blocked]').removeAttr('photoshow-trigger-blocked');
            this.update();
          }

          break;

        case 67:    // Key 'C'
          if (!isActiveElementAnInput && photoShow.config.hotkeys.copyImageAddress.isEnabled) {
            this.hasImgViewerShown && e.preventDefault();
            this.copyAction();
          }

          break;

        case 83:    // Key 'S'
          if (!isActiveElementAnInput && photoShow.config.hotkeys.saveImage.isEnabled) {
            this.hasImgViewerShown && e.preventDefault();
            this.savingAction();
          }

          break;

        default:
      }

      if (!isActiveElementAnInput && this.hasImgViewerShown) {
        switch (e.which) {
          case 27:    // Key 'Esc'
            if (photoShow.config.hotkeys.closeViewer.isEnabled) {
              e.preventDefault();
              $(this.curTrigger).attr('photoshow-trigger-blocked', '');
              this.mouseLeaveAction(true);
            }

            break;

          case 33:    // Key 'PageUp'
            if (photoShow.config.hotkeys.scrollImageByPage.isEnabled && this.hasImgShown && this.hasMask) {
              e.preventDefault();
              scrollImg(38, 'PAGE');
            }

            break;

          case 34:    // Key 'PageDown'
            if (photoShow.config.hotkeys.scrollImageByPage.isEnabled && this.hasImgShown && this.hasMask) {
              e.preventDefault();
              scrollImg(40, 'PAGE');
            }

            break;

          case 35:    // Key 'End'
            if (photoShow.config.hotkeys.scrollImageToEnds.isEnabled && this.hasImgShown && this.hasMask) {
              e.preventDefault();
              scrollImg(40, 'ENDS');
            }

            break;

          case 36:    // Key 'Home'
            if (photoShow.config.hotkeys.scrollImageToEnds.isEnabled && this.hasImgShown && this.hasMask) {
              e.preventDefault();
              scrollImg(38, 'ENDS');
            }

            break;

          case 37:    // Key 'LEFT'
          case 39:    // Key 'RIGHT'
            if (this.hasImgShown) {
              if (e.shiftKey && e.ctrlKey) {
                if (photoShow.config.hotkeys.rotateImage.isEnabled) {
                  e.preventDefault();
                  this.rotateAction(e);
                }
              } else if (photoShow.config.hotkeys.scrollImage.isEnabled && this.hasImgShown && this.hasMask) {
                e.preventDefault();
                scrollImg(e.which);
              }
            }

            break;

          case 38:    // Key 'UP'
          case 40:    // Key 'DOWN'
            if (photoShow.config.hotkeys.scrollImage.isEnabled && this.hasImgShown && this.hasMask) {
              e.preventDefault();
              scrollImg(e.which);
            }

            break;

          case 65:    // Key 'A'
          case 76:    // Key 'L'
          case 77:    // Key 'M'
          case 80:    // Key 'P'
            if (photoShow.config.hotkeys.switchViewMode.isEnabled && this.hasImgShown) {
              e.preventDefault();

              if (VIEW_MODES[String.fromCharCode(e.which)].name == photoShow.config.viewMode) {
                // The storage APIs will not trigger a change event in which case the update of the viewMode property is not going to happen.
                // However, the viewModeSwitchTip is still need to be displayed, so a manual update is required here.
                photoShow.config.viewMode = photoShow.config.viewMode;
              } else {
                chrome.runtime.sendMessage({
                  cmd: 'SET_PHOTOSHOW_CONFIGS',
                  args: {
                    item: 'viewMode',
                    value: VIEW_MODES[String.fromCharCode(e.which)].name
                  }
                });
              }
            }

            break;

          default:
        }
      }
    },
    keyupAction: function(e) {
      this.maskAcceleration = 0;

      switch (e.which) {
        case 16:    // Key 'SHIFT'
        case 17:    // Key 'CTRL'
        case 18:    // Key 'ALT'
          this.isModifierKeyDown = false;

          if (this.curTrigger && e.which == $.inArray(photoShow.config.activationMode, MODIFIER_KEYS)) {
            e.preventDefault();
            this.mouseLeaveAction();
          }

          break;

        default:
      }
    },
    winBlurAction: function() {
      this.isModifierKeyDown = false;
    },
    domMutateAction: function(mutations) {
      // Some websites update images only by changing their src attributes instead of replacing the whole img elements,
      // which could cause problems when the triggers have had their high-definition image srcs cached.
      // Some websites remove photoShow's elements when updating their page contents, in which case those elements need to be add back to the DOM.
      mutations.forEach(mutation => {
        var target = $(mutation.target);

        if (!target.closest('.photoShow').length) {
          switch (mutation.type) {
            case 'childList':
              if (mutation.removedNodes.length) {
                var removedPhotoShowStyleNodes = Array.from(mutation.removedNodes).filter(node => $(node).is('[id^="photoShowStyles_"],#photoShowViewerMaskDef'));

                removedPhotoShowStyleNodes.length && target.append(removedPhotoShowStyleNodes);

                // CAUTION: DO NOT check whether the curTrigger is in document with jQuery closest() method which will cause serious performance problem.
                this.curTrigger && !this.curTrigger.ownerDocument.contains(this.curTrigger) && his.mouseLeaveAction();
              }

              break;

            case 'attributes':
              if (~mutation.attributeName.indexOf('src') && target.is('img,source') ||
                mutation.attributeName == 'style' && tools.getBackgroundImgSrc(target)) {
                target.closest('[photoshow-hd-img-src]').removeAttr('photoshow-hd-img-src');
              }

              break;

            default:
          }
        }
      });
    }
  };

  (function init() {
    // Initialize viewer.
    photoShowViewer.viewerShadow = $('.photoshow-viewer-shadow', photoShowViewer.viewerBox);
    photoShowViewer.viewerImg = $('img', photoShowViewer.viewerBox);
    photoShowViewer.viewModeSwitchTip = $('.photoshow-view-mode-switch-tip', photoShowViewer.viewerBox);
    photoShowViewer.viewerMsg = $('.photoshow-msg', photoShowViewer.viewerBox);
    photoShowViewer.viewerLogo = $('.photoshow-icons-logo', photoShowViewer.viewerBox);

    // Response to messages.
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      var needAsyncResponse;

      switch (request.cmd) {
        case 'GET_PRESERVED_IMG_SRC':
          needAsyncResponse = true;
          Promise.resolve(photoShowViewer.preservedImgSrc).then(sendResponse);

          break;

        case 'COPY_IMG_SRC':
          photoShowViewer.copyAction();

          break;

        case 'DISPATCH_HOTKEY_EVENT':
          document.dispatchEvent(new CustomEvent(request.args.type, {
            detail: request.args
          }));

          break;

        default:
      }

      return needAsyncResponse;
    });

    // Response to storage change event.
    chrome.storage.onChanged.addListener(changes => {
      if (changes.disabledWebsites && photoShow.isEnabled != !changes.disabledWebsites.newValue.includes(location.hostname)) {
        photoShow.isEnabled = !photoShow.isEnabled;
        photoShowViewer.toggle();
      }

      changes.photoShowConfigs && photoShow.config.update(changes.photoShowConfigs.newValue);
    });

    // Get initial state.
    chrome.runtime.sendMessage({
      cmd: 'GET_INITIAL_STATE_AND_CONFIGS'
    }, response => {
      photoShow.isEnabled = response.isPhotoShowEnabled;
      photoShow.websiteConfig = response.websiteConfig || {};
      photoShowViewer.toggle();
      photoShow.config.update(response.photoShowConfigs);
    });
  })();
})(jQuery.noConflict());