import { DataSource } from "typeorm";
import Article from "../src/models/Article.ts";
const AppDataSource = new DataSource({
  type: "sqlite",
  database: "/home/fosec/Tropical/react/bt6/common/dbapi.sqlite",
  entities: [Article],
  synchronize: true,
});
AppDataSource.initialize().catch((err) => {
  console.log(err);
});
export default AppDataSource;
