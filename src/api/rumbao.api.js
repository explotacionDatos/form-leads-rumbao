import axios from "axios";

export const sendFormRequest = async (data) => {
  const { phoneNumber, campaignId, priorityGroupId, nombre, aux1, aux3, aux9 } =
    data;

  let url = `https://unocomaseis.dialcata.com/dialapplet-web/api.php?c=1&k=91c8kIKF1SPkcxW3mgqDb3NQ&a=addCampaignPhone&phoneNumber=${phoneNumber}&campaignId=${campaignId}&priorityGroupId=${priorityGroupId}&nombre=${nombre}&ca=1&aux1=${aux1}&aux3=${aux3}&aux9=${aux9} `;
  try {
    const response = await axios.get(url);
    console.log(response);
    return response;
  } catch (error) {
    console.log("Error: " + error.message);
  }
};
