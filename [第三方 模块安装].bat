@echo off
cd .

echo 正在切换国内安装源 
call npm config set registry https://registry.npmmirror.com/
echo.

echo 正在安装模块中
call npm install node-xlsx exceljs
echo.

echo.
echo 恭喜，安装完成!~    按任意键退出

pause >nul

