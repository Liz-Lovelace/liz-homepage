#!/bin/bash
watchexec --clear --restart --watch backend --watch .env --watch package.json -- node backend/main.js --dev

