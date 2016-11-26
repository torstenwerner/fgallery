#!/usr/bin/bash
# Author:   Francesco O.
# Usage: this <user> <password>

USERNAME=$1;
PASSWORD=$(echo -n $2|sha256sum|head -c 64);

echo "{ \"username\": \"$USERNAME\", \"password\": \"$PASSWORD\"}"
