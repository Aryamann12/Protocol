"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const agents_service_1 = require("../agents/agents.service");
const collections_service_1 = require("../collections/collections.service");
let SchedulerService = SchedulerService_1 = class SchedulerService {
    constructor(agentsService, collectionsService) {
        this.agentsService = agentsService;
        this.collectionsService = collectionsService;
        this.logger = new common_1.Logger(SchedulerService_1.name);
    }
    async runLifeOptimizer() {
        this.logger.log('🌅 Running Life Optimizer - Daily Morning Briefing');
        try {
            const briefing = await this.generateLifeBriefing();
            this.logger.log('\n' + briefing);
            return briefing;
        }
        catch (error) {
            this.logger.error('Life Optimizer failed:', error);
            return {
                error: true,
                message: error.message || 'Life Optimizer failed',
                stack: error.stack,
                timestamp: new Date().toISOString(),
            };
        }
    }
    async runFridgeManager() {
        this.logger.log('🍽️ Running Smart Fridge Manager - Waste Prevention');
        try {
            const report = await this.generateFridgeReport();
            this.logger.log('\n' + report);
            return report;
        }
        catch (error) {
            this.logger.error('Fridge Manager failed:', error);
        }
    }
    async runProgressReview() {
        this.logger.log('📊 Running Progress Accountability Partner');
        try {
            const review = await this.generateProgressReview();
            this.logger.log('\n' + review);
            return review;
        }
        catch (error) {
            this.logger.error('Progress Review failed:', error);
        }
    }
    async runProblemDetector() {
        this.logger.log('🔍 Running Proactive Problem Detector');
        try {
            const problems = await this.detectProblems();
            this.logger.log('\n' + problems);
            return problems;
        }
        catch (error) {
            this.logger.error('Problem Detector failed:', error);
        }
    }
    async generateLifeBriefing() {
        const query = `
    Generate a comprehensive daily morning briefing for Aryamann Tomar with the following sections:
    
    1. URGENT ACTIONS (things that need immediate attention today)
    2. PROGRESS HIGHLIGHTS (positive achievements and milestones)
    3. OPTIMIZATION SUGGESTIONS (ways to improve efficiency)
    4. DAILY GOALS (specific actionable targets for today)
    
    Analyze all available data across fitness, learning, inventory, and tech domains.
    Be specific with numbers, dates, and actionable recommendations.
    Format the output as a clear, motivating morning briefing.
    `;
        const result = await this.agentsService.processQuery(query, 'swarm');
        const header = `
╔══════════════════════════════════════════════════════════════════════════╗
║                    🌅 GOOD MORNING, ARYAMANN! 🌅                        ║
║                    Life Optimizer Daily Briefing                         ║
║                    ${new Date().toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })}                         ║
╚══════════════════════════════════════════════════════════════════════════╝
`;
        return header + '\n' + result;
    }
    async generateFridgeReport() {
        const fridgeItems = await this.collectionsService.findDocuments('fridgeitems', {}, 100);
        const today = new Date();
        const expiringItems = fridgeItems.filter((item) => {
            if (!item.expiry_date)
                return false;
            const expiryDate = new Date(item.expiry_date);
            const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
            return daysUntilExpiry >= 0 && daysUntilExpiry <= 3;
        });
        const query = `
    Analyze this fridge inventory data and provide:
    
    1. EXPIRING SOON (items expiring in next 3 days): ${JSON.stringify(expiringItems)}
    2. MEAL SUGGESTIONS using these expiring ingredients
    3. SHOPPING LIST for items that are running low or missing
    4. CONSUMPTION PATTERNS and waste prevention tips
    
    Be specific and actionable. Suggest actual meal recipes if possible.
    `;
        const result = await this.agentsService.processQuery(query, 'inventory');
        const header = `
╔══════════════════════════════════════════════════════════════════════════╗
║                   🍽️ SMART FRIDGE MANAGER 🍽️                            ║
║                   Waste Prevention Report                                 ║
╚══════════════════════════════════════════════════════════════════════════╝
`;
        return header + '\n' + result;
    }
    async generateProgressReview() {
        const query = `
    Generate a comprehensive progress review analyzing:
    
    1. FITNESS PROGRESS: Recent workout patterns, consistency, areas of improvement
    2. LEARNING PROGRESS: Course completion, problem-solving activity, knowledge gaps
    3. WEEKLY COMPARISON: How does this week compare to previous weeks?
    4. ACCOUNTABILITY: Identify any declining patterns or missed goals
    5. MICRO-GOALS: Set 3-5 specific, achievable goals for the next 7 days
    
    Be honest about both wins and areas needing improvement.
    Focus on actionable insights that drive real progress.
    `;
        const result = await this.agentsService.processQuery(query, 'sequential');
        const header = `
╔══════════════════════════════════════════════════════════════════════════╗
║                 📊 PROGRESS ACCOUNTABILITY PARTNER 📊                    ║
║                        Weekly Review Report                               ║
╚══════════════════════════════════════════════════════════════════════════╝
`;
        return header + '\n' + result;
    }
    async detectProblems() {
        const [gym, books, courses, fridgeItems, devices] = await Promise.all([
            this.collectionsService.findDocuments('gym-progress', {}, 30),
            this.collectionsService.findDocuments('books', {}, 50),
            this.collectionsService.findDocuments('tlelevel3courses', {}, 50),
            this.collectionsService.findDocuments('fridgeitems', {}, 50),
            this.collectionsService.findDocuments('devices', {}, 50),
        ]);
        const today = new Date();
        const lastWorkout = gym.length > 0 ? new Date(gym[0].date) : null;
        const daysSinceWorkout = lastWorkout
            ? Math.ceil((today.getTime() - lastWorkout.getTime()) / (1000 * 60 * 60 * 24))
            : 999;
        const query = `
    Act as a proactive problem detection system. Analyze the data and identify:
    
    1. STALE LEARNING: Courses or books with no progress for >2 weeks
    2. FITNESS GAPS: Last workout was ${daysSinceWorkout} days ago. Missed muscle groups?
    3. EXPIRING RESOURCES: Warranties, subscriptions ending soon
    4. UNUSED ASSETS: Devices, instruments not being utilized
    5. HEALTH RISKS: High-priority food items not consumed
    
    Data context:
    - Gym sessions: ${gym.length} recorded
    - Books: ${books.length} in library
    - Courses: ${courses.length} enrolled
    - Fridge items: ${fridgeItems.length} items
    - Devices: ${devices.length} devices
    
    For each problem detected, provide:
    - Severity (High/Medium/Low)
    - Specific details
    - Recommended action
    `;
        const result = await this.agentsService.processQuery(query, 'conditional');
        const header = `
╔══════════════════════════════════════════════════════════════════════════╗
║                 🔍 PROACTIVE PROBLEM DETECTOR 🔍                         ║
║                    Early Warning System                                   ║
╚══════════════════════════════════════════════════════════════════════════╝
`;
        return header + '\n' + result;
    }
    async triggerLifeOptimizer() {
        return this.runLifeOptimizer();
    }
    async triggerFridgeManager() {
        return this.runFridgeManager();
    }
    async triggerProgressReview() {
        return this.runProgressReview();
    }
    async triggerProblemDetector() {
        return this.runProblemDetector();
    }
};
exports.SchedulerService = SchedulerService;
__decorate([
    (0, schedule_1.Cron)('30 8 * * *', {
        name: 'life-optimizer',
        timeZone: 'Asia/Kolkata',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "runLifeOptimizer", null);
__decorate([
    (0, schedule_1.Cron)('30 8 * * *', {
        name: 'fridge-manager',
        timeZone: 'Asia/Kolkata',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "runFridgeManager", null);
__decorate([
    (0, schedule_1.Cron)('30 8 * * *', {
        name: 'progress-review',
        timeZone: 'Asia/Kolkata',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "runProgressReview", null);
__decorate([
    (0, schedule_1.Cron)('30 8 * * *', {
        name: 'problem-detector',
        timeZone: 'Asia/Kolkata',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SchedulerService.prototype, "runProblemDetector", null);
exports.SchedulerService = SchedulerService = SchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [agents_service_1.AgentsService,
        collections_service_1.CollectionsService])
], SchedulerService);
//# sourceMappingURL=scheduler.service.js.map