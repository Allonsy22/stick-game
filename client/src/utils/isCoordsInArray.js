export const isCoordsInArray = (props) => {
  // array like [{i, j}, {i, j}...]
  const { coords, array } = props;
  let isCoords = false;
  array.forEach( obj => {
    if (obj.i === coords.i && obj.j === coords.j) {
      isCoords = true;
    }
  });
  return isCoords;
};