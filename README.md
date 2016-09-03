# fgallery
fgallery is a file-system based gallery.
It's composed of three parts:
* [bash scripts](#bash-scripts)
* [backend API](#backend-api)
* [user interface](#user-interface)

## Dependencies
* imagemagick
* ffmpeg/avconv
* nodejs
* npm

## Components
### bash scripts
There are two bash scripts that generate the thumbnails for media files. One is called *images-thumbnail* and the other one is *videos-thumbnail*. They're nothing but wrappers around *convert* (imagemagick) and *ffmpeg* respectively.


### backend API
It exposes the gallery.


### user interface
It is the gallery itself.

## Why
I needed a gallery for family/vacation pictures and videos and I didn't find anything that I liked.

At first I thought of generating the missing thumbnails on-demand, but I realized that it was too expensive.
So I decided, given that I will not upload new contents very often, that I could generate the thumbnails every *n* hours by calling two bash scripts.

It's not amazing but it works.

## Demo

A demo is available [here](http://fgallery.selectstarfrom.space/).