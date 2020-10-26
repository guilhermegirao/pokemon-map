var Sprites = {
    directions: ['W', 'N', 'E', 'S'],
    sprites: 1,
    folder: 'images/sprites/',
    walked: 1,
    speed: 100,
    key: 0,

    change: () => {
        let player = $('#trainer-' + User.id);
        let sprite = Sprites.folder + User.sprite + '/' + Sprites.walked + '-' + Sprites.directions[Sprites.key] + '.png';

        player.attr('src', sprite);
    },

    changeNpc: (id, walked, key) => {
        let npc = $(`[data-npc-id="${id}"]`);
        let npcData = Npcs.getData(id);

        let sprite = Sprites.folder + npcData.sprite + '/' + walked + '-' + Sprites.directions[key] + '.png';

        npc.attr('src', sprite);
    },

    move: (key) => {
        Sprites.key = key;
        
        switch (key) {
            case 0:
                User.position[0] -= (User.position[0] == 1)? 0 : 1;
                
                if (Maps.collide()) {
                    Sprites.movement('x', User.position[0] * 16);
                } else {
                    User.position[0] += (User.position[0] == 1) ? 0 : 1;
                }

                break;
            case 1:
                User.position[1] -= (User.position[1] == 1) ? 0 : 1;

                if (Maps.collide()) {
                    Sprites.movement('y', User.position[1] * 16);
                } else {
                    User.position[1] += (User.position[1] == 1) ? 0 : 1;
                }
                
                break;
            case 2:
                User.position[0] += 1;

                if (Maps.collide()) {
                    Sprites.movement('x', User.position[0] * 16);
                } else {
                    User.position[0] -= 1;
                }
                
                break;
            case 3:
                User.position[1] += 1;

                if (Maps.collide()) {
                    Sprites.movement('y', User.position[1] * 16);
                } else {
                    User.position[1] -= 1;
                }
                
                break;
        }
        
    },

    moveNpc: (id) => {
        let key = Npcs.randomPos();
        let npcData = Npcs.getData(id);

        switch (key) {
            case 0:
                npcData.position[0] -= (npcData.position[0] == 1)? 0 : 1;
                
                if (Maps.collideNpc(id)) {
                    Sprites.movementNpc(id, 'x', npcData.position[0] * 16, key);
                } else {
                    npcData.position[0] += (npcData.position[0] == 1) ? 0 : 1;
                }

                break;
            case 1:
                npcData.position[1] -= (npcData.position[1] == 1) ? 0 : 1;

                if (Maps.collideNpc(id)) {
                    Sprites.movementNpc(id, 'y', npcData.position[1] * 16, key);
                } else {
                    npcData.position[1] += (npcData.position[1] == 1) ? 0 : 1;
                }
                
                break;
            case 2:
                npcData.position[0] += 1;

                if (Maps.collideNpc(id)) {
                    Sprites.movementNpc(id, 'x', npcData.position[0] * 16, key);
                } else {
                    npcData.position[0] -= 1;
                }
                
                break;
            case 3:
                npcData.position[1] += 1;

                if (Maps.collideNpc(id)) {
                    Sprites.movementNpc(id, 'y', npcData.position[1] * 16, key);
                } else {
                    npcData.position[1] -= 1;
                }
                
                break;
        }
        
    },

    movement: (direction, position) => {
        Sprites.walk ();
        let lock = false;

        setTimeout (() => {
            Sprites.walked = 1;
            Sprites.change(Sprites.key);
        }, 150);

        if (direction == 'x') {
            if (position <= Maps.size[0]) {
                $('#trainer-' + User.id).animate ({
                    top: User.position[1] * 16,
                    left: position + 'px'
                }, Sprites.speed);

                lock = true;
            }
        } else if (direction == 'y') {
            if (position <= Maps.size[1]) {
                $('#trainer-' + User.id).animate({
                    top: position + 'px',
                    left: User.position[0] * 16
                }, Sprites.speed);

                lock = true;
            }
        }

        Game.camera();
    },

    movementNpc: (id, direction, position, key) => {
        let npc = $(`[data-npc-id="${id}"]`);
        let npcData = Npcs.getData(id);

        Sprites.walkNpc (id, key);
        let lock = false;
        let walked = 1;

        setTimeout (() => {
            Sprites.changeNpc(id, walked, key);
        }, 150);

        if (direction == 'x') {
            if (position <= Maps.size[0]) {
                npc.animate ({
                    top: npcData.position[1] * 16,
                    left: position + 'px'
                }, Sprites.speed);

                lock = true;
            }
        } else if (direction == 'y') {
            if (position <= Maps.size[1]) {
                npc.animate({
                    top: position + 'px',
                    left: npcData.position[0] * 16
                }, Sprites.speed);

                lock = true;
            }
        }
    },

    walk: () => {
        let ended = 0;

        setTimeout (() => {
            Sprites.walked = 2; 
            Sprites.change(Sprites.key);

            ended = 1;

            setInterval(() => {
                if (ended) {
                    Sprites.walked = 3;
                    Sprites.change(Sprites.key);

                    ended = 0;
                }
            }, 60);
        }, 60);
    },

    walkNpc: (id, key) => {
        let ended = 0;
        let walked = 2;

        setTimeout (() => {
            walked = 2;
            Sprites.changeNpc(id, walked, key);

            ended = 1;

            setInterval(() => {
                if (ended) {
                    walked = 3;
                    Sprites.changeNpc(id, walked, key);

                    ended = 0;
                }
            }, 60);
        }, 60);
    }
}