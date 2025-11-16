# CRON Jobs - Real Life Problem Solver for Aryamann Tomar

## Overview

Automated daily CRON jobs that run at **8:30 AM IST** to provide actionable insights and solve real-life problems.

## 🌅 USE CASE 1: Life Optimizer - Daily Morning Briefing

**Schedule**: Every day at 8:30 AM  
**CRON**: `30 8 * * *`  
**Agent Pattern**: Swarm (parallel analysis across all domains)

### What It Does:
- Analyzes overnight data across all collections
- Generates personalized morning briefing with:
  - 🚨 **URGENT ACTIONS**: Things needing immediate attention
  - 📊 **PROGRESS HIGHLIGHTS**: Recent achievements
  - 💡 **OPTIMIZATION SUGGESTIONS**: Efficiency improvements
  - 🎯 **DAILY GOALS**: Specific targets for today

### Example Output:
```
╔══════════════════════════════════════════════════════════════════════════╗
║                    🌅 GOOD MORNING, ARYAMANN! 🌅                        ║
║                    Life Optimizer Daily Briefing                         ║
║                    Saturday, November 16, 2025                           ║
╚══════════════════════════════════════════════════════════════════════════╝

🚨 URGENT (Action Needed Today):
- 3 fridge items expiring in 48h (Milk, Eggs, Yogurt)
- Gym: Skipped legs for 8 days
- TLE Module "Binary Search" stalled at 40% for 10 days

📊 PROGRESS HIGHLIGHTS:
- Solved 15 coding problems this week (+25% vs last week)
- "NLP with Transformers" - 2 chapters from completion

💡 OPTIMIZATION SUGGESTIONS:
- Netflix & Prime unused this week → Consider pausing (₹1000/month)
- Scooty usage down 60% → Check maintenance

🎯 DAILY GOALS:
- Legs workout + 15 min cardio
- Solve 2 Binary Search problems
- Read 1 chapter
```

---

## 🍽️ USE CASE 2: Smart Fridge Manager - Waste Prevention

**Schedule**: Every day at 8:30 AM  
**CRON**: `30 8 * * *`  
**Agent Pattern**: Inventory Agent

### What It Does:
- Scans fridge items by expiry date
- Identifies items expiring in next 3 days
- Generates meal suggestions using expiring ingredients
- Creates shopping list for missing items
- Tracks consumption patterns

### Example Output:
```
╔══════════════════════════════════════════════════════════════════════════╗
║                   🍽️ SMART FRIDGE MANAGER 🍽️                            ║
║                   Waste Prevention Report                                 ║
╚══════════════════════════════════════════════════════════════════════════╝

⚠️ EXPIRING SOON (Next 3 Days):
1. Milk (1L) - expires 2025-11-18 (2 days)
2. Eggs (6 pack) - expires 2025-11-19 (3 days)
3. Yogurt - expires 2025-11-17 (1 day)

🍳 MEAL SUGGESTIONS:
- Breakfast: Omelet with toast (uses eggs, milk)
- Snack: Yogurt smoothie (uses yogurt, fruits)
- Dinner: French toast (uses eggs, milk)

📝 SHOPPING LIST:
- Fresh vegetables (none in stock)
- Fruits (low stock)
- Bread (running low)

💡 CONSUMPTION PATTERNS:
- You consume dairy products 3 days before expiry on average
- Vegetables are used most frequently
- Consider buying smaller quantities of milk
```

---

## 📊 USE CASE 3: Progress Accountability Partner

**Schedule**: Every day at 8:30 AM  
**CRON**: `30 8 * * *`  
**Agent Pattern**: Sequential (multi-stage analysis)

### What It Does:
- Analyzes progress across all domains
- Compares current week vs previous weeks
- Identifies declining patterns
- Sets micro-goals for next 7 days
- Provides honest accountability feedback

### Example Output:
```
╔══════════════════════════════════════════════════════════════════════════╗
║                 📊 PROGRESS ACCOUNTABILITY PARTNER 📊                    ║
║                        Weekly Review Report                               ║
╚══════════════════════════════════════════════════════════════════════════╝

💪 FITNESS PROGRESS:
- Workouts this week: 4/6 (67% target)
- Consistency: Down 15% from last week
- ALERT: Legs not trained in 8 days
- Recommendation: Add 1 extra leg session this week

📚 LEARNING PROGRESS:
- Problems solved: 15 (+25% vs last week) ✅
- Courses active: 3
- Books in progress: 2
- CONCERN: TLE Binary Search module stalled
- Recommendation: Dedicate 2 hours to Binary Search today

📈 WEEKLY COMPARISON:
- This week: 8/10 goals achieved
- Last week: 7/10 goals achieved
- Improvement: +10% 🎉

⚠️ ACCOUNTABILITY ALERTS:
1. Fitness consistency declining
2. One course has no activity for 12 days
3. Book reading dropped from 1h/day to 30min/day

🎯 MICRO-GOALS (Next 7 Days):
1. Complete 6/6 workouts (including 2 leg sessions)
2. Solve 20 coding problems
3. Complete Binary Search module
4. Finish "NLP with Transformers" book
5. Update course progress daily
```

