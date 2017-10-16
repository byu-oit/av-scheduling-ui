export const environment = {
  production: false,
  slack_webhook_url: "SLACK_CHANNEL_INCOMING_WEBHOOK_URL",
  popupWindowTimeout: 2, //Number of seconds, after which popups will dismiss
  clientId: 'MICROSOFT_APP_ID',
  clientSecret: 'PASSWORD_FOR_SPECIFIED_APP_ID',
  oauth_auth_url: 'https://login.microsoftonline.com/byu.onmicrosoft.com/oauth2/v2.0/authorize?client_id={clientId}&response_type=code&response_mode=query',
  oauth_token_url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
  redirect_url: 'http://localhost:8080'
};
