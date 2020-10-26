var Maps = {
    size: [800, 480],
    tiles: [50, 30],
    map: 1,
    players: [],
    players_position: [],
    players_sprites: [],
    
    background: () => {
        $('#game').css('background', 'url(images/mapas/mapa' + Maps.map + '/mapa.png)');
    },

    collide: () => {
        let map = Mapa.area[User.position[1]][User.position[0]];

        return !map;
    }, 

    collideNpc: (id) => {
        let npcData = Npcs.getData(id);
        let map = Mapa.area[npcData.position[1]][npcData.position[0]];

        return !map;
    }, 

    playerSpawn: () => {
        let num_players = Maps.players.length;
        let x = '';
        let y = '';
        
        for (let i = 0; i < num_players; i++) {
            x = Maps.players_position[i][0] * 16 + 'px';
            y = Maps.players_position[i][1] * 16 + 'px';
            
            let player = $(`<img class="trainer" title="${Maps.players[i]}">`);
            player.attr('src', 'images/sprites/' + Maps.players_sprites[i] + '/1-S.png');
            player.css('left', x);
            player.css('top', y);
            player.appendTo('#game');
        }
    },
   
    npcSpawn: () => {
        let num_npcs = Npcs.list.length;
        let x = '';
        let y = '';
        
        for (let i = 0; i < num_npcs; i++) {
            x = Npcs.list[i].position[0] * 16 + 'px';
            y = Npcs.list[i].position[1] * 16 + 'px';
            
            let npc = $(`<img class="npc" data-npc-id="${Npcs.list[i].id}" title="${Npcs.list[i].name}">`);
            npc.attr('src', 'images/sprites/' + Npcs.list[i].sprite + '/1-S.png');
            npc.css('left', x);
            npc.css('top', y);
            npc.appendTo('#game');
        }
    }
}