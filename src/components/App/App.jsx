import { QuizForm } from '../QuizForm/QuizForm';
import { SearchBar } from '../SearchBar/SearchBar';
import { QuizList } from '../QuizList/QuizList';
import initialsQuizItems from '../../quiz-items.json';
import { GlobalStyle } from 'GlobalStyle';
import { Basic } from 'components/Basic/Basic';
import { Component } from 'react';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    quizItems: initialsQuizItems,
    filters: {
      topic: '',
      level: 'all',
    },
  };
  componentDidMount() {
    const savedFilters = localStorage.getItem('quiz-filters');
    if (savedFilters !== null) {
      this.setState({ filters: JSON.parse(savedFilters) });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      localStorage.setItem('quiz-filters', JSON.stringify(this.state.filters));
    }
  }

  addQuiz = newQuiz => {
    this.setState(prevState => ({
      quizItems: [...prevState.quizItems, { id: nanoid(), ...newQuiz }],
    }));
  };

  deleteQiuz = quizId => {
    this.setState(preState => ({
      quizItems: preState.quizItems.filter(quiz => quiz.id !== quizId),
    }));
  };

  changeLevelFilter = newLevel => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        level: newLevel,
      },
    }));
  };

  changeTopicFilter = newTopic => {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        topic: newTopic,
      },
    }));
  };

  resetFilters = () => {
    this.setState({ filters: { topic: '', level: 'all' } });
  };

  getVisibleQuizItems = () => {
    const { quizItems, filters } = this.state;
    return quizItems.filter(quiz => {
      const hasTopic = quiz.topic
        .toLowerCase()
        .includes(filters.topic.toLowerCase());
      if (filters.level === 'all') {
        return hasTopic;
      }
      return hasTopic && quiz.level === filters.level;
    });
  };
  render() {
    const { filters } = this.state;

    const visibleItems = this.getVisibleQuizItems();

    return (
      <div>
        <QuizForm onAdd={this.addQuiz} />
        <SearchBar
          level={filters.level}
          topic={filters.topic}
          onChangeLevel={this.changeLevelFilter}
          onChangeTopic={this.changeTopicFilter}
          onReset={this.resetFilters}
        />
        <QuizList items={visibleItems} onDelete={this.deleteQiuz} />
        <GlobalStyle />
        <Basic />
      </div>
    );
  }
}
