chcp 65001
@echo off
cd .

echo Installing modules...
call npm install exceljs mammoth docx
echo.

echo.
echo Installation complete! Press any key to exit.

pause >nul