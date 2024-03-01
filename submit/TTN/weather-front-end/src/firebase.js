import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyABaV92j0Wz9CIIq1xDmKjUGaKL4ObGWo0",
  authDomain: "weather-project-nguyen642.firebaseapp.com",
  projectId: "weather-project-nguyen642",
  storageBucket: "weather-project-nguyen642.appspot.com",
  messagingSenderId: "1008395811137",
  appId: "1:1008395811137:web:9887b6100982ab9a9909c0",
  measurementId: "G-41390M6L1Z",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export { messaging };
