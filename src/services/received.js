import connection from "../database/database.js";

const getGoodsReceived = async function () {
  try {
    const [values, fields] = await connection.execute(
      `select gr.id, gr.dateReceived, company_delivery.name as 'name_company', gr.noteReceived, 
      gr.total_value from goodsreceived as gr join company_delivery 
      on gr.companyReceived = company_delivery.id`
    );
    if (values) {
      return values;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getDetailGoodsReceived = async function () {
  try {
    const [values] = await connection.execute(
      `select p.id,g.id as idReceived, p.title, gd.quantity, gd.price, g.dateReceived, cd.name as name_company, g.noteReceived, g.total_value
from goodsreceiveddetails gd join goodsreceived g on g.id = gd.idReceived
join product p on gd.idProduct = p.id
join company_delivery cd on cd.id =  g.companyReceived
`
    );
    if (values) {
      return values;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getGoodsReceived, getDetailGoodsReceived };
