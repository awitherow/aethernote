import React from 'react';
import ReactHTMLEmail, { Email, Item, Span, renderEmail } from 'react-html-email';

ReactHTMLEmail.injectReactEmailAttributes();

export const doingReminder = (
  { quoteText, quoteAuthor},
  tasks,
  goals,
  affirmations,
) => {
    return renderEmail(
    <Email title="Doing Reminder">
      <Item align="center">
        <Span fontSize={16}>
          <blockquote>
            <p>{quoteText}</p>
            <footer>{quoteAuthor}</footer>
          </blockquote>
        </Span>
      </Item>
      <Item>
        {affirmations.length > 0 ? (
          <Span fontSize={16}>
            <h1>Repeat your affirmations!</h1>
            <ol>
              {affirmations.map(affirmation =>
                <li key={affirmation.content}>
                  <Span {...taskStyles({ prio: 3 })}>{affirmation.content}</Span>
                </li>
              )}
            </ol>
          </Span>
        ) : <Span fontSize={16}>Aspirations provide good inspiration, write a few!</Span>}
      </Item>
      <Item>
          {goals.length > 0 ? (
            <Span fontSize={16}>
              <h1>Last night, your goals were...</h1>
              <ol>
                {goals.map(goal =>
                  <li key={goal.title}>
                    <Span {...taskStyles({ prio: 3 })}>{goal.content}</Span>
                  </li>
                )}
              </ol>
            </Span>
          ) : <Span fontSize={16}>Setting goals for tomorrow before you go to sleep is an excellent practice!</Span>}
      </Item>
      <Item>
        {tasks.length > 0 ? (
          <Span fontSize={16}>
            <h1>Currently in 'doing!' | {tasks.length} tasks</h1>
            <ol>
              {tasks.map(task =>
                <li key={task.title}>
                  <Span {...taskStyles(task)}>{task.title}</Span>
                </li>
              )}
            </ol>
          </Span>
        ) : <Span fontSize={16}>Time for a backlog grooming!</Span>}
      </Item>
    </Email>
  );
};

const taskStyles = (task) => ({
    ...task.prio > 1 && {
        fontWeight: 'bold',
    },
    ...task.prio > 2 && {
        fontWeight: 'bold',
        color: 'red',
    },
});
