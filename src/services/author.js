import connection from "../database/database.js";

const getAuthors = async () => {
  try {
    const [authors, fields] = await connection.execute(
      "select name as label, id as value from author"
    );
    if (authors) return authors;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getAuthors };
