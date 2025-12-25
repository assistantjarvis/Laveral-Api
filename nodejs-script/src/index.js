require('dotenv').config();
const ArticleOptimizer = require('./ArticleOptimizer');

async function main() {
    console.log('🚀 Starting Article Optimization Script...\n');
    
    try {
        const optimizer = new ArticleOptimizer();
        await optimizer.run();
        console.log('\n✅ Script completed successfully!');
    } catch (error) {
        console.error('\n❌ Script failed:', error.message);
        console.error(error.stack);
        process.exit(1);
    }
}

main();
