#Clean dist folder
Remove-Item -Verbose -Recurse -Path "dist/*"

#Copy new contents to dist folder
Copy-Item -Verbose -Force -Recurse -Path "src/*" -Destination "dist" -Exclude "*.js"