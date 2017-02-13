#!/bin/bash

sh docker-kill.sh

docker run -d \
	-p 80:80 \
	-v `pwd`/../_site:/var/www/html \
	--name aero.admin \
	php:7.0-apache