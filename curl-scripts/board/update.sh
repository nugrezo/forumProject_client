# sh curl-scripts/update.sh
API="http://localhost:4741"
URL_PATH="/userBoards"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "userBoard": {
      "boardName": "'"${BOARDNAME}"'",
      "topic": "'"${TOPIC}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

  echo
