# Workflow Designer for Simple Image Processing

![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)

## Requirements

- Docker Community Edition (CE) [[Download]](https://www.docker.com/community-edition)
- Internet for download docker image (~850 MiB) [[Docker Hub]](https://hub.docker.com/r/anonyfz/workflow-designer/)

## How to use

```bash
# Download workflow-designer image from docker hub
docker pull anonyfz/workflow-designer:latest

# Create new container with container name "workflow-editor"
docker run --name workflow-editor -p 1412:1412 anonyfz/workflow-designer:latest

# If you want to stop image
docker stop workflow-editor

# If you want to remove container
docker rm workflow-editor

# If you want to remove workflow-designer image
docker rmi anonyfz/workflow-designer:latest
```

## Browser Support

> jQuery-contextMenu

[![jQuery ContextMenu Test Status](https://saucelabs.com/browser-matrix/bbrala-contextmenu.svg)](https://saucelabs.com/u/bbrala-contextmenu)

## Contributors

1. Mr. Nattakit Boonyang
2. Mr. Kullawat Chaowanawatee **(Advisor)**

## Project Repositories

* Main Repository @ github.com
* Backup Repository @ gitlab.com

```bash
git remote set-url --add --push origin git@github.com:ImKK-000/workflow-designer.git
git remote set-url --add --push origin git@gitlab.com:ImKK-000/workflow-designer.git
```
