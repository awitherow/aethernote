import React from 'react'
import ReactHTMLEmail, { Email, Item, Span, renderEmail } from 'react-html-email'

ReactHTMLEmail.injectReactEmailAttributes()

export const doingReminder = (tasks, goals) => renderEmail(
  <Email title="Doing Reminder">
    <Item>
      <Span fontSize={16}>
        <h1>Last night, your goals were...</h1>
        <ol>
          {goals.map(goal =>
            <li key={goal.title}>
              <Span {...taskStyles({ prio: true })}>{goal.title}</Span>
            </li>
          )}
        </ol>
      </Span>
    </Item>
    <Item>
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
    </Item>
  </Email>
)

const taskStyles = (task) => ({
  ...task.prio && {
    fontWeight: 'bold',
    color: 'red',
  },
})
