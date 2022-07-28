import admin from "firebase-admin";
import serviceAccount from "./coder-test-6a400-firebase-adminsdk-mb7n7-fc02d4ae3c.json" assert { type: "json" };

export default {
  credential: admin.credential.cert(serviceAccount),
};
