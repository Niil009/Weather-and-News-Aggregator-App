export function filterArticlesByMode(articles, mode) {
  const coldKeywords = [
    "tragedy",
    "disaster",
    "crisis",
    "failure",
    "loss",
    "death",
    "sad",
  ];
  const hotKeywords = [
    "attack",
    "threat",
    "fear",
    "danger",
    "conflict",
    "war",
    "violence",
  ];
  const coolKeywords = [
    "win",
    "success",
    "happy",
    "victory",
    "achievement",
    "celebrate",
  ];

  const keywords =
    mode === "cold"
      ? coldKeywords
      : mode === "hot"
      ? hotKeywords
      : coolKeywords;

  return articles.filter((article) => {
    const text = `${article.title || ""} ${
      article.description || ""
    }`.toLowerCase();
    return keywords.some((keyword) => text.includes(keyword.toLowerCase()));
  });
}
