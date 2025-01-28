# AI Agent with LangGraph.js and Deepseek

This project implements an AI agent using LangGraph.js with support for both local development using Ollama (with deepseek-r1:7b model) and production deployment using the Deepseek API.

## Prerequisites

- Node.js (v16 or higher)
- Ollama installed locally (for development)
- Deepseek API key (for production)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` to `.env` and configure your environment variables:
   ```
   ENVIRONMENT=development # or production
   OLLAMA_BASE_URL=http://localhost:11434
   DEEPSEEK_API_KEY=your_api_key_here
   ```

4. For local development:
   - Make sure Ollama is running
   - Pull the deepseek model:
     ```bash
     ollama pull deepseek-r1:7b
     ```

## Development

1. Build the project:
   ```bash
   npm run build
   ```

2. Run the example:
   ```bash
   npm start
   ```

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