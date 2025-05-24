// src/worker.js
import { WebWorkerEngine } from '@mlc-ai/web-llm';

// Create an instance of WebWorkerEngine
const engine = new WebWorkerEngine();

// Listen for messages from the main thread
self.onmessage = async (event) => {
  const { data } = event;
  try {
    const result = await engine.handleTask(data);
    self.postMessage({ result });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
};