@echo off
echo [INFO] mvn package without unit test.

cd %~dp0

call mvn clean package -Dmaven.test.skip=true

pause