#!/bin/bash
cd /home/kavia/workspace/code-generation/two-player-tic-tac-toe-189668-189677/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

