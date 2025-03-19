# 压缩解压缩

新版压缩解压接口支持 4GB 以上超大文件

## 压缩 zipDir

压缩文件夹内容成一个zip文件包 v2025.0 以后版本生效

@param {string} directory 文件夹路径，输入绝对路径

@param {string} zipFilePath zip文件包


##  解压缩 unZip

解压缩zip文件内容到指定文件夹内 v2025.0 以后版本生效

@param {string} zipFilePath zip文件包

@param {string} directory 文件夹路径，输入绝对路径 默认解压到zip文件当前目录

