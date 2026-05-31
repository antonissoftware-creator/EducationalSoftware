export type AdaptiveRecommendation = {
  level: "low" | "medium" | "high";
  title: string;
  action: string;
};

/** Rule set derived from section 9.2 of the execution plan. */
export function recommendationFromScore(score: number): AdaptiveRecommendation {
  if (score < 60) {
    return {
      level: "low",
      title: "Needs revision",
      action: "Repeat the module and revisit weak sections before retrying the quiz.",
    };
  }

  if (score < 80) {
    return {
      level: "medium",
      title: "Good progress",
      action: "Review key facts and complete a mixed revision quiz before moving on.",
    };
  }

  return {
    level: "high",
    title: "Strong explorer",
    action: "Continue to the next module or take the final mixed challenge.",
  };
}
