var Game = {
    lock: 1,

    arrow: (predefined) => {
        if (Game.lock) {
            let key = predefined;

            if (key >= 37 && key <= 40) {
                key -= 37;
                Game.lock = 0;

                Sprites.move (key);       
                setTimeout(() => { Game.lock = 1 }, 100);      
            }
        }
    },

    key: (callback) => {
        document.body.addEventListener('keydown', function (e) {
            let key = e.keyCode;
            
            if (key >= 37 && key <= 40) {
                e.preventDefault();
                key -= 37;
                Game.lock = 0;

                callback(key);
                setTimeout(() => { Game.lock = 1 }, 100);
            }
        }, false);
    },

    camera: () => {
        let top = Math.ceil((((User.position[0] - 1) * 16) / Maps.size[0]) * 100);
        let left = Math.ceil((((User.position[1] - 1) * 16) / Maps.size[1]) * 100);

        $('#game').css('transform-origin', `${top}% ${left}%`);
    },

    load: () => {
        $('#game').css('width', `${Maps.size[0] + 16}px`);
        $('#game').css('height', `${Maps.size[1] + 16}px`);

        Maps.background();
        Maps.playerSpawn();
        Maps.npcSpawn();

        $('#trainer-' + User.id).css('left', User.position[0] * 16);
        $('#trainer-' + User.id).css('top', User.position[1] * 16);
        
        Game.key(Sprites.move);
        Maps.collide();
        Game.camera();
    }
}