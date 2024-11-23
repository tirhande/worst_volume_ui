import React, { useEffect, useState } from 'react';
import { Location } from './Location';
import { getDistanceBetweenLocations, getRandomNumber, shuffleArray } from '@lib/util';
import { StyledMain } from '@styles/common';
import countryCapitals from '@assets/country_capital_lat_long.json';
import { notify } from '@lib/notfiy';
import { Toaster } from 'react-hot-toast';

export interface CountryCapital {
  country: string;
  capitalCity: string;
  latitude: number;
  longitude: number;
}

export const CIRCUMFERENCE = 40075;
const HALF_CIRCUMFERENCE = CIRCUMFERENCE / 2;

const LocationPage = () => {
  const countryList: Array<CountryCapital> = countryCapitals;
  const currentLocation = countryList.find((countryCapital) => countryCapital.country === 'Republic of Korea')!;

  const shuffledCountryList = shuffleArray(countryList).filter(
    (countryCapital) => countryCapital.country !== 'Republic of Korea',
  );
  const targetLocation = shuffledCountryList[getRandomNumber(0, shuffledCountryList.length - 1)];

  const distance = getDistanceBetweenLocations({
    origin: {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    },
    target: {
      latitude: targetLocation.latitude,
      longitude: targetLocation.longitude,
    },
  });

  useEffect(() => {
    const notifyId = notify.success(`${currentLocation.country} -> ${targetLocation.country}`);

    return () => {
      notify.remove(notifyId);
    };
  }, []);

  return (
    <StyledMain>
      <Location
        originCountry={{
          country: currentLocation.country,
          capitalCity: currentLocation.capitalCity,
        }}
        targetCountry={{
          country: targetLocation.country,
          capitalCity: targetLocation.capitalCity,
        }}
        distance={Math.round(distance)}
        volume={Math.round((distance / HALF_CIRCUMFERENCE) * 100)}
      />
      <Toaster />
    </StyledMain>
  );
};

export default LocationPage;
