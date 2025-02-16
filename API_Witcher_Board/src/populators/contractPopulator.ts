import {
  addContract,
  assignContract,
  completeContract,
} from "../repositories/contractRepository";

export const populate = () => {
  [
    {
      title: "Exterminate the Nekkers near the old mill",
      description:
        "A pack of Nekkers has settled near the abandoned mill outside the village.\nThey attack travelers and steal livestock. The contract is open to any capable Witcher.\nBeware: reports indicate a Nekker Warrior among them.",
      reward: "300 Crowns and a Silver Sword enhancement",
    },
    {
      title: "Eliminate the Noonwraith haunting the sunflower fields",
      description:
        "Farmers refuse to work the fields due to the presence of a vengeful Noonwraith.\nThe ghost appears at midday, luring victims with sorrowful whispers.\nA Witcher is needed to lift the curse and restore peace.",
      reward: "400 Crowns and a Rune Stone",
    },
    {
      title: "Track down and slay the Griffin terrorizing the mountain pass",
      description:
        "Merchants can no longer safely cross the high mountain pass due to a Griffin attack. Several caravans have gone missing. The beast is said to be an experienced hunter. Only an expert Witcher should attempt this hunt.",
      reward: "600 Crowns and a custom-forged Witcher’s steel sword",
    },
    {
      title: "Investigate the disappearances in the cursed village of Duskwood",
      description:
        "Villagers from Duskwood have been vanishing without a trace.\nStrange howls are heard at night, and those who wander too close to the abandoned chapel never return.\nThe local alderman offers a hefty sum for solving the mystery.",
      reward: "500 Crowns and a rare alchemical formula",
    },
  ].forEach((contract) => addContract(contract));

  assignContract(2, 2);
  assignContract(3, 1);

  completeContract(2);
};
