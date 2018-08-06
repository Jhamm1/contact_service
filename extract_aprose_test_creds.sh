#!/bin/bash

if [ $# -eq 0 ]
then
    echo "No argument has been informed."
    echo "Usage:"
    echo "    ./extract_aprose_test_creds.sh <sign_password> <auth_password>"
fi

sign_password=$1
auth_password=$2
server_hostname=web.aprosesolutions.com
#used to be sent at runtime with value:
#server_hostname=213.253.26.7
server_port=443

echo 'sign key'
openssl pkcs12 -passin pass:$sign_password -nodes -in Utility_Warehouse_Client_MA.PFX -nocerts -out Utility_Warehouse_Client_Sign.pkcs12
openssl pkcs8 -topk8 -nocrypt -in Utility_Warehouse_Client_Sign.pkcs12 -out Utility_Warehouse_Client_Sign.pkcs8
cat Utility_Warehouse_Client_Sign.pkcs8 | grep -v 'PRIVATE KEY' | tr -d '\n' > Utility_Warehouse_Client_Sign.txt

#auth key
echo 'auth key'
openssl pkcs12 -passin pass:$auth_password -nodes -in Utility_Warehouse_Client_MA.pfx -nocerts -out Utility_Warehouse_Client_MA_key.pkcs12
openssl pkcs8 -topk8 -nocrypt -in Utility_Warehouse_Client_MA_key.pkcs12 -out Utility_Warehouse_Client_MA_key.pkcs8
cat Utility_Warehouse_Client_MA_key.pkcs8 | grep -v 'PRIVATE KEY' | tr -d '\n' > Utility_Warehouse_Client_MA_key.txt

#auth cert
echo 'auth cert'
openssl pkcs12 -passin pass:$auth_password -in Utility_Warehouse_Client_MA.pfx -nokeys  -out Utility_Warehouse_Client_MA_cert.pkcs12
openssl x509 -in Utility_Warehouse_Client_MA_cert.pkcs12  -out Utility_Warehouse_Client_MA_cert.pem
cat Utility_Warehouse_Client_MA_cert.pem | grep -v 'CERTIFICATE' | tr -d '\n' > Utility_Warehouse_Client_MA_cert.txt

#server cert to trust
echo 'cert'
echo -n | openssl s_client -connect $server_hostname:$server_port | awk '/BEGIN CERTIFICATE/{flag=1; next} /END CERTIFICATE/{flag=0} flag' | tr -d '\n' > manual/server.crt
