#!/bin/bash
echo "Запуск Next.js сайта..."
cd .
nix-shell -p nodejs --run "npm cache clean --force && yes | npx next dev -H 0.0.0.0 -p 5000"