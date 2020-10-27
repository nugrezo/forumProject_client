# sh curl-scripts/create.sh
API="http://localhost:4741"
URL_PATH="/userBoards"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "userBoard": {
      "boardName": "'"${BOARDNAME}"'",
      "topic": "'"${TOPIC}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'
