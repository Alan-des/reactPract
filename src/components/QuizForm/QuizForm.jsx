import { Formik, Field } from 'formik';
import { StyledForm } from './QuizForm.styled';
import * as Yup from 'yup';



const quizSchema = Yup.object().shape({
  topic: Yup.string().min(2,).required(),
  time: Yup.number().min(2,).positive().required(),

});

export const QuizForm = ({onAdd}) => {
  return (
    <div>
      <Formik
        initialValues={{ topic: '', time: 0, questions: 0, level: 'beginner' }}
        validationSchema={quizSchema}
        onSubmit={(values, actions) => {
          onAdd(values)
         actions.resetForm()
        }}
      >
        <StyledForm>
          <Field name="topic" type="text" placeholder="Quiz topic..." />
          <Field name="time" type="number" />
          <Field name="questions" type="number" />
          <Field as="select" name="level">
            <option value="beginner">Beginnner</option>
            <option value="intermediate">Intermadiate</option>
            <option value="advanced">Advanced</option>
          </Field>
          <button type="submit">Submit</button>
        </StyledForm>
      </Formik>
    </div>
  );
};
