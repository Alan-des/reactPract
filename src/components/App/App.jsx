import { QuizForm } from '../QuizForm/QuizForm';
import { SearchBar } from '../SearchBar/SearchBar';
import { QuizList } from '../QuizList/QuizList';
import { GlobalStyle } from 'GlobalStyle';
import { Component } from 'react';
import { CreateQuiz, deleteQuizById, fetchQuizes } from '../api';
import toast, { Toaster } from 'react-hot-toast';
export class App extends Component {
  state = {
    quizItems: [],
    loading: false,
    error: false,
    filters: {
      topic: '',
      level: 'all',
    },
  };
  async componentDidMount() {
    const savedFilters = localStorage.getItem('quiz-filters');
    if (savedFilters !== null) {
      this.setState({ filters: JSON.parse(savedFilters) });
    }

    try {
      this.setState({ loading: true, error: false });
      const quizzes = await fetchQuizes();

      this.setState({ quizItems: quizzes });
    } catch (error) {
      this.setState({ error: true });
      console.error('ERROR');
    } finally {
      this.setState({ loading: false });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.filters !== this.state.filters) {
      localStorage.setItem('quiz-filters', JSON.stringify(this.state.filters));
    }
  }

  addQuiz = async newQuiz => {
    try {
      this.setState({ loading: true, error: false });
      const addedQuiz = await CreateQuiz(newQuiz);
      this.setState(prevState => ({
        quizItems: [...prevState.quizItems, addedQuiz],
      }));
      toast.success('ЗАМЕТКА СОЗДАНА!')
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  deleteQiuz = async quizId => {
    try {
      this.setState({ loading: true, error: false });
      const deletedQuiz = await deleteQuizById(quizId);
      this.setState(preState => ({
        quizItems: preState.quizItems.filter(
          quiz => quiz.id !== deletedQuiz.id
        ),
      }));
      toast.success('УДАЛЕНО!');
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
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
    const { filters, loading, error } = this.state;

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
        {loading && <div>Loading...</div>}
        {error && !loading && <div>Erorr</div>}
        {visibleItems.length > 0 && (
          <QuizList items={visibleItems} onDelete={this.deleteQiuz} />
        )}

        <GlobalStyle />
        <Toaster/>
      </div>
    );
  }
}
