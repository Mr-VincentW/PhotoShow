/**
 * Copyright (c) 2012-2021 Vincent W., MIT-licensed.
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
 * @version 4.0.10.0 | 2020-01-09 | Vincent   // Bug Fix: Remount photoShow elements after they are removed by the host page.
 * @version 4.0.11.0 | 2020-01-20 | Vincent   // Updates: Replace spread syntax with Object.assign to support for older browsers, in response to user feedback.
 * @version 4.2.0.0 | 2020-03-20 | Vincent    // Updates: Replace string concatenation with template literals.
 * @version 4.4.0.0 | 2020-04-18 | Vincent    // Bug Fix: Fix the problem that image src fails to be preserved for contextmenu actions.
 * @version 4.5.2.0 | 2020-08-23 | Vincent    // Updates: Replace Object.assign with spread syntax.
 * @version 4.9.0.0 | 2021-08-22 | Vincent    // Updates: Offer basic support for unknown websites.
 * @version 4.10.0.0 | 2021-09-18 | Vincent   // Updates: Optimize user interaction on certain websites by changing events binding method.
 * @version 4.11.0.0 | 2021-10-21 | Vincent   // Bug Fix: A dom mutation event error.
 * @version 4.12.0.0 | 2021-11-07 | Vincent   // Updates: Allow user to suspend PhotoShow when in developer mode, in response to user feedback.
 */

(($, isInFrame) => {
  if (isInFrame) {
    const tools = {
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
      }
    };

    const photoShow = {
      isEnabled: false, // PhotoShow availability flag.
      isInDeveloperMode: false, // Developer mode flag.
      websiteConfig: {}, // Configuration for current website.
      config: {
        developerModeSuspension: true
      },
      updateState: function () {
        try {
          chrome.runtime.sendMessage(
            {
              cmd: 'GET_PHOTOSHOW_STATE_AND_CONFIGS',
              args: {
                tabUrl: window.top.location.href
              }
            },
            response => {
              this.isEnabled = !!(
                response.isPhotoShowEnabled &&
                !response.isWebsiteUnknown | (response.photoShowConfigs.worksEverywhere !== false)
              );
              this.isInDeveloperMode = response.isInDeveloperMode || false;
              this.websiteConfig = response.websiteConfig || {};
              this.config.developerModeSuspension = response.photoShowConfigs.developerModeSuspension;

              photoShowViewer.toggle();
            }
          );
        } catch (error) {
          // Usually a cross-origin exception.
        }
      }
    };

    const photoShowViewer = {
      isRunning: false, // Running state flag.
      domObserver: null, // Observer for the document.
      _evtHandlers: {}, // Event handlers.
      _bindEvent: function (evtTypes, handler) {
        const _handler = handler.bind(this);

        evtTypes
          .split(' ')
          .forEach(evtType => document.addEventListener(evtType, (this._evtHandlers[evtType] = _handler), true));
      },
      _unbindAllEvents: function () {
        Object.entries(this._evtHandlers).forEach(([evtType, evtHandler]) =>
          document.removeEventListener(evtType, evtHandler, true)
        );
      },
      toggle: function () {
        const prevIsRunning = this.isRunning;

        this.isRunning =
          photoShow.isEnabled && !(photoShow.isInDeveloperMode && photoShow.config.developerModeSuspension);

        if (prevIsRunning !== this.isRunning) {
          if (this.isRunning) {
            // Handle events in capture phases.
            // This ensures proper behaviors when it comes to triggers in iframes or on some certain websites (e.g. Google Map).
            this._bindEvent('mouseover', this.mouseOverAction);
            this._bindEvent('mousemove mouseout keydown keyup contextmenu', function (e) {
              window.top.jQuery(window.top.document).trigger(e);
            });
            this._bindEvent('topWinScroll', this.winScrollAction);

            // Add amend styles.
            photoShow.websiteConfig = {
              ...photoShow.websiteConfig,
              amendStyles: {
                ...(photoShow.websiteConfig.amendStyles || {}),
                pointerNone: ['*:before,*:after']
                  .concat(
                    (photoShow.websiteConfig.amendStyles && photoShow.websiteConfig.amendStyles.pointerNone) || []
                  )
                  .join(',')
              }
            };

            for (let styleName in photoShow.websiteConfig.amendStyles) {
              tools.addStyle(styleName, photoShow.websiteConfig.amendStyles[styleName]);
            }

            // Start observing triggers.
            this.domObserver = new MutationObserver(this.domMutateAction);
            this.domObserver.observe(document, {
              // childList: true,    // CAUTION: DO NOT turn on 'childList' mutation observation as on some websites (e.g. QZone), this will cause serious performance problem.
              subtree: true,
              attributeFilter: ['src', 'srcset', 'style'],
              attributeOldValue: true
            });
          } else {
            this._unbindAllEvents();

            // Remove amend styles.
            $('[id^="photoShowStyles_"]').remove();

            // Remove cached hd-image srcs.
            $('[photoshow-hd-src]').removeAttr('photoshow-hd-src');

            // Stop observing triggers.
            if (this.domObserver) {
              this.domMutateAction(this.domObserver.takeRecords());
              this.domObserver.disconnect();
              this.domObserver = null;
            }
          }
        }
      },
      mouseOverAction: function (e) {
        window.top.document.dispatchEvent(
          new CustomEvent('mouseover', {
            detail: {
              target: e.target
            }
          })
        );
      },
      winScrollAction: function (e, mouseClientPos) {
        var curElementUnderMouse = document.elementFromPoint(mouseClientPos.x, mouseClientPos.y);

        if (curElementUnderMouse) {
          if ($(curElementUnderMouse).is('iframe')) {
            try {
              var frameRect = curElementUnderMouse.getBoundingClientRect();

              curElementUnderMouse.contentWindow
                .jQuery(curElementUnderMouse.contentWindow.document)
                .trigger('topWinScroll', {
                  x: mouseClientPos.x - frameRect.left,
                  y: mouseClientPos.y - frameRect.top
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
      domMutateAction: function (mutations) {
        // window.top.jQuery(window.top.document).trigger('frameDomMutate', [mutations]);
        window.top.document.dispatchEvent(
          new CustomEvent('frameDomMutate', {
            detail: mutations
          })
        );
      }
    };

    // Response to messages.
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      var needAsyncResponse;

      switch (request.cmd) {
        case 'TOGGLE_DEVELOPER_MODE':
          photoShow.isInDeveloperMode = request.args.isInDeveloperMode;
          photoShowViewer.toggle();

          break;

        default:
      }

      return needAsyncResponse;
    });

    // Response to storage change event.
    chrome.storage.onChanged.addListener(changes => {
      if (['disabledWebsites', 'photoShowConfigs'].some(item => Object.keys(changes).includes(item))) {
        photoShow.updateState();
      }
    });

    // Get initial state.
    photoShow.updateState();
  }
})(jQuery.noConflict(), window != window.top);
