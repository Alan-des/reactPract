import {Wrapper, Topic, MetaWrapper} from './QuizCard.styled'
 
 export const QuizCard = ({quiz: {topic, level, time, questions}}) => {
  return (
    <Wrapper>
      <Topic>{topic}</Topic>
      <MetaWrapper>
        <p>Level: {level}</p>
        <p>Time: {time}</p>
        <p>Questions: {questions}</p>
      </MetaWrapper>
    </Wrapper>
  );
};
