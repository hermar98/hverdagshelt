echo off
echo [1m[91mServer Tests[0m
cd server && npm t && cd ../client && npm t
echo [1m[91mClient Tests[0m
pause