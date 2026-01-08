
import { GoogleGenAI } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Correct initialization as per @google/genai guidelines using process.env.API_KEY directly
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  }

  async getEarningAdvice(query: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: `Bạn là một chuyên gia về kiếm tiền online (MMO) tại Việt Nam. 
          Hãy trả lời người dùng một cách chuyên nghiệp, tích cực và dễ hiểu. 
          Khuyên họ thực hiện các nhiệm vụ như vượt link, xem quảng cáo, giới thiệu bạn bè. 
          Luôn nhắc nhở về tính minh bạch và uy tín.`,
          temperature: 0.7,
        }
      });
      // Direct access to .text property as recommended by the SDK guidelines
      return response.text || "Xin lỗi, tôi không thể trả lời lúc này.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "Có lỗi xảy ra khi kết nối với trí tuệ nhân tạo. Vui lòng thử lại sau.";
    }
  }

  async generateDailyMotivation() {
    return this.getEarningAdvice("Hãy tạo 1 câu truyền cảm hứng ngắn gọn về việc kiên trì kiếm tiền online mỗi ngày.");
  }
}

export const geminiService = new GeminiService();
