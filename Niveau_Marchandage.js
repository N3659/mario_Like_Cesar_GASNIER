export class Niveau_Marchandage extends Phaser.Scene{
    constructor(){
        super("Niveau_Marchandage");
    }

    preload(){

        this.load.spritesheet('ame','Sprites/Sprites_anim/ame/ame.png',
        { frameWidth: 32, frameHeight: 64 });    

        this.load.audio("Bruits_Pas", 'assets/Music/Pas.mp3')
        //tentative de mettre des bruitages de pas

        this.load.image("Tileset", "assets/tileset.png");

        this.load.tilemapTiledJSON("Niveau_Marchandage", "assets/Niveau_Marchandage_Tiled.json");  
    
        this.load.image("Background_Marchandage", "Background/BG_Niveau/Background_Marchandage.png");

        this.load.image("Passage_Marchandage_Depression", "assets/Entre_Niveaux/Passage_Marchandage_Depression.png")

        this.load.image("Retour_Case_Depart", "assets/RetourCaseDepart.png")

        this.load.audio("Musique_Marchandage", 'assets/Music/Musique_Marchandage.mp3')
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

        this.musiqueDeFond = this.sound.add("Musique_Marchandage");
        this.musiqueDeFond.play();
        //lancement de la musique 

        this.add.image(479, 1279, 'Background_Marchandage');
        //affichage Background

        const carteDuNiveau = this.add.tilemap("Niveau_Marchandage")

        const tileset = carteDuNiveau.addTilesetImage("tileset", "Tileset")
        //Chargement map et tileset

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
        //chargement des calques

        FinNiveau.setCollisionByProperty({estFini: true}),
        RetourDebut.setCollisionByProperty({estTrigger: true}),
        Plateformes.setCollisionByProperty({estSolide: true}),
        //propriétés des calques

        this.canJump = true;
        //fonction double saut

        this.passageMarchandageDepression = this.add.image(606, 357, "Passage_Marchandage_Depression").setVisible(false)
        this.passageMarchandageDepression.setScale(0.52)
        this.passageMarchandageDepression.setDepth(10)
        this.passageMarchandageDepression.setScrollFactor(0)
        //chargement ecran de changement de niveau

        this.RetourDebut = this.add.image(600, 360, "Retour_Case_Depart").setVisible(false)
        this.RetourDebut.setScale(0.55)
        this.RetourDebut.setDepth(10)
        this.RetourDebut.setScrollFactor(0)
        //chargement ecran de gameOver

        
        this.player = this.physics.add.sprite(550, 2500, 'ame');
        this.player.setBounce(0); 
        this.player.setDepth(2)   
        //chargement sprites perso et proprietés

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.3);
        //chargement caméra

        this.physics.add.collider(this.player, Plateformes)
        this.physics.add.collider(this.player, FinNiveau, this.changementLVL, null, this)
        this.physics.add.collider(this.player, RetourDebut, this.retour, null, this)
        //chargement des collisions calques

        this.cursors = this.input.keyboard.createCursorKeys();
        this.touche = this.input.keyboard.addKey();

        this.toucheQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.toucheEspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.toucheS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.toucheD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //deplacement avec Z/Q/S/Espace

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

        

        if (this.cursors.left.isDown || this.toucheQ.isDown ){ //si la touche gauche est appuyée
            this.player.setVelocityX(-250); //alors vitesse négative en X

            this.Mouvement = true

            if (this.player.body.onFloor())
                this.player.anims.play('Gauche', true); 
                this.player.setFlipX(true);

        }
        else if (this.cursors.right.isDown || this.toucheD.isDown ){ //sinon si la touche droite est appuyée
            this.player.setVelocityX(250); //alors vitesse positive en X

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

        if (this.cursors.down.isDown || this.toucheS.isDown ){
        //si touche bas appuyée
            this.player.setVelocityY(280); //alors vitesse verticale positive
        //(on atterri)
        }    

          const didPressJump = Phaser.Input.Keyboard.JustDown(this.toucheEspace);
      
          //Double saut possible seulement si le joueur a déjà fait le saut de base
        if (didPressJump && this.canJump ) {
            if (this.player.body.onFloor()) {
                //Le joueur peut activer le double saut seulement depuis une plateforme
                this.canDoubleJump = true;
                
                this.player.anims.play('Saut', true)  
                this.player.body.setVelocityY(-400);
                
            }   else if (this.canDoubleJump) {
                // Le joueur ne peut que double sauter (pas de triple)
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

            this.scene.start('Niveau_Depression');
            this.musiqueDeFond.stop();

        }, 2000);
        //affichage pdt 2s de l'ecran de changement de niveau avant le changement, et la musique s'arrete

        this.passageMarchandageDepression.setVisible(true);
        //l'ecran de changement s'affiche


    }

    retour(){

        

        setTimeout(() => {

            this.scene.start('Niveau_Marchandage')
            this.musiqueDeFond.stop();
            
        }, 2000);
        //si le joueur touche la fonction retour, il est renvoyé au début du niveau après 2s

        this.RetourDebut.setVisible(true);
        //affichage de l'ecran de GameOver


    }

};
