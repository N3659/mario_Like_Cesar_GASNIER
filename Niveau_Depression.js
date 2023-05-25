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

        this.load.image("black_screen", "assets/black_screen.png")
    }

    create(){

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
            "pics",
            tileset
        )

        Plateformes.setCollisionByProperty({estSolide: true})
        FinNiveau.setCollisionByProperty({estFini: true})
        Pics.setCollisionByProperty({estGameOver: true})

        Pics.setVisible(true),  

        this.canJump = true;
        
        this.player = this.physics.add.sprite(550, 2500, 'ame');
        this.player.setBounce(0);    

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.3);


        this.physics.add.collider(this.player, Plateformes)
        this.physics.add.collider(this.player, FinNiveau, this.changementLVL, null, this)
        this.physics.add.collider(this.player, GameOver, this.GameOver, null, this)

        this.cursors = this.input.keyboard.createCursorKeys();
        this.touche = this.input.keyboard.addKey();

        this.toucheQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.toucheZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.toucheS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.toucheD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        


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

          const didPressJump = Phaser.Input.Keyboard.JustDown(this.toucheZ);
      
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

        this.add.image('black_screen')

        this.dia= this.add.text(990, 540, "Encore 3")

        delay: 600

        this.scene.start('Niveau_Colere')

    }

};
