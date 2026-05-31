export function isAiEnabledForUser(settings: { aiEnabled: boolean; geminiApiKeyEncrypted: string | null } | null): boolean {
  if (!settings) return false;
  return settings.aiEnabled && Boolean(settings.geminiApiKeyEncrypted);
}

export function createPracticePrompt(topic: string): string {
  return `Generate 3 beginner-level questions about ${topic} in JSON format with 4 options and one correct answer.`;
}
