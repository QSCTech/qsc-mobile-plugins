# QSC Mobile Plugin 仓库

## 面向开发者

### 文档

http://qsctech.github.io/qsc-mobile-plugins/doc/api/

### SDK 使用说明

比如要调试求失狗这个plugin，访问 sdk/#qiuShiGou 就可以开始调试了哦，访问 sdk/#qiuShiGou#debug 就可以开启调试输出了哦。

### 请不要显示滚动条

Stylish:

```css
@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);
scrollbar {  
    width: 0 !important;
    display: none;
}
```

### 提交插件

fork 这个仓库，然后直接 pull request 过来就可以了

## 面向内部开发者

我们以 gh-pages 分支为稳定分支，从 gh-pages 分支拉取文件更新。

### Plugins.json & Resources.json

/lib和/api的Manifest的合并文件：

http://qsctech.github.io/qsc-mobile-plugins/resources.json

所有插件Mainfest的合并文件：

http://qsctech.github.io/qsc-mobile-plugins/plugins.json

## Plugins

- 求失狗

