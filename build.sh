#!/usr/bin/env bash
sh ./pull-all.sh
if ! [ -d "build" ]; then
	rm -rf build
fi
#sh ./gradlew bundle
sh ./gradlew war
