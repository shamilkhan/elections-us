import { createEffect, createEvent, createStore, sample } from "effector";

const fetchDataFx = createEffect(async () => {
  // us-counties-result bytes
  // const fixedLength = 4291014;
  // us-counties-result-new bytes
  const fixedLength = 4237416;
  const fetchData = new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/data/us-counties-results-new.json", true);
    xhr.onprogress = (event) => {
      setProgress((event.loaded / fixedLength) * 100 - 0.1);
    };
    xhr.send();
    xhr.onloadend = () => {
      resolve(JSON.parse(xhr.response));
      setTimeout(() => setProgress(100), 600);
    };
  });

  return await fetchData.then((res) => res);
});

const setProgress = createEvent<number>();
export const $fetchProgress = createStore(0).on(
  setProgress,
  (_, payload) => payload
);

export const $countyLayerData = createStore<any>(null).on(
  fetchDataFx.doneData,
  (_, result) => {
    return result;
  }
);

const setHoveredCounty = createEvent<any>();
export const $hoveredCountyData = createStore<any>(null).on(
  setHoveredCounty,
  (state, payload) => {
    if (state?.properties.id === payload?.properties.id) return;
    return payload;
  }
);

const updateFilter = createEvent<string>();
export const $filter = createStore("").on(
  updateFilter,
  (_, payload) => payload
);

export const $foundedFeatures = sample({
  source: $countyLayerData,
  clock: $filter,
  fn: (data, filter) => {
    if (!data) return [];
    if (filter.length <= 1) return [];
    return data.features.filter((el: any) =>
      el.properties.name.toLowerCase().includes(filter.toLowerCase())
    );
  },
});

export const events = {
  fetchDataFx,
  updateFilter,
  setHoveredCounty,
};
