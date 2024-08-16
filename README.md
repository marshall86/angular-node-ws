# angular-realtime-stocks-quotes

An Angular project that communicate with a NodeJs server to show realtime stocks quotes through a Websocket.
The Node.js server connect to the Yahoo API to retrieve some stocks quotes (can be easily changed in the app.component.ts of the Angular project)

To use the Yahoo API is important to update API_KEY in the ws.ts file.

## Installation

npm i

## RUN

node ./ws.ts (or node .\ws.ts on Windows)
