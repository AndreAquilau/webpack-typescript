## Integração do Webpack com Typescript

#### Starting Typescript
```bash
yarn install -D typescript @types/node dotenv @types/dotenv
```
```bash
yarn tsc --init
```
> tsconfig.json
```js
{
  "compilerOptions": {
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "lib": ["ES6"],                             /* Specify library files to be included in the compilation. */
    "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    "jsx": "react",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    "outDir": "./dist",                        /* Redirect output structure to the directory. */
    "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    "removeComments": true,                /* Do not emit comments to output. */
    "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    "paths": {
      "@config/*":[
        "./src/config/*"
      ],
      "@services/*": [
        "./src/services"
      ]
    },                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    // "typeRoots": [],                       /* List of folders to include type definitions from. */
    // "types": [],                           /* Type declaration files to be included in compilation. */
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                  /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    /* Experimental Options */
    "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
    "resolveJsonModule": true,
    /* Advanced Options */
    "skipLibCheck": true,                     /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true  /* Disallow inconsistently-cased references to the same file. */
  }
}
```

#### Starting Webpack
```bash
yarn add -D webpack webpack-cli@3.3.12  @webpack-cli/serve ts-loader
```
> webpack-cli@3.3.12 versão
> webpack.config.js
```js
require('dotenv').config()

const path = require('path');

module.exports = {
  mode: 'development', //development || production
  entry: './src/index.ts',
  resolve: { // Definir qual extensions serão resolvidas no sistema de modules.
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {// Definemos os loader que irá gerar carregar os arquivos e gerar o build
    rules: [
      {
        test: /\.tsx$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map' // build.min.js.map
};
```
> Script build webpack package.json
```js
"scripts": {
  "build": "webpack"
}
```
#### Webpack-Dev-Server
```bash
yarn add -D webpack-dev-server
```
```js
const path = require('path');

module.exports = {
  mode: 'development', //development || production
  entry: './src/index.ts',
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    contentBasePublicPath: '/my-app',
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
  },
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'dist'),
  } ,
};
```
> Script dev package.json
```js
{
  "scripts": {
    "dev": "webpack-dev-server"
  }
}
```


#### Install Copy-Webpack-Plugin
```bash
yarn add -D copy-webpack-plugin @types/copy-webpack-plugin
```
> webpack.config.js
```js
require('dotenv').config()

const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', //development || production
  entry: './src/index.ts',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
   new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
        },
      ],
    }),
  ],
};
```


#### Install Html-Webpack-Plugin
```bash
yarn add -D html-webpack-plugin @types/html-webpack-plugin
```
> webpack.config.js
```js
require('dotenv').config()

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', //development || production
  entry: './src/index.ts',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'public', 'index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.resolve(__dirname, 'public', 'login.html'),
    }),
  ],
};

```

#### Instalando Bootstrap, JQuery e popper.js
```bash
yarn add bootstrap jquery popper.js
yarn add -D @types/bootstrap @types/jquery @types/popper.js
```
> styles.scss
```scss
@import '~bootstrap/scss/bootstrap';
```
> index.ts
```ts
import 'bootstrap';
import './sass/style.scss';
```
#### Server Production
```bash
yarn add serve
```
```js
{
  "scripts": {
    "start": "serve ./dist/index.html"
  }
}
```

#### Integração do Sass e Css com Webpack
```bash
yarn add node-sass sass-loader style-loader css-loader mini-css-extract-plugin
```
> webpack.config.js
```js
require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.MODE,
  entry: './src/index.ts',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'dist'),
  } ,
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  devtool: 'source-map'
};

```

#### Integração Babel com Webpack
```bash
yarn add -D @babel/core @babel/cli babel-loader @babel/preset-env @babel/node @babel/preset-typescript babel-plugin-module-resolver @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators
```
> webpack.config.js
```js
require('dotenv').config();

const path = require('path');

module.exports = {
  mode: process.env.MODE,
  entry: './src/index.ts',
  output: {
    filename: 'app.min.js',
    path: path.resolve(__dirname, 'dist'),
  } ,
  module: {
    rules: [
      {
        test: /\.js$ | \.ts$ | \.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current',
                  },
                },
              ],
              '@babel/preset-typescript',
            ],
            plugins: [
              [
                'module-resolver',
                {
                  alias: {
                    '@config': './src/config',
                    '@services': './src/services',
                  },
                },
              ],
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
            ],
            ignore: ['**/*.spec.ts'],
          }
        },
      }
    ],
  },
  devtool: 'source-map'
};

```
#### References
- [Site Typescript-Webpack](https://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#webpack)
- [Site Webpack](https://webpack.js.org/guides/typescript/)
- [copy-webpack-plugin](https://webpack.js.org/plugins/copy-webpack-plugin/)
- [devServer](https://webpack.js.org/configuration/dev-server/)
- [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
