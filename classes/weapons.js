function randomRotation(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let weapons = [
    {
        name: "cutlass",
        image: "../images/weapons/cutlass.png",
        damage: 10,
        scoreReduction: 0.04,
        rotation: randomRotation(0, 360),
        initialChance: 0.25
    },
    {
        name: "dagger",
        image: "../images/weapons/dagger.png",
        damage: 8,
        scoreReduction: 0.03,
        rotation: randomRotation(0, 360),
        initialChance: 0.25
    },
    {
        name: "knife",
        image: "../images/weapons/knife.png",
        damage: 15,
        scoreReduction: 0.05,
        rotation: randomRotation(0, 360),
        initialChance: 0.20
    },
    {
        name: "mace",
        image: "../images/weapons/mace.png",
        damage: 50,
        scoreReduction: 5000,
        rotation: randomRotation(0, 360),
        initialChance: 0.10
    },
    {
        name: "machete",
        image: "../images/weapons/machete.png",
        damage: 20,
        scoreReduction: 500,
        rotation: randomRotation(0, 360),
        initialChance: 0.10
    },
    {
        name: "pipe",
        image: "../images/weapons/pipe.png",
        damage: 5,
        scoreReduction: 0.25,
        rotation: randomRotation(0, 360),
        initialChance: 0.05
    },
    {
        name: "spear",
        image: "../images/weapons/spear.png",
        damage: 12,
        scoreReduction: 0.30,
        rotation: randomRotation(0, 360),
        initialChance: 0.05
    },
]

// There will be a list in the main menu displaying the
// weapons damage values and whether they take a flat
// amount of score away or a percentage. Weapons with
// low chances of spawning take a large percentage away.