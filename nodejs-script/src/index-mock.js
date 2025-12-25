// Convenience entrypoint for running the optimizer without Laravel.
// This keeps Windows usage simple (no need for `set MOCK_MODE=true`).
process.env.MOCK_MODE = "true";

require("dotenv").config();
const ArticleOptimizer = require("./ArticleOptimizer");

async function main() {
  console.log("🧪 Running in MOCK_MODE (no Laravel required)");
  console.log("🚀 Starting Article Optimization Script...\n");

  try {
    const optimizer = new ArticleOptimizer();
    await optimizer.run();
    console.log("\n✅ Script completed successfully!");
  } catch (error) {
    console.error("\n❌ Script failed:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
