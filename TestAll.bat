echo off
echo [1m[91mServer Tests[0m
cd server && npm t && flow check
echo [1m[91mClient Tests[0m
cd ../client && npm t
pause