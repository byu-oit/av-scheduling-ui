export const environment = {
  clientId: 'MICROSOFT_APP_ID',
  clientSecret: 'PASSWORD_FOR_SPECIFIED_APP_ID',
  domain: 'byu.edu',
  hostname: 'YOUR_HOSTNAME',
  o365: true,
  oauth_auth_url: 'https://login.microsoftonline.com/byu.onmicrosoft.com/oauth2/v2.0/authorize?client_id={clientId}&response_type=code&response_mode=query',
  oauth_token_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  popupWindowTimeout: 2, //Number of seconds, after which popups will dismiss
  production: false,
  redirect_url: 'http://localhost:8080',
  resource_name: 'OUTLOOK/O365 RESOURCE FRIENDLY NAME',
  resource_id: 'OUTLOOK/O365 RESOURCE_ID',
  showHelpButton: false,
  slack_webhook_url: "SLACK_CHANNEL_INCOMING_WEBHOOK_URL",
  tenant: 'byu.onmicrosoft.com',
  timeZone: 'Mountain Standard Time'
};
