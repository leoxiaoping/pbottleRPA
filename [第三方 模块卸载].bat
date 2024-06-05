@echo off
cd .

echo 正在卸载模块中
call npm uninstall node-xlsx exceljs
echo.

echo.
echo 卸载完成!~    按任意键退出

pause >nul

