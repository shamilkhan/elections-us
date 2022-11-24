import { useEffect, useState } from "react";

export const useCountyData = () => {
  const fixedLength = 4291014;
  const [data, setData] = useState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.onprogress = (event) => {
      setProgress((event.loaded / fixedLength) * 100);
    };
    xhr.open("GET", "/data/us-counties-results.json", true);
    xhr.send();

    xhr.onloadend = () => {
      setData(JSON.parse(xhr.response));
      setProgress(100);
    };
  }, []);
  return { data, progress };
};
