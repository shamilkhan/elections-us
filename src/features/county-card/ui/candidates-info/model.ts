// get color with opacity for styles
export const getColor = (biden: boolean | undefined, opacity: number) => {
  if (biden) {
    return `rgba(52, 125, 192, ${opacity})`;
  } else {
    return `rgba(231, 33, 33, ${opacity})`;
  }
};
