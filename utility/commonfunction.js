// date and time
import moment from "moment-timezone";
export const formatDateTime = (date) => {
  const dateTime = moment(date)
    .tz("Asia/Kolkata")
    .format("YYYY-MM-DD HH:mm:ss");
  return dateTime;
};
