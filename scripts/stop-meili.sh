#!/usr/bin/env bash

PID=$(pgrep -f "meilisearch-mac-x64")
if [ -z "$PID" ]; then
  echo "MeiliSearch not running"
  exit 0
fi

kill "$PID"
echo "MeiliSearch (pid $PID) stopped"
exit 0
