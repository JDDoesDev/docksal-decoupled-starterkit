FROM docksal/cli:2.8-php7.3

USER docker

SHELL ["/bin/bash", "-c"]
# Install additional global npm dependencies
RUN set -e; \
    # Initialize the user environment (this loads nvm)
    source $HOME/.profile; \
    # Install packages
    npm install -g npm@6.9.0; \
    npm install -g gatsby-cli; \
    # Cleanup
    nvm clear-cache && npm cache clear --force; \
    # Fix npm complaining about permissions and not being able to update
    sudo rm -rf $HOME/.config;

RUN echo 'alias ll="ls -lha"' >> ~/.bashrc

SHELL ["/bin/sh", "-c"]

USER root

EXPOSE 8000
