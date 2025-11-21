## 1. Make sure the file is executable
chmod +x cli.js

## 2. Run the link command again

From your CLI project folder:

npm link


### If it succeeds, it will output something like:

/usr/local/bin/mycli -> /usr/local/lib/node_modules/my-cli/cli.js


Now you can run:

mycli --help