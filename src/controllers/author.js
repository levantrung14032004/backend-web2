import {
  getAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
} from "../services/author.js";

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
    const { name, thumbnail, information } = req.body;
    const result = await addAuthor([name, thumbnail, information]);
    if (result) {
      res.status(201).json("Them tac gia thanh cong");
    } else {
      res.status(404).json("Co loi tu server");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json("Co loi tu server {catch}");
  }
};

const handleUpdateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, thumbnail, information } = req.body;
    const result = await updateAuthor(id, [name, thumbnail, information]);
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
    const { id } = req.params;
    const author = await deleteAuthor(id);
    if (author !== null) {
      res.status(200).json("Xoa tac gia thanh cong");
    } else {
      res.status(404).json("Co loi tu server");
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
};
