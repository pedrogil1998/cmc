import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const scoringSystem3 = [
  { pos: 1, points: 90 },
  { pos: 2, points: 87 },
  { pos: 3, points: 85 },
  { pos: 4, points: 83 },
  { pos: 5, points: 81 },
  { pos: 6, points: 79 },
  { pos: 7, points: 77 },
  { pos: 8, points: 75 },
  { pos: 9, points: 73 },
  { pos: 10, points: 71 },
  { pos: 11, points: 70 },
  { pos: 12, points: 69 },
  { pos: 13, points: 68 },
  { pos: 14, points: 67 },
  { pos: 15, points: 66 },
  { pos: 16, points: 65 },
  { pos: 17, points: 64 },
  { pos: 18, points: 63 },
  { pos: 19, points: 62 },
  { pos: 20, points: 61 },
  { pos: 21, points: 1 },
  { pos: 22, points: 1 },
  { pos: 23, points: 1 },
  { pos: 24, points: 1 },
  { pos: 25, points: 1 },
];

export const scoringSystem2= [
  { pos: 1, points: 60 },
  { pos: 2, points: 57 },
  { pos: 3, points: 55 },
  { pos: 4, points: 53 },
  { pos: 5, points: 51 },
  { pos: 6, points: 49 },
  { pos: 7, points: 47 },
  { pos: 8, points: 45 },
  { pos: 9, points: 43 },
  { pos: 10, points: 41 },
  { pos: 11, points: 40 },
  { pos: 12, points: 39 },
  { pos: 13, points: 38 },
  { pos: 14, points: 37 },
  { pos: 15, points: 36 },
  { pos: 16, points: 35 },
  { pos: 17, points: 34 },
  { pos: 18, points: 33 },
  { pos: 19, points: 32 },
  { pos: 20, points: 31 },
  { pos: 21, points: 1 },
  { pos: 22, points: 1 },
  { pos: 23, points: 1 },
  { pos: 24, points: 1 },
  { pos: 25, points: 1 },
];

export const scoringSystem1= [
  { pos: 1, points: 30 },
  { pos: 2, points: 27 },
  { pos: 3, points: 25 },
  { pos: 4, points: 23 },
  { pos: 5, points: 21 },
  { pos: 6, points: 19 },
  { pos: 7, points: 17 },
  { pos: 8, points: 15 },
  { pos: 9, points: 13 },
  { pos: 10, points: 11 },
  { pos: 11, points: 10 },
  { pos: 12, points: 9 },
  { pos: 13, points: 8 },
  { pos: 14, points: 7 },
  { pos: 15, points: 6 },
  { pos: 16, points: 5 },
  { pos: 17, points: 4 },
  { pos: 18, points: 3 },
  { pos: 19, points: 2 },
  { pos: 20, points: 1 },
  { pos: 21, points: 1 },
  { pos: 22, points: 1 },
  { pos: 23, points: 1 },
  { pos: 24, points: 1 },
  { pos: 25, points: 1 },
];

export const scoringSystem = [
  { pos: 1, points: 30 },
  { pos: 2, points: 28 },
  { pos: 3, points: 26 },
  { pos: 4, points: 24 },
  { pos: 5, points: 22 },
  { pos: 6, points: 20 },
  { pos: 7, points: 18 },
  { pos: 8, points: 16 },
  { pos: 9, points: 14 },
  { pos: 10, points: 13 },
  { pos: 11, points: 12 },
  { pos: 12, points: 11 },
  { pos: 13, points: 10 },
  { pos: 14, points: 9 },
  { pos: 15, points: 8 },
  { pos: 16, points: 7 },
  { pos: 17, points: 6 },
  { pos: 18, points: 5 },
  { pos: 19, points: 4 },
  { pos: 20, points: 3 },
  { pos: 21, points: 2 },
  { pos: 22, points: 1 },
  { pos: 23, points: 1 },
  { pos: 24, points: 1 },
  { pos: 25, points: 1 },
];
export const TitleText = styled(Typography)(() => ({
  fontFamily: "Nunito-Sans",
  fontWeight: 800,
}));

