#!/bin/bash

#IMPORTANT: Make sure you execute it with bash interpretator, not dash. Dash is shit.

importedFiles=$(cat $(pwd)/src/index.scss | grep -e @import)
scssFiles=$(cd $(pwd)/src/Components/styles && ls -l | grep -o [A-Z/a-z/0-9/_]*.scss)
addedFiles=0

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

	echo ""
	if [ $addedFiles = 0 ]; then
		echo "No new files added."
	else
		echo "Total files added: $addedFiles"
	fi	
	echo ""
	echo "SCSS operations finished. Preparing to compile..."
	echo ""
fi

echo "Compiling scss files..." && yarn build-css &
CSS_PID=$!
echo "Launching server on port 8080..." && yarn start &
SERVER_PID=$!
echo "Compiling client-side bundle..." && yarn build-js
BUNDLE_PID=$!

# After interrupting the execution clear background processes
kill CSS_PID BUNDLE_PID SERVER_PID