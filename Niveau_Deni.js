export class Niveau_Deni extends Phaser.Scene{
    constructor(){
        super("Niveau_Deni");
    }  //constructeur de scene

    preload(){

        this.load.spritesheet('ame','Sprites/Sprites_anim/ame/ame.png',
        { frameWidth: 32, frameHeight: 64 });    
        //chargement des sprites personnage

        this.load.image("Tileset", "assets/tileset.png");

        this.load.tilemapTiledJSON("Niveau_Deni", "assets/Niveau_Deni_Tiled.json");  
        //chargement du tileset et de la map tiled
    
        this.load.image("Background_Deni", "Background/BG_Niveau/Background_Deni.png");

        this.load.image("Passage_Deni_Colere", "assets/Entre_Niveaux/Passage_Deni_Colere.png")

        //chargement du background du niveau et de l'ecran de passage
    }

    create(){

        this.add.image(479, 1279, 'Background_Deni');
        //ajout du background avec coordonnées 

        const carteDuNiveau = this.add.tilemap("Niveau_Deni")

        const tileset = carteDuNiveau.addTilesetImage("tileset", "Tileset")

        const Plateformes = carteDuNiveau.createLayer(
            "Plateformes",
            tileset
        );

        const FinNiveau = carteDuNiveau.createLayer(
            "Passage",
            tileset
        );
        //creation de la map et des différents calques avec propriétés

        Plateformes.setCollisionByProperty({estSolide: true})
        FinNiveau.setCollisionByProperty({estFini: true})

        //ajout des collisions

        this.canJump = true;
        //fonction pour double saut (l98-l112)

        this.passageDeniColere = this.add.image(590, 350, "Passage_Deni_Colere").setVisible(false)
        this.passageDeniColere.setScale(0.55)
        this.passageDeniColere.setDepth(10)
        this.passageDeniColere.setScrollFactor(0)
        //ajout de l'ecran de passage en invisible
        
        this.player = this.physics.add.sprite(550, 2500, 'ame');
        this.player.setBounce(0); 
        this.player.setDepth(2) 
        //ajout du personnage et de ses propriétés  

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.3);
        //creation des propriétés de la caméra

        this.physics.add.collider(this.player, Plateformes) //collisions entre le joueur et le niveau
        this.physics.add.collider(this.player, FinNiveau, this.changementLVL, null, this)//collision changementniveau entre joueur et arrivée

        this.cursors = this.input.keyboard.createCursorKeys();
        this.touche = this.input.keyboard.addKey();
        //importations des touches du clavier

        this.toucheQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q); //gauche
        this.toucheEspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //haut
        this.toucheS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S); //bas
        this.toucheD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); //droite

        //creation des touches du clavier


    }

    update(){

        

        if (this.cursors.left.isDown || this.toucheQ.isDown ){ //si la touche gauche est appuyée
            this.player.setVelocityX(-300); //alors vitesse négative en X, personnage vers la gauche
        }
        else if (this.cursors.right.isDown || this.toucheD.isDown ){ //sinon si la touche droite est appuyée
            this.player.setVelocityX(300); //alors vitesse positive en X, personnage vers la droite
        }
        else{ // sinon
            this.player.setVelocityX(0); //vitesse nulle, perso immobile
        }

        if (this.cursors.down.isDown || this.toucheS.isDown ){
        //si touche bas appuyée
            this.player.setVelocityY(315); //alors vitesse verticale positive
        //(on atterri)
        }    

          const didPressJump = Phaser.Input.Keyboard.JustDown(this.toucheEspace);
      
          // Le joueur de peux double jump que s'il fait un saut avant
          if (didPressJump && this.canJump ) {
            if (this.player.body.onFloor()) {
              // le joueur ne peux double jump que s'il est sur le sol
              this.canDoubleJump = true;
              

              this.player.body.setVelocityY(-400);
            } else if (this.canDoubleJump) {
              // le joueur ne peux sauter que 2 fois (pas de triple saut)
              this.canDoubleJump = false;

              this.player.body.setVelocityY(-350);

            }

         } 



    }

    changementLVL(){ //fonction pour changer de niveau

        setTimeout(() => { //delai pour voir l'ecran avant de changer

            this.scene.start('Niveau_Colere') //changement de scene

        }, 2000); //2000ms de delai

        this.passageDeniColere.setVisible(true); //afficher l'ecran de fin de niveau
    }

};
