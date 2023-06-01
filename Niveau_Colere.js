export class Niveau_Colere extends Phaser.Scene{
    constructor(){
        super("Niveau_Colere");
    }

preload(){

    this.load.spritesheet('ame','Sprites/Sprites_anim/ame/ame.png',
    { frameWidth: 32, frameHeight: 64 });    
    //chargement sprite personnage

    this.load.image("Seraphin", "Sprites/Sprites_anim/ange/Seraphin_base.png");
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
}

create(){

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

    this.ennemi1 = this.physics.add.sprite(400, 1800, 'Seraphin');
    this.ennemi1.setScale(1.25)
    this.ennemi1.setImmovable(true)
    //Ajout du sprite, coordonnées, taille et propriétés ennemis

    this.ennemi2 = this.physics.add.sprite(830, 1550, 'Seraphin');
    this.ennemi2.setScale(1.25)
    this.ennemi2.setImmovable(true)

    this.ennemi3 = this.physics.add.sprite(830, 900, 'Seraphin');
    this.ennemi3.setScale(1.25)
    this.ennemi3.setImmovable(true)

    this.ennemi4 = this.physics.add.sprite(530, 950, 'Seraphin');
    this.ennemi4.setScale(1.25)
    this.ennemi4.setImmovable(true)

    this.ennemi5 = this.physics.add.sprite(100, 1000, 'Seraphin');
    this.ennemi5.setScale(1.25)
    this.ennemi5.setImmovable(true)

    this.ennemi6 = this.physics.add.sprite(230, 280, 'Seraphin');
    this.ennemi6.setScale(1.25)
    this.ennemi6.setImmovable(true)

    this.ennemi7 = this.physics.add.sprite(860, 30, 'Seraphin');
    this.ennemi7.setScale(1.25)
    this.ennemi7.setImmovable(true)


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
    

    this.cursors = this.input.keyboard.createCursorKeys();
    this.touche = this.input.keyboard.addKey();

    this.toucheQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.toucheSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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

        this.scene.start('Niveau_Marchandage')

    }, 2000);

    this.passageColereDepression.setVisible(true);

}

mort(){

    setTimeout(() => {

        this.scene.start('Niveau_Colere')

    }, 2000);


    this.EcranMort.setVisible(true);

}
};
