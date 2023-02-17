import "reflect-metadata";
import { app, port } from "./app";

app.listen(port, () => {
  console.log(`Server is Listening on ${port}`);
});
