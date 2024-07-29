import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
  }

  componentDidCatch(error) {
    this.setState({ error: `${error.name}: ${error.message}` });
    !this.props.noLog && console.error(`${error.name}: ${error.message}`);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <div></div>;
    } else {
      return <>{this.props.children}</>;
    }
  }
}
