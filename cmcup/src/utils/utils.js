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
  return newKeys2;
};

export const getKeyString = (key) => {
  switch (key) {
    case "pos":
      return "Posição";
    case "name":
      return "Nome";
    case "race1":
      return "Corrida 1";
    case "group1":
      return "Grupo 1";
    case "race2":
      return "Corrida 2";
    case "group2":
      return "Grupo 2";
    case "race3":
      return "Corrida 3";
    case "group3":
      return "Grupo 3";
    case "race4":
      return "Corrida 4";
    case "group4":
      return "Grupo 4";
    case "race5":
      return "Corrida 5";
    case "group5":
      return "Grupo 5";
    case "race6":
      return "Corrida 6";
    case "group6":
      return "Grupo 6";
    case "race7":
      return "Corrida 7";
    case "group7":
      return "Grupo 7";
    case "race8":
      return "Corrida 8";
    case "group8":
      return "Grupo 8";
    case "race9":
      return "Corrida 9";
    case "group9":
      return "Grupo 9";
    case "points":
      return "Pontuação";
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
    //keep going
    return {
      ...add,
      name: piloto.name,
      points: add
        ? (parseInt(piloto.points) + parseInt(add.points)).toString()
        : piloto.points.toString(),
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
