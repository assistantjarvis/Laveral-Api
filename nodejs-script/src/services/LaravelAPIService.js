const axios = require("axios");
const fs = require("fs");
const path = require("path");

class LaravelAPIService {
  constructor() {
    this.baseUrl = process.env.LARAVEL_API_URL || "http://localhost:8000/api";
    this.mockMode =
      String(process.env.MOCK_MODE || "").toLowerCase() === "true";
    this.mockStorePath = path.resolve(__dirname, "../../mock/articles.json");
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  readMockArticles() {
    try {
      const raw = fs.readFileSync(this.mockStorePath, "utf8");
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (_error) {
      return [];
    }
  }

  writeMockArticles(articles) {
    fs.mkdirSync(path.dirname(this.mockStorePath), { recursive: true });
    fs.writeFileSync(
      this.mockStorePath,
      JSON.stringify(articles, null, 2),
      "utf8"
    );
  }

  getMockLatestArticle() {
    const articles = this.readMockArticles();
    if (articles.length === 0) return null;
    return [...articles].sort((a, b) => {
      const aDate = a.published_at ? Date.parse(a.published_at) : 0;
      const bDate = b.published_at ? Date.parse(b.published_at) : 0;
      if (!Number.isNaN(aDate) && !Number.isNaN(bDate) && aDate !== bDate) {
        return bDate - aDate;
      }
      return (b.id || 0) - (a.id || 0);
    })[0];
  }

  shouldFallbackToMock(error) {
    if (this.mockMode) return true;
    if (!error) return false;
    const networkCodes = new Set([
      "ECONNREFUSED",
      "ENOTFOUND",
      "ETIMEDOUT",
      "ECONNABORTED",
    ]);
    return Boolean(error.code && networkCodes.has(error.code));
  }

  async getLatestArticle() {
    try {
      if (this.mockMode) {
        console.log(
          "   🧪 MOCK_MODE enabled: reading latest article from local JSON store"
        );
        return this.getMockLatestArticle();
      }
      const response = await this.client.get("/articles/latest");
      return response.data.data || response.data;
    } catch (error) {
      if (this.shouldFallbackToMock(error)) {
        console.log(
          "   ⚠️  Laravel API unreachable, falling back to local JSON mock store"
        );
        return this.getMockLatestArticle();
      }
      console.error("   Error fetching latest article:", error.message);
      throw error;
    }
  }

  async getAllArticles() {
    try {
      if (this.mockMode) {
        console.log(
          "   🧪 MOCK_MODE enabled: reading articles from local JSON store"
        );
        return this.readMockArticles();
      }
      const response = await this.client.get("/articles");
      return response.data.data || response.data;
    } catch (error) {
      if (this.shouldFallbackToMock(error)) {
        console.log(
          "   ⚠️  Laravel API unreachable, falling back to local JSON mock store"
        );
        return this.readMockArticles();
      }
      console.error("   Error fetching articles:", error.message);
      throw error;
    }
  }

  async getArticle(id) {
    try {
      if (this.mockMode) {
        const articles = this.readMockArticles();
        return articles.find((a) => String(a.id) === String(id)) || null;
      }
      const response = await this.client.get(`/articles/${id}`);
      return response.data.data || response.data;
    } catch (error) {
      if (this.shouldFallbackToMock(error)) {
        const articles = this.readMockArticles();
        return articles.find((a) => String(a.id) === String(id)) || null;
      }
      console.error(`   Error fetching article ${id}:`, error.message);
      throw error;
    }
  }

  async createArticle(articleData) {
    try {
      if (this.mockMode) {
        const articles = this.readMockArticles();
        const nextId =
          articles.reduce((max, a) => Math.max(max, Number(a.id) || 0), 0) + 1;
        const created = {
          id: nextId,
          created_at: new Date().toISOString(),
          ...articleData,
        };
        articles.push(created);
        this.writeMockArticles(articles);
        return created;
      }
      const response = await this.client.post("/articles", articleData);
      return response.data.data || response.data;
    } catch (error) {
      if (this.shouldFallbackToMock(error)) {
        const articles = this.readMockArticles();
        const nextId =
          articles.reduce((max, a) => Math.max(max, Number(a.id) || 0), 0) + 1;
        const created = {
          id: nextId,
          created_at: new Date().toISOString(),
          ...articleData,
        };
        articles.push(created);
        this.writeMockArticles(articles);
        return created;
      }
      console.error("   Error creating article:", error.message);
      throw error;
    }
  }

  async updateArticle(id, articleData) {
    try {
      if (this.mockMode) {
        const articles = this.readMockArticles();
        const index = articles.findIndex((a) => String(a.id) === String(id));
        if (index === -1) {
          throw new Error("Article not found in mock store");
        }

        articles[index] = {
          ...articles[index],
          ...articleData,
          updated_at: new Date().toISOString(),
        };
        this.writeMockArticles(articles);
        return articles[index];
      }
      const response = await this.client.put(`/articles/${id}`, articleData);
      return response.data.data || response.data;
    } catch (error) {
      if (this.shouldFallbackToMock(error)) {
        const articles = this.readMockArticles();
        const index = articles.findIndex((a) => String(a.id) === String(id));
        if (index === -1) {
          throw new Error("Article not found in mock store");
        }

        articles[index] = {
          ...articles[index],
          ...articleData,
          updated_at: new Date().toISOString(),
        };
        this.writeMockArticles(articles);
        return articles[index];
      }
      console.error(`   Error updating article ${id}:`, error.message);
      throw error;
    }
  }

  async deleteArticle(id) {
    try {
      if (this.mockMode) {
        const articles = this.readMockArticles();
        const index = articles.findIndex((a) => String(a.id) === String(id));
        if (index === -1) {
          return { success: false, message: "Article not found in mock store" };
        }
        articles.splice(index, 1);
        this.writeMockArticles(articles);
        return { success: true };
      }
      const response = await this.client.delete(`/articles/${id}`);
      return response.data;
    } catch (error) {
      if (this.shouldFallbackToMock(error)) {
        const articles = this.readMockArticles();
        const index = articles.findIndex((a) => String(a.id) === String(id));
        if (index === -1) {
          return { success: false, message: "Article not found in mock store" };
        }
        articles.splice(index, 1);
        this.writeMockArticles(articles);
        return { success: true };
      }
      console.error(`   Error deleting article ${id}:`, error.message);
      throw error;
    }
  }
}

module.exports = LaravelAPIService;
