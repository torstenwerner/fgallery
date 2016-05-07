#!/bin/bash
# Author:   Francesco O.
# This script starts from a known root directory and resizes recursively images
# Depends on: imagemagick convert


# Configuration
SIZE="120x120"
ROOTDIR="./gallery"
THUMBSDIR="thumbs"

# Takes one argument: the directory to start from
performResize () {
    for dir in "$1"/*/; do
        if [ $(basename "$dir") != "$THUMBSDIR" ]; then
            resizeFiles "$dir"
            performResize "$dir"
        fi
    done
}

# Takes one argument: the directory that contains the files
resizeFiles () {
    [[ -d "$1/thumbs" ]] || mkdir "$1/thumbs"
    for file in "$1"/*; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            extension="${filename##*.}"
            [[ -d "$1/thumbs/$extension" ]] || mkdir "$1/thumbs/$extension"
            thumbname="$1/thumbs/$extension/$filename";
            if [ ! -f  "$thumbname" ]; then
                convert $file -resize $SIZE "$thumbname"
            fi
        fi
    done
}

resizeFiles $ROOTDIR
performResize $ROOTDIR
