#!/bin/sh
npm install

npm run build

gcloud auth activate-service-account --key-file worqplace-307715-393819922b11.json

gsutil -m rsync -r build/ gs://app.worqplace.io