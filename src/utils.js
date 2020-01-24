const utils = {
  addStyle: function(styleName, selectors) {
    if (!document.querySeletor('#photoShowStyles_' + styleName).length) {
      let rules = [];

      switch (styleName) {
        case 'pointerAuto':
          rules.push('pointer-events:auto !important');

          break;

        case 'pointerNone':
          rules.push('pointer-events:none !important');

          break;

        default:
      }

      const styleNode = document.createElement('style');
      styleNode.setAttribute('id', 'photoShowStyles_' + styleName);
      styleNode.innerHTML = selectors + '{' + rules.join(';') + '}';

      document.head.appendClild(styleNode);
    }
  },
  cacheImage: function(id, imgSrc) {
    let cacheImg = document.querySeletor('[photoshow-cache-id="' + id + '"]');

    if (!cacheImg && imgSrc) {
      cacheImg = document.createElement('input');
      cacheImg.setAttribute('type', 'hidden');
      cacheImg.setAttribute('photoshow-cache-id', id);
      cacheImg.value = imgSrc;

      document.appendClild(cacheImg);
    } else {
      imgSrc = cacheImg.value || '';
    }

    return imgSrc;
  },
  // TODO: De-jQuery, resuming frome here.
  detectImage: function(preferredSrc, defaultSrc, isImgInvalid) {
    defaultSrc = defaultSrc || '';

    return new Promise(resolve => {
      var img = new Image(),
        imgLoadTimer = null;

      img.onload = () => {
        clearTimeout(imgLoadTimer);
        img.onload = img.onerror = null;

        resolve(
          (({src, width, height}) => ({
            src,
            width,
            height
          }))(
            isImgInvalid && isImgInvalid(img)
              ? {
                  src: defaultSrc
                }
              : img
          )
        );
      };

      img.onerror = () => {
        clearTimeout(imgLoadTimer);
        img.onload = img.onerror = null;

        resolve({
          src: defaultSrc
        });
      };

      clearTimeout(imgLoadTimer);
      imgLoadTimer = setTimeout(() => img.onerror(), 20 * 1000);

      img.src = preferredSrc;
    });
  },
  getBackgroundImgSrc: function(img) {
    return /^url\([\'"]?((?:https?:|data:image\/)?\/\/.+?)[\'"]?\)$/i.test(
      $(img)
        .css('backgroundImage')
        .split(/,\s*(?=url\()/)[0]
    )
      ? RegExp.$1
      : '';
  },
  getBoundingClientRectToTopWin: function(element) {
    var clientRect = JSON.parse(
      JSON.stringify(element.getBoundingClientRect())
    );

    if (element.ownerDocument.defaultView != window.top) {
      let curFrameRect = arguments.callee(
        element.ownerDocument.defaultView.frameElement
      );

      clientRect.top += curFrameRect.top;
      clientRect.bottom += curFrameRect.top;
      clientRect.left += curFrameRect.left;
      clientRect.right += curFrameRect.left;
    }

    return clientRect;
  },
  getDateStr: function(date) {
    function padNum(num) {
      return (num > 9 ? '' : '0') + num;
    }

    return (
      date.getFullYear() +
      padNum(date.getMonth() + 1) +
      padNum(date.getDate()) +
      padNum(date.getHours()) +
      padNum(date.getMinutes()) +
      padNum(date.getSeconds())
    );
  },
  getImgFileName: function(src, tabUrl) {
    return (
      [
        chrome.i18n.getMessage('imageSavingNamePrefix'),
        this.getUrlHostname(tabUrl),
        this.getDateStr(new Date())
      ].join('_') +
      '.' +
      (/\.(jpe?g|png|bmp|gif|webp|svg)$/.test(src) ? RegExp.$1 : 'jpg')
    ); // Explicitly ignore 'pnj' type.
  },
  getLargestImgSrc: function(target) {
    var srcSetRegex = /([\d.]+)[wx]$/;
    target = $(target);

    return target.is('img')
      ? (target[0].srcset || target[0].src || '')
          .split(/,\s*(?=(?:\w+:)?\/\/)/)
          .sort(
            (src1, src2) =>
              (srcSetRegex.test(src2) ? parseFloat(RegExp.$1) : 0) -
              (srcSetRegex.test(src1) ? parseFloat(RegExp.$1) : 0)
          )[0]
          .split(/,?\s+/)[0]
      : this.getBackgroundImgSrc(target);
  },
  getUrlHostname: function(url) {
    return new URL(url).hostname || '';
  },
  loadImage: function(oriSrc) {
    return Promise.resolve(oriSrc).then(imgSrc =>
      this.detectImage(imgSrc).then(imgInfo =>
        Promise.resolve({
          oriSrc,
          ...imgInfo
        })
      )
    );
  },
  setStyle: function() {
    // el, styles, useAni || [el, styles, useAni]
    for (let [el, styles, useAni = false] of arguments.length > 1
      ? [arguments]
      : arguments[0]) {
      if (styles) {
        $(el).css('transition', useAni ? '0.2s ease-out' : '');
        $(el).css(styles);
      }
    }
  },
  swapDimensions: function(obj) {
    return {
      ...obj,
      ...{
        width: obj.height,
        height: obj.width
      }
    };
  }
};

export default utils;
