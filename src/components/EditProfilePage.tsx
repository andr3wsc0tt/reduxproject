import * as React from 'react';
import { JSXAttribute } from '@babel/types';

export interface IAboutProps {
    match : any
}

export default class About extends React.Component<IAboutProps> {

  public render() {
    let {match} = this.props;
    let who = match.params.userId || 'page';
    return (
      <h2>Edit your page, {who}!</h2>
    );
  }
}
