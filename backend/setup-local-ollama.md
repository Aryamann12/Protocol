# Setup Local Ollama Model

To use your local Ollama model (`gemma3:1b`), create a `.env` file in the `backend/` directory with:

```env
# Enable Local LLM
USE_LOCAL_LLM=true
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma3:1b

# MongoDB Connection (keep your existing settings)
MONGODB_USERNAME=aryamatomar
MONGODB_PASSWORD=iSo9H2oZrdn6WlVV
MONGODB_HOST=jstraining.buufn0n.mongodb.net
MONGODB_DATABASE=AryamannLifeVars

# Server Configuration
PORT=3001
NODE_ENV=development
```

Then restart your backend server.

