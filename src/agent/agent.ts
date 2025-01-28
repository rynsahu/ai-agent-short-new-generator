import { StateGraph, END } from '@langchain/langgraph';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { ChatPromptTemplate, MessagesPlaceholder, HumanMessagePromptTemplate } from '@langchain/core/prompts';
import { BaseMessage } from '@langchain/core/messages';
import { RunnableSequence } from '@langchain/core/runnables';
import { getModel } from '../config/model.config';

interface AgentState {
  messages: BaseMessage[];
  current_step: string;
  input?: string;
  output?: string;
}

type NodeNames = '__start__' | '__end__' | 'process';

export class AIAgent {
  private model: BaseChatModel;
  private workflow: StateGraph<AgentState, AgentState, Partial<AgentState>, NodeNames>;

  constructor() {
    this.model = getModel() as BaseChatModel;
    this.workflow = new StateGraph<AgentState, AgentState, Partial<AgentState>, NodeNames>({
      channels: {
        messages: {
          value: () => [] as BaseMessage[],
          reducer: (prev, value) => [...prev, value],
        },
        current_step: {
          value: () => 'initial',
          reducer: (_, value) => value,
        },
        input: {
          value: () => "",
          reducer: (_, value) => value,
        },
        output: {
          value: () => "",
          reducer: (_, value) => value,
        },
      },
    });

    this.setupWorkflow();
  }

  private setupWorkflow() {
    const prompt = ChatPromptTemplate.fromMessages([
      HumanMessagePromptTemplate.fromTemplate(
        `You are a skilled tech journalist who specializes in writing engaging, concise news summaries.

        Transform the following article into a punchy 60-word news brief with eye catching title in max 5 words. Focus on the core impact and key developments. Use natural, conversational language while maintaining professionalism. Avoid jargon unless absolutely necessary.

        Original Article:
        {input}

        Guidelines:
        - Lead with the most impactful information
        - Include specific numbers or data points if crucial
        - Use active voice
        - Keep it exactly to 60 words not more not less
        - Title should be in max 5 words
        - Maintain an informative yet friendly tone
        - Do not include any other information in the summary

        Write the summary now:`
      ),
      new MessagesPlaceholder("messages"),
    ]);

    // Define the main processing node
    const processNode = RunnableSequence.from([
      (state: AgentState) => ({
        input: state.input,
        current_step: state.current_step,
        messages: state.messages,
      }),
      prompt,
      this.model,
      (response) => ({ messages: [response], output: response.content })
    ]);

    // Add the node to the workflow
    this.workflow.addNode("process", processNode, { ends: [END] });

    // Connect nodes
    this.workflow.addEdge("__start__", "process");
  }

  async run(input: string) {
    const initialState: AgentState = {
      messages: [],
      current_step: 'initial',
      input: input,
      output: ''
    };

    const executor = this.workflow.compile();
    const result = await executor.invoke(initialState);
    return result.output;
  }
} 