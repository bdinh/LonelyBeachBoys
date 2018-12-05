#!/usr/bin/env bash
./build.sh
ssh $EC2_INSTANCE 'bash -s' < update.sh
