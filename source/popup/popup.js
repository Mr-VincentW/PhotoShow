/**
 * Copyright (c) 2012-2022 Vincent W., MIT-licensed.
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
 * @version 4.7.0.0 | 2021-07-04 | Vincent    // Updates: Add config items for activation exemption, loading status display, transition animation, and context menu items.
 * @version 4.7.1.0 | 2021-07-07 | Vincent    // Updates: Optimize view mode options order.
 * @version 4.9.0.0 | 2021-08-22 | Vincent    // Updates: Add 'works-everywhere' related items.
 * @version 4.9.2.0 | 2021-08-27 | Vincent    // Updates: Add 'toggleViewMode' hotkey item.
 * @version 4.10.0.0 | 2021-09-18 | Vincent   // Updates: Add config items for viewer location settings;
 *                                            // Updates: Optimize config items naming.
 * @version 4.11.0.0 | 2021-10-21 | Vincent   // Bug Fix: Toggle button can still be triggered when PhotoShow is in shut-down state.
 * @version 4.12.0.0 | 2021-11-07 | Vincent   // Updates: Add config items for 'developer mode' settings.
 * @version 4.14.0.0 | 2021-12-14 | Vincent   // Bug Fix: Wrong default value for config item 'worksEverywhere' and 'developerModeSuspension';
 *                                            // Updates: Add config items for 'activation delay' settings;
 *                                            // Updates: Disable view modes switching/toggling hotkeys by default.
 * @version 4.15.0.0 | 2022-03-27 | Vincent   // Updates: Support file naming.
 * @version 4.15.1.0 | 2022-03-30 | Vincent   // Updates: Add config items for file-naming-always-ask settings;
 *                                            // Updates: Remove default filename.
 * @version 4.16.0.0 | 2022-04-10 | Vincent   // Updates: Allow user to turn off file-naming.
 * @version 4.17.0.0 | 2022-05-28 | Vincent   // Bug Fix: Incorrect time zone issue in file naming (GitHub issue #51).
 * @version 4.20.0.0 | 2023-02-05 | Vincent   // Updates: Allow enabling/disabling image anti-aliasing (GitHub issue #90).
 * @version 4.22.0.0 | 2023-03-23 | Vincent   // Updates: Add image title to download image naming patterns.
 */

// TODO: Support customising hotkeys.
// TODO: Optimize default config values - remove corresponding config items when their default values matched.

var curTab;

const UI_LANGUAGE = chrome.i18n.getUILanguage(),
  PHOTOSHOW_LINK = /\bFirefox\b/.test(navigator.userAgent)
    ? `https://addons.mozilla.org/${UI_LANGUAGE}/firefox/addon/photoshow/`
    : /\bEdg\b/.test(navigator.userAgent)
    ? `https://microsoftedge.microsoft.com/addons/detail/afdelcfalkgcfelngdclbaijgeaklbjk?hl=${UI_LANGUAGE}`
    : `https://chrome.google.com/webstore/detail/photoshow/mgpdnhlllbpncjpgokgfogidhoegebod?hl=${UI_LANGUAGE}`;

function enablePhotoShow(isWebsiteUnknown) {
  $('#stateMsg').text(chrome.i18n.getMessage(`photoShowEnabledMsg${isWebsiteUnknown ? '_basic' : ''}`));
  $('#stateToggle')
    .removeClass('disabled no-ani shut-down')
    .addClass(isWebsiteUnknown ? 'basic' : '')
    .find('.state-icon')
    .removeClass('icon-bubble-error icon-bubble-warn')
    .addClass('icon-bubble-check');
  $('#stateToggleBtn').attr('title', chrome.i18n.getMessage('stateToggleOnTitle'));
  $('#settings .desc').show();
}

