import {
  LoaderContent,
  LoaderDescription,
  LoaderHeader,
  LoaderImg,
  LoaderText,
  LoaderWrapper,
  LoadingData,
  LoadingMap,
  ProgressBar,
  ProgressSkeleton,
} from "./styled";

type Props = {
  progress: number;
};

export const LoaderScreen = ({ progress }: Props) => {
  return (
    <LoaderWrapper>
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
