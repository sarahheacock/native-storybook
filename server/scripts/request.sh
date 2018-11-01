#!/bin/bash
echo "publicKey: $1"
echo "privateKey: $2"
echo "filePath: $3"
echo "HELLO"

# filename="$3"
# while read -r line
# do
#     name="$line"
#     echo "Name read from file - $name"
# done < "$filename"

echo curl https://$2@api.appetize.io/v1/apps/$1 -F "file=@$3" -F "platform=ios"
curl https://$2@api.appetize.io/v1/apps/$1 -F "file=@$3" -F "platform=ios"