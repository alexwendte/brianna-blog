import { Component } from 'react';
import PropTypes from 'prop-types';

class Toggle extends Component {
  state = {
    render: false,
  };

  toggle = () => {
    this.setState(prevState => ({ render: !prevState.render }));
  };
  render() {
    const { children } = this.props;
    return children({
      on: this.state.render,
      toggle: this.toggle,
    });
  }
}
export default Toggle;

Toggle.propTypes = {
  children: PropTypes.func.isRequired,
};
