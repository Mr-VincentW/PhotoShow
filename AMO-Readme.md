# PhotoShow Package Building Process (for AMO code reveiw)

## Building Steps

1.  Install the latest version of **[Node.js](https://nodejs.org/)** and **npm** as well;
2.  In your terminal, run `npm install` under **PhotoShowSourceForReview** directory to initialize the building environment;
3.  In your terminal, run `npm run build-firefox`;
4.  Find the **PhotoShow.zip** file under **dist/firefox** directory.

## System requirements

None - as long as you can run **Node.js** and **npm**.

## Tools requirements

**Node.js**: Use **13+** version reqired by `Date.prototype.toLocaleString()` method which is used to update PhotoShow **updateDate** automatically.
