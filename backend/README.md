# LangGraph Agentic Backend

A NestJS backend server with LangGraph 0.2.x for building agentic architecture that processes data from 17 MongoDB collections related to Aryamann Tomar's life.

## Features

- **Multiple Agent Patterns**: Sequential, Swarm, Conditional, and Loop agents
- **Specialized Domain Agents**: Fitness, Learning, Inventory, and Tech agents
- **Dual LLM Support**: OpenAI (GPT-4/GPT-3.5) and Local models (Ollama) with fallback
- **REST API**: Comprehensive endpoints for querying, analyzing, and generating insights
- **Type-Safe**: Full TypeScript support with typed MongoDB collections

## Architecture

### Agent Patterns

1. **Sequential Agent**: Chains multiple agents in sequence (Fitness → Learning → Inventory → Tech → Aggregate)
2. **Swarm Agent**: Runs all agents in parallel with a coordinator to synthesize results
3. **Conditional Agent**: Routes queries to appropriate domain agents based on query analysis
4. **Loop Agent**: Iteratively refines results until satisfactory or max iterations reached

### Domain Agents

- **Fitness Agent**: Analyzes gym progress and workout data
- **Learning Agent**: Processes books, courses, and coding problems
- **Inventory Agent**: Manages items, fridge contents, devices, and kitchen equipment
- **Tech Agent**: Analyzes streaming apps, social platforms, and tech usage

## Prerequisites

- Node.js 18+ 
- MongoDB Atlas connection (or local MongoDB)
- OpenAI API key (or Ollama for local models)
- Ollama installed and running (if using local models)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
```env
# MongoDB Connection
MONGODB_USERNAME=your-username
MONGODB_PASSWORD=your-password
MONGODB_HOST=jstraining.buufn0n.mongodb.net
MONGODB_DATABASE=AryamannLifeVars

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4

# Local LLM Configuration (Optional)
USE_LOCAL_LLM=true
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:1b
# Make sure Ollama is running: ollama ps

# Server Configuration
PORT=3001
NODE_ENV=development
```

## Data Exploration

Before running the server, explore the MongoDB collections to understand the data structure:

```bash
npm run explore
```

This will:
- Connect to MongoDB
- Fetch sample documents from all 17 collections
- Generate TypeScript interfaces in `src/types/collections.types.ts`
- Create schema documentation in `src/types/schemas.md`

## Running the Server

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

The server will start on `http://localhost:3001` (or the port specified in `.env`).

## API Endpoints

### Health Check
```http
GET /api/health
```

Returns server health status and service connectivity.

### Query Agent
```http
POST /api/agents/query
Content-Type: application/json

{
  "query": "What's my gym progress this month?",
  "pattern": "conditional"  // optional: sequential, swarm, conditional, loop, fitness, learning, inventory, tech
}
```

### Analyze Data
```http
POST /api/agents/analyze
Content-Type: application/json

{
  "query": "Analyze my learning progress",
  "collection": "books"  // optional
}
```

### Generate Insights
```http
POST /api/agents/insights
Content-Type: application/json

{
  "query": "Give me insights about my overall lifestyle"
}
```

### Swarm Execution
```http
POST /api/agents/swarm
Content-Type: application/json

{
  "query": "Comprehensive analysis of all my data"
}
```

### List Collections
```http
GET /api/agents/collections
```

Returns all available MongoDB collections with document counts.

## Collection Schemas

The system works with 17 MongoDB collections organized by domain:

### Fitness Domain
- `gym-progress`: Workout progress tracking
- `exercise-entries`: Individual exercise entries

### Learning Domain
- `books`: Book collection and reading progress
- `udemycourses`: Udemy course access
- `tlelevel3courses`: TLE Level 3 courses
- `codingninjascourses`: Coding Ninjas courses
- `cppproblems`: C++ coding problems
- `cppproblemlists`: C++ problem lists

### Inventory Domain
- `items`: General items
- `wardrobe`: Wardrobe items
- `fridgeitems`: Fridge inventory
- `kitchenequipments`: Kitchen equipment
- `utensils`: Kitchen utensils
- `devices`: Device inventory
- `musicalinstruments`: Musical instruments
- `mobilities`: Mobility/transportation

### Tech Domain
- `streamingapps`: Streaming app subscriptions
- `socialplatforms`: Social platform items
- `airesources`: AI resources
- `modelusages`: AI model usage tracking
- `usagelimits`: Usage limits

### General Domain
- `companies`: Company information
- `users`: User accounts
- `10xiitian_Resources`: 10xIITian resources

See `src/types/schemas.md` for detailed schema documentation.

## Agent Patterns Explained

### Sequential Pattern
Agents execute one after another, with each agent's output feeding into the next:
```
Fitness → Learning → Inventory → Tech → Aggregate
```

### Swarm Pattern
All agents run in parallel, then a coordinator synthesizes the results:
```
[Fitness, Learning, Inventory, Tech] → Coordinator → Result
```

### Conditional Pattern
A routing agent analyzes the query and routes to the most relevant domain agent(s):
```
Query → Router → [Fitness | Learning | Inventory | Tech | All] → Result
```

### Loop Pattern
An agent iteratively refines its response until satisfactory:
```
Query → Process → Evaluate → [Refine | End]
```

## TypeScript Types

All collection types are defined in `src/types/collections.types.ts` with full type safety.

## Development

### Project Structure
```
backend/
├── src/
│   ├── agents/          # Agent implementations
│   │   ├── base/        # Base agent graph
│   │   ├── fitness/     # Fitness domain agent
│   │   ├── learning/    # Learning domain agent
│   │   ├── inventory/   # Inventory domain agent
│   │   ├── tech/        # Tech domain agent
│   │   ├── sequential/ # Sequential pattern
│   │   ├── swarm/       # Swarm pattern
│   │   ├── conditional/ # Conditional pattern
│   │   └── loop/        # Loop pattern
│   ├── api/             # REST API controllers
│   ├── collections/       # Collection service
│   ├── llm/             # LLM service (OpenAI + Local)
│   ├── mongodb/         # MongoDB connection
│   └── types/           # TypeScript types
├── scripts/
│   └── explore-collections.ts  # Data exploration script
└── package.json
```

### Adding New Agents

1. Create agent graph in `src/agents/{domain}/`
2. Extend `BaseAgentGraph` or create custom graph
3. Register in `AgentsService`
4. Add to API endpoints if needed

## Future Enhancements

- WebSocket support for real-time agent responses
- MCP (Model Context Protocol) server integration
- AG UI (Agent UI) frontend components
- Vector embeddings for semantic search
- Agent memory and conversation history

## License

Private project - All rights reserved

