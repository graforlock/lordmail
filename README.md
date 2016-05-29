## Mailord

A builder &  the way to deal with responsive email frustration. Its an abstraction layer for creating responsive email templates.

#### Installation
- Run `npm install`
- Install jspm globally `npm i -g jspm`
- Run `jspm install`
- Run as a native app: `npm run electron`, or a browser app: with `node server.js` or `nodemon server.js` (if you have it)
- Server listens on `localhost:8080`

#### TODO
Main functionality:
- ~~Integrate with jeykyll/premailer setup (for the latter, separate styles from the HTML)~~.
- ~~Empower templating language with for loop (DRY), or seek for a templating language~~.
- Advanced rows edition: Change of text content on the fly, change of the width.
- MailChimp mc attributes in a logical way (hideable, repeatable, variants).
- Atomise the column creation so user can choose different variants for each column.
- Integrate with MailChimp API.

 
Secondary functionality:

- ~~Advanced Live styles editing~~
- Option to save/include edited styles
- Hot reloading w/ Litmus API feature for Outlook & the rest.
- Advanced rows edition: Change of text content on the fly.
- Advanced rows edition: MailChimp (hideable, repeatable, variants).
- Option to copy the code into the clipboard.

Additional functionality: 

- Improvements in templating engine that facilitate usage of functions (resizing/adjusting images upon editing).

Maybe:
- ~~Implement as an Electron app~~.
