import connection from "../database/database.js";

const getAuthors = async () => {
  try {
    const [authors, fields] = await connection.execute(
      "select name as label, id as value, thumbnail, infomation, status from author"
    );
    if (authors) return authors;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAuthorById = async (id) => {
  try {
    const [authors, fields] = await connection.execute(
      "select * from author where id = ?",
      [id]
    );
    if (authors) return authors[0];
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addAuthor = async (infomation) => {
  try {
    const [result, fields] = await connection.execute(
      "insert into author(name, thumbnail, infomation, status ) values(?, ?, ?, 1)",
      [...infomation]
    );
    if (result.affectedRows) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateAuthor = async (id, infomation) => {
  try {
    const [result, fields] = await connection.execute(
      "update author set name = ?, thumbnail = ?, infomation = ? where id = ?",
      [...infomation, id]
    );
    if (result.affectedRows) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const deleteAuthor = async (id) => {
  try {
    const [result, fields] = await connection.execute(
      "delete from author where id = ?",
      [id]
    );
    if (result.affectedRows) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { getAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor };
