chcp 65001
@echo off
cd .

echo Switching to npm mirror registry...
call npm config set registry https://registry.npmmirror.com/
echo.

echo Installing modules...
call npm install exceljs mammoth docx
echo.

echo.
echo Installation complete! Press any key to exit.

pause >nul