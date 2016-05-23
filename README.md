## Mailord

A builder &  the way to deal with responsive email frustration. Its an abstraction layer for creating responsive email templates.

#### Installation
- Run `npm install`
- Install jspm globally `npm i -g jspm`
- Run `jspm install`
- Run `node server.js` or `nodemon server.js` (if you have it)
- Server listens on `localhost:8080`

#### TODO
Main functionality:
- Hot reloading feature.
- Integrate with jeykyll/premailer setup (for the latter, separate styles from the HTML).
- Node CLI tool that can be incorporated in the build process.
- Integrate Nodemailer along with its route for sending test emails.

Secondary functionality:

- Advanced rows edition: Change of text content on the fly.
- Advanced rows edition: MailChimp (hideable, repeatable, variants).
- Option to copy the code into the clipboard.

Additional functionality: 

- Improvements in templating engine that facilitate usage of functions (resizing/adjusting images upon editing).

