#!/bin/sh

# Create the project:
curl -v -u admin:admin http://teamcity:8111/app/rest/projects --header "Content-Type: application/xml" -d @xml/test-project.xml

# Create the build step from the template:
curl -v -u admin:admin http://teamcity:8111/app/rest/buildTypes --header "Content-Type: application/xml" -d @xml/test-build.xml
