import {
  getCompany,
  insertCompany,
  deleteCompany,
  createGoodsReceived,
  updateCompany,
  getCompanyRunning,
} from "../services/delivery.js";
import moment from "moment";

const handleGetCompany = async (req, res) => {
  try {
    const result = await getCompany();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const handleGetCompanyRunning = async (req, res) => {
  try {
    const result = await getCompanyRunning();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
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

const handelUpdateCompany = async function (req, res) {
  let id = req.body.id;
  let name = req.body.name;
  let discount = req.body.discount;
  let infomation = req.body.infomation;
  let status = req.body.status;

  try {
    const result = await updateCompany(id, name, discount, infomation, status);

    if (result) {
      res.status(200).json({ code: 1, message: "Sua thanh cong" });
    } else {
      res.status(200).json({ code: 0, message: "Sua that bai" });
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

const handleDeleteCompany = async function (req, res) {
  try {
    let id = req.body.id;
    const result = await deleteCompany(id);
    if (result) {
      res.status(200).json({ code: 1, message: "Xoa thanh cong" });
    } else {
      res.status(200).json({ code: 0, message: "Xoa that bai" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const handleSearchCompany = async (req, res) => {
  try {
    const allCompany = await getCompany();
    const { search } = req.query;
    const value = String(search).toLowerCase();
    const resultSearch = allCompany.filter((o) =>
      Object.entries(o).some((entry) =>
        String(entry[1]).toLowerCase().includes(value)
      )
    );
    if (resultSearch) {
      res
        .status(200)
        .json({ code: 1, message: "Tìm kiếm thành công", data: resultSearch });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: -1, message: "Lỗi server" });
  }
};

export {
  handleGetCompany,
  handleInsertCompany,
  handleDeleteCompany,
  handelUpdateCompany,
  handleCreateReceived,
  handleGetCompanyRunning,
};
