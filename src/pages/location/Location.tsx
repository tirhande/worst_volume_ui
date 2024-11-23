import React from 'react';
import styled from '@emotion/styled';
import VolumeBar from '@components/atoms/VolumeBar';
import { Link } from 'react-router-dom';
import { StyledWrapper } from '@styles/common';
import { CountryCapital } from '.';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsLeftRight } from '@fortawesome/free-solid-svg-icons';

interface Country extends Omit<CountryCapital, 'latitude' | 'longitude'> {}

interface LocationProps {
  originCountry: Country;
  targetCountry: Country;
  distance: number;
  volume: number;
}

export const Location = (props: LocationProps) => {
  const { originCountry, targetCountry, distance, volume } = props;

  return (
    <StyledWrapper>
      <VolumeBar micVolume={volume} />
      <StyeldButtonContainer>
        <StyledSpanText>{`${originCountry.country} - ${originCountry.capitalCity}`}</StyledSpanText>
        <FontAwesomeIcon icon={faArrowsLeftRight} style={{ fontSize: '1.3rem' }} />
        <StyledSpanText>{`${targetCountry.country} - ${targetCountry.capitalCity}`}</StyledSpanText>
      </StyeldButtonContainer>
      <StyledSpanText>({distance.toLocaleString('ko-KR')} km)</StyledSpanText>
      <StyeldButtonContainer>
        <Link to="/">
          <button>집으로</button>
        </Link>
      </StyeldButtonContainer>
    </StyledWrapper>
  );
};

const StyeldButtonContainer = styled.div`
  display: flex;

  justify-content: center;
  gap: 15px;
`;

const StyledSpanText = styled.span`
  font-size: 1.2rem;
`;
