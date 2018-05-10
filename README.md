# reactssr

## Table of Contents

- [Skill Set](#skill-set)
- [Folder Structure](#folder-structure)
- [Available Script](#available-script)
    - [npm dev](#npm-dev)
    - [npm prod-test](#npm-prod-test)
    - [npm prod](#npm-prod)

## Skill Set
nodejs8.10, yarn0.24.5, apex0.15.0, webpack4.0, react16.2.0, typescript2.6.1, express4.16.2, aws-serverless-express3.1.3, postcss6.0.21,
react-router4.2.0, routing-controllers0.7.7

## Folder Structure
    reactssr
        ├── dev                         # chunk bundle in development
           ├── client
           └── server
        ├── functions                   # It is going to deploy in aws
           └── reactssr
               ├── client
               └── server
        ├── webpack
            ├── webpack.config.dev.client.js  # bundling dev client source
            ├── webpack.config.dev.server.js  # bundling dev server source
            ├── webpack.config.prod.client.js # bundling production client source
            └── webpack.config.prod.server.js # bundling production server source
        ├── config
        ├── zip.js                      # compress /function/reactssr/server folder
            └── s3upload.js             # upload /function/reactssr/client files in s3 folder
        ├── src
            ├── components              # consisted of react contents folders or files
                └── common              # consisted of common layout
                    ├── footer.tsx
                    ├── gnb.tsx
                    └── layout.tsx
                ├── home                # component
                ├── my                  # component
                ├── client.tsx          # React hydrate, React router in client side
                └── template.tsx        # html template
            ├── controller
                └── Router.tsx          # express router
            ├── middle
                └── middlewares.ts      # set action before and after express router
            ├── shared
                ├── app.tsx             # set react router
                └── index.async.tsx     # set component using dynamic import
            ├── static
                ├── css                 # less,css
                └── ts                  # common and polyfill.js
            ├── app.ts                  # set express environment
            ├── local_server.tsx        # excute development
            ├── server.tsx              # excute lambda
            └── local_server.tsx        # excute server in production
        ├── api-gateway-event.json      # set and test api-gateway variable in local
        ├── deploy.sh                   # compress client source and deploy lambda and s3
        ├── function.json               # set lambda environment
        ├── importCss.js                # insert css using webpack loader
        ├── package.json                # only install using yarn
        ├── project.json                # set apex environment
        ├── tsconfig.json               # set typescript environment
        └── typings.d.ts                # allow all component, js to use global variable


## Available Script
### `npm dev`
![Image](http://thumbnail.egloos.net/600x0/http://pds27.egloos.com/pds/201805/10/38/e0015438_5af409534cf10.png =250x250){: width="600px" height="400px"}
### `npm prod-test`
![Image](http://thumbnail.egloos.net/600x0/http://pds26.egloos.com/pds/201805/10/38/e0015438_5af4095f448c3.png){: width="600px" height="400px"}
### `npm prod`
![Image](http://thumbnail.egloos.net/600x0/http://pds27.egloos.com/pds/201805/10/38/e0015438_5af40964287a3.png){: width="600px" height="400px"}


