import { getAuthors } from "../services/author.js";

const handleGetAuthors = async (req, res) => {
  try {
    const authors = await getAuthors();
    if (authors !== null) {
      res.status(200).json(authors);
    } else {
      res.status(404).json("Co loi tu server");
    }
  } catch (error) {}
};

export { handleGetAuthors };
