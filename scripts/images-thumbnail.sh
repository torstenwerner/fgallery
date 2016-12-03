#!/bin/bash
# Author:   Francesco O.
# This script starts from a known root directory and resizes recursively images
# Depends on: imagemagick convert


# Configuration
SIZE="120x120"
ROOTDIR="./gallery"
THUMBSDIR="thumbs"
IFS=$(echo -en "\n\b")

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
    [[ -d "$1/$THUMBSDIR" ]] || mkdir "$1/$THUMBSDIR"
    for file in "$1"/*.jpg "$1"/*.png "$1"/*.gif; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            extension="${filename##*.}"
            [[ -d "$1/$THUMBSDIR/$extension" ]] || mkdir "$1/$THUMBSDIR/$extension"
            filename=${filename/$extension/jpg}
            thumbname="$1/$THUMBSDIR/$extension/$filename"
            if [ ! -f  "$thumbname" ]; then
                convert "$file"[0] -resize $SIZE "$thumbname"
            fi
        fi
    done
}

resizeFiles $ROOTDIR
performResize $ROOTDIR
