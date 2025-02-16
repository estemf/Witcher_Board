import express from "express";
import { routes } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerJson from "./swagger.json";

import * as ContractPopulator from "./populators/contractPopulator";
import * as WitcherPopulator from "./populators/witcherPopulator";

const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.json({ strict: false }));

app.use(routes);
app.use(express.static("public"));
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));

WitcherPopulator.populate();
ContractPopulator.populate();

app.listen(port, () => {
  console.log(`WitcherBoard API listening on port ${port}!`);
});
