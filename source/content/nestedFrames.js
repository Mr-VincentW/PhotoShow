/**
 * Copyright (c) 2012-2020 Vincent W., MIT-licensed.
 * @fileOverview PhotoShow content script for nested iframes.
 * @author Vincent | vincentwang863@gmail.com
 * @version 3.8.5.0 | 2019-07-10 | Vincent    // Initial version.
 * @version 3.8.6.0 | 2019-07-18 | Vincent    // Updates: Limit window scroll and mouse wheel events action only to top window;
 *                                            // Bug Fix: Avoid exception when cross-origin access happens between frames.
 *                                            // Bug Fix: Enclose jQuery to avoid conflict.
 * @version 3.8.7.0 | 2019-07-22 | Vincent    // Updates: Remove high-definition image cache when the trigger image changes its src.
 * @version 3.9.0.0 | 2019-09-22 | Vincent    // Bug Fix: Fix style problem caused by globally appended pointerNone style for all pseudo elements.
 * @version 3.9.1.0 | 2019-09-25 | Vincent    // Bug Fix: Fix the problem that PhotoShow does not work on websites that do not have a 'pointerNone' configuration item.
 * @version 4.0.0.0 | 2019-11-07 | Vincent    // Bug Fix: Fix the locating problem of the viewer when the trigger image is in multi-nested iframes;
 *                                            // Updates: Apply JavaScript Arrow functions;
 *                                            // Updates: Dispatch hotkeys actions to the top window.
 * @version 4.0.9.3 | 2020-01-08 | Vincent    // Updates: Port localStorage APIs to chrome.storage APIs.
 * @version 4.0.10.0 | 2020-01-09 | Vincent   // Bug_Fix: Remount photoShow elements after they are removed by the host page.
 * @version 4.0.11.0 | 2020-01-20 | Vincent   // Updates: Replace spread syntax with Object.assign to support for older browsers, in response to user feedback.
 */

(($, isInFrame) => {
  if (isInFrame) {
    const tools = {
      addStyle: function(styleName, selectors) {
        if (!$('#photoShowStyles_' + styleName).length) {
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

          $('<style type="text/css"></style>').attr('id', 'photoShowStyles_' + styleName)
            .append(selectors + '{' + rules.join(';') + '}')
            .appendTo($('head')[0]);
        }
      }
    };

    var photoShowViewer = {
      isPhotoShowEnabled: false,     // PhotoShow availability flag.
      websiteConfig: {},             // Configuration for current website.
      domObserver: null,             // Observer for the document.
      toggle: function() {
        if (this.isPhotoShowEnabled) {
          // Handle mouseover event in capture phase.
          // This ensures a proper behavior when it comes to a trigger in iframes.
          document.addEventListener('mouseover', this.mouseOverAction, true);

          $(document).on('mousemove.photoShow mouseout.photoShow keydown.photoShow keyup.photoShow', e => {
            window.top.jQuery(window.top.document).trigger(e);
          })
          .on('topWinScroll.photoShow', this.winScrollAction.bind(this));

          // Add amend styles.
          Object.assign(this.websiteConfig, {
            amendStyles: Object.assign(this.websiteConfig.amendStyles || {}, {
              pointerNone: ['*:before,*:after'].concat(this.websiteConfig.amendStyles && this.websiteConfig.amendStyles.pointerNone || []).join(',')
            })
          });

          for (let styleName in this.websiteConfig.amendStyles) {
            tools.addStyle(styleName, this.websiteConfig.amendStyles[styleName]);
          }

          // Start observing triggers.
          this.domObserver = new MutationObserver(this.domMutateAction);
          this.domObserver.observe(document, {
            // childList: true,    // CAUTION: DO NOT turn on 'childList' mutation observation as on some websites (e.g. QZone), this will cause serious performance problem.
            subtree: true,
            attributeFilter: ['src', 'srcset', 'style']
          });
        } else {
          document.removeEventListener('mouseover', this.mouseOverAction, true);
          $(document).off('.photoShow');

          // Remove amend styles.
          $('[id^="photoShowStyles_"]').remove();

          // Remove cached hd-image srcs.
          $('[photoshow-hd-img-src]').removeAttr('photoshow-hd-img-src');

          // Stop observing triggers.
          if (this.domObserver) {
            this.domMutateAction(this.domObserver.takeRecords());
            this.domObserver.disconnect();
            this.domObserver = null;
          }
        }
      },
      mouseOverAction: function(e) {
        window.top.document.dispatchEvent(new CustomEvent('mouseover', {
          detail: {
            target: e.target
          }
        }));
      },
      winScrollAction: function(e, mouseClientPos) {
        var curElementUnderMouse = document.elementFromPoint(mouseClientPos.x, mouseClientPos.y);

        if (curElementUnderMouse) {
          if ($(curElementUnderMouse).is('iframe')) {
            try {
              var frameRect = curElementUnderMouse.getBoundingClientRect();

              curElementUnderMouse.contentWindow.jQuery(curElementUnderMouse.contentWindow.document).trigger('topWinScroll', {
                x: mouseClientPos.x - frameRect.left,
                y: mouseClientPos.y - frameRect.top
              });
            } catch (error) {
              // Usually an cross-origin exception.
            }
          } else {
            this.mouseOverAction({
              target: curElementUnderMouse
            });
          }
        }
      },
      domMutateAction: function(mutations) {
        window.top.jQuery(window.top.document).trigger('frameDomMutate', [mutations]);
      }
    };

    try {
      // Get initial state.
      chrome.runtime.sendMessage({
        cmd: 'GET_INITIAL_STATE_AND_CONFIGS',
        args: {
          tabUrl: window.top.location.href
        }
      }, response => {
        photoShowViewer.isPhotoShowEnabled = response.isPhotoShowEnabled;
        photoShowViewer.websiteConfig = response.websiteConfig || {};

        photoShowViewer.toggle();
      });

      // Response to storage change event.
      chrome.storage.onChanged.addListener(changes => {
        if (changes.disabledWebsites && photoShowViewer.isPhotoShowEnabled != !changes.disabledWebsites.newValue.includes(location.hostname)) {
          photoShowViewer.isPhotoShowEnabled = !photoShowViewer.isPhotoShowEnabled;
          photoShowViewer.toggle();
        }
      });
    } catch (error) {
      // Usually an cross-origin exception.
    }
  }
})(jQuery.noConflict(), window != window.top);