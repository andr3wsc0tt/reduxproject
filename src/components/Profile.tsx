import * as React from 'react';

export interface IProfileProps {
    match: any
}

export default class Profile extends React.Component<IProfileProps> {
  public render() {
    let {match} = this.props;
    let who = match.params.userId || 'page';
    return (
        <h2>Welcome {who}!</h2>
    );
  }
}
