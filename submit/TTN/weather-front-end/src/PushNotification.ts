import { messaging } from "./firebase";
import { getToken } from "firebase/messaging";

const PushNotification = () => {
  // const m = messaging();

  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
        // Add the public key generated from the console here.
        getToken(messaging, {
          vapidKey:
            "BHEPLi0U_gmOMoFxsEVXnftSPZzRjmoPipt0loe8UW6wRKPLzxC0l0JZuP_AMraKcKiuWt1dJn-30RjRSXvEYSU",
        })
          .then((token) => console.log("token: ", token))
          .catch((err) => console.log(err));
      } else {
        console.log("permission denied", permission);
      }
    })
    .catch((error) => {
      console.error("Unable to get permission to notify.", error);
    });
};

export default PushNotification;
