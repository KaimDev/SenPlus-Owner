import { IMessageDTO } from "../../types";

export class MessageDTO implements IMessageDTO {
  text: string;
  chatId: number;

  constructor(text: string, chatId: number) {
    this.text = text;
    this.chatId = chatId;
  }

  static fromRequestBody(body: any): MessageDTO {
    const { text, chatId } = body;
    return new MessageDTO(text, parseInt(chatId));
  }

  validate(): never | void {
    if (!this.text || !this.chatId) {
      throw new Error('Los campos "text" y "chatId" son obligatorios.');
    }
  }
}
