import { getEmployee } from "../services/employee.js";

const handleGetEmployee = async (req, res) => {
  try {
    const result = await getEmployee();
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(504).error("Co loi khi lay len tat ca nhan vien");
    }
  } catch (error) {
    console.error(error);
    res.json(error);
  }
};

export { handleGetEmployee };
