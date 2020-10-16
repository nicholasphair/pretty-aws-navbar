# pretty-aws-navbar
Prettify the AWS Console's Navigation Bar.  

![demo](/screenshots/demo.gif)

## description
pretty-aws-navbar changes the color of the AWS console's navigation bar based 
on the account name. It also updates the navbar to add the region code next to 
the region name.  

The script is designed to be added as a userscript. Of course, this means you will 
need a userscript manager. I prefer [greasemonkey][1], but cannot imagine the script
not being compatible with any other manager.

## screenshots
![screenshots-foo](/screenshots/foo-cornflowerblue.png)
![screenshots-bar](/screenshots/bar-firebrick.png)
![screenshots-baz](/screenshots/baz-olivedrab.png)

## usage
To use, you will need to edit the code to work for your AWS accounts. I tried to make
this as simple as possible. All you need to do is update the mapping of accounts to
color names. The relevant snippet is below.
```javascript
/* ------------------- */
/* YOUR ACCOUNTS HERE! */
/* ------------------- */
const accountColors = new Map([
  ['foo', 'CornflowerBlue'],
  ['bar', 'FireBrick'],
  ['baz', 'OliveDrab'],
]);
```
Any html color name or color code is valid.

### GovCloud
The GovCloud console has not received the same facelift as the general AWS console.
If you wish to style a GovCloud navbar, you can use [v1.0.0][2] of `pretty-aws-navbar`.

## disclaimer
I am not a javascript developer. In fact, this is the most js I think I have 
ever written. I certainly did not do anything nefarious but, do not take my 
word for it. I encourage you to inspect the code yourself - it is less than 100
lines of code. With that said, use at your own risk. 

[1]: https://www.greasespot.net/
[2]: https://github.com/nicholasphair/pretty-aws-navbar/tree/v1.0.0
