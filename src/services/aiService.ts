import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateMoment(tags: string, imageBase64?: string): Promise<string> {
  const prompt = `作为一个热爱运动的年轻人，请根据以下情绪标签和（可选的）图片，生成一段适合发在运动社交平台（类似朋友圈）的动态文案。要求风格可以是热血、幽默或专业，字数在50-100字左右，带上相关的Emoji。标签：${tags}`;
  
  const contents: any = { parts: [] };
  if (imageBase64) {
    contents.parts.push({
      inlineData: {
        data: imageBase64.split(',')[1],
        mimeType: imageBase64.split(';')[0].split(':')[1],
      }
    });
  }
  contents.parts.push({ text: prompt });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
    });
    return response.text || "生成失败，请重试。";
  } catch (error) {
    console.error("AI Error:", error);
    return "生成失败，请检查网络或配置。";
  }
}

export async function generateWeeklyReport(stats: any): Promise<string> {
  const prompt = `作为一名专业的AI运动助理，请根据用户的本周运动数据，生成一份简短的“个性化运动复盘报告”及下周训练建议。语气要鼓励、专业。
用户数据：
- 总运动时长：${stats.totalHours}小时
- 运动类型：${stats.sports.join('、')}
- 消耗卡路里：${stats.calories} kcal
- 击败了同城 ${stats.beatPercentage}% 的用户

要求：字数150字左右，分段清晰，带Emoji。`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text || "生成失败，请重试。";
  } catch (error) {
    console.error("AI Error:", error);
    return "生成失败，请检查网络或配置。";
  }
}
