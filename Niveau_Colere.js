export class Niveau_Colere extends Phaser.Scene{
    constructor(){
        super("Niveau_Colere");
    }

    preload(){

        this.load.audio("Musique_Colere", 'assets/Music/Musique_Colere.mp3')
        //chargement musique

        this.load.spritesheet('ame','Sprites/ame/ame.png',
        { frameWidth: 32, frameHeight: 64 });    
        //chargement sprite personnage

        this.load.image("Seraphin", "Sprites/ange/Seraphin_base.png");
        //chargement sprites ennemis

        this.load.image("Tileset", "assets/tileset.png");

        this.load.tilemapTiledJSON("Niveau_Colere", "assets/Niveau_Colere_Tiled.json");  
        //chargement tileset et map tiled

        this.load.image("Background_Colere", "Background/BG_Niveau/Background_Colere.png");
        //Chargement BG niveau

        this.load.image("Passage_Colere_Depression", "assets/Entre_Niveaux/Passage_Colere_Marchandage.png")
        //chargement ecran de passage au niveau suivant

        this.load.image("EcranMort","assets/Ecran_Mort.png")
        //chargement ecran mort/game over

        this.load.spritesheet("Seraphins_Bouge","/Sprites/ange/Seraphin_bouge.png",
        { frameWidth: 64, frameHeight: 77 });
        //Mouvement ennemis

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
        //en l'air
    }

    create(){

        this.musiqueDeFond = this.sound.add("Musique_Colere", {volume : 0.5});
        this.musiqueDeFond.play();

        this.add.image(479, 1279, 'Background_Colere');
        //ajout BG niveau

        const carteDuNiveau = this.add.tilemap("Niveau_Colere")

        const tileset = carteDuNiveau.addTilesetImage("tileset", "Tileset")
        //ajout du tileset et de la map tiled

        const Plateformes = carteDuNiveau.createLayer(
            "Plateformes",
            tileset
        );

        const FinNiveau = carteDuNiveau.createLayer(
            "Passage",
            tileset
        );

        //chargement des différents layers

        Plateformes.setCollisionByProperty({estSolide: true})
        FinNiveau.setCollisionByProperty({estFini: true})
        //creation des collisions

        this.canJump = true;
        //pour double saut

        this.anims.create({
            key: 'Ennemis',
            frames: this.anims.generateFrameNumbers('Seraphins_Bouge', {start:0,end:6}),
            frameRate: 10,
            repeat: -1
        });

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
            frameRate: 9,
            repeat: -1
        });


        //animation ennemis

        //_________________________________________________________________________
        //Creation des box collider pour le mouvement des ennemis 

        this.Gauche1 = this.add.rectangle(250, 2000, 20, 20)
        this.physics.add.existing(this.Gauche1);
        this.Gauche1.body.setAllowGravity(false)
        this.Gauche1.body.setImmovable(true)

        this.Droite1 = this.add.rectangle(495, 2000, 20, 20)
        this.physics.add.existing(this.Droite1);
        this.Droite1.body.setAllowGravity(false)
        this.Droite1.body.setImmovable(true)

        //---

        this.Gauche2 = this.add.rectangle(722, 1740, 20, 20)
        this.physics.add.existing(this.Gauche2);
        this.Gauche2.body.setAllowGravity(false)
        this.Gauche2.body.setImmovable(true)

        this.Droite2 = this.add.rectangle(936, 1740, 20, 20)
        this.physics.add.existing(this.Droite2);
        this.Droite2.body.setAllowGravity(false)
        this.Droite2.body.setImmovable(true)

        //---

        this.Gauche3 = this.add.rectangle(665, 1130, 20, 20)
        this.physics.add.existing(this.Gauche3);
        this.Gauche3.body.setAllowGravity(false)
        this.Gauche3.body.setImmovable(true)

        this.Droite3 = this.add.rectangle(930, 1130, 20, 20)
        this.physics.add.existing(this.Droite3);
        this.Droite3.body.setAllowGravity(false)
        this.Droite3.body.setImmovable(true)

        //---

        this.Gauche4 = this.add.rectangle(470, 1080, 20, 20)
        this.physics.add.existing(this.Gauche4);
        this.Gauche4.body.setAllowGravity(false)
        this.Gauche4.body.setImmovable(true)

        this.Droite4 = this.add.rectangle(600, 1080, 20, 20)
        this.physics.add.existing(this.Droite4);
        this.Droite4.body.setAllowGravity(false)
        this.Droite4.body.setImmovable(true)

        //---

        this.Gauche5 = this.add.rectangle(25, 1130, 20, 20)
        this.physics.add.existing(this.Gauche5);
        this.Gauche5.body.setAllowGravity(false)
        this.Gauche5.body.setImmovable(true)

        this.Droite5 = this.add.rectangle(260, 1130, 20, 20)
        this.physics.add.existing(this.Droite5);
        this.Droite5.body.setAllowGravity(false)
        this.Droite5.body.setImmovable(true)
        //---
        this.Gauche6 = this.add.rectangle(100, 350, 20, 20)
        this.physics.add.existing(this.Gauche6);
        this.Gauche6.body.setAllowGravity(false)
        this.Gauche6.body.setImmovable(true)

        this.Droite6 = this.add.rectangle(260, 350, 20, 20)
        this.physics.add.existing(this.Droite6);
        this.Droite6.body.setAllowGravity(false)
        this.Droite6.body.setImmovable(true)

        //---
        this.Gauche7 = this.add.rectangle(620, 100, 20, 20)
        this.physics.add.existing(this.Gauche7);
        this.Gauche7.body.setAllowGravity(false)
        this.Gauche7.body.setImmovable(true)

        this.Droite7 = this.add.rectangle(880, 100, 20, 20)
        this.physics.add.existing(this.Droite7);
        this.Droite7.body.setAllowGravity(false)
        this.Droite7.body.setImmovable(true)

       //__________________________________________________________________________
       //creation des ennemis
        //Ajout du sprite, coordonnées, taille et propriétés ennemis
        this.ennemi1 = this.physics.add.sprite(430, 1900, 'Seraphin');
        this.ennemi1.setScale(1.25)
        this.ennemi1.setVelocityX(-80)
        this.ennemi1.anims.play('Ennemis', true); 

        this.physics.add.collider(this.ennemi1, this.Droite1, function(ennemi1){
            ennemi1.setVelocityX(-80)
        });

        this.physics.add.collider(this.ennemi1, this.Gauche1, function(ennemi1){
            ennemi1.setVelocityX(80)
        });

        //---

        this.ennemi2 = this.physics.add.sprite(900, 1700, 'Seraphin');
        this.ennemi2.setScale(1.25)
        this.ennemi2.setVelocityX(-90)
        this.ennemi2.anims.play('Ennemis', true); 

        this.physics.add.collider(this.ennemi2, this.Droite2, function(ennemi2){
            ennemi2.setVelocityX(-90)
        });

        this.physics.add.collider(this.ennemi2, this.Gauche2, function(ennemi2){
            ennemi2.setVelocityX(90)
        });


        //---

        this.ennemi3 = this.physics.add.sprite(830, 1080, 'Seraphin');
        this.ennemi3.setScale(1.25)
        this.ennemi3.setVelocityX(-200)
        this.ennemi3.anims.play('Ennemis', true); 

        this.physics.add.collider(this.ennemi3, this.Droite3, function(ennemi3){
            ennemi3.setVelocityX(-200)
        });

        this.physics.add.collider(this.ennemi3, this.Gauche3, function(ennemi3){
            ennemi3.setVelocityX(200)
        });


        //---

        this.ennemi4 = this.physics.add.sprite(530, 1050, 'Seraphin');
        this.ennemi4.setScale(1.25)
        this.ennemi4.setVelocityX(-100)
        this.ennemi4.anims.play('Ennemis', true); 

        this.physics.add.collider(this.ennemi4, this.Droite4, function(ennemi4){
            ennemi4.setVelocityX(-100)
        });

        this.physics.add.collider(this.ennemi4, this.Gauche4, function(ennemi4){
            ennemi4.setVelocityX(100)
        });


        //---

        this.ennemi5 = this.physics.add.sprite(100, 1000, 'Seraphin');
        this.ennemi5.setScale(1.25)
        this.ennemi5.setVelocityX(-200)
        this.ennemi5.anims.play('Ennemis', true); 

        this.physics.add.collider(this.ennemi5, this.Droite5, function(ennemi5){
            ennemi5.setVelocityX(-200)
        });

        this.physics.add.collider(this.ennemi5, this.Gauche5, function(ennemi5){
            ennemi5.setVelocityX(200)
        });

        //---

        this.ennemi6 = this.physics.add.sprite(200, 280, 'Seraphin');
        this.ennemi6.setScale(1.25)
        this.ennemi6.setVelocityX(-95)
        this.ennemi6.anims.play('Ennemis', true); 

        this.physics.add.collider(this.ennemi6, this.Droite6, function(ennemi6){
            ennemi6.setVelocityX(-95)
        });

        this.physics.add.collider(this.ennemi6, this.Gauche6, function(ennemi6){
            ennemi6.setVelocityX(95)
        });

        //---

        this.ennemi7 = this.physics.add.sprite(810, 30, 'Seraphin');
        this.ennemi7.setScale(1.25)
        this.ennemi7.setVelocityX(-150)
        this.ennemi7.anims.play('Ennemis', true); 

        this.physics.add.collider(this.ennemi7, this.Droite7, function(ennemi7){
            ennemi7.setVelocityX(-150)
        });

        this.physics.add.collider(this.ennemi7, this.Gauche7, function(ennemi7){
            ennemi7.setVelocityX(150)
        });


        //_________________________________________________________________


        this.player = this.physics.add.sprite(550, 2500, 'ame');
        this.player.setBounce(0);    
        //ajout sprite/propriétés du joueur

        this.passageColereDepression = this.add.image(643, 378, "Passage_Colere_Depression").setVisible(false)
        this.passageColereDepression.setScale(0.49)
        this.passageColereDepression.setDepth(10)
        this.passageColereDepression.setScrollFactor(0)
        //ecran de changement de niveau

        this.EcranMort = this.add.image(632, 358, "EcranMort").setVisible(false)
        this.EcranMort.setScale(0.27)
        this.EcranMort.setDepth(10)
        this.EcranMort.setScrollFactor(0)

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.3);

        this.physics.add.collider(this.player, Plateformes)
        this.physics.add.collider(this.player, FinNiveau, this.changementLVL, null, this)
        //colliders changement de LvL

        this.physics.add.collider(this.player, this.ennemi1, this.mort, null, this)
        this.physics.add.collider(this.player, this.ennemi2, this.mort, null, this)
        this.physics.add.collider(this.player, this.ennemi3, this.mort, null, this)
        this.physics.add.collider(this.player, this.ennemi4, this.mort, null, this)
        this.physics.add.collider(this.player, this.ennemi5, this.mort, null, this)
        this.physics.add.collider(this.player, this.ennemi6, this.mort, null, this)
        this.physics.add.collider(this.player, this.ennemi7, this.mort, null, this)
        //colliders ennemis, mort

        this.physics.add.collider(Plateformes, this.ennemi1)
        this.physics.add.collider(Plateformes, this.ennemi2)
        this.physics.add.collider(Plateformes, this.ennemi3)
        this.physics.add.collider(Plateformes, this.ennemi4)
        this.physics.add.collider(Plateformes, this.ennemi5)
        this.physics.add.collider(Plateformes, this.ennemi6)
        this.physics.add.collider(Plateformes, this.ennemi7)
        //colliders ennemis, plateformes

        this.LvlFini = false
        //Cette fonction fait que si elle est true, le joueur ne peut pas bouger après avoir fini le niveau
        //C'est pour eviter qu'il touche un ennemi et qu'il gagne en même temps
        //Ce qui fait qu'il lance les 2 niveau (Colere ET Marchandage) en même temps

        this.cursors = this.input.keyboard.createCursorKeys();
        this.touche = this.input.keyboard.addKey();

        this.toucheQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.toucheSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.toucheS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.toucheD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //deplacement avec Z/Q/S/Espace


    }

    update(){





        if (this.cursors.left.isDown || this.toucheQ.isDown && this.LvlFini == false ) { //si la touche gauche est appuyée
            this.player.setVelocityX(-290); //alors vitesse négative en X

            if (this.player.body.onFloor())
                this.player.anims.play('Gauche', true); 
                this.player.setFlipX(true);
        }
        else if (this.cursors.right.isDown || this.toucheD.isDown && this.LvlFini == false){ //sinon si la touche droite est appuyée
            this.player.setVelocityX(290); //alors vitesse positive en X

            if (this.player.body.onFloor())
                this.player.anims.play('Droite', true); 
                this.player.setFlipX(false);
        }
        else{ // sinon
            this.player.setVelocityX(0); //vitesse nulle

            if (this.player.body.onFloor())
                this.player.anims.play('Idle', true); 
        }

        if (this.cursors.down.isDown || this.toucheS.isDown && this.LvlFini == false){
        //si touche bas appuyée
            this.player.setVelocityY(310); //alors vitesse verticale positive
        //(on atterri)
        }    

          const didPressJump = Phaser.Input.Keyboard.JustDown(this.toucheSpace);
    
          // Le joueur peut double jump seulement si il a fait un saut simple avant
        if (didPressJump && this.canJump && this.LvlFini==false) {
            if (this.player.body.onFloor()) {
              //Le joueur ne peut sauter que s'il est sur le sol
            this.canDoubleJump = true;
            
            this.player.anims.play('Saut', true)
            this.player.body.setVelocityY(-400);

            } else if (this.canDoubleJump) {
              // Le joueur ne peut sauter que 2 fois (pas de triple saut)
            this.canDoubleJump = false;

            this.player.anims.play('Saut', true)
            this.player.body.setVelocityY(-350);

            }

         } 

    }

    changementLVL(){

        setTimeout(() => {

            this.scene.start('Niveau_Marchandage')
            this.musiqueDeFond.stop();//arret musique

        }, 2000);
        //après 2s pour admirer l'ecran de changement, le niveaus suivant se lance

        this.LvlFini = true
        //changement de la fonction l216

        this.ennemi7.setVelocityX(0)

        this.passageColereDepression.setVisible(true);
        //affichage de l'ecran de changement de niveau

    }

    mort(){

        setTimeout(() => {

            this.scene.start('Niveau_Colere')
            this.musiqueDeFond.stop();//arret musique

        }, 2000);
        //2s pourlire l'ecran de gameOver, puis on relance le niveau


        this.EcranMort.setVisible(true);
        //affichage de l'ecran de gameOver

    }
    };
