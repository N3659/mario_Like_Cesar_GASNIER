export class Niveau_Marchandage extends Phaser.Scene{
    constructor(){
        super("Niveau_Marchandage");
    }

    preload(){

        this.load.spritesheet('ame','Sprites/Sprites_anim/ame/ame.png',
        { frameWidth: 32, frameHeight: 64 });    

        this.load.image("Tileset", "assets/tileset.png");

        this.load.tilemapTiledJSON("Niveau_Marchandage", "assets/Niveau_Marchandage_Tiled.json");  
    
        this.load.image("Background_Marchandage", "Background/BG_Niveau/Background_Marchandage.png");

        this.load.image("Passage_Marchandage_Depression", "assets/Entre_Niveaux/Passage_Marchandage_Depression.png")

        this.load.image("Retour_Case_Depart", "assets/RetourCaseDepart.png")

        this.load.audio("Musique_Marchandage", 'assets/Music/Musique_Marchandage.mp3')
    }

    create(){

        this.musiqueDeFond = this.sound.add("Musique_Marchandage");
        this.musiqueDeFond.play();

        this.add.image(479, 1279, 'Background_Marchandage');

        const carteDuNiveau = this.add.tilemap("Niveau_Marchandage")

        const tileset = carteDuNiveau.addTilesetImage("tileset", "Tileset")

        const Plateformes = carteDuNiveau.createLayer(
            "Plateformes",
            tileset
        );

        const FinNiveau = carteDuNiveau.createLayer(
            "Passage",
            tileset
        );

        const RetourDebut = carteDuNiveau.createLayer(
            "RetourDebut",
            tileset
        );

        FinNiveau.setCollisionByProperty({estFini: true}),
        RetourDebut.setCollisionByProperty({estTrigger: true}),
        Plateformes.setCollisionByProperty({estSolide: true}),

        this.canJump = true;

        this.passageMarchandageDepression = this.add.image(606, 357, "Passage_Marchandage_Depression").setVisible(false)
        this.passageMarchandageDepression.setScale(0.52)
        this.passageMarchandageDepression.setDepth(10)
        this.passageMarchandageDepression.setScrollFactor(0)

        this.RetourDebut = this.add.image(600, 360, "Retour_Case_Depart").setVisible(false)
        this.RetourDebut.setScale(0.55)
        this.RetourDebut.setDepth(10)
        this.RetourDebut.setScrollFactor(0)

        
        this.player = this.physics.add.sprite(550, 2500, 'ame');
        this.player.setBounce(0); 
        this.player.setDepth(2)   

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.3);

        this.physics.add.collider(this.player, Plateformes)
        this.physics.add.collider(this.player, FinNiveau, this.changementLVL, null, this)
        this.physics.add.collider(this.player, RetourDebut, this.retour, null, this)

        this.cursors = this.input.keyboard.createCursorKeys();
        this.touche = this.input.keyboard.addKey();

        this.toucheQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.toucheEspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.toucheS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.toucheD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


    }

    update(){

        

        if (this.cursors.left.isDown || this.toucheQ.isDown ){ //si la touche gauche est appuyée
            this.player.setVelocityX(-300); //alors vitesse négative en X
        }
        else if (this.cursors.right.isDown || this.toucheD.isDown ){ //sinon si la touche droite est appuyée
            this.player.setVelocityX(300); //alors vitesse positive en X
        }
        else{ // sinon
            this.player.setVelocityX(0); //vitesse nulle
        }

        if (this.cursors.down.isDown || this.toucheS.isDown ){
        //si touche bas appuyée
            this.player.setVelocityY(315); //alors vitesse verticale positive
        //(on atterri)
        }    

          const didPressJump = Phaser.Input.Keyboard.JustDown(this.toucheEspace);
      
          // player can only double jump if the player just jumped
          if (didPressJump && this.canJump ) {
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

            this.scene.start('Niveau_Depression');
            this.musiqueDeFond.stop();

        }, 2000);

        this.passageMarchandageDepression.setVisible(true);


    }

    retour(){

        

        setTimeout(() => {

            this.scene.start('Niveau_Marchandage')
            this.musiqueDeFond.stop();
            
        }, 2000);

        this.RetourDebut.setVisible(true);


    }

};
