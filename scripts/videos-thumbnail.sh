#!/bin/bash
# Author:   Francesco O.
# This script starts from a known root directory and extracts recursively video thumbnails
# Depends on: ffmpeg/avconv


# Configuration
SIZE="120x120"
ROOTDIR="./gallery"
THUMBSDIR="thumbs"
FRAMEAT="1" # Seek to 1 second
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
    for file in "$1"/*.mp4 "$1"/*.webm; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            extension="${filename##*.}"
            [[ -d "$1/$THUMBSDIR/$extension" ]] || mkdir "$1/$THUMBSDIR/$extension"
            filename=${filename/$extension/jpg}
            thumbname="$1/$THUMBSDIR/$extension/$filename"
            if [ ! -f  "$thumbname" ]; then
                ffmpeg -ss $FRAMEAT -i $file -s $SIZE -frames:v 1 -r 1/1 "$thumbname"
            fi
        fi
    done
}

resizeFiles $ROOTDIR
performResize $ROOTDIR
