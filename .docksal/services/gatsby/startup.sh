#!/usr/bin/env bash

echo 'alias ll="ls -lha"' >> ~/.bashrc
curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
