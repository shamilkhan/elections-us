import mapboxgl from "mapbox-gl";

const colors = {
  biden: [
    "#E6F4F9",
    "#CCEAF3",
    "#B3DFED",
    "#99D4E7",
    "#80CAE1",
    "#66BFDA",
    "#4DB4D4",
    "#33A9CE",
    "#1A9FC8",
    "#0094C2",
  ],
  trump: [
    "#F9EAE6",
    "#F3D5CC",
    "#EDC0B3",
    "#E7AB99",
    "#E19780",
    "#DA8266",
    "#D46D4D",
    "#CE5833",
    "#C8431A",
    "#C22E00",
  ],
};

// bounds = [from, to]
type CreateFilterParams = {
  bounds: number[];
  index: number;
  name: "biden" | "trump";
};
const createFilter = ({ bounds, index, name }: CreateFilterParams) => {
  const from = bounds[0] <= 50 ? 0 : bounds[0];
  const to = bounds[1] > 90 ? 100 : bounds[1];

  return [
    [
      "all",
      ["==", ["get", "winner"], `${name}`],
      [">=", ["get", `${name}_percent`], from],
      ["<", ["get", `${name}_percent`], to],
    ],
    colors[name][Math.ceil(index)],
  ];
};

const getFillFilters = () => {
  const filters = ["case"] as any;
  const from = 50;
  const to = 90;
  const step = (to - from) / 9;
  for (let i = from; i <= to; i += step) {
    const index = (i - from) / step;
    const bounds = [i, i + step];
    filters.push(...createFilter({ bounds, index, name: "biden" }));
    filters.push(...createFilter({ bounds, index, name: "trump" }));
  }
  filters.push("#646464");
  return filters;
};

type AddLayersParams = {
  map: mapboxgl.Map;
  data: any;
};

export const addLayers = ({ map, data }: AddLayersParams) => {
  if (!map) return;
  map.addSource("counties", {
    type: "geojson",
    data,
    generateId: true,
  });
  map.addLayer({
    id: "counties-layer",
    type: "fill",
    source: "counties",
    paint: {
      "fill-color": getFillFilters(),
    },
  });
  map.addLayer({
    id: "counties-layer-hover",
    type: "line",
    source: "counties",
    paint: {
      "line-color": "#000",
      "line-width": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        2,
        0,
      ],
    },
  });
};
