# JavaScript Module Systems and Build Tools

## CommonJS (Node.js)

### Exporting

```javascript
// Export individual items
module.exports.add = (a, b) => a + b;
module.exports.multiply = (a, b) => a * b;

// Or export object
module.exports = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};

// Or export single function
module.exports = function multiply(a, b) {
  return a * b;
};
```

### Importing

```javascript
// Import all
const math = require('./math.js');
math.add(2, 3);

// Import specific (if exported as object)
const { add, multiply } = require('./math.js');
add(2, 3);

// Import and assign alias
const m = require('./math.js');

// Module path resolution
require('./relative/path')
require('../parent/path')
require('/absolute/path')
require('npm-package')  // From node_modules
```

---

## ES Modules

### Exporting

```javascript
// Named exports
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// Or grouped
export { add, multiply };

// Default export (one per file)
export default function divide(a, b) {
  return a / b;
}

// Both named and default
export const subtract = (a, b) => a - b;
export default function add(a, b) {
  return a + b;
}
```

### Importing

```javascript
// Default import
import add from './math.js';
add(2, 3);

// Named imports
import { add, multiply } from './math.js';

// Rename imports
import { add as sum, multiply as product } from './math.js';

// Import all with namespace
import * as math from './math.js';
math.add(2, 3);
math.multiply(2, 3);

// Mix default and named
import add, { multiply, divide } from './math.js';

// Import side effects only
import './setup.js';  // Runs but doesn't import anything
```

---

## Webpack

### Basic Setup

```bash
npm install --save-dev webpack webpack-cli
```

**webpack.config.js:**
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true  // Clean dist on build
  },
  
  devtool: 'source-map',  // For debugging
  
  devServer: {
    port: 3000,
    hot: true
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource'
      }
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```

**package.json:**
```json
{
  "scripts": {
    "dev": "webpack serve",
    "build": "webpack",
    "build:prod": "webpack --mode production"
  }
}
```

---

## Vite

### Setup

```bash
npm create vite@latest my-app -- --template vanilla
cd my-app
npm install
npm run dev
```

**vite.config.js:**
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    minify: 'terser'
  }
})
```

**Key Differences from Webpack:**
- Faster dev server (uses native ES modules)
- Instant HMR (Hot Module Replacement)
- Simpler configuration
- Better for modern browser targets

---

## Rollup

### Configuration

```javascript
// rollup.config.js
export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/bundle.js', format: 'iife' },
    { file: 'dist/bundle.cjs', format: 'cjs' },
    { file: 'dist/bundle.mjs', format: 'es' }
  ],
  plugins: [
    require('@rollup/plugin-commonjs')(),
    require('@rollup/plugin-node-resolve')(),
    require('@rollup/plugin-babel')({
      exclude: 'node_modules/**'
    })
  ]
};
```

**Use Cases:**
- Library bundling (usually better than Webpack)
- Small projects
- Publishing to npm
- Tree-shaking support

---

## Build Configuration Examples

### Minification

```javascript
// Terser (JavaScript minifier)
{
  compress: {
    drop_console: true,
    drop_debugger: true
  },
  mangle: true,  // Shorten variable names
  output: {
    beautify: false  // Remove whitespace
  }
}
```

### Tree Shaking

```javascript
// In code
export function used() { }        // Will be included
export function unused() { }      // Will be removed

import { used } from './module.js';
// unused() is tree-shaken

// package.json
{
  "sideEffects": false  // Enables tree-shaking (no side effects)
}
```

### Code Splitting

```javascript
// Webpack
{
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true
        }
      }
    }
  }
}

// Dynamic imports
// <button id="load">Load Module</button>
import('./heavy-module.js').then(module => {
  module.init();
});
```

---

## Build Optimization Tips

### Image Optimization

```javascript
// Webpack rule
{
  test: /\.(png|jpg|webp)$/,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 8 * 1024  // Inline small images
    }
  }
}

// Or with image loader
{
  test: /\.(png|jpg|webp)$/,
  use: {
    loader: 'image-webpack-loader',
    options: {
      mozjpeg: { progressive: true, quality: 65 },
      optipng: { enabled: false },
      pngquant: { quality: [0.65, 0.90], speed: 4 },
      gifsicle: { interlaced: false }
    }
  }
}
```

### CSS Optimization

```javascript
// Extract CSS to separate file
new MiniCssExtractPlugin({
  filename: 'css/[contenthash].css'
})

// Purge unused styles (PurgeCSS)
{
  test: /\.css$/,
  use: [
    'style-loader',
    'css-loader',
    {
      loader: 'purgecss-webpack-plugin',
      options: {
        paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
      }
    }
  ]
}
```

---

## Development vs Production

### Development Config

```javascript
{
  mode: 'development',
  devtool: 'cheap-module-source-map',  // Debugging
  devServer: {
    hot: true,
    historyApiFallback: true  // SPA routing
  },
  performance: {
    hints: false  // No warnings in dev
  }
}
```

### Production Config

```javascript
{
  mode: 'production',
  devtool: 'source-map',  // Full source maps
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
}
```

---

## Best Practices

✅ **DO:**
- Use module systems consistently
- Tree-shake unused code
- Code split for large apps
- Minimize JavaScript
- Lazy load routes and heavy modules
- Use source maps for debugging
- Cache bust assets with hash
- Monitor bundle size

❌ **DON'T:**
- Mix CommonJS and ES modules
- Over-split code (reduces benefits)
- Ship unminified code to production
- Include development tools in production
- Ignore bundle size growth
- Use old build tools
- Commit node_modules
- Build every time for development

