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
        error: 0,
        URL: downloadURL,
      });
    } catch (error) {
      reject({
        error: 1,
        message: error,
      });
    }
  });
export default uploadIMG_service;
