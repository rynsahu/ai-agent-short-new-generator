import { AIAgent } from '../agent/agent';

async function generateShortNew(article: string) {
  try {
    const agent = new AIAgent();
    const result = await agent.run(article);
    return result;
  } catch (error) {
    console.error('Error running agent:', error);
    return error;
  }
}

export default generateShortNew;
