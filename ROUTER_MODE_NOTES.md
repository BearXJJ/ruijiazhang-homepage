# Vue Router 两种模式说明

## 结论

- `createWebHashHistory()` 最省事，适合纯静态托管，不需要服务器配合。
- `createWebHistory()` URL 更干净，但需要服务器或托管平台把未知路径回退到 `index.html`。
- 这个项目之所以不能只改一行，是因为它部署在 GitHub Pages，而 GitHub Pages 不提供常规的 rewrite / history fallback 配置。

## 两种模式的区别

| 模式 | URL 形式 | 刷新子页面是否依赖服务器配置 | 优点 | 缺点 |
| --- | --- | --- | --- | --- |
| `createWebHashHistory()` | `/#/about` | 不依赖 | 部署简单，静态托管最稳 | URL 不够干净，`#` 后的内容不是真实路径 |
| `createWebHistory()` | `/about` | 依赖 | URL 干净，更像正常网站路径 | 服务器必须把 `/about` 这类请求回退到 `index.html` |

## 为什么 `hash` 模式更容易部署

浏览器访问 `/#/about` 时，真正发给服务器的请求其实只有 `/`。

`#` 后面的内容不会参与服务端路由匹配，所以静态托管平台只要能返回首页，前端路由就能自己接管后续页面切换。

这也是为什么 `hash` 模式通常不需要额外配置。

## 为什么 `history` 模式需要服务器配合

浏览器访问 `/about` 时，服务器收到的就是 `/about` 这个真实路径请求。

如果服务器知道这是一个 SPA，就会把这个请求回退到 `index.html`，然后交给 Vue Router 处理。

如果服务器不知道，它会直接去找 `/about` 这个文件或目录。对静态托管平台来说，这通常就会变成 404。

## 这个项目为什么需要额外改动

当前仓库通过 GitHub Pages 发布，部署配置在 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)。
当前线上地址已经绑定到自定义域名 `ruijiazhang.art`，所以站点实际运行在域名根路径 `/`，不是 `https://<user>.github.io/<repo>/` 这种仓库子路径模式。

GitHub Pages 的特点是：

- 它本质上是静态托管。
- 它支持自定义 `404.html`。
- 它不提供 Netlify、Vercel、Nginx 这类常规的 rewrite 规则配置。

所以在 GitHub Pages 上使用 `createWebHistory()` 时，必须自己补一个“404 回首页，再恢复目标路由”的方案。

## 这次改动分别在解决什么问题

### 1. 路由模式改成 `history`

文件：[src/router/index.ts](src/router/index.ts)

```ts
history: createWebHistory(import.meta.env.BASE_URL)
```

作用：

- 把 URL 从 `/#/about` 改成 `/about`
- 同时让 router 知道当前应用的基础路径

这里使用 `import.meta.env.BASE_URL`，是为了让路由和 Vite 的构建基础路径保持一致。

### 2. 给 GitHub Pages 设置正确的基础路径

文件：[vite.config.ts](vite.config.ts)

```ts
base: '/'
```

作用：

- 本地开发使用 `/`
- 生产构建也使用 `/`

这是因为当前站点通过自定义域名部署在根路径下。

如果以后取消自定义域名，重新改回 `https://<user>.github.io/<repo>/` 这种仓库子路径部署，再把 `base` 改成对应仓库路径。

### 3. 让构建产物里包含 `404.html`

文件：[vite.config.ts](vite.config.ts)

```ts
rollupOptions: {
  input: {
    index: resolve(__dirname, 'index.html'),
    404: resolve(__dirname, '404.html')
  }
}
```

作用：

- 让 Vite 在构建时同时产出 `index.html` 和 `404.html`
- GitHub Pages 才能在找不到页面时落到我们自己的 `404.html`

### 4. 在 `404.html` 里把错误路径转回首页

文件：[404.html](404.html)

核心逻辑：

```html
window.location.replace(
  `${base}?redirect=${encodeURIComponent(`/${route}${window.location.search}${window.location.hash}`)}`
)
```

作用：

- 用户直接访问 `/about`
- GitHub Pages 找不到这个静态文件
- 于是返回 `404.html`
- `404.html` 再把用户带回首页，同时把目标路径编码到 `redirect` 参数里

### 5. 在 `index.html` 里恢复目标路由

文件：[index.html](index.html)

核心逻辑：

```html
const redirect = new URLSearchParams(window.location.search).get('redirect')
if (redirect) {
  window.history.replaceState(null, '', `%BASE_URL%${redirect.replace(/^\//, '')}`)
}
```

作用：

- 首页加载时，如果发现有 `redirect`
- 就把当前地址恢复成真正想访问的路由
- 这样 Vue Router 就能正常接管 `/about`

## 如果不这样改，会发生什么

如果只是把：

```ts
createWebHashHistory()
```

改成：

```ts
createWebHistory()
```

那么：

- 本地开发大概率看起来是正常的
- 页面内点击导航也大概率正常
- 但线上用户直接打开 `/about` 或刷新 `/about` 时，会在 GitHub Pages 上遇到 404

这就是为什么不能只改一行。

## 如果以后不用 GitHub Pages

如果未来把站点迁到支持 rewrite 的平台，比如：

- Netlify
- Vercel
- 自己配置的 Nginx

那么方案可以进一步简化成：

- 保留 `createWebHistory()`
- 保留正确的 `base`
- 去掉 `404.html` fallback
- 改用平台自己的 rewrite 规则

## 什么时候选哪种模式

### 适合继续用 `hash` 模式

- 你最在意部署简单
- 你明确使用纯静态托管
- 你不想维护任何 fallback 逻辑

### 适合用 `history` 模式

- 你更在意 URL 干净
- 你希望路径看起来像正常网站
- 你愿意补服务器 rewrite 或 GitHub Pages fallback

## 这次项目里的最小必要改动

如果目标是：

- 继续部署到 GitHub Pages
- 同时使用 `createWebHistory()`

那么最小必要集就是：

1. [src/router/index.ts](src/router/index.ts) 切换到 `createWebHistory(import.meta.env.BASE_URL)`
2. [vite.config.ts](vite.config.ts) 设置正确的 `base`
3. [vite.config.ts](vite.config.ts) 让构建产出 `404.html`
4. [404.html](404.html) 负责从 404 回到首页
5. [index.html](index.html) 负责把首页恢复成目标路由

少掉其中任意一个，GitHub Pages 下的 `history` 模式就会不完整。

## 当前项目踩到的实际问题

之前把 `base` 写成了 `/ruijiazhang-homepage/`，这是“仓库子路径部署”时才正确的配置。

但当前线上实际走的是自定义域名 `ruijiazhang.art`，所以资源真实路径应该是：

- `/assets/...`
- 不是 `/ruijiazhang-homepage/assets/...`

这就是之前线上直接报错的原因：浏览器去请求了错误的 JS/CSS 地址，结果返回 404。
