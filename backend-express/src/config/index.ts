import "dotenv/config";

export default {
  port: parseInt(process.env.PORT || "3000", 10),
  secret_key: process.env.SECRET_KEY || ""
};
