#!/bin/bash

curl -f 'http://localhost:4000/' -X POST -H 'content-type: application/json' -d '{"query": "{ books { title } }"}'