import api from './base';

const postColorSurvey = async (mbti?: string, colorCode?: string, password?: string) => {
  try {
    const response = await api.post('/api/color-surveys', {
      mbti,
      colorCode,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error posting color surveys:', error);
    throw error;
  }
};

export default postColorSurvey;
