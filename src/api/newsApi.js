import axios from "axios";
import { NEWSAPI_KEY } from "../config";

export async function fetchTopHeadlines({
  category = "general",
  pageSize = 50,
  country = "us",
}) {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: { category, pageSize, country, apiKey: NEWSAPI_KEY },
    });
    return response.data.articles;
  } catch (err) {
    throw new Error("Failed to fetch news data.");
  }
}
