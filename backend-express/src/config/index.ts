import "dotenv/config";

export default {
  port: parseInt(process.env.PORT || "3000", 10),
  secret_key: process.env.SECRET_KEY || "",
  api_rick_and_morty: process.env.API_RICK_AND_MORTY || ""
};
