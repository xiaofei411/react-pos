@echo off

echo building...
call npm run build

echo creating docker image and pushing to repo
cd /d c:\gitws\pos_demo\build
copy /y c:\gitws\pos_demo\docker\* c:\gitws\pos_demo\build\
docker build --tag=bitglureg.azurecr.io/pos:latest .
docker push bitglureg.azurecr.io/pos:latest
cd /d c:\gitws\pos_demo

if "%~1"=="" goto end

echo tagging docker image with %1
docker tag bitglureg.azurecr.io/pos:latest bitglureg.azurecr.io/pos:%1
docker push bitglureg.azurecr.io/pos:%1

:end
pause