### 从零构建 React 开发环境(一) —— hello world，麻雀虽小五脏俱全~

> 此系列重点在于如何构建一个 React 全家桶环境，完成一个 `todoList` 的小 demo，可以当做一个 React 的入门练习，往后会讲到 Redux、React Redux、React Router 的使用和配置，以及 webpack 的一些优化的方法和技巧。
> 
> 文末tip：--save 与 --save-dev 区别


### 目标

命令行键入 `npm start`，访问 `localhost:8080` 可以访问到一个 `hello world` 的页面。

![QQ20181030-225428@2x](https://github.com/zwkkkk1/react-cli/blob/chapter-1/doc/assets/image/chapter-1/QQ20181030-225428%402x.png)


可能这个看着很简单，不过当时我在自己配置的时候也是废了一些功夫，如果觉得简单可以跳过这一节(文末总结处有此节代码)

### 步骤

#### 1. init 项目

- 新建文件夹并进入

```shell
mkdir react-cli
cd react-cli
```

- npm init 根据步骤填写配置信息(具体的配置项不说啦，可以一路回车下来，只是要它生成一个 `package.json` 文件)

``` shell
npm init
```

#### 2.修改文件目录

在 `react-cli` 文件夹下，新建一个 `src` 文件夹，`src` 文件夹里建一个 `app.js`

```
    .
    +-- src     程序目录
    |  +-- app.js   入口文件
```

#### 3. 安装 webpack

工欲善其事必先利其器，前端开发选择一款适合的前端构造工具是非常必要的，这里我们使用 Facebook 开源的 `webpack` 来搭建一个完全不依赖服务器的开发环境。

> 常见的前端构造工具([传送门](https://juejin.im/entry/5ae5c8c9f265da0b9f400d8e))

回到项目目录 `react-cli` 文件夹下

```shell
npm install webpack -D
```

新建 `webpack.config.js` 文件，根据 [webpack 文档](https://www.webpackjs.com/concepts/)编写配置文件，下面附一个最基本的，之后会不断往里面填配置的

```js
var path = require('path')

module.exports = {
  // 入口 入口文件是 ./app/index.js
  entry: path.join(__dirname, './app/index.js'),
  // 出口 文件会输出到 dist 文件夹，输出的文件名叫 bundle.js
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
}
```

> [path](http://nodejs.cn/api/path.html) 是 node.js 的内置模块，不建议直接写路径，而是利用 `path.join()` 进行目录拼接（[看一看 Node.js 的文件路径](https://blog.csdn.net/zwkkkk1/article/details/82386363)）

`entry`、`output` 及之后会提到的概念这里不涉及讲解，自行去 [webpack 官方手册](https://www.webpackjs.com/concepts/)学习。

在命令行运行：
```shell
webpack --config webpack.config.js
```

我们会发现在项目目录下会自动生成 `bundle` 文件夹和 `bundle.js` 文件

> 运行 `webpack` 需全局安装 webpack，如报错运行 `npm install webpack webpack-cli -g`

此时，在 `client/dist` 文件夹下新建一个 `index.html`

`index.html` 的内容如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
    <div id="root"></div>
<script src="bundle.js"></script>
</body>
</html>
```

并且在 `src/app.js` 中填写：

```js
document.getElementById('root').innerHTML = 'hello world'
```

然后访问 index.html 可以看到 hello world

![QQ20181031-155238](https://github.com/zwkkkk1/react-cli/blob/chapter-1/doc/assets/image/chapter-1/QQ20181031-155238.png)

请注意 URL，我们并不是用 `localhost:8080` 访问的页面，而且还没有使用 React

#### 4. 引入 React

接下来我们引入 React

```shell
npm install react react-dom --save
```

再在 `src/app.js` 加入 react 代码

```js
import React from 'react'
import ReactDom from 'react-dom'

ReactDom.render(<div>hello world</div>, 
  document.getElementById('root'))
```

重新进行 webpack

```shell
webpack --config webpack.config.js
```

这里会报错：

![QQ20181031-160843](https://github.com/zwkkkk1/react-cli/blob/chapter-1/doc/assets/image/chapter-1/QQ20181031-160843.png)

因为 `<div>hello world</div>` 的 jsx 语法，我们的浏览器可不认识这个，我们需要引入 babel 去编译我们的 React 代码

#### 引入 babel

babel 把用最新标准编写的 JavaScript 代码向下编译为可以随处可用的版本

```
npm install babel-loader@7 babel-core@6 babel-preset-react babel-preset-env babel-preset-stage-0 -D
```

> 如果报版本之类的问题，请根据提示下载指定版本的 `babel-core` 或 `babel-loader`
> `babel-loader@8` 对应的是 `babel-core@7`
> `babel-loader@7` 对应的是 `babel-core@6` (我使用的是 `babel-loader@7`)

我们先来看看我们下载的一连串 babel 的作用吧

- [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core) Babel 的核心代码
- [babel-loader](https://github.com/babel/babel-loader) 解析 js 的 loader
- [babel-preset-react](https://github.com/babel/babel/tree/master/packages/babel-preset-react) 用于解析 jsx 语法
- [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env) 取代之前的 `babel-preset-es2015` `babel-preset-es2016` 等包，解析 ES6 等语法
- [babel-preset-stage-0](https://github.com/babel/babel/tree/master/packages/babel-preset-stage-0) 用于解析 ES7 提案

项目目录下新建 `.babelrc` 文件输入：

```json
{
  "presets": [
    "env",
    "react",
    "stage-0"
  ]
}
```

`webpack.config.js` 加入配置：

```js
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader?cacheDirectory=true'],
      }
    ]
 }
```

> [手册传送门](https://www.webpackjs.com/loaders/)

下面是两个性能优化的点

##### 1. cacheDirectory

`cacheDirectory` 默认为 `false`，当进行设置时，指定的目录将用来缓存 loader 的执行结果。之后的 webpack 构建，将会尝试读取缓存，来避免每次执行时，可能产生的、高性能消耗的 Babel 重新编译过程。

像我们上面设置的 `babel-loader?cacheDirectory=true` 或是设置为空值 `babel-loader?cacheDirectory`，默认缓存目录在 `node_modules/.cache/babel-loader`

##### 2.exclude

我们设置的 `exclude: /node_modules/`，表示 `babel-loader` 不会检查 `node_module` 文件夹。

因为 `node_module` 下的第三方库都是提前编译打包好的，我们需要避免重复去编译它们。

引入上面的 babel 后，重新编译，再次访问 `index.html`，同样可以看到 hello world，下一节我们来看看如何用 `localhost:8080` 访问页面

#### 5. 引入 webpack-dev-server

简单来说，`webpack-dev-server`是一个小型的 Node.js 服务器，可以为 webpack 打包生成的资源文件提供 Web 服务（**只用于开发环境**）

下载 webpack-dev-server

```js
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
}
```


`port`、`contentBase`的概念很容易理解，看一下手册就可以了，我们来讲一讲 `historyApiFallback`。

简单说，`historyApiFallback` 任意的 `404` 响应都会被替代为 `index.html`，没有设置的话在使用 React Router 的时候可能会遇到[问题](https://blog.csdn.net/zwkkkk1/article/details/83411071)。

然后运行 `webpack-dev-server --config webpack.config.js`

这里可能会报错：

```shell
The CLI moved into a separate package: webpack-cli
Please install 'webpack-cli' in addition to webpack itself to use the CLI
-> When using npm: npm i -D webpack-cli
-> When using yarn: yarn add -D webpack-cli
internal/modules/cjs/loader.js:583
    throw err;
    ^

Error: Cannot find module 'webpack-cli/bin/config-yargs'
```

根据提示下载 `webpack-cli`，`npm install webpack-cli -D`

然后访问 `localhost:8080` 就能看到 hello world 了。

大功告成，不过我们的目标中可是要 `npm start`，下一节我们看看怎么设置 `npm start`

#### 6. 修改 Npm Scripts

在[常见前端构建工具](https://juejin.im/entry/5ae5c8c9f265da0b9f400d8e)中，我们已经看到 `npm scripts` 了，我们可以在 `package.json` 文件里使用 scripts 字段定义任务，来方便我们键入的操作

```
{
    "scripts": {
        "start: "webpack-dev-server --config webpack.config.js"
    }
}
```

设置好后我们就可以 `npm start` 了~

### 总结

程序虽然很简单，不过对于初学者来说独自来撸还是会碰到问题的，麻雀虽小五脏俱全。

[代码](https://github.com/zwkkkk1/react-cli/tree/chapter-1)


### tip1: --save 与 --save-dev 区别

我们在前面下载软件时常会用 `npm install --save`，时常会用 `npm install -D`，下面我说说两者区别(`npm install -D` 是 `npm install --save-dev` 的简写)

- `--save-dev` 指将包信息添加到 `package.json` 的 `devDependencies` 属性下，**表示开发时依赖的包**
 - 像各种 loader、前面只用于开发环境的 webpack-dev-server、webpack、webpack-cli 还有测试相关 npm 包都是放在 `devDependencies` 下
- `--save` 指将报信息添加到 `package.json` 的 `dependencies` 属性下，**表示发布时依赖的包**。
 - 像 React、Vue、Angular、jQuery 等，代码编译打包后仍需要依赖的库（框架）放在 `dependencies` 下
 
 
另外，如不特别指定即 `npm install`，包信息会默认添加到 `dependencies` 下



