#Clean dist folder
Remove-Item -Verbose -Recurse -Path "dist/*"

#Copy new contents to dist folder
$exclude = @('*.js','*.ts')
Copy-Item -Verbose -Force -Recurse -Path "src/*" -Destination "dist" -Exclude $exclude