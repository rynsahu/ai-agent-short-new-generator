import { ChatOllama } from '@langchain/ollama';
import dotenv from 'dotenv';

dotenv.config();

export interface ModelConfig {
  modelName: string;
  temperature: number;
  maxTokens?: number;
}

const defaultConfig: ModelConfig = {
  modelName: process.env.MODEL_NAME || 'llama3.2', 
  temperature: 0.7,
  maxTokens: 131072,
};

export function getModel(config: ModelConfig = defaultConfig) {
  const environment = process.env.ENVIRONMENT || 'development';

  if (environment === 'development') {
    return new ChatOllama({
      baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
      model: config.modelName,
      temperature: config.temperature,
    });
  } else {
    return new ChatOllama({
      baseUrl: process.env.OLLAMA_BASE_URL,
      model: config.modelName,
      temperature: config.temperature,
    });
  }
} 