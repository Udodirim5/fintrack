import { getGoogleSheets } from "../utils/googleAuth.js";
import catchAsyncError from "../utils/catchAsyncError.js";
// Extract spreadsheet ID from URL
const getSpreadsheetId = (url) => {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
};

// CREATE: Add rows

export const addRows = catchAsyncError(async (req, res) => {
  const { url, values } = req.body; // Expecting Google Sheets URL and rows to add
  const spreadsheetId = getSpreadsheetId(url);
  if (!spreadsheetId) return res.status(400).send("Invalid Google Sheets URL");

  const sheets = await getGoogleSheets();
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A1", // Adjust as needed
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });

  res.status(201).send("Rows added successfully");
});

// READ: Fetch data
export const getRows = catchAsyncError(async (req, res) => {
  const { url } = req.query;
  const spreadsheetId = getSpreadsheetId(url);
  if (!spreadsheetId) return res.status(400).send("Invalid Google Sheets URL");

  const sheets = await getGoogleSheets();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Sheet1", // Adjust as needed
  });

  res.status(200).json(response.data.values);
});

// UPDATE: Modify rows
export const updateRows = catchAsyncError(async (req, res) => {
  const { url, range, values } = req.body; // Range specifies which cells to update
  const spreadsheetId = getSpreadsheetId(url);
  if (!spreadsheetId) return res.status(400).send("Invalid Google Sheets URL");

  const sheets = await getGoogleSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });

  res.status(200).send("Rows updated successfully");
});

// DELETE: Clear rows
export const deleteRows = catchAsyncError(async (req, res) => {
  const { url, range } = req.body; // Specify the range to clear
  const spreadsheetId = getSpreadsheetId(url);
  if (!spreadsheetId) return res.status(400).send("Invalid Google Sheets URL");

  const sheets = await getGoogleSheets();
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range,
  });

  res.status(200).send("Rows cleared successfully");
});
