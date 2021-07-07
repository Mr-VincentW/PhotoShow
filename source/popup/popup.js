/**
 * Copyright (c) 2012-2021 Vincent W., MIT-licensed.
 * @fileOverview PhotoShow popup page script.
 * @author Vincent | vincentwang863@gmail.com
 * @version 1.0.0.0 | 2012-12-07 | Vincent    // Initial version.
 * @version 2.0.0.0 | 2013-01-03 | Vincent    // Updates: Support turnning on/off PhotoShow for individual website.
 * @version 3.0.0.0 | 2018-11-08 | Vincent    // Updates: Reconstruction.
 * @version 3.1.0.0 | 2018-11-17 | Vincent    // Updates: Replace image resources with font icons.
 * @version 3.4.0.0 | 2019-01-24 | Vincent    // Updates: Add activation mode control.
 * @version 3.5.0.0 | 2019-04-08 | Vincent    // Updates: Get version string from extension manifest.
 * @version 3.8.3.0 | 2019-06-09 | Vincent    // Updates: Disable animation for toggle button during initialization;
 *                                            // Updates: Add hotkey description for open image in new tab.
 * @version 4.0.0.0 | 2019-11-07 | Vincent    // Updates: Apply JavaScript Arrow functions;
 *                                            // Updates: Add VIEW MODE feature;
 *                                            // Updates: Add shadow for the viewer and allow it to be hidden by user settings;
 *                                            // Updates: Allow PhotoShow logo in the viewer to be hidden by user settings;
 *                                            // Updates: Add new hotkeys 'Esc', 'Home', 'End', 'PageUp', 'PageDown', 'Arrow Left', 'Arrow Right', 'M', 'L', 'A' and 'P';
 *                                            // Updates: Change hotkeys for image rotation;
 *                                            // Updates: Optimize the popup page styles.
 * @version 4.0.3.0 | 2019-11-23 | Vincent    // Updates: Optimize the display style of the version text;
 *                                            // Updates: Add 'share' interface.
 * @version 4.0.5.0 | 2019-12-16 | Vincent    // Updates: Add feedback email template.
 * @version 4.0.6.0 | 2019-12-27 | Vincent    // Updates: Add PhotoShow download links for Microsoft Edge and QQ browser.
 * @version 4.0.9.3 | 2020-01-08 | Vincent    // Bug Fix: Fix the keydown events dispatching failure and simplify the keydown and keyup events responses;
 *                                            // Updates: Port localStorage APIs to chrome.storage APIs.
 * @version 4.0.11.0 | 2020-01-20 | Vincent   // Updates: Replace Array.prototype.flatMap method with Array.prototype.map to support older browsers, in response to user feedback.
 * @version 4.0.12.0 | 2020-01-24 | Vincent   // Updates: Add GitHub link.
 * @version 4.1.0.0 | 2020-03-13 | Vincent    // Updates: Add hotkey specification for image address copying.
 * @version 4.2.0.0 | 2020-03-20 | Vincent    // Updates: PHOTOSHOW_CONFIGS supports nested data structure;
 *                                            // Updates: Replace string concatenation with template literals;
 *                                            // Updates: Support disabling hotkeys;
 *                                            // Updates: Optimize hotkey specifications.
 * @version 4.2.1.0 | 2020-03-26 | Vincent    // Updates: Replace the PhotoShow poster image for sharing.
 * @version 4.6.0.0 | 2021-01-24 | Vincent    // Updates: Support displaying HD image size in the viewer;
 *                                            // Updates: Remove the feature of displaying PhotoShow logo in the viewer;
 *                                            // Updates: Remove download link for QQ browsers app centre.
 * @version 4.7.0.0 | 2021-07-04 | Vincent    // Updates: Add config items for activation exemption, loading states display, transition animation, and context menu items.
 * @version 4.7.1.0 | 2021-07-07 | Vincent    // Updates: Optimize view mode options order.
 */

// TODO: Support customising hotkeys.

var curTabUrl = '';

const UI_LANGUAGE = chrome.i18n.getUILanguage(),
  PHOTOSHOW_LINK = /\bFirefox\b/.test(navigator.userAgent)
    ? `https://addons.mozilla.org/${UI_LANGUAGE}/firefox/addon/photoshow/`
    : /\bEdg\b/.test(navigator.userAgent)
    ? `https://microsoftedge.microsoft.com/addons/detail/afdelcfalkgcfelngdclbaijgeaklbjk?hl=${UI_LANGUAGE}`
    : `https://chrome.google.com/webstore/detail/photoshow/mgpdnhlllbpncjpgokgfogidhoegebod?hl=${UI_LANGUAGE}`;

