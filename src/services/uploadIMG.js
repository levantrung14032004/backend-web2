import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import firebaseConfig from "../database/configFirebase.js";
import { initializeApp } from "firebase/app";
initializeApp(firebaseConfig);
const storage = getStorage();

const uploadIMG_service = (file) =>
  new Promise(async (resolve, reject) => {
    try {
      const storageRef = ref(storage, `files/${file.originalname}`);

      const metadata = {
        contentType: file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
      );

      const downloadURL = await getDownloadURL(snapshot.ref);

      resolve({
        message: "file uploaded to firebase storage",
        name: file.originalname,
        type: file.mimetype,
        URL: downloadURL,
      });
    } catch (error) {
      reject({
        message: "upload image fail",
        error
      });
    }
  });
export default uploadIMG_service;
