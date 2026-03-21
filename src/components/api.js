import axios from 'axios';

axios.defaults.baseURL = 'https://69bbff9a0915748735baeb2e.mockapi.io/';

export const fetchQuizes = async () => {
  const resp = await axios.get('/quizzes');
  return resp.data;
};

export const deleteQuizById = async quizId => {
  const resp = await axios.delete(`/quizzes/${quizId}`);
  return resp.data;
};

export const CreateQuiz = async quiz => {
  const resp = await axios.post('/quizzes', quiz);
  return resp.data;
};
