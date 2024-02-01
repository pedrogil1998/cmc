import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const scoringSystem = [
  { pos: 1, points: 30 },
  { pos: 2, points: 28 },
  { pos: 3, points: 26 },
  { pos: 4, points: 24 },
  { pos: 5, points: 22 },
  { pos: 6, points: 20 },
  { pos: 7, points: 19 },
  { pos: 8, points: 18 },
  { pos: 9, points: 17 },
  { pos: 10, points: 16 },
  { pos: 11, points: 15 },
  { pos: 12, points: 14 },
  { pos: 13, points: 13 },
  { pos: 14, points: 12 },
  { pos: 15, points: 11 },
  { pos: 16, points: 10 },
  { pos: 17, points: 9 },
  { pos: 18, points: 8 },
  { pos: 19, points: 7 },
  { pos: 20, points: 6 },
  { pos: 21, points: 5 },
  { pos: 22, points: 4 },
  { pos: 23, points: 3 },
  { pos: 24, points: 2 },
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
  const keys = Object.keys(championship[highestItem]);
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
    case "race1":
      return "C1";
    case "group1":
      return "G1";
    case "race2":
      return "C2";
    case "group2":
      return "G2";
    case "race3":
      return "C3";
    case "group3":
      return "G3";
    case "race4":
      return "C4";
    case "group4":
      return "G4";
    case "race5":
      return "C5";
    case "group5":
      return "G5";
    case "race6":
      return "C6";
    case "group6":
      return "G6";
    case "race7":
      return "C7";
    case "group7":
      return "G7";
    case "race8":
      return "C8";
    case "group8":
      return "G8";
    case "race9":
      return "C9";
    case "group9":
      return "G9";
    case "race10":
      return "C10";
    case "group10":
      return "G10";
    case "race11":
      return "C11";
    case "group11":
      return "G11";
    case "race12":
      return "C12";
    case "group12":
      return "G12";
    case "points":
      return "PT";
    case "finalPoints":
      return "PF";
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
    };
  });

  const newClassification = racePoints.map((piloto) => {
    const add = classification.find((element) => element.name == piloto.name);
    const raceNumber = add
      ? Object.keys(add).filter((str) => str.includes("race")).length + 1
      : 1;

    const arrayOfPoints = add
      ? Object.entries(add)
          .filter((arr) => arr[0].includes("race"))
          .map((array) => parseInt(array[1]))
      : [0];

    arrayOfPoints.push(piloto.points); //add current race

    const racesToRemove =
      raceNumber > 9
        ? arrayOfPoints.length - 2
        : raceNumber > 7
        ? arrayOfPoints.length - 1
        : arrayOfPoints.length;

    const arrayWithoutWorse =
      arrayOfPoints.length > 3
        ? arrayOfPoints.sort((a, b) => a - b).slice(1, racesToRemove)
        : arrayOfPoints;

    //keep going
    return {
      ...add,
      name: piloto.name,
      points: add
        ? (parseInt(piloto.points) + parseInt(add.points)).toString()
        : piloto.points.toString(),
      finalPoints: arrayWithoutWorse.reduce(
        (partialSum, a) => partialSum + a,
        0
      ), //somar
      ["race" + raceNumber]: piloto.points.toString(),
      ["group" + raceNumber]: piloto.raceName,
    };
  });

  const totalClassification = [...classification, ...newClassification]; //Fix
  totalClassification.sort((a, b) => b.points - a.points);
  const retClass = totalClassification.filter((value, index, self) => {
    return self.findIndex((v) => v.name === value.name) === index;
  });
  return retClass.map((piloto, index) => {
    return { ...piloto, pos: (index + 1).toString() };
  });
};
