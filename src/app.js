import app from "./index";
import { ioConnect } from "./helpers/socketio";
import httpServer from "http";
const http = httpServer.Server(app);
const port = process.env.PORT || 3000;

try {
  http.listen(port, '0.0.0.0', () => {
    console.log(`server running on port ${port}`);
  });
  ioConnect(http);
} catch (error) {
  console.log(error);
}
export default http;