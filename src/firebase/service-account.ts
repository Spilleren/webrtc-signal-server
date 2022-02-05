import * as dotenv from 'dotenv';

dotenv.config();

export const ShepardServiceAccount = {
    'type': 'service_account',
    'project_id': 'shepherd-5dc4a',
    'private_key_id':process.env.PRIVATE_KEY_ID,
    'private_key': process.env.PRIVATE_KEY,
    'client_email': process.env.CLIENT_EMAIL,
    'client_id': '112518781585775440788',
    'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
    'token_uri': 'https://oauth2.googleapis.com/token',
    'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
    'client_x509_cert_url': 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2om1v%40shepherd-5dc4a.iam.gserviceaccount.com'
  }