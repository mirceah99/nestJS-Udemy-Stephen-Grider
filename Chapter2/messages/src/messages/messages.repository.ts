import { readFile, writeFile } from 'fs/promises';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesRepository {
  private async readContent() {
    return JSON.parse(await readFile('messages.json', 'utf-8'));
  }
  private async writeContent(messages) {
    await writeFile('messages.json', JSON.stringify(messages));
  }
  private generateId() {
    return Math.ceil(Math.random() * 1_000_000);
  }
  async findById(id: string) {
    return (await this.readContent())[id];
  }
  async findAll() {
    return await this.readContent();
  }
  async create(content: string) {
    const messages = await this.readContent();
    const id = this.generateId();
    messages[id] = { id, content };
    await this.writeContent(messages);
    return { id, content };
  }
}
