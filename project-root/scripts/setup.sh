#!/usr/bin/env bash

# Install Python deps
python3 -m venv venv
source venv/bin/activate
pip install -r backend/requirements.txt

# Install Node deps
cd web-frontend && npm install
cd ../desktop-app && npm install