function turnOnPhotoShow() {
  $('#stateMsg').text(chrome.i18n.getMessage('photoShowEnabledMsg'));
  $('#stateToggle')
    .removeClass('disabled no-ani')
    .find('.state-icon')
    .removeClass('icon-bubble-warn')
    .addClass('icon-bubble-check');
  $('#stateToggleBtn').attr('title', chrome.i18n.getMessage('stateToggleOnTitle'));
}

function turnOffPhotoShow(disableAni) {
  $('#stateMsg').text(chrome.i18n.getMessage('photoShowDisabledMsg'));
  $('#stateToggle')
    .addClass(`disabled${disableAni ? ' no-ani' : ''}`)
    .find('.state-icon')
    .removeClass('icon-bubble-check')
    .addClass('icon-bubble-warn');
  $('#stateToggleBtn').attr('title', chrome.i18n.getMessage('stateToggleOffTitle'));
}

function getSharingUrl(link, params) {
  return params
    ? [link, '?']
        .concat(
          Object.keys(params)
            .map(key => `${key}=${encodeURIComponent(params[key])}`)
            .join('&')
        )
        .join('')
    : link;
}

function updateConfigItems(configs, hostNode) {
  Object.entries(configs).forEach(([key, value]) => {
    let curConfigItemNode = $(`[config-item="${key}"]`, hostNode);

    if (curConfigItemNode.length) {
      if (typeof value === 'object') {
        arguments.callee(value, curConfigItemNode);
      } else {
        let configInput = $('input', curConfigItemNode);
        typeof value == 'boolean' ? configInput.prop('checked', value) : configInput.val([value]);
      }
    }
  });
}

// Actions.
$(document)
  .on('click.photoShow', '#stateToggleBtn', () => {
    // Website switch action.
    if (curTabUrl) {
      chrome.runtime.sendMessage({
        cmd: 'SET_PHOTOSHOW_STATE',
        args: {
          tabUrl: curTabUrl,
          isPhotoShowEnabled: $('#stateToggle').hasClass('disabled')
        }
      });
    }
  })
  .on('keydown.photoShow keyup.photoShow', e => {
    // Hotkey actions.
    e.key == 'Escape' || e.preventDefault(); // Do not block popup page closing.

    chrome.runtime.sendMessage({
      cmd: 'DISPATCH_HOTKEY_EVENT',
      args: (({ type, key, which, shiftKey, ctrlKey, altKey }) => ({ type, key, which, shiftKey, ctrlKey, altKey }))(e)
    });
  })
  .on('change.photoShow', '[config-item] input', e => {
    // Config items actions.
    var curOption = $(e.currentTarget);

    chrome.runtime.sendMessage({
      cmd: 'SET_PHOTOSHOW_CONFIGS',
      args: {
        item: curOption
          .parentsUntil('body', '[config-item]')
          .map((i, configItem) => $(configItem).attr('config-item'))
          .toArray()
          .reverse()
          .join('.'),
        value: curOption.is(':checkbox') ? curOption.is(':checked') : curOption.val()
      }
    });
  })
  .on('click.photoShow', '#hotkeysSection tr', e => {
    // Hotkeys toggle actions.
    if (!$(e.target).is(':checkbox')) {
      var curCheckbox = $(':checkbox', e.currentTarget);
      curCheckbox.prop('checked', !curCheckbox.is(':checked')).change();
    }
  });

// Response to the storage change event.
chrome.storage.onChanged.addListener(changes => {
  if (curTabUrl && changes.disabledWebsites) {
    if (changes.disabledWebsites.newValue.includes(new URL(curTabUrl).hostname)) {
      turnOffPhotoShow();
    } else {
      turnOnPhotoShow();
    }
  }

  changes.photoShowConfigs && updateConfigItems(changes.photoShowConfigs.newValue);
});

// Initialization.
$('#name').text(
  `${chrome.i18n.getMessage('extensionName')} ${
    /(\d+\.\d+)(?:\.\d+){0,2}( Beta)?/.test(chrome.runtime.getManifest().version_name)
      ? RegExp.$1 + RegExp.$2
      : chrome.runtime.getManifest().version
  }`
);
$('#updateDate').text(chrome.i18n.getMessage('extensionUpdateDate'));

[
  'activationMode',
  'activationExemption',
  'imageSizeDisplay',
  'shadowDisplay',
  'loadingStatesDisplay',
  'animationToggle',
  'contextMenuToggle'
].forEach(item => {
  $(`#${item}Section dt h3`).text(chrome.i18n.getMessage(`${item}Header`));
  $(`#${item}Desc`).text(chrome.i18n.getMessage(`${item}Desc`));
});
$('#activationModeOption_None').text(chrome.i18n.getMessage('activationModeOption_None'));

