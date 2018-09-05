import React from 'react';
import styled from 'styled-components';
import colors from 'utils/colors';

const Footer = () => (
  <FooterContainer>
    <h2 className="heading">Created by Alex Wendte</h2>
  </FooterContainer>
);
export default Footer;

const FooterContainer = styled.div`
  background: ${colors.coral};
  color: ${colors.white};
  padding: 1rem;
  .heading {
    font-size: 2rem;
    text-align: center;
  }
`;
