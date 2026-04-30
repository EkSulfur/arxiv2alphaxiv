# Alphaxlik

## Language

- [English](#english)
- [中文](#chinese)

---

<a id="english"></a>

A lightweight Microsoft Edge extension that helps you jump from an arXiv paper page to the corresponding AlphaXiv page with one click.

## Features

- Adds a floating button on supported arXiv pages
- Supports the browser toolbar button for quick navigation
- Keeps the navigation simple and local, with no remote script loading
- Works on both `arxiv.org/abs/...` and `arxiv.org/pdf/...` pages

## Installation

### From source

1. Download or clone this repository.
2. Open Microsoft Edge and go to `edge://extensions`.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the repository folder.

## Usage

- Open an arXiv abstract or PDF page.
- Click the floating **Open in AlphaXiv** button, or use the extension toolbar button.
- The current paper will open on AlphaXiv in the same tab.

## Permissions

This extension uses only the permissions needed for its core behavior:

- `tabs` — to read the active tab URL and navigate the current tab
- Host permissions for `arxiv.org` and `alphaxiv.org` — to detect supported pages and redirect to AlphaXiv

## Privacy

This extension does not collect or transmit user data. It performs URL checks locally in the browser and redirects only when you click the button.

## Source Code

This project is open source. You can inspect, fork, and modify the code in this repository.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

<a id="chinese"></a>

一个轻量级的 Microsoft Edge 扩展，可以让你一键从 arXiv 论文页面跳转到对应的 AlphaXiv 页面。

## 功能

- 在支持的 arXiv 页面上显示一个浮动按钮
- 支持浏览器工具栏按钮，方便快速跳转
- 逻辑简单、完全本地执行，不加载远程脚本
- 同时支持 `arxiv.org/abs/...` 和 `arxiv.org/pdf/...` 页面

## 安装

### 从源码安装

1. 下载或克隆本仓库。
2. 打开 Microsoft Edge，访问 `edge://extensions`。
3. 开启 **开发者模式**。
4. 点击 **加载解压缩的扩展**。
5. 选择本仓库目录。

## 使用方法

- 打开 arXiv 的摘要页或 PDF 页面。
- 点击浮动的 **Open in AlphaXiv** 按钮，或者点击扩展工具栏按钮。
- 当前论文会在同一标签页中打开 AlphaXiv 页面。

## 权限说明

本扩展只使用实现核心功能所需的最小权限：

- `tabs`：用于读取当前标签页 URL 并跳转当前标签页
- `arxiv.org` 和 `alphaxiv.org` 的主机权限：用于识别支持的页面并跳转到 AlphaXiv

## 隐私说明

本扩展不会收集或传输用户数据。所有 URL 检查都在浏览器本地完成，仅在用户点击按钮时执行跳转。

## 开源说明

本项目是开源的。你可以在本仓库中查看、分叉和修改代码。

## 许可证

本项目采用 MIT 协议。详情请查看 `LICENSE` 文件。
