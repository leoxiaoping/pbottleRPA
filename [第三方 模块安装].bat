@echo off
cd .

echo �����л����ڰ�װԴ 
call npm config set registry https://registry.npmmirror.com/
echo.

echo ���ڰ�װģ����
call npm install node-xlsx exceljs
echo.

echo.
echo ��ϲ����װ���!~    ��������˳�

pause >nul

