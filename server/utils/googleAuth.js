import { google } from 'googleapis';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: path.resolve("server/services/google.json"),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export const getGoogleSheets = async () => {
  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
};
