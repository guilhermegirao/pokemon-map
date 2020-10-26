var Npcs = {
  list: [
    {
        id: 1,
        name: 'NPC 1',
        position: [10, 10],
        sprite: 1
    },
    {
        id: 2,
        name: 'NPC 2',
        position: [10, 20],
        sprite: 1
    }
  ],

  getData: (id) => {
    return Npcs.list.filter((data) => { return data.id == id; })[0];
  },

  setPosition: (id, position) => {
    let list = Npcs.list.filter((data) => { return data.id == id; })[0];
    list.position = position;
  },

  npcToWalk: (id) => {
    setInterval(() => {
      Sprites.moveNpc(id);
    }, 800);
  },

  randomPos: () => {
    return Math.floor(Math.random() * 4);
  }
}