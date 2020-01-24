import React, {useCallback} from 'react';

function Config(props) {
  const configItemOnChange = useCallback(e => {
    let target = e.target;

    chrome.runtime.sendMessage({
      cmd: 'SET_PHOTOSHOW_CONFIGS',
      args: {
        item: target.closest('dl').dataset.item,
        value: target.type == 'checkbox' ? target.checked : target.value
      }
    });
  });

  return (
    <>
      <dl className="desc radios activation-mode" data-item="activationMode">
        <dt>
          <em className="icons icons-activation"></em>
          <h3>{chrome.i18n.getMessage('activationModeHeader')}</h3>
        </dt>
        <dd>
          <span>{chrome.i18n.getMessage('activationModeDesc')}</span>
          <span className="plus">+</span>
          {['', 'Shift', 'Ctrl', 'Alt'].map(modeName => (
            <label key={modeName}>
              <input
                type="radio"
                name="activationModeRadio"
                checked={
                  modeName.toLowerCase() ==
                  props.photoShowConfigs.activationMode
                }
                value={modeName.toLowerCase()}
                onChange={configItemOnChange}
              />
              <span>
                {modeName ||
                  chrome.i18n.getMessage('activationModeOption_None')}
              </span>
            </label>
          ))}
        </dd>
      </dl>
      <dl className="desc radios" data-item="viewMode">
        <dt>
          <em className="icons icons-view-mode"></em>
          <h3>{chrome.i18n.getMessage('viewModeHeader')}</h3>
        </dt>
        <dd>
          {['Mini', 'Light', 'Auto', 'Panoramic'].map(modeName => (
            <label
              key={modeName}
              title={chrome.i18n.getMessage('viewModeOptionTitle_' + modeName)}
              hotkey={modeName[0]}>
              <input
                type="radio"
                name="viewModeRadio"
                value={modeName}
                checked={modeName == props.photoShowConfigs.viewMode}
                onChange={configItemOnChange}
              />
              <span>
                {chrome.i18n.getMessage('viewModeOption_' + modeName) +
                  ' (' +
                  modeName[0] +
                  ')'}
              </span>
            </label>
          ))}
        </dd>
      </dl>
      <dl className="desc checkboxes" data-item="logoDisplay">
        <dt>
          <em className="icons icons-logo-display"></em>
          <h3>{chrome.i18n.getMessage('logoDisplayHeader')}</h3>
        </dt>
        <dd>
          <label>
            <input
              type="checkbox"
              checked={props.photoShowConfigs.logoDisplay}
              onChange={configItemOnChange}
            />
            <span>{chrome.i18n.getMessage('logoDisplayDesc')}</span>
          </label>
        </dd>
      </dl>
      <dl className="desc checkboxes" data-item="shadowDisplay">
        <dt>
          <em className="icons icons-shadow-display"></em>
          <h3>{chrome.i18n.getMessage('shadowDisplayHeader')}</h3>
        </dt>
        <dd>
          <label>
            <input
              type="checkbox"
              checked={props.photoShowConfigs.shadowDisplay}
              onChange={configItemOnChange}
            />
            <span>{chrome.i18n.getMessage('shadowDisplayDesc')}</span>
          </label>
        </dd>
      </dl>
    </>
  );
}

export default Config;
