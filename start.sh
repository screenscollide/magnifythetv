#!/bin/bash 
# Invoke the Forever module (to START our Node.js server).
~/magnifythetv/node_modules/forever/bin/forever \
start \
#-al forever.log \
#-ao out.log \
#-ae err.log \
app.js