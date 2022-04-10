/**
 * Copyright (c) 2012-2022 Vincent W., MIT-licensed.
 * @fileOverview PhotoShow content script for main frame.
 * @author Vincent | vincentwang863@gmail.com
 * @version 4.12.0.0 | 2021-11-07 | Vincent   // Initial version.
 */

chrome.runtime.connect({
  name: `DEVTOOLS_PAGE_${chrome.devtools.inspectedWindow.tabId}`
});
