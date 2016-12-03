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

## Running

Execute
```
npm install
```
to download the dependencies. And execute
```
npm run
```
to start the server and open the application in the browser.

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

## Authentication
Authentication is activated by default. You can however turn it off by editing config.js and setting authentication.enabled to false.

Users are stored in user.json.

You can create a new user easily by executing scripts/createUser.sh. It will return a JSON that you can add manually to users.json (I know: boooooring. I might improve it in the future.)
```bash
$  bash ./scripts/createUser.sh test testpassword
```

Please notice that the command itself is prefixed by a space. This way it will not be logged to bash history and your password will be safe.