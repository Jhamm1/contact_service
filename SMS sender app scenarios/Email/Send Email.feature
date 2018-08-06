# Send email endpoint is part of the Sender app component

Feature: Send email
  In order for an email to be sent
  As a Client
  I need to be able to call the endpoint with valid input with specific parameters

#high-level Scenario
 Scenario: Client sends simple email
   Given Client calls the endpoint
   And contains a valid input:
    ""
        {
    "body": "Hello World",
    "bodyType": "Html",
    "from": "email@address.com",
    "fromName": "FirstName LastName",
    "recipients": [
        {
        "receiverName": "FirstName LastName",
        "receiver": "email@address.com",
        "accountType": "Customer",
        "accountNumber": "131313132132",
        "recipientType": "To"
        },
        {
        "receiverName": "FirstName LastName",
        "receiver": "email@address.com",
        "accountType": "Customer",
        "accountNumber": "131313132132",
        "recipientType": "To"
        }
    ],
    "priority": "Normal",
    "subject": "Some subject",
    "attachments": [
        {
        "content": "base64encodedstring",
        "contentType": "application/pdf",
        "fileName": "somefile.pdf"
        },
        {
        "content": "base64encodedstring",
        "contentType": "application/pdf",
        "fileName": "anotherfile.pdf"
        }
    ],
    "sourceId": "client Id",
    "campaign": "postman_2017_03_13",
    "replyTo": "email@address.com"
    } ""
  When the request is sent
  Then an HTTP response (202) should be returned




 Scenario: Message push to queue
   Given Client calls the endpoint
   When MQ is available
   And message has been pushed to queue
   Then the API metrics are incremented with <clientID>

#high-level Scenario
 Scenario: Email with (n +1) attachment
   Given Client calls the endpoint
   When the request contains attachment with valid input:
    ""
        {
  "body": "Hello World",
  "bodyType": "Html",
  "fromEmail": "email@address.com",
  "fromName": "FirstName LastName",
  "recipients": [
    {
      "receiverName": "FirstName LastName",
      "receiverEmail": "email@address.com",
      "accountType": "Customer",
      "accountNumber": "131313132132",
      "recipientType": "To"
    },
    {
      "receiverName": "FirstName LastName",
      "receiverEmail": "email@address.com",
      "accountType": "Customer",
      "accountNumber": "131313132132",
      "recipientType": "To"
    }
  ],
  "priority": "Normal",
  "subject": "Some subject",
  "attachments": [
    {
      "content": "base64encodedstring",
      "contentType": "application/pdf",
      "fileName": "somefile.pdf"
    },
    {
      "content": "base64encodedstring",
      "contentType": "application/pdf",
      "fileName": "anotherfile.pdf"
    }
  ],
  "sourceId": "client Id",
  "campaign": "postman_2017_03_13",
  "replyTo": "email@address.com"
} ""
   Then a HTTP code 202 response should be returned
  
  Scenario: Store attachment
   Given the endpoint is called
   When a file is attached
   Then the attachment should be saved to S3 bucket
 
 Scenario: Message push to queue for an email with attachment
   Given the endpoint is called with an attachment
   Then the message should be pushed to queue
   And the API metrics of the received message should be incremented with <clientID>

#high-level Scenario
Scenario: Send email when MQ is unavailable
   Given a call has been made to the endpoint with valid input:
    ""
        {
  "body": "Hello World",
  "bodyType": "Html",
  "fromEmail": "email@address.com",
  "fromName": "FirstName LastName",
  "recipients": [
    {
      "receiverName": "FirstName LastName",
      "receiverEmail": "email@address.com",
      "accountType": "Customer",
      "accountNumber": "131313132132",
      "recipientType": "To"
    },
    {
      "receiverName": "FirstName LastName",
      "receiverEmail": "email@address.com",
      "accountType": "Customer",
      "accountNumber": "131313132132",
      "recipientType": "To"
    }
  ],
  "priority": "Normal",
  "subject": "Some subject",
  "attachments": [
    {
      "content": "base64encodedstring",
      "contentType": "application/pdf",
      "fileName": "somefile.pdf"
    },
    {
      "content": "base64encodedstring",
      "contentType": "application/pdf",
      "fileName": "anotherfile.pdf"
    }
  ],
  "sourceId": "client Id",
  "campaign": "postman_2017_03_13",
  "replyTo": "email@address.com"
} ""
   When the MQ is unavailable
   Then the response status should be HTTP "404" OR "501" error
   And an alert is generated

#high-level Scenario 
 Scenario: Endpoint call with invalid input
   Given a client calls the endpoint with invalid input
   When the input parameters are invalid
   And that there is a mismatch between input data and data type of the parameters
   Then the response status should be "X" error
   And Log errors in Sumologic
   

