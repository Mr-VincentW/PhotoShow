import React from 'react';

function Contact(props) {
  const uiLanguage = chrome.i18n.getUILanguage(),
    userAgent = navigator.userAgent,
    photoshowLink = /\bFirefox\b/.test(userAgent)
      ? 'https://addons.mozilla.org/' + uiLanguage + '/firefox/addon/photoshow/'
      : /\bEdg\b/.test(userAgent)
      ? 'https://microsoftedge.microsoft.com/addons/detail/afdelcfalkgcfelngdclbaijgeaklbjk?hl=' +
        uiLanguage
      : /\bQQBrowser\b/.test(userAgent)
      ? 'https://appcenter.browser.qq.com/search/detail?key=%E6%B5%AE%E5%9B%BE%E7%A7%80&id=mgpdnhlllbpncjpgokgfogidhoegebod%20&title=%E6%B5%AE%E5%9B%BE%E7%A7%80'
      : 'https://chrome.google.com/webstore/detail/photoshow/mgpdnhlllbpncjpgokgfogidhoegebod?hl=' +
        uiLanguage;

  const shareInfo = {
      iconTitles: chrome.i18n.getMessage('shareIconTitles').split(','),
      url: photoshowLink,
      tag: chrome.i18n.getMessage('extensionName'),
      text: chrome.i18n.getMessage('shareText'),
      desc: chrome.i18n.getMessage('extensionDesc'),
      pic:
        'https://lh3.googleusercontent.com/atLFQgBZc1ntToYjH905mZDKZhaUO-zrqXcGRjeUVXUJVNet4FsQq6s5ztFkyuFK6G5owSGE=w1400-h560'
    },
    shareConfig = {
      mail: {
        link: 'mailto:vincentwang863@gmail.com',
        data: {
          subject: chrome.i18n.getMessage('feedbackMailSubject'),
          body: chrome.i18n.getMessage('feedbackMailBody', [
            userAgent,
            chrome.runtime.getManifest().version,
            props.curTabUrl
          ])
        }
      },
      'github': {
        link: 'https://github.com/Mr-VincentW/PhotoShow'
      },
      facebook: {
        link: 'https://www.facebook.com/dialog/share',
        data: {
          app_id: 552746812187976,
          display: 'popup',
          href: shareInfo.url,
          sharetag: '#' + shareInfo.tag,
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
          title: '#' + shareInfo.tag + '# ' + shareInfo.text,
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
          url: shareInfo.text + ' ' + shareInfo.url,
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

  return (
    <dl className="desc contact">
      <dt>
        <em className="icons icons-share"></em>
        <h3>{chrome.i18n.getMessage('shareHeader')}</h3>
      </dt>
      <dd>
        {Object.keys(shareConfig).map((media, index) => (
          <a
            key={media}
            target="_blank"
            className={'icons icons-' + media}
            href={shareConfig[media].data ? shareConfig[media].link + '?' + new URLSearchParams(shareConfig[media].data) : shareConfig[media].link}
            title={shareInfo.iconTitles[index]}></a>
        ))}
      </dd>
    </dl>
  );
}

export default Contact;
