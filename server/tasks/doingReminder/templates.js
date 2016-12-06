import React from 'react'
import ReactHTMLEmail, { Email, Item, Span, A, renderEmail } from 'react-html-email'

ReactHTMLEmail.injectReactEmailAttributes()

export const doingReminder = (titles) => renderEmail(
  <Email title="Hello World!">
    <Item align="center">
      <Span fontSize={20}>
        <h1>Your current tasklist</h1>
        {titles.map(title => <li key={title}>{title}</li>)}
        <A href="https://github.com/chromakode/react-html-email">react-html-email</A>.
      </Span>
    </Item>
  </Email>
)
