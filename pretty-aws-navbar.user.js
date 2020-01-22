// ==UserScript==
// @name pretty-aws-navbar
// @description Prettify the AWS Console's Navigation Bar.
// @include https://console.aws.amazon.com/*/home*
// @include https://*.console.aws.amazon.com/*/home*
// @include https://*.console.aws.amazon.com/GetResource/Console.html*
// @version 1 
//  ==/UserScript==


/* ------------------- */
/* YOUR ACCOUNTS HERE! */
/* ------------------- */
const accountNavBars = new Map([
  ['foo', buildNavBar('CornflowerBlue')],
  ['bar', buildNavBar('FireBrick')],
  ['baz', buildNavBar('OliveDrab')],
]);

const regions = new Map([
  ['Ohio', 'us-east-2'],
  ['N. Virginia', 'us-east-1'],
  ['N. California', 'us-west-1'],
  ['Oregon', 'us-west-2'],
  ['Hong Kong', 'ap-east-1'],
  ['Mumbai', 'ap-south-1'],
  ['Osaka-Local', 'ap-northeast-3'],
  ['Seoul', 'ap-northeast-2'],
  ['Singapore', 'ap-southeast-1'],
  ['Sydney', 'ap-southeast-2'],
  ['Tokyo', 'ap-northeast-1'],
  ['Central', 'ca-central-1'],
  ['Frankfurt', 'eu-central-1'],
  ['Ireland', 'eu-west-1'],
  ['London', 'eu-west-2'],
  ['Paris', 'eu-west-3'],
  ['Stockholm', 'eu-north-1'],
  ['Bahrain', 'me-south-1'],
  ['São Paulo', 'sa-east-1'],
]);

function prettify() {
  prettifyNavBar();
  prettifyRegion();
}

function prettifyNavBar() {
  let accountElement = document.querySelector('#nav-usernameMenu > div.nav-elt-label');
  let account = accountElement.innerHTML.split('@')[1].trim();
  if(!isEmpty(account) && accountNavBars.has(account)) {
    let styleSheet = document.createElement('style');
    styleSheet.setAttribute('type', 'text/css');
    styleSheet.textContent = accountNavBars.get(account);
    document.head.appendChild(styleSheet);
  } else {
    console.log('could not determine the account or the account styling.');
  }
}

function buildNavBar(color) {
  let NavBarClasses = 'body #awsgnav #nav-menubar, body #awsgnav #nav-menubar .nav-menu, #nav-menu-right';
  let NavBarFormat = `{ background: linear-gradient(to bottom, ${color} 0px, #000 100%)}`;
  return `${NavBarClasses} ${NavBarFormat}`;
}

function prettifyRegion() {
  let regionElement = document.querySelector('#nav-regionMenu > div.nav-elt-label');
  let region = regionElement.innerHTML;
  if(!isEmpty(region) && regions.has(region)) {
    regionElement.innerHTML = `${region}: ${regions.get(region)}`;
  } else {
    console.log('could not determine the region code or the region name.');
  }
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}

setTimeout(prettify, 300);
