/**
 * Copyright (c) 2012-2020 Vincent W., MIT-licensed.
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
 *                                            // Updates: Add new hotkeys 'Esc', 'Home', 'End', 'PageUp', 'PageDown', 'Arrow Left', 'Arrow Right', M', 'L', 'A' and 'P';
 *                                            // Updates: Change hotkeys for image rotation;
 *                                            // Updates: Optimize the popup page styles.
 * @version 4.0.3.0 | 2019-11-23 | Vincent    // Updates: Optimize the display style of the version text;
 *                                            // Updates: Add 'share' interface.
 * @version 4.0.5.0 | 2019-12-16 | Vincent    // Updates: Add feedback email template.
 * @version 4.0.6.0 | 2019-12-27 | Vincent    // Updates: Add PhotoShow download links for Microsoft Edge and QQ browser.
 * @version 4.0.9.3 | 2020-01-08 | Vincent    // Bug Fix: Fix the keydown events dispatching failure and simplify the keydown and keyup events responses;
 *                                            // Updates: Port localStorage APIs to chrome.storage APIs.
 */

import './popup.less';

import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import Toggle from './Toggle';
import Config from './Config';
import Hotkey from './Hotkey';
import Contact from './Contact';

function Popup() {
  const [curTabUrl, setCurTabUrl] = useState('');
  const [photoShowState, setPhotoShowState] = useState({
    isEnabled: true,
    isInitial: true
  });
  const [photoShowConfigs, setPhotoShowConfigs] = useState({
    activationMode: '',
    viewMode: 'Auto',
    logoDisplay: true,
    shadowDisplay: true
  });

  const updatePhotoShowState = useCallback(
    isEnabled => {
      if (curTabUrl) {
        chrome.runtime.sendMessage({
          cmd: 'SET_PHOTOSHOW_STATE',
          args: {
            tabUrl: curTabUrl,
            isPhotoShowEnabled: isEnabled
          }
        });
      }
    },
    [curTabUrl]
  );

  // Initialisation.
  useEffect(() => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true
      },
      tabs => {
        if (!chrome.runtime.lastError && tabs && tabs.length) {
          setCurTabUrl(tabs[0].url);
          chrome.runtime.sendMessage(
            {
              cmd: 'GET_INITIAL_STATE_AND_CONFIGS',
              args: {
                tabUrl: tabs[0].url
              }
            },
            response => {
              setPhotoShowState(preveState => ({
                ...preveState,
                ...{
                  isEnabled: response.isPhotoShowEnabled
                }
              }));
              setPhotoShowConfigs(prevConfigs => ({
                ...prevConfigs,
                ...response.photoShowConfigs
              }));
            }
          );
        }
      }
    );
  }, []);

  // Response to the storage change event.
  useEffect(() => {
    function onStorageChange(changes) {
      curTabUrl &&
        changes.disabledWebsites &&
        setPhotoShowState({
          isEnabled: !changes.disabledWebsites.newValue.includes(
            new URL(curTabUrl).hostname
          ),
          isInitial: false
        });
      changes.photoShowConfigs &&
        setPhotoShowConfigs(prevConfigs => ({
          ...prevConfigs,
          ...changes.photoShowConfigs.newValue
        }));
    }

    chrome.storage.onChanged.addListener(onStorageChange);

    return () => chrome.storage.onChanged.removeListener(onStorageChange);
  }, [curTabUrl]);

  return (
    <>
      <Header />
      <Toggle
        photoShowState={photoShowState}
        updatePhotoShowState={updatePhotoShowState}
      />
      <Config photoShowConfigs={photoShowConfigs} />
      <Hotkey />
      <Contact curTabUrl={curTabUrl} />
    </>
  );
}

ReactDOM.render(<Popup />, document.body);
