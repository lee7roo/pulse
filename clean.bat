@echo off
echo [INFO] mvn eclipse:eclipse.

cd %~dp0

call mvn clean eclipse:clean

pause