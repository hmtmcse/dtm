#!/usr/bin/env bash
git clone https://github.com/hmtmcse/dtm.git DTM
cd DTM
git clone https://github.com/hmtmcse/grails-swagger.git
git clone https://github.com/hmtmcse/dtm.wiki.git wiki
mkdir other-plugins
cd other-plugins
git clone https://github.com/hmtmcse/java-http-util.git
git clone https://github.com/hmtmcse/java-common.git
git clone https://github.com/hmtmcse/java-date-time-util.git