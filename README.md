# AI Agent with LangGraph.js and Deepseek

This project implements an AI agent using LangGraph.js with support for both local development using Ollama (with deepseek-r1:7b model) and production deployment using the Deepseek API.

## Prerequisites

- Node.js (v18 or higher)
- Ollama installed locally (for development)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` to `.env` and configure your environment variables:
   ```
   ENVIRONMENT=development # or production
   OLLAMA_BASE_URL=http://127.0.0.1:11434
   DEEPSEEK_API_KEY=your_api_key_here
   MODEL_NAME='llama3.2'
   ```

4. For local development:
   - Make sure Ollama is running
   - Pull the deepseek model:
     ```bash
     ollama pull llama3.2
     ```

## Development

1. Run dev envirment:
   ```bash
   npm run dev
   ```

2. Node server will start:
   ```bash
   http://localhost:11333
   ```

## How to use AI Agent
`http://localhost:11333/news?article=<page the article here>`

## Project Structure

- `src/config/model.config.ts` - Model configuration and environment-based selection
- `src/agent/agent.ts` - Main AI agent implementation using LangGraph
- `src/index.ts` - Example usage

## Features

- Flexible model selection based on environment
- Local development support with Ollama
- Production deployment with Deepseek API
- State management using LangGraph
- Type-safe implementation with TypeScript

## License

MIT
