import * as React from "react";

export interface IErrorProps {}

export default class Error extends React.Component<IErrorProps> {
  public render() {
    return <h2>Error Page!!!</h2>;
  }
}
