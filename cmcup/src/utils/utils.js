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

export const addResultsToChampionship = (classification, raceResults) => {
  const racePoints = raceResults.map((entry) => {
    const match = scoringSystem.find((element) => element.pos == entry.pos);
    return {
      name: entry.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""), //remove accents
      points: match.points,
    };
  });

  const newClassification = racePoints.map((piloto) => {
    const add = classification.find((element) => element.name == piloto.name);

    //keep going
    return {
      name: piloto.name,
      points: add
        ? (parseInt(piloto.points) + parseInt(add.points)).toString()
        : piloto.points.toString(),
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
