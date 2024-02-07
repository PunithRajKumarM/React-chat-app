import { AppDataSource } from "./src/data-source";

AppDataSource.initialize()
  .then(async () => {})
  .catch((error) => console.log(error));
