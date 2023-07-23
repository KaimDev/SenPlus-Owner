import http from "http";
import { MessageDTO } from "./dto/message.dto";
import { sendMessage } from "../utils/send-message";

export function Server() {
  const port = 3000;

  const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    try {
      if (req.method === "POST" && req.url === "/message") {
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