function disablePhotoShow(disableAni) {
  $('#stateMsg').text(chrome.i18n.getMessage('photoShowDisabledMsg'));
  $('#stateToggle')
    .removeClass('basic no-ani shut-down')
    .addClass(`disabled${disableAni ? ' no-ani' : ''}`)
    .find('.state-icon')
    .removeClass('icon-bubble-check icon-bubble-error')
    .addClass('icon-bubble-warn');
  $('#stateToggleBtn').attr('title', chrome.i18n.getMessage('stateToggleOffTitle'));
  $('#settings .desc').show();
}

function shutDownPhotoShow(disableAni, isSuspended) {
  $('#stateMsg').text(chrome.i18n.getMessage(`photoShow${isSuspended ? 'Suspended' : 'Shutdown'}Msg`));
  $('#stateToggle')
    .removeClass('basic disabled no-ani')
    .addClass(`shut-down${disableAni ? ' no-ani' : ''}`)
    .find('.state-icon')
    .removeClass('icon-bubble-check icon-bubble-warn')
    .addClass('icon-bubble-error');
  $('#stateToggleBtn').removeAttr('title');
  $('#settings .desc').show();
  $(`#settings .desc:not(#${isSuspended ? 'developerModeToggle' : 'worksEverywhere'}Section,#shareSection)`).hide();
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

function updateStateAndConfigs(isInitializing) {
  function updateConfigItems(configs, hostNode) {
    Object.entries(configs).forEach(([key, value]) => {
      let curConfigItemNode = $(`[config-item="${key}"]`, hostNode);

      if (curConfigItemNode.length) {
        if (Array.isArray(value)) {
          $(':checkbox', curConfigItemNode).each((_, option) =>
            $(option).prop('checked', value.includes($(option).val()))
          );
        } else if (typeof value === 'object') {
          arguments.callee(value, curConfigItemNode);
        } else {
          let configInput = $('input', curConfigItemNode);
          typeof value == 'boolean' ? configInput.prop('checked', value) : configInput.val([value]);
        }
      }
    });
  }

  curTab &&
    chrome.runtime.sendMessage(
      {
        cmd: 'GET_PHOTOSHOW_STATE_AND_CONFIGS',
        args: {
          tabId: curTab.id,
          tabUrl: curTab.url
        }
      },
      response => {
        if (response.isWebsiteUnknown && response.photoShowConfigs.worksEverywhere === false) {
          shutDownPhotoShow(isInitializing);
        } else if (response.isInDeveloperMode && response.photoShowConfigs.developerModeSuspension !== false) {
          shutDownPhotoShow(isInitializing, true);
        } else if (response.isPhotoShowEnabled) {
          enablePhotoShow(response.isWebsiteUnknown);
        } else {
          disablePhotoShow(isInitializing);
        }

        // Update config items.
        updateConfigItems(response.photoShowConfigs);

        // TODO: Remove this after refactoring with either React or VueJS.
        $('#fileNamingExample').text(getFilenameExample($('#fileNamingFilename').val()));
      }
    );
}

// Actions.
$(document)
  .on('click.photoShow', '#stateToggleBtn', () => {
    // Website switch action.
    if (curTab && !$('#stateToggle').hasClass('shut-down')) {
      chrome.runtime.sendMessage({
        cmd: 'SET_PHOTOSHOW_STATE',
        args: {
          tabUrl: curTab.url,
          isPhotoShowEnabled: $('#stateToggle').hasClass('disabled')
        }
      });
    }
  })
  .on('keydown.photoShow keyup.photoShow', e => {
    // View mode hotkey actions.
    if (/^[amlp]$/i.test(e.key)) {
      chrome.runtime.sendMessage({
        cmd: 'DISPATCH_EVENT',
        args: (({ type, key, which, shiftKey, ctrlKey, altKey }) => ({ type, key, which, shiftKey, ctrlKey, altKey }))(
          e
        )
      });
    }
  })
  .on('keydown.photoShow', 'input[type="number"]', e => {
    if (
      !(
        /^(?:\d|Alt|Arrow\w+|Backspace|CapsLock|Control|Delete|End|Enter|Escape|F\d+|Home|Meta|NumLock|Shift|Tab)$/.test(
          e.key
        ) ||
        (/^[acvx]$/.test(e.key) && e.ctrlKey)
      )
    ) {
      e.preventDefault();
    }
  })
  .on('input.photoShow', 'input[type="number"]', e => {
    if (Number(e.target.value) > Number(e.target.max)) {
      e.preventDefault();
      e.target.value = e.target.max;
    }
  })
  .on('change.photoShow', '[config-item] input', e => {
    // Config items actions.
    const curOption = $(e.currentTarget),
      isMultiple = curOption.closest('[config-item]').find(':checkbox').length > 1;

    if (isMultiple) {
      const selectedOptions = curOption.closest('[config-item]').find(':checkbox:checked');
      selectedOptions.prop('disabled', selectedOptions.length <= 1);
    }

    if (e.target.type === 'number') {
      e.target.value = e.target.value
        ? Math.max(e.target.min, Math.min(e.target.max, e.target.value))
        : e.target.dataset.defaultValue || '';
    }

    if (e.target.type === 'text') {
      e.target.value = e.target.value || e.target.dataset.defaultValue || '';
    }

    chrome.runtime.sendMessage({
      cmd: 'SET_PHOTOSHOW_CONFIGS',
      args: {
        item: curOption
          .parentsUntil('body', '[config-item]')
          .map((_, configItem) => $(configItem).attr('config-item'))
          .toArray()
          .reverse()
          .join('.'),
        value: isMultiple
          ? curOption
              .closest('[config-item]')
              .find(':checkbox:checked')
              .map((_, option) => $(option).val())
              .toArray()
          : curOption.is(':checkbox')
          ? curOption.is(':checked')
          : curOption.is('[type="number"]')
          ? Number(curOption.val())
          : curOption.val()
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
  if (['disabledWebsites', 'photoShowConfigs'].some(item => Object.keys(changes).includes(item))) {
    updateStateAndConfigs();
  }
});

// Initialization.
$(document.documentElement).attr('lang', UI_LANGUAGE);
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
  'activationDelay',
  'viewMode',
  'viewerLocation',
  'imageSizeDisplay',
  'shadowDisplay',
  'loadingStatusDisplay',
  'animationToggle',
  'antialiasingToggle',
  'contextMenuToggle',
  'developerModeToggle',
  'worksEverywhere',
  'fileNamingAlwaysAsk'
].forEach(item => {
  $(`#${item}Section dt h3`).text(chrome.i18n.getMessage(`${item}Header`));
  $(`#${item}Desc`).text(chrome.i18n.getMessage(`${item}Desc`));
});
$('#activationModeOption_None').text(chrome.i18n.getMessage('activationModeOption_None'));
$('#activationDelayDesc_before').text(chrome.i18n.getMessage('activationDelayDesc_before'));
$('#activationDelayDesc_after').text(chrome.i18n.getMessage('activationDelayDesc_after'));

$('#viewModeSection dd').append(
  ['auto', 'mini', 'lite', 'panoramic']
    .map(
      modeName =>
        `<label title="${chrome.i18n.getMessage(
          `viewModeOptionTitle_${modeName}`
        )}"><input type="radio" name="viewModeRadio" value="${modeName}"${
          modeName == 'auto' ? ' checked' : ''
        } /><span>${chrome.i18n.getMessage(`viewModeOption_${modeName}`)} (${modeName[0].toUpperCase()})</span></label>`
    )
    .join('')
);

$('#viewerLocationSection dd').append(
  ['top', 'bottom', 'left', 'right']
    .map(
      location =>
        `<label><input type="checkbox" value="${location}" checked /><span>${chrome.i18n.getMessage(
          `viewerLocationOption_${location}`
        )}</span></label>`
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
    'toggleViewMode',
    'openImageInNewTab',
    'saveImage',
    'copyImageAddress'
  ]
    .map(
      keyName =>
        `<tr class="checkboxes" config-item="${keyName}" title="${chrome.i18n.getMessage(
          'hotkeyToggleTitle'
        )}"><td config-item="isEnabled"><input type="checkbox"${
          /^(?:switch|toggle)ViewMode$/.test(keyName) ? '' : ' checked'
        }/></td>${chrome.i18n.getMessage(`hotkey_${keyName}`)}</tr>`
    )
    .join('')}</table>`
);

// File naming.
$('#fileNamingSection dt h3').text(chrome.i18n.getMessage('fileNamingHeader'));
$('#fileNamingFilenameTitle').text(chrome.i18n.getMessage('fileNamingFilenameTitle'));
$('#fileNamingFilename').attr('placeholder', chrome.i18n.getMessage('fileNamingFilenamePlaceholder'));
$('#fileNamingExampleTitle').text(chrome.i18n.getMessage('fileNamingExampleTitle'));
$('#fileNamingExample').attr('placeholder', chrome.i18n.getMessage('fileNamingExamplePlaceholder'));
$('#fileNamingPatternsTitle').text(chrome.i18n.getMessage('fileNamingPatternsTitle'));
$('#fileNamingPatterns').append(
  ['year', 'Month', 'date', 'hour', 'minute', 'second', 'Hostname', 'ImageTitleOrDesc', 'OriginalFilename'].map(
    cell =>
      `<li>&lt;${cell[0]}&gt;</li><li${
        ['Hostname', 'ImageTitleOrDesc', 'OriginalFilename'].includes(cell) ? ' class="long-pattern"' : ''
      }>${chrome.i18n.getMessage(`fileNamingPatternDesc_${cell}`)}</li>`
  )
);

$('#fileNamingFilename')
  .on('input', e => {
    $('#fileNamingExample').text(getFilenameExample(e.target.value));
  })
  .on('change', e => {
    e.target.value =
      e.target.value
        ?.replace(/^[/\\\s]+|[\s.]+$|<(?:[^dHIhMmOsy]|[^>]{2,})>|[:*?"|]|(?<!<[^>]+)>|<(?![^<]+>)/g, '')
        .replace(/<(\w)+>/g, '<$1>')
        .replace(/[/\\]+/g, '/')
        .replace(/\/$/, '/<O>') || '';

    $('#fileNamingExample').text(getFilenameExample(e.target.value));
  });

function getFilenameExample(filename) {
  const fileNamingPatternDescToDemoFilename = patternDesc =>
    patternDesc.replaceAll(/\s\w/g, match => `_${match.trim().toUpperCase()}`);

  const now = new Date(),
    filenamePatterns = {
      ...(/(?<y>\d+)-(?<M>\d+)-(?<d>\d+)T(?<h>\d+):(?<m>\d+):(?<s>\d+)/.exec(
        new Date(now - now.getTimezoneOffset() * 60 * 1000).toISOString()
      )?.groups || {}),
      H: fileNamingPatternDescToDemoFilename(chrome.i18n.getMessage('fileNamingPatternDesc_hostname')),
      I: fileNamingPatternDescToDemoFilename(chrome.i18n.getMessage('fileNamingPatternDesc_imageTitleOrDesc')),
      O: fileNamingPatternDescToDemoFilename(chrome.i18n.getMessage('fileNamingPatternDesc_originalFilename'))
    };

  return filename
    ? `${filename.replaceAll(/<([dHIhMmOsy])>/g, (_, pattern) => filenamePatterns[pattern] || '')}.jpg`
    : '';
}

$('#shareSection dt h3').text(chrome.i18n.getMessage('shareHeader'));

// Contact.
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
            curTab.url
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

// Initialization.
chrome.tabs.query(
  {
    active: true,
    currentWindow: true
  },
  tabs => {
    if (!chrome.runtime.lastError && tabs && tabs.length) {
      curTab = tabs[0];

      initContactLinks();

      updateStateAndConfigs(true);
    }
  }
);