export const getMostKeys = (championship) => {
  let highestLength = 0;
  let highestItem = 0;
  for (let i = 0; i < championship.length; i++) {
    let objLength = Object.keys(championship[i]).length;
    if (objLength > highestLength) {
      highestLength = objLength;
      highestItem = i;
    }
  }
  const keys = Object.keys(championship[highestItem]).sort(
    (a, b) => a.substring(0, 1) - b.substring(0, 2)
  );

  const newKeys = arrayMove(keys, keys.indexOf("pos"), 0);
  const newKeys2 = arrayMove(
    newKeys,
    newKeys.indexOf("points"),
    newKeys.length - 1
  );
  const newKeys3 = arrayMove(
    newKeys2,
    newKeys2.indexOf("finalPoints"),
    newKeys2.length - 1
  );
  const newKeys4 = arrayMove(newKeys3, newKeys3.indexOf("name"), 1);
  return newKeys4;
};

export const getKeyString = (key) => {
  switch (key) {
    case "pos":
      return "Posição";
    case "name":
      return "Nome";
    case "1race":
      return "C1";
    case "1group":
      return "G1";
    case "2race":
      return "C2";
    case "2group":
      return "G2";
    case "3race":
      return "C3";
    case "3group":
      return "G3";
    case "4race":
      return "C4";
    case "4group":
      return "G4";
    case "5race":
      return "C5";
    case "5group":
      return "G5";
    case "6race":
      return "C6";
    case "6group":
      return "G6";
    case "7race":
      return "C7";
    case "7group":
      return "G7";
    case "8race":
      return "C8";
    case "8group":
      return "G8";
    case "9race":
      return "C9";
    case "9group":
      return "G9";
    case "10race":
      return "C10";
    case "10group":
      return "G10";
    case "11race":
      return "C11";
    case "11group":
      return "G11";
    case "12race":
      return "C12";
    case "12group":
      return "G12";
    // case "points":
    //   return "PT";
    // case "finalPoints":
    //   return "PF";
    default:
      return "";
  }
};

export const arrayMove = (arr, old_index, new_index) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};

export const addResultsToChampionship = (classification, raceResults) => {
  const racePoints = raceResults.map((entry) => {
    const match = scoringSystem.find((element) => element.pos == entry.pos);
    return {
      name: entry.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), //remove accents
      points: match.points,
      raceName: entry.raceName,
      roundNumber: entry.roundNumber,
    };
  });

  const newClassification = racePoints.map((piloto) => {
    const add = classification.find((element) => element.name == piloto.name);

    let driverRaces = add
      ? Object.keys(add).filter((str) => str.includes("race"))
      : [];

    let latestRaceNumber = driverRaces.length
      ? parseInt(driverRaces[driverRaces.length - 1].replace("race", ""))
      : 1;

    let raceNumber = add
      ? Object.keys(add).filter((str) => str.includes("race")).length + 1
      : 1;

    //Get latest race number

    const addNpRaces = {};

    if (latestRaceNumber < piloto.roundNumber * 2 - 1) {
      raceNumber = piloto.roundNumber * 2 - 1;
      for (let index = latestRaceNumber; index < raceNumber; index++) {
        addNpRaces[index + "race"] = 0;
        addNpRaces[index + "group"] = "NP";
      }
    }

    const arrayOfPoints = add
      ? Object.entries(add)
          .filter((arr) => arr[0].includes("race"))
          .map((array) => parseInt(array[1]))
      : [0];

    arrayOfPoints.push(piloto.points); //add current race

    // const racesToRemove =
    //   raceNumber > 9
    //     ? arrayOfPoints.length - 2
    //     : raceNumber > 7
    //     ? arrayOfPoints.length - 1
    //     : arrayOfPoints.length;

    // const arrayWithoutWorse =
    //   arrayOfPoints.length > 3
    //     ? arrayOfPoints.sort((a, b) => a - b).slice(1, racesToRemove)
    //     : arrayOfPoints;

    //keep going
    return {
      ...addNpRaces,
      ...add,
      name: piloto.name,
      // points: add
      //   ? (parseInt(piloto.points) + parseInt(add.points)).toString()
      //   : piloto.points.toString(),
      // finalPoints: arrayWithoutWorse.reduce(
      //   (partialSum, a) => partialSum + a,
      //   0
      // ), //somar
      [raceNumber + "race"]: piloto.points.toString(),
      [raceNumber + "group"]: piloto.raceName,
    };
  });

  const totalClassification = [...newClassification, ...classification]; //Fix
  totalClassification.sort(
    (a, b) =>
      getDriverFinalPoints(totalClassification, b) -
      getDriverFinalPoints(totalClassification, a)
  );
  const retClass = totalClassification.filter((value, index, self) => {
    return self.findIndex((v) => v.name === value.name) === index;
  });
  return retClass.map((piloto, index) => {
    return { ...piloto, pos: (index + 1).toString() };
  });
};

