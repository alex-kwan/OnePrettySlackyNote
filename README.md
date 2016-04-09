## Header

A Node.js app using [Express 4] (http://expressjs.com/) to create easy to read OneNote page links into slack channels

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

/onenoteurl &lt;url&gt;
https://onedrive.live.com/edit.aspx?cid=&lt;CID&gt;&amp;id=&lt;DIRECTORY&gt;&amp;resid=&lt;FILEID&gt;&amp;app=OneNote&amp;&amp;wd=&lt;SECTION&gt;|&lt;SECTIONID&gt;/&lt;PAGENAME&gt;|&lt;PAGEID&gt;

I want to turn something that looks like that crazy url into

&lt;PAGENAME&gt; (WebView)

 to mimic the experience when you paste a OneNote online page into Skype or Outlook

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

Since this works as a Slack command in slack, in order to integrate with slack it must be deployed to a public
instance. However there are probably some components to this microservice which benefit from being deployed locally.


```sh
$ git clone git@github.com:heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start

## my thoughts

I then just put my own code into this sample project
I am hoping to use this as a rough project for someone else to build off of and as a learning experience
for contributing towards the open source community. Everyone has to start somewhere! 
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
- Official slash-command documentation
(https://api.slack.com/slash-commands)
- https://onedrive.live.com/ (this code also works for SharePoint online)
(Where we get the links to minify them)
