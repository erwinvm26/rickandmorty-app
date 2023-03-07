import "dotenv/config";

export default {
  port: parseInt(process.env.PORT || "4000", 10),
  secret_key: process.env.SECRET_KEY || "W9x}}wtD@VEiJfF6)*o]gzcFrcz#SR",
  api_rick_and_morty: process.env.API_RICK_AND_MORTY || ""
};
