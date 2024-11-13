import {
  getAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  deleteAuthor,
} from "../services/author.js";
import uploadIMG_service from "../services/uploadIMG.js";

const handleGetAuthors = async (req, res) => {
  try {
    const authors = await getAuthors();
    if (authors !== null) {
      res.status(200).json(authors);
    } else {
      res.status(404).json("Co loi tu server");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" });
  }
};

const handleAddAuthor = async (req, res) => {
  try {
    const { name, information } = req.body;

    const thumbnail = req.file;

    if (!thumbnail) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu ảnh đại diện" });
    }
    const uploadIMG = await uploadIMG_service(thumbnail);
    if (uploadIMG.error === 1) {
      return res
        .status(400)
        .json({ success: false, message: "Lưu ảnh thất bại" });
    }
    if (!name || !information) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu thông tin" });
    }
    const result = await addAuthor(name.trim(), uploadIMG.URL, information);
    return res
      .status(200)
      .json({ success: true, message: "Thêm tác giả thành công" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Co loi tu server {catch}" });
  }
};

const handleUpdateAuthor = async (req, res) => {
  try {
    const { id, name, information } = req.body;
    const thumbnail = req.file;
    if (!thumbnail) {
      return res.status(400).json("Thiếu ảnh đại diện");
    }
    const uploadIMG = await uploadIMG_service(thumbnail);
    if (uploadIMG.error === 1) {
      return res.status(400).json("Lưu ảnh thất bại");
    }
    const result = await updateAuthor(id, name, information, uploadIMG.URL);
    if (result) {
      res.status(200).json("Cap nhat tac gia thanh cong");
    } else {
      res.status(404).json("Co loi tu server");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("Co loi tu server {catch}");
  }
};

const handleGetAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await getAuthorById(id);
    if (author !== null) {
      res.status(200).json(author);
    } else {
      res.status(404).json("Co loi tu server");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("Co loi tu server {catch}");
  }
};

const handleDeleteAuthor = async (req, res) => {
  try {
    const { id, status } = req.body;
    const author = await deleteAuthor(id, status);
    if (author !== null) {
      res.status(200).json({ code: 1, message: "Đã lưu thay đổi" });
    } else {
      res.status(200).json({ code: 0, message: "Xoa tac gia that bai" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("Co loi tu server {catch}");
  }
};
export {
  handleGetAuthors,
  handleAddAuthor,
  handleUpdateAuthor,
  handleGetAuthorById,
  handleDeleteAuthor,
};
