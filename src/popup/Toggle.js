import React from 'react';

function Toggle(props) {
  return (
    <div
      className={
        'state-toggle' +
        (props.photoShowState.isInitial ? '' : ' with-ani') +
        (props.photoShowState.isEnabled ? '' : ' disabled')
      }>
      <em
        className={
          'icons state-icon icons-bubble-' +
          (props.photoShowState.isEnabled ? 'check' : 'warn')
        }></em>
      <h3 className="state-msg">
        {chrome.i18n.getMessage(
          props.photoShowState.isEnabled
            ? 'photoShowEnabledMsg'
            : 'photoShowDisabledMsg'
        )}
      </h3>
      <span
        className="state-toggle-btn"
        title={chrome.i18n.getMessage(
          props.photoShowState.isEnabled
            ? 'stateToggleOnTitle'
            : 'stateToggleOffTitle'
        )}
        onClick={() => {
          props.updatePhotoShowState(!props.photoShowState.isEnabled);
        }}></span>
    </div>
  );
}

export default Toggle;
