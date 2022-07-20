# 热更新学习及简单实现

## 构建简单项目
1. 简单建立项目，安装webpack/webpack-dev-server/webpack-cli，并简单配置
```json
// package.json
  "scripts": {
    "dev": "webpack serve --open",
    "build": "webpack"
  },
```

```js
// webpack.config.js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // 开发模式不压缩代码，方便调试
  entry: './src/index.js', // 入口文件
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js'
  },
  devServer: {
    hot: true // 开启热更新
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
}
```

2. src/index.html src/index.js src/content.js
```js
// index.js
const root = document.getElementById('app')
function render () {
  root.innerHTML = require('./content.js')
}
render()

// 加上这段代码 可以看到页面是无刷新更新 达到了热更新的效果
if (module.hot) {
  module.hot.accept(['./content.js'], () => {
    render()
  })
}


```

```js
// content.js
const content = 'Hello World'

export default content
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Webpack Hot Module Replacement</title>
</head>
<body>
  <div id="app"></div>
</body>
</html>
```
3. 完事后执行```npm run dev```即可看到打开的html页面。手动更改```content.js```中的代码也能看到页面在无刷新的情况下进行了热更新。我们现在已经使用webpack-dev-server达到了热更新的效果。接下来我们就要自己逐步实现了。