$('#viewModeSection dt h3').text(chrome.i18n.getMessage('viewModeHeader'));
$('#viewModeSection dd').append(
  ['Auto', 'Mini', 'Light', 'Panoramic']
    .map(
      modeName =>
        `<label title="${chrome.i18n.getMessage(`viewModeOptionTitle_${modeName}`)}" hotkey="${
          modeName[0]
        }"><input type="radio" name="viewModeRadio" value="${modeName}"${
          modeName == 'Auto' ? ' checked' : ''
        } /><span>${chrome.i18n.getMessage(`viewModeOption_${modeName}`)} (${modeName[0]})</span></label>`
    )
    .join('')
);

$('#hotkeysSection dt h3').text(chrome.i18n.getMessage('hotkeysHeader'));
$('#hotkeysSection dd').append(
  `<table>${[
    'closeViewer',
    'rotateImage',
    'scrollImage',
    'scrollImageByPage',
    'scrollImageToEnds',
    'switchViewMode',
    'openImageInNewTab',
    'saveImage',
    'copyImageAddress'
  ]
    .map(
      keyName =>
        `<tr class="checkboxes" config-item="${keyName}" title="${chrome.i18n.getMessage(
          'hotkeyToggleTitle'
        )}"><td config-item="isEnabled"><input type="checkbox" checked/></td>${chrome.i18n.getMessage(
          `hotkey_${keyName}`
        )}</tr>`
    )
    .join('')}</table>`
);

$('#shareSection dt h3').text(chrome.i18n.getMessage('shareHeader'));

function initContactLinks() {
  var shareInfo = {
      iconTitles: chrome.i18n.getMessage('shareIconTitles').split(','),
      url: PHOTOSHOW_LINK,
      tag: chrome.i18n.getMessage('extensionName'),
      text: chrome.i18n.getMessage('shareText'),
      desc: chrome.i18n.getMessage('extensionDesc'),
      pic: 'https://lh3.googleusercontent.com/J4PdCq4haGqB-GYF_BFEcswOtM1vucxUAiCFAYEvwMXDJH_I-ksKhLYgv97MRBVb_EJIxCwP=w1400-h560'
    },
    contactConfig = {
      mail: {
        link: 'mailto:vincentwang863@gmail.com',
        data: {
          subject: chrome.i18n.getMessage('feedbackMailSubject'),
          body: chrome.i18n.getMessage('feedbackMailBody', [
            navigator.userAgent,
            chrome.runtime.getManifest().version,
            curTabUrl
          ])
        }
      },
      github: {
        link: 'https://github.com/Mr-VincentW/PhotoShow'
      },
      facebook: {
        link: 'https://www.facebook.com/dialog/share',
        data: {
          app_id: 552746812187976,
          display: 'popup',
          href: shareInfo.url,
          sharetag: `#${shareInfo.tag}`,
          quote: shareInfo.text
        }
      },
      twitter: {
        link: 'https://twitter.com/intent/tweet',
        data: {
          url: shareInfo.url,
          hashtags: shareInfo.tag,
          text: shareInfo.text
        }
      },
      weibo: {
        link: 'http://service.weibo.com/share/share.php',
        data: {
          appkey: 514787745,
          url: shareInfo.url,
          title: `#${shareInfo.tag}# ${shareInfo.text}`,
          pic: shareInfo.pic
        }
      },
      qzone: {
        link: 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey',
        data: {
          url: shareInfo.url,
          title: shareInfo.tag,
          summary: shareInfo.desc,
          desc: shareInfo.text,
          pics: shareInfo.pic
        }
      },
      reddit: {
        link: 'https://www.reddit.com/submit',
        data: {
          url: `${shareInfo.text} ${shareInfo.url}`,
          title: shareInfo.tag
        }
      },
      tumblr: {
        link: 'http://tumblr.com/widgets/share/tool',
        data: {
          posttype: 'link',
          title: shareInfo.tag,
          tags: shareInfo.tag,
          url: shareInfo.url,
          content: shareInfo.url,
          caption: shareInfo.text
        }
      }
    };

  Object.keys(contactConfig).forEach((name, i) =>
    $(`#shareSection .icon-${name}`).attr({
      href: getSharingUrl(contactConfig[name].link, contactConfig[name].data),
      title: shareInfo.iconTitles[i]
    })
  );
}

chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  tabs => {
    if (!chrome.runtime.lastError && tabs && tabs.length) {
      curTabUrl = tabs[0].url;

      initContactLinks();

      chrome.runtime.sendMessage(
        {
          cmd: 'GET_INITIAL_STATE_AND_CONFIGS',
          args: {
            tabUrl: curTabUrl
          }
        },
        response => {
          if (response.isPhotoShowEnabled) {
            turnOnPhotoShow();
          } else {
            turnOffPhotoShow(true);
          }

          updateConfigItems(response.photoShowConfigs);
        }
      );
    }
  }
);
