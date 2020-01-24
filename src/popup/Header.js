import React from 'react';

function Header() {
  const manifest = chrome.runtime.getManifest();

  return (
    <div className="header">
      <em className="icons icons-logo"></em>
      <h1 className="name">
        {chrome.i18n.getMessage('extensionName') +
          ' ' +
          (/(\d+\.\d+)(?:\.\d+){0,2}( Beta)?/.test(manifest.version_name)
            ? RegExp.$1 + RegExp.$2
            : manifest.version)}
      </h1>
      <span className="update-date">
        {chrome.i18n.getMessage('extensionUpdateDate')}
      </span>
    </div>
  );
}

export default Header;
