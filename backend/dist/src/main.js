"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    const port = process.env.PORT || 3001;
    try {
        await app.listen(port);
        console.log(`🚀 Backend server running on http://localhost:${port}`);
        console.log(`📊 API endpoints available at http://localhost:${port}/api`);
    }
    catch (error) {
        if (error.code === 'EADDRINUSE') {
            console.error(`❌ Port ${port} is already in use.`);
            console.error(`💡 To fix this, run one of the following:`);
            console.error(`   Windows PowerShell: Get-NetTCPConnection -LocalPort ${port} | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }`);
            console.error(`   Or change the port by setting PORT environment variable: PORT=3002 npm run start:dev`);
            process.exit(1);
        }
        throw error;
    }
}
bootstrap();
//# sourceMappingURL=main.js.map