#!/usr/bin/env bash
sh ./pull-all.sh
sh ./gradlew bundle
sh ./gradlew war
