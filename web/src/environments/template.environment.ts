export const environment = {
  clientId: 'MICROSOFT_APP_ID',                             // Client/App ID for identity registered with API provider (i.e. https://apps.dev.microsoft.com)
  clientSecret: 'PASSWORD_FOR_SPECIFIED_APP_ID',            // Client Secret for identity registered with API provider (i.e. https://apps.dev.microsoft.com)
  domain: 'byu.edu',                                        // Domain following the resource_id
  exchange_username: 'exchuser',                            // Username for accessing delegated Exchange resources
  exchange_password: 'exchpw',                              // Password for user to access delegated Exchange resources         
  hostname: 'YOUR_HOSTNAME',                                // Hostname of the device
  o365: true,                                               // If false, resources are assumed to be hosted in Exchange Server
  oauth_auth_url: 'https://login.microsoftonline.com/byu.onmicrosoft.com/oauth2/v2.0/authorize?client_id={clientId}&response_type=code&response_mode=query',
  oauth_token_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  popupWindowTimeout: 2,                                    //Number of seconds, after which popups will dismiss
  production: false,                                        // If false, system is a development environment. Used for angular.
  redirect_url: 'http://localhost:8080',                    // This URL must be registered with the API provider (i.e. https://apps.dev.microsoft.com)
  resource_name: 'OUTLOOK/O365 RESOURCE FRIENDLY NAME',     // For the humans
  resource_id: 'OUTLOOK/O365 RESOURCE_ID',                  // For the server/services
    showHelpButton: false,                                  // If false, hide the '?' button in the UI
  slack_webhook_url: "SLACK_CHANNEL_INCOMING_WEBHOOK_URL",  // Incoming webhook address for help requests Slack channel
  tenant: 'byu.onmicrosoft.com',                            // O365 / Exchange Online "domain"
  time_slot_size: 30,                                       // Minimum number of minutes for a meeting, also size of blocks. Expected to be 15 or 30, no quotes.
  timezone: 'Mountain Standard Time'                        // Plain-text, full timezone descriptor. Not UTC+/-##
};
