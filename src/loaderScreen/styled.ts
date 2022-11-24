import styled from "@emotion/styled";
import Skeleton from "@mui/material/Skeleton";
import LinearProgress from "@mui/material/LinearProgress";

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #141414;
  z-index: 2;
  color: #fff;
`;

export const LoaderContent = styled.div`
  width: 320px;
  height: 170px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: Rubik;
`;

export const LoaderHeader = styled.h1`
  margin: 0 0 20px;
  padding: 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 20px;
`;

export const LoaderDescription = styled.div`
  display: flex;
  height: 64px;
  gap: 4px;
  margin-bottom: 30px;
`;

export const LoaderText = styled.div`
  width: 210px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  text-align: justify;
`;

export const LoaderImg = styled.div`
  width: 96px;
`;

const barStyle = `
    height: 12px;
    width: 100%;
    background: #222222;
    border-radius: 7px;
`;

export const ProgressBar = styled(LinearProgress)`
  ${barStyle}
  & .MuiLinearProgress-barColorPrimary {
    background: linear-gradient(
      90deg,
      #00b4ff 2.77%,
      #90d8ff 12.61%,
      #fcfcff 14.99%,
      #00b4ff 24.1%,
      #90d8ff 32.59%,
      #fcfcff 34.9%,
      #00b4ff 44.94%,
      #90d8ff 55.34%,
      #fcfcff 58.14%,
      #00b4ff 69.59%,
      #90d8ff 81.16%,
      #fcfcff 84.1%,
      #00b4ff 95.1%
    );
  }
`;

export const ProgressSkeleton = styled(Skeleton)`
  ${barStyle}
`;

const loaderStyle = `
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 10px;
    line-height: 20px;
`;

export const LoadingMap = styled.div`
  ${loaderStyle}
`;

export const LoadingData = styled.div`
  ${loaderStyle}
`;
