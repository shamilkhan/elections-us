import styled from "@emotion/styled";
import Skeleton from "@mui/material/Skeleton";
import LinearProgress from "@mui/material/LinearProgress";

type ProgressProps = {
  progress: number;
  mapLoad?: boolean;
};

export const LoaderScreen = ({ progress, mapLoad }: ProgressProps) => {
  return (
    <LoaderWrapper hidden={progress === 100 && mapLoad}>
      <LoaderContent>
        <LoaderHeader>US 2020 Election Map</LoaderHeader>
        <LoaderDescription>
          <LoaderText>
            Blue denotes states or congressional districts won by Democrat Joe
            Biden; red denotes those won by Republican Donald Trump
          </LoaderText>
          <LoaderImg>
            <img src={"./loader-us-preview.png"} width={96} />
          </LoaderImg>
        </LoaderDescription>
        {progress === 0 ? (
          <LoadingMap>
            <ProgressSkeleton variant="rectangular" />
            Loading the map
          </LoadingMap>
        ) : (
          <LoadingData>
            <ProgressBar variant="determinate" value={progress} />
            Loading data
          </LoadingData>
        )}
      </LoaderContent>
    </LoaderWrapper>
  );
};

const LoaderWrapper = styled.div(() => ({
  width: "100%",
  height: "100vh",
  position: "absolute",
  left: 0,
  top: 0,
  backgroundColor: "#141414",
  zIndex: 100,
  color: "#fff",
}));

const LoaderContent = styled.div(() => ({
  width: 320,
  height: 170,
  position: "relative",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
}));

const LoaderHeader = styled.h1(() => ({
  margin: "0 0 20px",
  padding: 0,
  fontSize: "28px",
  fontWeight: 700,
  lineHeight: "20px",
}));

const LoaderDescription = styled.div(() => ({
  display: "flex",
  height: 64,
  gap: 4,
  marginBottom: 30,
}));

const LoaderText = styled.div(() => ({
  width: 210,
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "justify",
}));

const LoaderImg = styled.div`
  width: 96px;
`;

const barStyle = `
    height: 12px;
    width: 100%;
    background: #222222;
    border-radius: 7px;
`;

const ProgressBar = styled(LinearProgress)`
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
