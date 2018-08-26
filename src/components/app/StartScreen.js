import React from 'react'

import AddUser from '../auth/AddUser'

export default class AddFirstUserScreen extends React.PureComponent {
  render() {
    return (
      <div data-testid="start-screen">
        <AddUser />
      </div>
    )
  }
}
