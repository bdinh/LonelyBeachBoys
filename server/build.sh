#!/usr/bin/env bash
echo "building beer-model container..."
docker build -t bdinh/beer-model .
echo "pushing beer-model container..."
docker push bdinh/beer-model
