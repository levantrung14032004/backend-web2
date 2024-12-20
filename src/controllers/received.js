import {
  getGoodsReceived,
  getDetailGoodsReceived,
} from "../services/received.js";

const handleGetGoodsReceived = async (req, res) => {
  try {
    const response = await getGoodsReceived();
    if (response) {
      res.status(200).json({
        code: 1,
        message: "Lay phieu nhap thanh cong",
        result: response,
      });
    } else {
      res.status(401).json("Co loi khi lay phieu nhap");
    }
  } catch (error) {
    res.status(401).error(error.message);
  }
};

const handleGetDetailGoodsReceived = async (req, res) => {
  try {
    const response = await getDetailGoodsReceived();
    if (response) {
      const result = response.reduce((acc, cur) => {
        const found = acc.find((item) => item.idReceived === cur.idReceived);
        if (!found) {
          acc.push({
            idReceived: cur.idReceived,
            dateReceived: cur.dateReceived,
            name_company: cur.name_company,
            noteReceived: cur.noteReceived,
            total_value: cur.total_value,
            details: [
              {
                id: cur.id,
                title: cur.title,
                quantity: cur.quantity,
                price: cur.price,
              },
            ],
          });
        } else {
          found.details.push({
            id: cur.id,
            title: cur.title,
            quantity: cur.quantity,
            price: cur.price,
          });
        }
        return acc;
      }, []);
      res.status(200).json({ code: 1, message: "Đã cập nhật", result: result });
    } else {
      res
        .status(401)
        .json({ code: 0, message: "Có lỗi khi lấy chi tiết phiếu nhập" });
    }
  } catch (error) {
    res.status(401).error(error.message);
  }
};

const handleSearchReceived = async (req, res) => {
  try {
    const allReceived = await getDetailGoodsReceived();
    const result = allReceived.reduce((acc, cur) => {
      const found = acc.find((item) => item.idReceived === cur.idReceived);
      if (!found) {
        acc.push({
          idReceived: cur.idReceived,
          dateReceived: cur.dateReceived,
          name_company: cur.name_company,
          noteReceived: cur.noteReceived,
          total_value: cur.total_value,
          details: [
            {
              id: cur.id,
              title: cur.title,
              quantity: cur.quantity,
              price: cur.price,
            },
          ],
        });
      } else {
        found.details.push({
          id: cur.id,
          title: cur.title,
          quantity: cur.quantity,
          price: cur.price,
        });
      }
      return acc;
    }, []);
    const { search } = req.query;
    const value = String(search).toLowerCase().trim();
    const resultSearch = result.filter((o) =>
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
  handleGetGoodsReceived,
  handleGetDetailGoodsReceived,
  handleSearchReceived,
};
