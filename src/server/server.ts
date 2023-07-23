import http from "http";
import { MessageDTO } from "./dto/message.dto";
import { sendMessage } from "../utils/send-message";
require("dotenv").config();

export function Server() {
  const port = 3000;
  const bearerToken = process.env.BEARER_TOKEN;

  const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      if (req.method === "POST" && req.url === "/message") {
        const authorizationHeader = req.headers["authorization"];
        const tokenFromHeader = authorizationHeader ? authorizationHeader.replace("Bearer ", "") : undefined;

        if (tokenFromHeader !== bearerToken) {
          // Token from header does not match the expected bearerToken
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Unauthorized" }));
          return;
        }

        let body = "";

        req.on("data", (chunk) => {
          body += chunk;
        });

        req.on("end", () => {
          try {
            const data = JSON.parse(body);

            const messageDTO = MessageDTO.fromRequestBody(data);

            // Validate DTO before continue
            messageDTO.validate();

            sendMessage(messageDTO.chatId, messageDTO.text);
            console.log(messageDTO);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true }));

          } catch (error: any) {
            console.error("Error processing data:", error.message);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: "Server error" }));
          }
        });
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Endpoint not found");
      }
    } catch (error: any) {
      console.error("Server Error:", error.message);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: "Server Error" }));
    }
  });

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}
