#!/bin/bash

# This Bash script keeps the code base clean and consistent
# by code formatting and linting with our JavaScript and
# Python codebases.

# Python
pip install yapf
yapf server/app.py server/gen.py server/update.py

# JavaScript

yarn --cwd ./app prettier --write .
