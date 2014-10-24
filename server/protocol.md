Map Tracker Protocol
====================

Messages
--------

Client `add user`

    {
        'name'
        'email'
    }

Server `user added`

    {
        'id'
        'sid'
        'name'
        'email'
    }

Client `join room`

    {
        'id'
        'room'
    }

Server `joined room`

{
    'id'
    'name'
    'email'
}

Client `leave room`

    {
        'id'
        'room'
    }

Server `left room`

    {
        'id'
        'reason'
        'room'
    }
    
Client `set location`

    {
        'id'
        'lat'
        'lon'
    }
    
Client `scan`

    {
        'room'
    }

Server `scan results`

    {
        'room'
        'users': [ USER_LOCATION_RECORD ... ]
    }

`USER_LOCATION_RECORD`

    {
        'id'
        'location': [ lat, lon ]
    }

Client 'rollcall'

    {
        'room'
    }

Server 'rollcall results'

    {
        'room'
        'users': [ USER_DATA_RECORD ... ]
    }

`USER_DATA_RECORD`

    {
        'id'
        'name'
        'email'
    }