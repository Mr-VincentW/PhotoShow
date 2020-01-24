import React from 'react';

function Hotkey() {
  const hotkeyList = {
    Esc: 'Esc',
    RotationCCW: 'Shift + Ctrl + ←',
    RotationCW: 'Shift + Ctrl + →',
    Scroll: '↑ / → / ↓ / ←',
    ScrollByPage: 'PgUp / PgDn',
    ScrollToEnds: 'Home / End',
    OpenImageInNewTab: 'Tab',
    ViewModeSwitch: 'M / L / A / P',
    ImageSaving: 'S'
  };

  return (
    <dl className="desc hotkeys-spec">
      <dt>
        <em className="icons icons-keyboard"></em>
        <h3>{chrome.i18n.getMessage('hotkeysHeader')}</h3>
      </dt>
      <dd>
        <table>
          <tbody>
            {Object.entries(hotkeyList).map(([key, hotkeyName]) => (
              <tr key={key}>
                <td>{hotkeyName}</td>
                <td>{chrome.i18n.getMessage('hotkey_' + key)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </dd>
    </dl>
  );
}

export default Hotkey;
