# QSC Mobile Plugin 仓库

## Plugins

- 求失狗

## 面向开发者

### 文档

github:http://qsctech.github.io/qsc-mobile-plugins/doc/api/
gitcafe:http://qsctech.gitcafe.com/qsc-mobile-plugins/doc/api/

### SDK 使用说明

比如要调试求失狗这个plugin，访问 sdk/#qiuShiGou 就可以开始调试了哦

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

## 面向 SDK 开发者

访问 sdk/#qiuShiGou#debug 开启调试输出

## 面向内部开发者（iOS / Android）

我们以 gh-pages 分支为稳定分支，从 gh-pages 分支拉取文件更新。

每次插件更新前先检查当前 Java / Obj-C 是不是最新版本，如果不是，更新，否则不允许更新插件或安装插件。
如果是最新就按照索引文件的版本号更新文件。

### Plugins.json & Resources.json

/lib和/api的Manifest的合并文件：

github:http://qsctech.github.io/qsc-mobile-plugins/resources.json
gitcafe:http://qsctech.gitcafe.com/qsc-mobile-plugins/resources.json

所有插件Mainfest的合并文件：

github:http://qsctech.github.io/qsc-mobile-plugins/plugins.json
gitcafe:http://qsctech.gitcafe.com/qsc-mobile-plugins/plugins.json