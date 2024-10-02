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

export { getGoodsReceived };
