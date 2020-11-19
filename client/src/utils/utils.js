export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
}; 

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

export const getRoomCode = () => {
  return Math.random() * (9999 - 1000) + 1000;
}