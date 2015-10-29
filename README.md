# Teamcity / Github integration

Automatically sets up a Teamcity project for node_module packages.

## Installation
```
	npm install && npm start
```

## Setup
1. Set up a Webhook on the informaat-ipe organisation on Github, posting 'new repo' event messages to this endpoint: `[url of server]/new-module`
1. When a new repo event is received, the `handler` will pass the message to `decoder`
1. The `decoder` will parse the webhook message and create an `options` object which it will pass

## Testing
To manually test this webhook receiver, you can expose a local port to the internet, and then update the Github webhook configuration to post this port.

1. Start the tunnel: `npm run tunnel` -- note the public URL
1. Start the server: `npm start`
1. Configure the webhook: `https://github.com/organizations/informaat-ipe/settings/hooks/6180300` - put in the public URL of the tunnel

## Project structure
```
index.js			// parse the environment and configuration, default entry point
sources/			// source code
	server.js		// http server providing webhook endpoint
	handler.js		// Github webhook message handler
	sender.js		// post messages to the Teamcity API
	builder.js		// create messages for the Teamcity API
	message.js		// populate Teamcity XML templates
	templates/		// Teamcity xml templates	
test/				// tests
README.md			// this file
package.json		// package manifest and default CI API
utilities/
	ngrok			// expose a port on a private machine on the internet -- for testing the webhook
```
