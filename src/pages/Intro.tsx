import styled from '@emotion/styled';
import {
  faFaucetDrip,
  faMapLocationDot,
  faMicrophoneLines,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledMain } from '@styles/common';
import { Link } from 'react-router-dom';

const IntroPage = () => {
  return (
    <StyledMain>
      <svg width="0" height="0">
        <linearGradient xmlns="http://www.w3.org/2000/svg" id="rainbow">
          <stop offset="0" stop-color="red" />
          <stop offset="0.333" stop-color="#ff0" />
          <stop offset="0.5" stop-color="#0f0" />
          <stop offset="0.666" stop-color="cyan" />
          <stop offset="0.833" stop-color="blue" />
          <stop offset="1" stop-color="#f0f" />
        </linearGradient>
      </svg>
      <StyledSection>
        <Link to={'mic-volume'}>
          <StyledFontAwesomeIcon icon={faMicrophoneLines} />
        </Link>
      </StyledSection>
      <StyledSection>
        <Link to={'location'}>
          <StyledFontAwesomeIcon icon={faMapLocationDot} />
        </Link>
      </StyledSection>
      <StyledSection>
        <Link to={'water-faucet'}>
          <StyledFontAwesomeIcon icon={faFaucetDrip} />
        </Link>
      </StyledSection>
    </StyledMain>
  );
};

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: 5rem;

  & * {
    fill: url(#rainbow);
  }
`;
const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default IntroPage;
