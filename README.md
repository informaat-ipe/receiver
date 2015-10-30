# Teamcity / Github integration

Automatically sets up a Teamcity project for node_module packages.

## Installation
```
    npm install && npm start
```

If you want to run a docker image, do this: `npm run build && npm run docker`.

## Setup
1. Set up a Webhook on the informaat-ipe organisation on Github, posting 'new repo' event messages to this endpoint: `[url of server]/new-module`
1. When a new repo event is received, the `handler` will pass the message to `decoder`
1. The `decoder` will parse the webhook message and create an `options` object which it will pass

## Configuration
Configuration is passed in through the following environment variables:

| env var       | description | default |
| --------------| ------------| --------|
| `OPS_PORT`      | the port the service should bind to | `8000` |
| `OPS_BASEURL`   | the base url of the teamcity api | `http://localhost:8111/app/rest` |
| `OPS_USER`      | the user credential for teamcity | `admin` |
| `OPS_PASS`      | the password for the teamcity user | `admin` |


## Service configuration

### Teamcity
On the Teamcity side of things, the following structure is expected:
```
<ROOT PROJECT>          // build-in
    <node_modules>      // parent project for all auto-registered projects
        <node_module>   // build-configuration template
```

### Github
On Github, [configure a webhook][webhook] for the **informaat-ipe** organisation to send a payload whenever a new repository is created.

## Application flow

The flow of the app is as follows:

- When the `receiver` receives a webhook payload from github
- It parses the payload into a `dictionary` and uses this to populate XML payloads to send to Teamcity
- If first registers a new project (POST `project.xml` to `[api]/projects` )
- Then it registers a new VCS root with the project (POST `vcs.xml` to `[api]/vcs-roots`)
- Then it registers a new Build configuration with the project, based on the `<node_modules>/<node_module>` Build template
- If all is fine, it returns a 200, otherwise a 500

## Testing
To manually test this webhook receiver, you can expose a local port to the internet, and then update the Github webhook configuration to post this port.

1. Start the tunnel: `npm run tunnel` -- note the public URL
1. Start the server: `npm start`
1. Configure the [webhook][webhook] - put in the public URL of the tunnel from step 1.

## Project structure

```
index.js            // parse the environment and configuration, default entry point
sources/            // source code
    server.js       // http server providing webhook endpoint
    handler.js      // Github webhook message handler
    sender.js       // post messages to the Teamcity API
    builder.js      // create messages for the Teamcity API
    message.js      // populate Teamcity XML templates
    templates/      // Teamcity xml templates
test/               // tests
README.md           // this file
package.json        // package manifest and default CI API
utilities/
    ngrok           // expose a port on a private machine on the internet -- for testing the webhook
```

## Alternative
Alternatively to this system, there is a 'Teamcity Service' that can be enabled on a Github repository. An example can be seen here on the ['receiver'][receiver] repository. Note that this service is Github specific.

[webhook]: https://github.com/organizations/informaat-ipe/settings/hooks/6180300
[receiver]: https://github.com/informaat-ipe/receiver/settings/hooks
