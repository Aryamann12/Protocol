# Quick Test Guide - CRON Jobs

## 🚀 Start the Server

```bash
cd backend
npm run start:dev
```

Wait for the server to start (you'll see "🚀 Backend server running...").

## ✅ Test CRON Jobs

You have 2 options:

### Option 1: Test via curl (Terminal)

```bash
# Test all at once
curl http://localhost:3001/api/scheduler/test-all

# Or test individually
curl -X POST http://localhost:3001/api/scheduler/trigger/life-optimizer
curl -X POST http://localhost:3001/api/scheduler/trigger/fridge-manager
curl -X POST http://localhost:3001/api/scheduler/trigger/progress-review
curl -X POST http://localhost:3001/api/scheduler/trigger/problem-detector
```

### Option 2: Test via Browser/Postman

Open in browser:
```
http://localhost:3001/api/scheduler/test-all
```

Or use the `test-cron.http` file if you have REST Client extension.

## 📋 Expected Output

Each use case should return JSON with:
```json
{
  "success": true,
  "useCase": "Life Optimizer",
  "result": "... detailed briefing ..."
  "timestamp": "2025-11-16T..."
}
```

## ⏰ Automatic Execution

CRON jobs will run automatically at **8:30 AM IST** every day.

Check server logs to see the output:
```bash
# Watch the logs
npm run start:dev

# At 8:30 AM, you'll see:
# 🌅 Running Life Optimizer - Daily Morning Briefing
# 🍽️ Running Smart Fridge Manager - Waste Prevention
# 📊 Running Progress Accountability Partner
# 🔍 Running Proactive Problem Detector
```

## 🐛 Troubleshooting

**Server won't start?**
- Check if port 3001 is free
- Verify `.env` file exists
- Check Ollama is running: `ollama ps`

**Empty results?**
- Verify MongoDB connection in `.env`
- Check if collections have data
- Test health endpoint: `http://localhost:3001/api/health`

**Slow responses?**
- Local Ollama models take 30-60s per use case
- Each use case analyzes multiple collections
- Be patient! ☕

## 📊 Next Steps

1. ✅ Test all endpoints
2. ✅ Verify output quality
3. ✅ Wait for 8:30 AM tomorrow to see automatic execution
4. 📧 Add email/WhatsApp notifications (future)
5. 🔄 Connect MCP servers for external data (future)

