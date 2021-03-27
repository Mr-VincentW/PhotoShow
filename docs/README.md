![PhotoShow Poster](resources/Poster_EN.png)

#### :link: [中文版](README_zh-CN.md)

# PhotoShow

**PhotoShow** is a browser extension helping you view high-definition images by hovering mouse on image thumbnails, greatly improving your productivity.
<br />
<br />

## In this article

- [Install PhotoShow](#install-photoshow)
- [How to Use it](#how-to-use-it)
- [Websites That Are Supported](#websites-that-are-supported)
- [What is ongoing](#what-is-ongoing)
- [How to Contribute](#how-to-contribute)
- [Privacy Policy & Terms of Use & License](#privacy-policy--terms-of-use--license)
- [Contact](#contact)
  <br />
  <br />

## Install PhotoShow

You may search and install the certain version of **PhotoShow** for your browsers from their extensions (add-ons) web stores:

<p align="center">
  <a href="https://chrome.google.com/webstore/detail/photoshow/mgpdnhlllbpncjpgokgfogidhoegebod/" title="Google Chrome"><img src="resources/Browser_Chrome.png" alt="Google Chrome" /></a>&emsp;
  <a href="https://addons.mozilla.org/firefox/addon/photoshow/" title="Mozilla Firefox"><img src="resources/Browser_Firefox.png" alt="Mozilla Firefox" /></a>&emsp;
  <a href="https://microsoftedge.microsoft.com/addons/detail/afdelcfalkgcfelngdclbaijgeaklbjk" title="Microsoft Edge"><img src="resources/Browser_Edge.png" alt="Microsoft Edge" /></a>
</p>
<br />
<br />

## How to Use it

It's pretty easy - for websites that are supported by **PhotoShow** (Listed [here](#websites-that-are-supported)), hover your mouse on an image thumbnail, if **PhotoShow** can parse its URL, a viewer with a high-definition image will show alongside.

<p align="center"><img src="resources/SPEC_1.png" align="center" alt="PhotoShow - View HD images" /></p>
<br />

While viewing HD images with **PhotoShow**, you could also perform the following actions:

1.  **ROTATE IMAGES:** This is especially useful for viewing photos that are posted without their orientations correctly adjusted.

    (Please note that the figure below is only for demonstrating purpose, with no source thumbnails _without their orientation correctly adjusted_.)

<p align="center"><img src="resources/SPEC_2.png" align="center" alt="PhotoShow - Rotate images" /></p>
<br />

2.  **SWITCH VIEW MODE:** There are four view modes -

    - **Mini:** The viewer displays within 1/8 in area of the available space on one side of the source thumbnail.
    - **Light:** The viewer displays within 1/4 in area of the available space on one side of the source thumbnail.
    - **Auto:** The viewer automatically adapts its size to the available space on one side of the source thumbnail, as is the default view mode.
    - **Panoramic:** The viewer takes as large space as needed and the image displays in its original size.

    If you think that the image viewer covers too much content of the original page, the first two modes (**Mini** or **Light**) might soothe you.

    When the image is partially displayed in the image viewer (may happen in **Auto** or **Panoramic** mode), a mask indicating the visible area will be displayed over the source thumbnail. You may scroll the image in the viewer with your mouse or via hotkeys (specified in **PhotoShow**'s popup window) and the visible area over the thumbnail will move synchronously. This is designed for inspecting image detail or browsing long pictures (such as articles delivered by images). However, please keep in mind that the hotkeys' directions are consistent with the directions that the image scrolls in the viewer rather than the moving directions of the visible area indicator - yes, they can be different if image rotations are applied.

<p align="center"><img src="resources/SPEC_3.png" align="center" alt="PhotoShow - Switch view mode" /></p>
<br />

3.  **DOWNLOAD IMAGES:**
    For those who wanna pick up all the fantastic pictures in the world to their own galleries, just press hotkey `S` and your browser will start to download the HD image for the thumbnail under your mouse.

<p align="center"><img src="resources/SPEC_4_EN.png" align="center" alt="PhotoShow - Download images" /></p>
<br />

4.  **CONTEXT MENU:**
    Still feel dissatisfied with the small viewer overlay? Well, right-click on a thumbnail and **PhotoShow** offers a context menu item for opening the HD image in a new tab. You may start to download it or copy its address via context menu items here as well.

<p align="center"><img src="resources/SPEC_5_EN.png" align="center" alt="PhotoShow - Context menu" /></p>
<br />

**More Settings:**
More settings are provided in the popup window, click the **PhotoShow** icon in your browser's toolbar and here you can -

- **Turn on/off PhotoShow for particular websites**: Switch the toggle button and **PhotoShow** will be enabled/disabled for websites under current hostname.
- **Set activation mode**: Displaying an HD image every time you stop your mouse at a thumbnail on a page might be disturbing. With this configuration, you can choose to bind a "modifier key" for triggering the image viewer displaying - press it when you wanna see the HD images.
- **Toggle image size display**: If you care about the original size of the HD image, use this toggle to show or hide the image size information displaying in the bottom-right corner of the image viewer.
- **Toggle shadow display**: If you just can't stand the dark shade between the image viewer and its source thumbnail, "KAPOW"!
- **Check the shortcuts**: If you happen to forget the hotkeys or their actions, here's the right place to go.
- **Make everything better**: Feel free to give your feedback should you have any advice or brilliant ideas. It would, of course, be appreciated if you could share **PhotoShow** with your friends!

By the way, all these settings will be automatically synced with your other browser account data were it permitted, as is a browser behavior. (Please refer to [Privacy Policy & Terms of Use & License](#privacy-policy--terms-of-use--license).)

<p align="center"><img src="resources/SPEC_6_EN.png" align="center" alt="PhotoShow - Settings" /></p>
<br />
<br />

## Websites That Are Supported

**PhotoShow** is continuously increasing the amount of the websites it supports. This is also one of the most important reasons why finally it chooses to join the big open-source family after so many years it was deployed for the first time. (Please refer to see [How to Contribute](#how-to-contribute).)
It is also in the plan that **PhotoShow** is going to "support all the websites". (For more information, please refer to [What is ongoing](#what-is-ongoing).)

Hereby is a list of part of the websites (hostnames) that **PhotoShow** currently supports:

1.  **DESIGN / PHOTOGRAPH / GRAPHICS:**

    123rf, 500px, ArtStation, Behance, DeviantArt, Dribbble, Flickr, Pinterest, pixiv, POCO, WikiArt

2.  **SHOPPING / TRADING / SERVICES:**

    1-day, Alibaba, AliExpress, Alimama, Amazon, Andino, Apple, Best Buy, Briscoes, Countdown, DHgate, eBay, Etsy, Google Play, JD, Kmart, Myprotein, Newegg, noel leeming, NZSALE, PBTech, suning, Taobao, Target, TheMarket, thewarehouse, Tmall, Torpedo7, Trade Me, TreatMe, Walmart, warehouse stationery, wsy.com, Yelp

3.  **SEARCHING / KNOWLEDGE / EXPERTISE:**

    ACP Journals, Baidu, Baidu baike, Bing, Google, GitHub, JAMA Network, NEJM, Quora, Wiki

4.  **NEWS / SOCIAL NETWORKING:**

    115.com, adnmb2.com, Duitang, Facebook, gamer.com.tw, IMDb, Imgur, Instagram, Jandan, nga.cn, Qzone, Reddit, TapTap, toutiao.com, Tumblr, Twipu, Twitter, Sina weibo, wattpad, WeChat webpages

5.  **VIDEOS:**

    bilibili, ixigua.com, YOUKU, YouTube

If you can't find your favourite websites in the above list, it is always welcomed to [contact the author](#contact) to get more support.
<br />
<br />

## What is ongoing

**PhotoShow** keeps optimising its functionality while enlarging its websites support list. This is why you might have already noticed that it is updated frequently.
These days, a "big" plan is taking place as **PhotoShow** is going to be refactored for better developing experience for the contributors and introducing some new features as well. Here is a coarse **ONGOING LIST** from the project and functional perspectives where you may find something worth looking forward to.

- [ ] Refactor with `React` and `webpack` .
- [ ] Support all websites, displaying original images (if their intrinsic sizes are larger than they are displayed) for those not in the websites support list.
- [ ] Add an extension `OPTIONS` page for more complex settings.
- [ ] Add animation toggle configuration (allow users to turn off all the animation).
- [ ] Support customising hotkeys.
- [ ] Preload images (ideally, only for the thumbnails near the mouse cursor).
- [ ] Optimise image loading speed by automatically picking proper image sources according to their final displaying dimensions.
- [ ] Mind-blowing time - Intelligently generate HD image URL parsing rules for unknown websites? AI?

  This also explains why the `master` branch contains no code and the current version of the **PhotoShow** project is under the `archive` branch.
  <br />
  <br />

## How to Contribute

It is gratefully welcomed to help to make **PhotoShow** better! However, as it is in refactoring nowadays, updates for functionalities are not encouraged temporarily. You may still contribute parsing rules for new websites or maybe some great ideas.

Another task where help is badly needed is that the UI of **PhotoShow** needs to be translated into more languages (also including optimising existing language packages) so as to help more people in the world. The `i18n` files have already been well prepared with every item explained in detail. Are you willing to offer help?

Thank you all in advance!
<br />
<br />

## Privacy Policy & Terms of Use & License

Don't worry, it's pretty short and clear.

**PhotoShow** only works in the local browser environment, all the permissions it asks when being installed are only for image preview and download.

The extension itself and all its developers and contributors do **NOT** collect any of your personal data and are not responsible for any loss, personal information leak, disputes and/or any consequences caused by your illegal download, use of resources (including but not limited to images) of any websites. Installing and using **PhotoShow** is deemed as your acceptance of the above terms.

We reserve the right to change this Privacy Policy at any time without notifying you respectively. Any amended Privacy Policy will be posted on relevant websites. This Privacy Policy was last updated on January 24th, 2020 and replaces any other versions previously applicable from this date.

**PhotoShow** is delivered under the [MIT License](../LICENSE). The current version also includes [jQuery](https://jquery.com/) under the terms of [jQuery License](https://jquery.org/license/).
<br />
<br />

## Contact

:e-mail: [Vincent W.](mailto:vincentwang863@gmail.com?subject=PhotoShow%20User%20Feedback%20from%20GitHub)
