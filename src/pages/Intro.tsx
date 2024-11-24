import styled from '@emotion/styled';
import { faFaucetDrip, faMapLocationDot, faMicrophoneLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledMain } from '@styles/common';
import { Link } from 'react-router-dom';

const IntroPage = () => {
  return (
    <StyledMain>
      <StyledSection>
        <Link to={'mic-volume'}>
          <FontAwesomeIcon icon={faMicrophoneLines} style={{ fontSize: '5rem' }} />
        </Link>
      </StyledSection>
      <StyledSection>
        <Link to={'location'}>
          <FontAwesomeIcon icon={faMapLocationDot} style={{ fontSize: '5rem' }} />
        </Link>
      </StyledSection>
      <StyledSection>
        <Link to={'water-faucet'}>
          <FontAwesomeIcon icon={faFaucetDrip} style={{ fontSize: '5rem' }} />
        </Link>
      </StyledSection>
    </StyledMain>
  );
};

const StyledSection = styled.section`
  a {
    color: #a200ff;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default IntroPage;
