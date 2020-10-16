// ==UserScript==
// @name pretty-aws-navbar
// @description Prettify the AWS Console's Navigation Bar.
// @include https://console.aws.amazon.com/console/home?region=us-east-1#
// @include https://console.aws.amazon.com/*/home*
// @include https://*.console.aws.amazon.com/*/home*
// @include https://*.console.aws.amazon.com/GetResource/Console.html*
// @exclude https://console.aws.amazon.com/s3/home*
// @version 2.0
//  ==/UserScript==
//

/* ------------------- */
/* YOUR ACCOUNTS HERE! */
/* ------------------- */
const accountColors = new Map([
  ['foo', 'CornflowerBlue'],
  ['bar', 'FireBrick'],
  ['baz', 'OliveDrab'],
]);


function prettify() {
  prettifyNavBar();
  prettifyRegion();
}


function prettifyNavBar() {
  let accountElement = document.querySelector('[data-testid="awsc-nav-account-menu-button"]');
  let account = accountElement.innerText.split('@')[1].trim();
  if(!isEmpty(account) && accountColors.has(account)) {
    let color = accountColors.get(account);
    let styleSheet = document.createElement('style');
    styleSheet.setAttribute('type', 'text/css');
    styleSheet.textContent = buildNavBar(color);
    document.head.appendChild(styleSheet);
  } else {
    console.error('could not determine the account or the account styling.');
  }
}


function buildNavBar(color) {
  let headerFooterSelectors = `
    #console-nav-footer-inner,
    [data-testid="awsc-nav-header-viewport-shelf-inner"] {
      background : linear-gradient(to bottom, ${color} 0px, #000 100%);
    }`;

  let dropDownSelectors = `
    [data-testid="awsc-nav-service-menu"],
    [data-testid="awsc-footer-language-selector-content"],
    [data-testid="awsc-nav-regions-menu-content"],
    [data-testid="awsc-nav-account-menu-content"],
    [data-testid="awsc-nav-support-menu-content"],
    [data-testid="awsc-phd__bell-icon"] ~ div,
    #awsc-navigation__more-menu--list > [role="menuitem"] > div > div,
    #search-widget-dropdown {
        background: linear-gradient(to top, ${color} 0px, #000 100%);
    }`;

  let search = `
    #search-widget-input {
      background : none !important;
    }

    #search-widget-input:focus {
      border : 2px solid white !important;
      box-shadow: 0 0 0 1px ${color} inset !important;
    }

    [id^="search-widget-result-"]:hover {
        background: none; !important;
        border : 2px solid white !important;
    }

    [id^="search-widget-result-"] > span > mark {
        color: white !important;
    }

   `;

  let favorites = `
    [data-testid^="favorites-list-item"] {
        border: 2px solid transparent;
    }

    [data-testid^="favorites-list-item"]:hover {
        background: none;
        border: 2px solid white;
    }`;

  return `${headerFooterSelectors} ${dropDownSelectors} ${search} ${favorites}`;
}


function extractRegionName(str) {
  var regionNameRegex = /.*\((.*)\).*/g;
  var match = regionNameRegex.exec(str);
  return match[1];
}


function extractRegionCode(str) {
  var regionCodeRegex = /.*\)(.*)/g;
  var match = regionCodeRegex.exec(str);
  return match[1];
}


function prettifyRegion() {
  // Scrape the page for the region map rather than hardcode it.
  let regions = new Map();
  document.querySelectorAll('#menu--regions > [role="menuitem"]').forEach(x => {
    regions.set(extractRegionName(x.textContent), extractRegionCode(x.textContent));
  });

  let regionElement = document.querySelector('[data-testid="awsc-nav-regions-menu-button"]');
  let region = regionElement.innerText;
  if(!isEmpty(region) && regions.has(region)) {
    regionElement.innerText = `${region}: ${regions.get(region)}`;
  } else {
    console.error('could not determine the region code or the region name.');
  }
}


function isEmpty(str) {
  return (!str || 0 === str.length);
}

setTimeout(prettify, 1000);
