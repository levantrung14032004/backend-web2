import {
  getCompany,
  insertCompany,
  deleteCompany,
  createGoodsReceived,
} from "../services/delivery.js";
import moment from "moment";

const handleGetCompany = async (req, res) => {
  try {
    const result = await getCompany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).error(error.message);
  }
};
const handleInsertCompany = async function (req, res) {
  let name = req.body.name;
  let discount = req.body.discount;
  let infomation = req.body.infomation;

  try {
    const result = await insertCompany(name, discount, infomation);

    if (result) {
      res.status(200).json({ code: 1, message: "Them thanh cong" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const handleCreateReceived = async function (req, res) {
  try {
    let currentTime = moment().format("YYYY-MM-DD hh:mm:ss");
    let companyId = req.body.companyId;
    let note = req.body.note;
    let products = req.body.products;
    console.log({ companyId, note, products });
    const result = await createGoodsReceived(
      currentTime,
      companyId,
      note,
      products
    );
    if (result) {
      res.status(200).json({ code: 1, message: "Them thanh cong" });
    } else {
      res.status(200).json({ code: 0, message: "Them that bai" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const handleDeleteCompany = async function (req, res) {};

export {
  handleGetCompany,
  handleInsertCompany,
  handleDeleteCompany,
  handleCreateReceived,
};
