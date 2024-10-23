import connection from "../database/database.js";

const getAuthors = async () => {
  try {
    const [authors, fields] = await connection.execute(
      "select name as label, id as value, thumbnail, information, status from author"
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

const addAuthor = (name, thumbnail, information) =>
  new Promise(async (resolve, reject) => {
    try {
      const [result, fields] = await connection.execute(
        "insert into author(name, thumbnail, information, status ) values(?, ?, ?, 1)",
        [name, thumbnail, information]
      );
      resolve({
        error: result.affectedRows === 0 ? 1 : 0,
        message: result.affectedRows === 0 ? "Thêm tác giả thất bại" : "Thêm tác giả thành công",
      });
    } catch (error) {
      console.log(error);
      reject({
        error: 1,
        message: error,
      });
    }
  });

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
