# Noctara Reservation Page

Noctara 梦境观测庭内测预约静态页。

## 文件

- `index.html`：页面结构。
- `styles.css`：视觉样式。
- `script.js`：前端预约信息生成和复制逻辑。
- `assets/noctara-poster.png`：宣传主视觉。
- `assets/noctara-qr.png`：从宣传图裁出的预约二维码。

## 当前预约方式

这是 GitHub Pages 可直接托管的纯静态页面，没有后端数据库，也不会自动收集表单数据。

当前转化方式：

1. 用户填写预约信息。
2. 页面生成可复制的预约文本。
3. 用户扫码添加运营账号。
4. 用户把预约文本发送给运营。

后续如需真实留资，可接入以下任一方式：

- 飞书表单或腾讯问卷。
- uniCloud 云函数写入预约集合。
- 第三方表单服务。

## 本地预览

直接打开 `index.html` 即可预览。
