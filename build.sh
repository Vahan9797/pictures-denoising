#!/bin/bash

#IMPORTANT: use `bash build.sh` instead of `sh build.sh` to execute it with bash interpretator, not dash. Dash doesn't have "declare" and variable support.

declare -r importedFiles=$(cat $(pwd)/src/index.scss | grep -e @import)
declare -r scssFiles=$(cd $(pwd)/src/Components/styles && ls -l | grep -o [A-Z/a-z/0-9/_]*.scss)
declare -i addedFiles=0

# --scss argument imports *.scss files from src/Components/styles/ into src/index.scss before compiling has started
if [ "$1" = "--scss" ]; then
	echo "Adding new SCSS files to index.scss if they exist..."

	while read line; do
		if [[ "$importedFiles" == *"$line"* ]]; then
			continue
		else
			# ANSI Codes List for colors:
			#Black        0;30     Dark Gray     1;30
			#Red          0;31     Light Red     1;31
			#Green        0;32     Light Green   1;32
			#Brown/Orange 0;33     Yellow        1;33
			#Blue         0;34     Light Blue    1;34
			#Purple       0;35     Light Purple  1;35
			#Cyan         0;36     Light Cyan    1;36
			#Light Gray   0;37     White         1;37
			echo -e "New file added: \033[0;33m$line\033[0m."
			echo "@import './Components/styles/$line';" >> $(pwd)/src/index.scss;
			((addedFiles++))
		fi
	done < <(echo $scssFiles | tr " " "\n")

	if [ $addedFiles = 0 ]; then
		echo ""
		echo "No new files added."
		echo ""
	else
		echo ""
		echo "Total files added: $addedFiles"
		echo ""
	fi	

	echo "SCSS operations finished. Preparing to compile..."
	echo ""
fi
echo "Compiling scss files..." && npm run build-css
echo "Launching server on port 8080..." && npm start