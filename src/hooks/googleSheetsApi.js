export const initGoogleAPI = async () => {
  return new Promise((resolve, reject) => {
    window.gapi.load("client:auth2", async () => {
      try {
        await window.gapi.client.init({
          apiKey: "AIzaSyD9d3Zu8iDstN5PzG5hN4cZBIahEgPrC94",
          clientId:
            "92425505624-h6o88agpirp1hpl63oiikav2rpopg8kr.apps.googleusercontent.com",
          discoveryDocs: [
            "https://sheets.googleapis.com/$discovery/rest?version=v4",
          ],
          scope: "https://www.googleapis.com/auth/spreadsheets",
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const authenticate = async () => {
  try {
    const authInstance = window.gapi.auth2.getAuthInstance();
    const user = await authInstance.signIn();
    console.log("Authenticated user:", user.getBasicProfile().getName());
  } catch (error) {
    console.error("Authentication failed:", error);
  }
};

export const signOut = () => {
  const authInstance = window.gapi.auth2.getAuthInstance();
  authInstance.signOut();
  console.log("Signed out successfully");
};

export const readSheetData = async (spreadsheetId, range) => {
  try {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.result.values;
  } catch (error) {
    console.error("Error reading data:", error);
  }
};

export const writeSheetData = async (spreadsheetId, range, values) => {
  try {
    const response = await window.gapi.client.sheets.spreadsheets.values.update(
      {
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: { values },
      }
    );
    console.log("Data written successfully:", response);
  } catch (error) {
    console.error("Error writing data:", error);
  }
};
