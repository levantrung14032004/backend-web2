import uploadIMG_service from "../services/uploadIMG.js";
const uploadIMG_control = async (req, res) => {
  try {
    const files = req.files;
    const uploadPromises = files.map(
      async (file) => await uploadIMG_service(file)
    );
    res.status(200).json({
      message: "files uploaded to firebase storage",
    });
  } catch (error) {
    res.status(500).json(result);
  }
};
export default uploadIMG_control;
