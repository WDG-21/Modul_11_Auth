import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import mongoose from 'mongoose';

import { GoogleGenAI } from '@google/genai';

const model = 'gemini-2.0-flash';
const systemInstruction =
  'You are a Senior Web Developer. Keep your answers concise. Do not provide code, if applicable, but explain concepts that can be used for solving the problem, independet of programming language or framework.';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const dbInit = async () => {
  try {
    const mongo = await mongoose.connect(process.env.MONGO_URI, { dbName: 'aichat' });
    console.log(chalk.cyan(`Connected to DB ${mongo.connection.name}`));
  } catch (error) {
    console.log(error);
  }
};

const ChatSchema = new mongoose.Schema({
  history: {
    type: [{}],
    default: [],
  },
  model: String,
  systemInstruction: String,
});

const Chat = mongoose.model('Chat', ChatSchema);

await dbInit();

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Running' });
});

app.post('/chats', async (req, res) => {
  const { message, stream } = req.body;
  const { chatId } = req.query;

  let currentChat = await Chat.findById(chatId);
  if (!currentChat) {
    currentChat = await Chat.create({});
  }

  const chat = ai.chats.create({
    model,
    history: currentChat.history,
    config: {
      systemInstruction,
    },
  });

  const aiResponse = await chat.sendMessageStream({ message });

  if (stream) {
    res.writeHead(200, {
      connection: 'keep-alive',
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    });

    for await (const chunk of aiResponse) {
      // res.write('data: ' + chunk.text + '\n\n');
      res.write(chunk.text);
    }
    // res.write(`data: chatId: ${currentChat._id}\n\n`);
    res.write(`data: chatId: ${currentChat._id}`);
    res.end();
    res.on('close', async () => {
      currentChat.history = chat.getHistory();
      await currentChat.save();
      res.end();
    });
  } else {
    let answer = '';

    for await (const chunk of aiResponse) {
      answer += chunk.text;
    }

    currentChat.history = chat.getHistory();
    await currentChat.save();
    res.json({ message, aiResponse: answer, chatId: currentChat._id });
  }
});

app.use((err, req, res, next) => res.status(err.cause?.status || 500).json({ message: err.message }));

app.listen(port, () => console.log(chalk.green(`Server listening on port ${port}`)));
