// ==UserScript==
// @name pretty-aws-navbar
// @description Prettify the AWS Console's Navigation Bar.
// @include https://console.aws.amazon.com/console/home?region=us-east-1#
// @include https://console.aws.amazon.com/*/home*
// @include https://*.console.aws.amazon.com/*/home*
// @include https://*.console.aws.amazon.com/GetResource/Console.html*
// @include https://console.amazonaws-us-gov.com/*/home*
// @include https://*.console.amazonaws-us-gov.com/*/home*
// @include https://*.console.amazonaws-us-gov.com/GetResource/Console.html*
// @exclude https://console.aws.amazon.com/s3/home*
// @version 1.1
//  ==/UserScript==


/* ------------------- */
/* YOUR ACCOUNTS HERE! */
/* ------------------- */
const accountColors = new Map([
  ['nphair', 'FireBrick'],
  ['bar', 'FireBrick'],
  ['baz', 'OliveDrab'],
]);


// TODO (nphair): Look these up in parameter store.
const regions = new Map([
  ['Bahrain', 'me-south-1'],
  ['Central', 'ca-central-1'],
  ['Frankfurt', 'eu-central-1'],
  ['Hong Kong', 'ap-east-1'],
  ['Ireland', 'eu-west-1'],
  ['London', 'eu-west-2'],
  ['Mumbai', 'ap-south-1'],
  ['N. California', 'us-west-1'],
  ['N. Virginia', 'us-east-1'],
  ['Ohio', 'us-east-2'],
  ['Oregon', 'us-west-2'],
  ['Osaka-Local', 'ap-northeast-3'],
  ['Paris', 'eu-west-3'],
  ['Seoul', 'ap-northeast-2'],
  ['Singapore', 'ap-southeast-1'],
  ['Stockholm', 'eu-north-1'],
  ['Sydney', 'ap-southeast-2'],
  ['São Paulo', 'sa-east-1'],
  ['Tokyo', 'ap-northeast-1'],
  ['US-Gov-East', 'us-gov-east-1'],
  ['US-Gov-West', 'us-gov-west-1'],
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
    document.querySelectorAll('[data-testid^="awsc"]').forEach(element => {
      console.log(element);
      element.style.background = color;
      element.style.backgroundColor = color;

      // TODO (nphair): Bring back gradient.
      //element.style.background = `linear-gradient(to bottom, ${color} 0px, #000 100%)`;
      //element.style.backgroundColor = `linear-gradient(to bottom, ${color} 0px, #000 100%)`;
    });

    // Dividers.
    // TODO (nphair): Dynamically calculate complementary color for dividers.
    let dividerColor = color
    document.querySelectorAll('[role="menu"] hr').forEach(element => {
      element.style.backgroundColor = dividerColor;
      element.style.border = dividerColor;

    });
     document.querySelectorAll('[role="menuitem"], [data-testid^="awsc"]').forEach(element => {
      element.style.borderColor = dividerColor;
    });
    document.querySelectorAll('#awsc-navigation__more-menu--list > [role="menuitem"] > div > div').forEach(element => {
      element.style.background = dividerColor;
    });
  } else {
    console.error('could not determine the account or the account styling.');
  }
}


function prettifyRegion() {
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

setTimeout(prettify, 2500);
