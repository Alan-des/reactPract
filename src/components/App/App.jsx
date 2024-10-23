import { QuizForm } from '../QuizForm/QuizForm';
import { SearchBar } from '../SearchBar/SearchBar';
import { QuizList } from '../QuizList/QuizList';
import quizItems from '../../quiz-items.json';
import { GlobalStyle } from 'GlobalStyle';

export const App = () => {
  return (
    <div>
      <QuizForm />
      <SearchBar />
      <QuizList items={quizItems} />
      <GlobalStyle/>
    </div>
  );
};
