Map Tracker
===========

NOTE: This program is incomplete and non-functional.

This is a project to learn more about Nodejs/socket.io and Leaflet maps.
It's not meant for production.


Running
-------

Get node modules:

    cd server
    npm install

Run server:

    cd server  # if not there already
    node apiserver.js

View on browser:

    http://localhost:9101/


Usage
-----

Users in the same "room" should be able to see one another on the map.
If no room is entered, a new random unique room is created.

If an email address is entered, it's used to look up their gravitar
avatar as an icon.


Configuration
-------------

In the server directory, there's a file called `apiserver.json` in which
you can configure a few things about the server, e.g. port, etc.


License (MIT)
-------------

Copyright (c) 2014 Brian "Beej Jorgensen" Hall <beej@beej.us>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Contact
-------

Brian "Beej Jorgensen" Hall
<beej@beej.us>

