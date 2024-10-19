import connection from "../database/database.js";

const getAuthors = () =>
  new Promise(async (resolve, reject) => {
    try {
      const [authors, fields] = await connection.query("select * from author where status = 1");
      return resolve(authors);
    } catch (error) {
      console.error(error);
      return null;
    }
  });

export { getAuthors };
