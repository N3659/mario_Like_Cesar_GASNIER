export class Niveau_Depression extends Phaser.Scene{
    constructor(){
        super("Niveau_Depression");
    }

    preload(){

        this.load.spritesheet('ame','Sprites/Sprites_anim/ame/ame.png',
        { frameWidth: 32, frameHeight: 64 });    

        this.load.image("Tileset", "assets/tileset.png");

        this.load.tilemapTiledJSON("Niveau_Depression", "assets/Niveau_Depression_Tiled.json");  
    
        this.load.image("Background_Depression", "Background/BG_Niveau/Background_Depression.png");

        this.load.image("black_screen", "assets/Entre_Niveaux/Fin_Jeu.png")

        this.load.image("GameOver", "game_Over/ecran_game_Over.png")

        this.load.audio("Musique_Depression", 'assets/Music/Musique_Depression.mp3')


    }

    create(){

        this.musiqueDeFond = this.sound.add("Musique_Depression");
        this.musiqueDeFond.play();

        this.add.image(479, 1279, 'Background_Depression');

        const carteDuNiveau = this.add.tilemap("Niveau_Depression")

        const tileset = carteDuNiveau.addTilesetImage("tileset", "Tileset")

        const Plateformes = carteDuNiveau.createLayer(
            "Plateformes",
            tileset
        );

        const FinNiveau = carteDuNiveau.createLayer(
            "Passage",
            tileset
        );

        const Pics = carteDuNiveau.createLayer(
            "Pics",
            tileset
        )

        Plateformes.setCollisionByProperty({estSolide: true})
        FinNiveau.setCollisionByProperty({estFini: true})
        Pics.setCollisionByProperty({estGameOver: true})

        this.canJump = true;

        this.FinJeu = this.add.image(590, 350, "Fin_Jeu").setVisible(false)
        this.FinJeu.setScale(0.558)
        this.FinJeu.setDepth(10)
        this.FinJeu.setScrollFactor(0)

        this.Gameover = this.add.image(645, 358, "GameOver").setVisible(false)
        this.Gameover.setScale(0.515)
        this.Gameover.setDepth(10)
        this.Gameover.setScrollFactor(0)
        
        this.player = this.physics.add.sprite(550, 2500, 'ame');
        this.player.setBounce(0);    

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.3);


        this.physics.add.collider(this.player, Plateformes)
        this.physics.add.collider(this.player, FinNiveau, this.changementLVL, null, this)
        this.physics.add.collider(this.player, Pics, this.GameOver, null, this)

        this.cursors = this.input.keyboard.createCursorKeys();
        this.touche = this.input.keyboard.addKey();

        this.toucheQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.toucheSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.toucheS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.toucheD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.input.on('pointerdown', () => {this.click = true});

        


    }

    update(){

        

        if (this.cursors.left.isDown || this.toucheQ.isDown){ //si la touche gauche est appuyée
            this.player.setVelocityX(-300); //alors vitesse négative en X
        }
        else if (this.cursors.right.isDown || this.toucheD.isDown){ //sinon si la touche droite est appuyée
            this.player.setVelocityX(300); //alors vitesse positive en X
        }
        else{ // sinon
            this.player.setVelocityX(0); //vitesse nulle
        }

        if (this.cursors.down.isDown || this.toucheS.isDown){
        //si touche bas appuyée
            this.player.setVelocityY(315); //alors vitesse verticale positive
        //(on atterri)
        }    

          const didPressJump = Phaser.Input.Keyboard.JustDown(this.toucheSpace);
      
          // player can only double jump if the player just jumped
          if (didPressJump && this.canJump) {
            if (this.player.body.onFloor()) {
              // player can only double jump if it is on the floor
              this.canDoubleJump = true;
              

              this.player.body.setVelocityY(-400);
            } else if (this.canDoubleJump) {
              // player can only jump 2x (double jump)
              this.canDoubleJump = false;

              this.player.body.setVelocityY(-350);

            }
            

         } 

    }

    changementLVL(){

        setTimeout(() => {

            this.scene.start('Niveau_Depression')

        }, 2000);

        this.FinJeu.setVisible(true)   

        this.musiqueDeFond.stop()

    }

    GameOver(){


     setTimeout(() => {

         this.scene.start('Niveau_Depression')

     }, 2000);

    this.musiqueDeFond.stop() 

    this.Gameover.setVisible(true) 
                    
    
}

};
