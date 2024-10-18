import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_KEY, (err, employee) => {
      if (err) {
        return res.status(403).json("Token không hợp lệ");
      }
      console.log(employee);
      req.employee = employee;
      next();
    });
  } else {
    return res.status(401).json("Chưa có token");
  }
};

export { verifyToken };
