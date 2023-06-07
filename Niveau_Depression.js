export class Niveau_Depression extends Phaser.Scene{
    constructor(){
        super("Niveau_Depression");
    }

    preload(){

        this.load.spritesheet('ame','Sprites/ame/ame.png',
        { frameWidth: 32, frameHeight: 64 });    

        this.load.audio("Bruits_Pas", 'assets/Music/Pas.mp3')
        //tentative de mettre des bruitages de pas

        this.load.image("Tileset", "assets/tileset.png");

        this.load.tilemapTiledJSON("Niveau_Depression", "assets/Niveau_Depression_Tiled.json");  
    
        this.load.image("Background_Depression", "Background/BG_Niveau/Background_Depression.png");

        this.load.image("Fin_Jeu", "assets/Entre_Niveaux/Fin_Jeu.png")

        this.load.image("GameOver", "game_Over/ecran_game_Over.png")

        this.load.audio("Musique_Depression", 'assets/Music/Musique_Depression.mp3')
        //chargement des sprites et de la musique

        
        this.load.spritesheet("Perso_avance","/Sprites/ame/ame_course.png",
        { frameWidth: 32, frameHeight: 64 });
        //avancer (droite ou gauche)

        this.load.spritesheet("Perso_saute","/Sprites/ame/ame_saut.png",
        { frameWidth: 32, frameHeight: 64 });
        //sauter

        this.load.spritesheet("Perso_en_saut","/Sprites/ame/ame_en_saut.png",
        { frameWidth: 32, frameHeight: 64 });
        //en l'air

        this.load.spritesheet("Perso_Idle","/Sprites/ame/ame_idle.png",
        { frameWidth: 32, frameHeight: 64 });
        //immobile



    }

    create(){

        this.Mouvement = false

        this.musiqueDeFond = this.sound.add("Musique_Depression");
        this.musiqueDeFond.play();
        //lancement musique dépression

        this.add.image(479, 1279, 'Background_Depression');
        //background

        const carteDuNiveau = this.add.tilemap("Niveau_Depression")

        const tileset = carteDuNiveau.addTilesetImage("tileset", "Tileset")
        //chargement map et tileset

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
        //chargement sprites

        Plateformes.setCollisionByProperty({estSolide: true})
        FinNiveau.setCollisionByProperty({estFini: true})
        Pics.setCollisionByProperty({estGameOver: true})
        //propriétés des sprites

        this.canJump = true;

        this.FinJeu = this.add.image(590, 375, "Fin_Jeu").setVisible(false)
        this.FinJeu.setScale(0.558)
        this.FinJeu.setDepth(10)
        this.FinJeu.setScrollFactor(0)
        //chargement ecran fin jeu

        this.Gameover = this.add.image(645, 358, "GameOver").setVisible(false)
        this.Gameover.setScale(0.515)
        this.Gameover.setDepth(10)
        this.Gameover.setScrollFactor(0)
        //chargement ecran GameOver
        
        this.player = this.physics.add.sprite(550, 2500, 'ame');
        this.player.setBounce(0);    
        //sprite personnage

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.3);
        //camera

        this.physics.add.collider(this.player, Plateformes)
        this.physics.add.collider(this.player, FinNiveau, this.changementLVL, null, this)
        this.physics.add.collider(this.player, Pics, this.GameOver, null, this)
        //chargement collisions => fonctions

        this.cursors = this.input.keyboard.createCursorKeys();
        this.touche = this.input.keyboard.addKey();

        this.toucheQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.toucheSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.toucheS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.toucheD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //chargement des touches Z/Q/S/Espace

        this.anims.create({
            key: 'Gauche',
            frames: this.anims.generateFrameNumbers('Perso_avance', {start:0,end:3}),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'Droite',
            frames: this.anims.generateFrameNumbers('Perso_avance', {start:0,end:3}),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'Idle',
            frames: this.anims.generateFrameNumbers('Perso_Idle', {start:0,end:3}),
            frameRate: 4,
            repeat: -1
        });
    
        this.anims.create({
            key: 'Saut',
            frames: this.anims.generateFrameNumbers('Perso_saute', {start:0,end:3}),
            frameRate: 13,
            repeat: 0
        });
        //ajout animations

    }

    update(){

        

        if (this.cursors.left.isDown || this.toucheQ.isDown){ //si la touche gauche est appuyée
            this.player.setVelocityX(-200); //alors vitesse négative en X

            this.Mouvement = true

            if (this.player.body.onFloor())
                this.player.anims.play('Gauche', true); 
                this.player.setFlipX(true);

        }
        else if (this.cursors.right.isDown || this.toucheD.isDown){ //sinon si la touche droite est appuyée
            this.player.setVelocityX(200); //alors vitesse positive en X

            this.Mouvement = true

            if (this.player.body.onFloor())
                this.player.anims.play('Droite', true);
                this.player.setFlipX(false); 

        }
        else{ // sinon
            this.player.setVelocityX(0); //vitesse nulle

            this.Mouvement = false

            if (this.player.body.onFloor())
                this.player.anims.play('Idle', true); 

        }

        if (this.cursors.down.isDown || this.toucheS.isDown){
        //si touche bas appuyée
            this.player.setVelocityY(280); //alors vitesse verticale positive
        //(on atterri)
        }    

          const didPressJump = Phaser.Input.Keyboard.JustDown(this.toucheSpace);
      
          //Double saut que si le joueur a sauté normalement avant
        if (didPressJump && this.canJump) {
            if (this.player.body.onFloor()) {
                //Le joueur ne peut double sauter que s'il touche le sol
                this.canDoubleJump = true;
                
                this.player.anims.play('Saut', true)  
                this.player.body.setVelocityY(-400);

            }   else if (this.canDoubleJump) {
                //Double saut uniquement (pas de triple)
                this.canDoubleJump = false;

                this.player.anims.play('Saut', true)  
                this.player.body.setVelocityY(-350);

            }
            

        } 

        if (this.Mouvement === true){

            this.sound.add("Bruits_Pas", {volume : 5});

        }
        //var bruitages, si Mouvement est true, le son se lance. tentative de bruitage

    }

    changementLVL(){

        setTimeout(() => {

            this.scene.start('Cinematique_Fin')

        }, 2000);
        //après 2s, le jeu se termine

        this.FinJeu.setVisible(true)   
        //ecran de fin du jeu

        this.musiqueDeFond.stop()
        //arret musique fond

    }

    GameOver(){


    setTimeout(() => {

        this.scene.start('Niveau_Depression')

    }, 2000);
    //après 2s, le niveau recommence si le joueur perd

    this.musiqueDeFond.stop() 
    //arret musique de fond

    this.Gameover.setVisible(true) 
    //affichage ecran GameOver
                    
    
}

};
