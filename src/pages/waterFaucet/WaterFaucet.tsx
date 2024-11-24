import VolumeBar from '@components/atoms/VolumeBar';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface WaterFaucetProps {
  onClick: () => void;
  isOpened: boolean;
  volume: number;
}

export const WaterFaucet = (props: WaterFaucetProps) => {
  const { onClick, isOpened, volume } = props;

  return (
    <StyleContainer>
      <StyledFaucet onClick={onClick}>
        <StyledFaucetBaseLeft />
        <StyledFaucetBaseRight />
        <StyledFaucetBody>
          <StyledFaucetBodyCore>
            <StyledFaucetBodyCoreHead />
            <StyledFaucetHeadHandle>
              <StyledFaucetHeadHandleSupport />
            </StyledFaucetHeadHandle>
          </StyledFaucetBodyCore>
        </StyledFaucetBody>
        <StyledAerator>
          <StyledAeratorWater>
            {isOpened && <StyledAeratorWaterDrop isOpened={isOpened} />}
          </StyledAeratorWater>
        </StyledAerator>
      </StyledFaucet>
      <StyledWrapper>
        <VolumeBar micVolume={volume} />
        <StyeldButtonContainer>
          <Link to="/">
            <button>집으로</button>
          </Link>
        </StyeldButtonContainer>
      </StyledWrapper>
    </StyleContainer>
  );
};
const StyleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 150px;
`;
const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const StyeldButtonContainer = styled.div`
  display: flex;

  justify-content: center;
  gap: 15px;
`;
const StyledFaucet = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  margin: 0 50px;
  cursor: pointer;
`;
const StyledFaucetBaseLeft = styled.div`
  width: 20px;
  height: 100px;
  border-radius: 5px;
  background: #d8d8db;
`;
const StyledFaucetBaseRight = styled.div`
  width: 20px;
  height: 60px;
  border-radius: 0px 5px 5px 0px;
  background: #535c7b;
`;
const StyledFaucetBody = styled.div`
  position: relative;
  width: 110px;
  height: 45px;
  background: #90a4ae;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 13px;
    height: 13px;
    background: transparent;
    border-radius: 0 50%;
    transform: translate(0, 13px);
    z-index: 1;
    box-shadow: 2px -2px 0 0px #90a4ae;
  }
`;
const StyledFaucetBodyCore = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: auto;
  transform: translateY(-50%);
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: #90a4ae;
`;
const StyledFaucetBodyCoreHead = styled.div`
  position: relative;
  top: 0;
  margin: auto;
  transform: translateY(calc(-100% + 8px));
  width: 42px;
  height: 10px;
  background: #90a4ae;
  border-radius: 5px 5px 0 0;
`;
const StyledFaucetHeadHandle = styled.div`
  position: relative;
  top: 0;
  left: 50%;
  transform: translate(-50%, calc(-100% - 12px));
  width: 95px;
  height: 40px;
  display: flex;
  justify-content: center;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 13px;
    border-radius: 13px;
    background: #dedfe1;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    width: 13px;
    height: 100%;
    background: #dedfe1;
  }
`;
const StyledFaucetHeadHandleSupport = styled.div`
  position: relative;
  top: 0;
  transform: translateY(-8px);
  width: 40px;
  height: 30px;
  background: #dedfe1;
  z-index: 1;
  border-radius: 10px;
`;

const StyledAerator = styled.div`
  position: relative;
  transform: translateY(13px);
  width: 40px;
  height: 70px;
  background: #90a4ae;
  border-radius: 0 40px 0 0;
  z-index: 1;
`;
const StyledAeratorWater = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: -10px;
  width: 90%;
  height: 10px;
  background: #4294ff;
  border-radius: 0 0 10px 10px;
  z-index: -1;
  -webkit-filter: url('#liquid');
  filter: url('#liquid');
`;

const waterDrop = keyframes`
  0% {
    top: 0;
  }
  99.9% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: 160px;
  }
`;
const dropped = css`
  animation: ${waterDrop} 1s linear infinite;
`;
const stopped = css`
  animation: none;
`;
const StyledAeratorWaterDrop = styled.div<{ isOpened: boolean }>`
  position: relative;
  left: 0;
  right: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  border-radius: 0px 10px 10px 10px;
  background: #4294ff;
  ${({ isOpened }) => (isOpened ? dropped : stopped)}
`;
