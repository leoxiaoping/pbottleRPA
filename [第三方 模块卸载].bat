chcp 65001
@echo off
cd .

echo Uninstalling modules...
call npm uninstall exceljs mammoth docx
echo.

echo.
echo Uninstall complete! Press any key to exit.

pause >nul