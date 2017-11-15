# virtual-ssr

> VMC using Vue.js

## If you are using Docker just follow below steps.

``` bash
# Build the image 
docker build -t rahul/virtual-vue .

# Run the image
docker run -p 49160:8082 -d rahul/virtual-vue

```
Now check http://localhost:49160/virtual


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
