import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import colors from 'utils/colors';

export default class Spinner extends Component {
  state = {
    stateLoading: true,
  };

  setLoaded = () => {
    this.setState(prev => {
      if (prev.stateLoading) {
        return { stateLoading: false };
      }
    });
  };

  render() {
    const { children, loading } = this.props;
    const { stateLoading } = this.state;
    return (
      <Fragment>
        {loading && stateLoading && <Text>Loading...</Text>}
        {children({
          stateLoading: this.state.stateLoading,
          setLoaded: this.setLoaded,
        })}
      </Fragment>
    );
  }
}

Spinner.propTypes = {
  children: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

Spinner.defaultProps = {
  loading: true,
};

const Text = styled.h3`
  height: 500%;
  width: 100%;
  text-align: center;
  position: absolute;
  z-index: 3;
  background: #fff;
  padding-top: 10rem;
  font-size: 3rem;
  color: ${colors.coral};
`;
