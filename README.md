# Azure Function for Sending Email and WhatsApp Messages with Azure Queue Storage Trigger

This Azure Function provides functionality for sending emails and WhatsApp messages triggered by messages in Azure Queue Storage. It integrates seamlessly with Azure Communication Services and can be used for various purposes such as sending OTPs (One-Time Passwords), password reset notifications, and appointment reminders.

## Features

- **Email Notifications**: Send email notifications triggered by messages in Azure Queue Storage.
- **WhatsApp Messages**: Deliver important messages triggered by messages in Azure Queue Storage directly to users' WhatsApp accounts for instant communication.
- **Integration with Azure Communication Services**: Utilize the power of Azure Communication Services for reliable messaging.

## Setup

1. **Azure Account**: Ensure you have an active Azure account.
2. **Azure Communication Services Resource**: Set up an Azure Communication Services resource in your Azure portal.
3. **Azure Queue Storage**: Create an Azure Queue Storage account in your Azure portal.
4. **Function App**: Create an Azure Function App in your Azure portal.
5. **Deployment**: Deploy this code to your Azure Function App.
6. **Configuration**:
   - **Queue Connection String**: Provide the connection string for the Azure Queue Storage where the trigger listens for messages.
   - **Communication Service Connection String**: Set up the connection string for your Azure Communication Services resource.
   - **WhatsApp Channel Registration ID**: Obtain the registration ID for your WhatsApp channel in Azure Communication Services.

## Sample `local.settings.json`

You can use the following template for your `local.settings.json` file:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "queueConnectionstring": "YOUR_QUEUE_CONNECTION_STRING",
    "connectionString": "YOUR_COMMUNICATION_SERVICE_CONNECTION_STRING",
    "channelRegistrationId": "YOUR_WHATSAPP_CHANNEL_REGISTRATION_ID"
  }
}

```
Ensure to replace the placeholder values with your actual connection strings and WhatsApp channel registration ID.

## Usage

1. **Azure Queue Storage**: Add messages to your Azure Queue Storage queues for the desired functionality.
2. **Function Trigger**: The Azure Function is triggered by messages in the Azure Queue Storage queues.
3. **Message Processing**: Process the messages in the function to send emails or WhatsApp messages based on the message content.

## Contributing

Contributions are welcome! If you have ideas for improving this Azure Function or encounter any issues, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

