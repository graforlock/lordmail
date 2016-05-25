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
- Integrate Hogan.js templates in.
- Integrate with jeykyll/premailer setup (for the latter, separate styles from the HTML).
- Integrate with MailChimp API.
- Integrate Nodemailer along with its route for sending test emails.
 
Secondary functionality:

- Advanced Live styles editing
- Hot reloading w/ Litmus feature for Outlook & the rest.
- Advanced rows edition: Change of text content on the fly.
- Advanced rows edition: MailChimp (hideable, repeatable, variants).
- Option to copy the code into the clipboard.
- Node CLI tool that can be incorporated in the build process.

Additional functionality: 

- Improvements in templating engine that facilitate usage of functions (resizing/adjusting images upon editing).

Maybe:
- Implement as an Electron app.
