import {Wrapper, Topic, MetaWrapper, Button} from './QuizCard.styled'

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}
 export const QuizCard = ({quiz: {id, topic, level, time, questions}, onDelete} ) => {
  return (
    <Wrapper color={getRandomColor()}>
      <Topic>{topic}</Topic>
      <MetaWrapper>
        <p>Level: {level}</p>
        <p>Time: {time}</p>
        <p>Questions: {questions}</p>
      </MetaWrapper>
      <Button onClick={()=> onDelete(id)}>Delete</Button>
    </Wrapper>
  );
};
