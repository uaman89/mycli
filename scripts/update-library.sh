#!/bin/bash

PACKAGE_NAME="@we-eisos/tm-redexpert-components-npm"  # Set the package to update
PROJECT_DIRS=(
  "tm-redexpert-magic-designer/new-angular"
  "tm-redexpert-component-selector"
  "tm-redexpert-dcdc-converter"
  #"tm-current-sense-transformers"
  # "tm-redexpert-f4p-customer-card"
)  
# Get the latest version of the package
LATEST_VERSION=$(npm show "$PACKAGE_NAME" version)

if [ -z "$LATEST_VERSION" ]; then
  echo "Error: Could not fetch latest version for $PACKAGE_NAME"
  exit 1
fi

echo "Latest version of $PACKAGE_NAME: $LATEST_VERSION"

# Iterate through each project directory
for dir in "${PROJECT_DIRS[@]}"; do
  if [ -d "$dir" ] && [ -f "$dir/package.json" ]; then
    echo "Updating $PACKAGE_NAME in $dir..."
    (cd "$dir" && npm install "$PACKAGE_NAME@$LATEST_VERSION")
    echo "Updated $PACKAGE_NAME to version $LATEST_VERSION in $dir"
  else
    echo "Skipping $dir: Not a valid project folder"
  fi
done

echo "All projects updated!"
