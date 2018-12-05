#!/usr/bin/env bash

docker rm -f beer
docker pull bdinh/beer-model

export BEERADDR=beer:80

docker run -d \
--network Auth \
--name beer \
-e ADDR=$BEERADDR \
bdinh/beer-model