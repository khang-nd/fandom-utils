# <img src="public/images/icon.svg" width="40">Fandom Utils

A browser extension aiming to bring together all your favorite tools and utilities, Fandom Utils provides a simplified and easy-to-use interface to fully control your tools and enhance your browsing experience across all Fandom wikis.

| Table of Contents
|---

* [Installation](#installation)
* [Features](#features)
* [Report Issues](#report-issues)
* [FAQs](#faqs)
* [Contributing](#contributing)
  * [Development](#development)
  * [Translations](#translations)

---

## Installation

* ![chrome](https://static.wikia.nocookie.net/logopedia/images/c/ca/Google_Chrome_for_Android_Icon_2016.svg/revision/latest/scale-to-width-down/16) [Chrome Extension](https://chrome.google.com/webstore/detail/eogklihnaofhampffhohopaffelgjfbp)
* ![firefox](https://static.wikia.nocookie.net/logopedia/images/0/0d/Firefox_logo_2019.svg/revision/latest/scale-to-width-down/16) [Firefox Addon](https://addons.mozilla.org/en-US/firefox/addon/fandom-utils/)

## Features

* **One-click activation** - turn on your favorite utilities in a single click.
* **Simple configuration** - easily configure your utility's settings through an elegant interface.
* **Consistent experience** - your utilities are available in all the wikis you visit.
* **Synchronized** - settings are synchronized across devices as long as you are logged in.

## Report Issues

Fandom Utils is a collection of tools and utilities developed by various Fandom volunteering developers, hence, some issues might not reside in this extension exclusively but from respective tools.

In any case, please feel free to report any issues either via the [Fandom Developers Wiki](https://dev.fandom.com/wiki/Talk:FandomUtils) or create an issue ticket [here on Github](https://github.com/khang-nd/fandom-utils/issues).

## FAQs

> How does this work?

* Just install the extension/addon in your browser and activate the utilities you would like to use, and that's it!

> What utilities are available?

* You can see a list of available utilities in [this file](src/list.js).

> Can I suggest a utility to be added?

* Yes, of course. Chances are higher for the suggested utility to be added if it is commonly used. See [Report Issues](#report-issues) for options where you can lay suggestions.

## Contributing

### Development

Fandom Utils is open-source, all contributions are welcome. Follow the below steps to set up development environment:

1. Install a [source code editor](https://en.wikipedia.org/wiki/Source-code_editor) of your choice.
2. Install [NodeJS](https://nodejs.org/en/) (npm will also be available).
3. Open the editor and CLI (command-line interface).
4. Clone this repository by typing in the CLI:
`git clone https://github.com/khang-nd/fandom-utils.git`
5. Install dependencies by typing in the CLI: `npm install`
6. Start development mode by typing in the CLI: `npm run dev`
7. To install the extension on Chrome/Firefox for debugging:
   1. In Chrome: open `chrome://extensions` → toggle on Developer mode → Load unpacked → Select the `public` folder.
   2. In Firefox: compress the `public` folder into a zip → open `about:debugging#/runtime/this-firefox` → Load temporary Add-on → Select the zip file.

### Translations

Feel free to translate the extension into your own languages. Simply edit [this file](src/dev-utils/i18n.json) following the format there.