---

## 🔍 USE CASE 4: Proactive Problem Detector

**Schedule**: Every day at 8:30 AM  
**CRON**: `30 8 * * *`  
**Agent Pattern**: Conditional (intelligent routing)

### What It Does:
- Detects stale learning (no progress >2 weeks)
- Identifies fitness gaps
- Alerts on expiring resources (warranties, subscriptions)
- Finds unused assets
- Flags health risks

### Example Output:
```
╔══════════════════════════════════════════════════════════════════════════╗
║                 🔍 PROACTIVE PROBLEM DETECTOR 🔍                         ║
║                    Early Warning System                                   ║
╚══════════════════════════════════════════════════════════════════════════╝

🔴 HIGH SEVERITY:
1. STALE LEARNING
   - "Coding Ninjas Advanced C++" - No activity for 18 days
   - Action: Resume or archive the course

2. FITNESS GAPS
   - Last workout: 3 days ago
   - Legs not trained: 8 days (longest gap in 2 months)
   - Action: Schedule leg workout today

🟡 MEDIUM SEVERITY:
3. EXPIRING RESOURCES
   - ROG M16 warranty expires in 30 days
   - Action: Book service check or extend warranty

4. UNUSED ASSETS
   - Guitar (musical instruments) - No activity logs
   - Action: Practice 15 min daily or consider lending

🟢 LOW SEVERITY:
5. HEALTH RISKS
   - High-priority fridge items: Yogurt expires in 1 day
   - Action: Consume today

6. SUBSCRIPTION OPTIMIZATION
   - Netflix + Prime = ₹1000/month
   - Usage: 0 hours this week
   - Action: Pause for 1 month, reassess

📊 SUMMARY:
- Total problems detected: 6
- Immediate actions needed: 2
- Estimated time saved: 2 hours
- Estimated money saved: ₹1000/month
```

---

## 🚀 How to Use

### 1. Automatic Execution
CRON jobs run automatically at 8:30 AM IST every day. Check server logs:
```bash
cd backend
npm run start:dev
# Watch logs at 8:30 AM for outputs
```

### 2. Manual Testing (API Endpoints)

Test individual use cases:
```bash
# Test Life Optimizer
POST http://localhost:3001/api/scheduler/trigger/life-optimizer

# Test Fridge Manager
POST http://localhost:3001/api/scheduler/trigger/fridge-manager

# Test Progress Review
POST http://localhost:3001/api/scheduler/trigger/progress-review

# Test Problem Detector
POST http://localhost:3001/api/scheduler/trigger/problem-detector

# Test ALL at once
GET http://localhost:3001/api/scheduler/test-all
```

### 3. Disable CRON Jobs
Edit `backend/src/scheduler/scheduler.service.ts` and comment out `@Cron()` decorators.

---

## 📧 Future Enhancements

- [ ] Email notifications
- [ ] WhatsApp alerts via Twilio
- [ ] Frontend dashboard integration
- [ ] MCP server integration for external data
- [ ] AI-powered action automation
- [ ] Historical trend analysis
- [ ] Custom scheduling per use case

---

## 🛠️ Troubleshooting

**CRON not running?**
- Check server logs for scheduler initialization
- Verify timezone: `Asia/Kolkata`
- Ensure server is running at 8:30 AM

**Empty outputs?**
- Verify MongoDB connection
- Check if collections have data
- Test Ollama model: `ollama ps`

**Slow execution?**
- Each use case may take 30-60 seconds with local LLM
- Consider using GPT-4 for faster responses
- Optimize agent queries

---

## 📝 Configuration

All CRON jobs are configured in:
- `backend/src/scheduler/scheduler.service.ts`

Timezone: `Asia/Kolkata` (IST)
Schedule: `30 8 * * *` (8:30 AM daily)

To change schedule:
```typescript
@Cron('30 8 * * *', {  // minute hour day month dayOfWeek
  name: 'job-name',
  timeZone: 'Asia/Kolkata',
})
```

