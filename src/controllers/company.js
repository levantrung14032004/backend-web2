import {
  getCompany,
  insertCompany,
  deleteCompany,
  createGoodsReceived,
} from "../services/delivery.js";
import moment from "moment";

const handleGetCompany = async function (req, res) {
  try {
    const result = await getCompany();
    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).error(error.message);
  }
};
const handleInsertCompany = async function (req, res) {
  let name = req.body.name;
  let discount = req.body.discount;
  let status = req.body.status;
  let description = req.body.description;

  try {
    const result = await insertCompany(name, discount, status, description);

    if (result) {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).error(error.message);
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
      res.status(200).json("Them phieu nhap thanh cong");
    } else {
      res.status(404).json("Co loi");
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
