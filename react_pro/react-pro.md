#### 1. 配置依赖

```
  "dependencies": {
    "@ant-design/icons": "^4.7.0",
    "antd": "^4.23.4",
    "axios": "^1.1.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^7.2.8",
    "react-router-dom": "^6.3.0",
    "redux": "^4.1.2",
    "redux-thunk": "^2.4.1",
    "reset-css": "^5.0.1"
  },
  "devDependencies": {
    "@types/node": "^18.8.3",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@vitejs/plugin-react": "^1.3.0",
    "less": "^2.7.1",
    "sass": "^1.55.0",
    "typescript": "^4.6.3",
    "vite": "^2.9.15",
    "vite-plugin-style-import": "^1.4.1"
  }
```

#### 2. ts 配置 路径

```
    "baseUrl": "./",
    "paths": {
      "@/*": [
        "src/*"
      ]
    }
```

#### 3. vite配置别名

```
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'./src')
    }
  }
```

#### 4. 引入reset-css消除全局样式