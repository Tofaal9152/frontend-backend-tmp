import { app } from "./app.js";
import connectDb from "./db/database.js";

connectDb();


app.listen(process.env.PORT, () => {
  console.log(`Server listen at port ${process.env.PORT}`);
});
