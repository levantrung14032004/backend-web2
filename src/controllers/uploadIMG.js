import uploadIMG_service from "../services/uploadIMG.js";
const uploadIMG_control = async (req, res) => {
  try {
    console.log(req);
    console.log(req.body.author || null);
    const files = req.files;
    const uploadPromises = files.map((file) => uploadIMG_service(file));
    const response = await Promise.all(uploadPromises);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(result);
  }
};
export default uploadIMG_control;