export const sortByFinalPoints = (classification) => {
  const finalClass = classification.sort(
    (a, b) =>
      getDriverFinalPoints2(classification, b) -
      getDriverFinalPoints2(classification, a)
  );
  const retClass = finalClass.filter((value, index, self) => {
    return self.findIndex((v) => v.name === value.name) === index;
  });
  return retClass.map((piloto, index) => {
    return { ...piloto, pos: (index + 1).toString() };
  });
};

export const getDriverTotalPoints = (driver) => {
  return Object.entries(driver)
    .filter((arr) => arr[0].includes("race"))
    .map((array) => parseInt(array[1]))
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
};

export const getDriverFinalPoints = (championship, driver) => {
  let totalRaces = 0;

  for (let i = 0; i < championship.length; i++) {
    let driverRaces = Object.keys(championship[i]).filter((str) =>
      str.includes("race")
    ).length;

    if (driverRaces > totalRaces) {
      totalRaces = driverRaces;
    }
  }

  let totalDriverRaces = driver
    ? Object.keys(driver).filter((str) => str.includes("race")).length
    : 1;

  const arrayOfPoints = Object.entries(driver)
    .filter((arr) => arr[0].includes("race"))
    .map((array) => parseInt(array[1]));

  while (arrayOfPoints.length < totalRaces) {
    arrayOfPoints.push(0);
  }

  const racesToRemove =
    // totalDriverRaces > 9
    //   ? arrayOfPoints.length - 2
    //   : totalDriverRaces > 7
    //   ? arrayOfPoints.length - 1
    //   :
    arrayOfPoints.length;

  const arrayWithoutWorse =
    arrayOfPoints.length > 3
      ? arrayOfPoints.sort((a, b) => a - b).slice(1, racesToRemove)
      : arrayOfPoints;

  return arrayWithoutWorse.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};

export const getDriverFinalPoints2 = (championship, driver) => {
  let totalRaces = 0;

  for (let i = 0; i < championship.length; i++) {
    let driverRaces = Object.keys(championship[i]).filter((str) =>
      str.includes("race")
    ).length;

    if (driverRaces > totalRaces) {
      totalRaces = driverRaces;
    }
  }

  let totalDriverRaces = driver
    ? Object.keys(driver).filter((str) => str.includes("race")).length
    : 1;

  const arrayOfPoints = Object.entries(driver)
    .filter((arr) => arr[0].includes("race"))
    .map((array) => parseInt(array[1]));

  while (arrayOfPoints.length < totalRaces) {
    arrayOfPoints.push(0);
  }

  const racesToRemove = totalRaces > 9 ? 3 : totalDriverRaces > 7 ? 2 : 1;

  const arrayWithoutWorse = arrayOfPoints.sort((a, b) => a - b)

  return arrayWithoutWorse.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};
