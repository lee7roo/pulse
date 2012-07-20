@echo off
echo [INFO] mvn eclipse:eclipse.

cd %~dp0

call mvn clean eclipse:clean eclipse:eclipse -DdownloadSources=true -Dwtpversion=2.0

pause