export class Niveau_Colere extends Phaser.Scene{
    constructor(){
        super("Niveau_Colere");
    }

preload(){

    this.load.spritesheet('ame','Sprites/Sprites_anim/ame/ame.png',
    { frameWidth: 32, frameHeight: 64 });    

    this.load.image("Tileset", "assets/tileset.png");

    this.load.tilemapTiledJSON("Niveau_Colere", "assets/Niveau_Colere_Tiled.json");  

    this.load.image("Background_Colere", "Background/BG_Niveau/Background_Colere.png");

    this.load.image("Passage_Colere_Depression", "assets/Entre_Niveaux/Passage_Colere_Marchandage.png")
}

create(){

    this.add.image(479, 1279, 'Background_Colere');

    const carteDuNiveau = this.add.tilemap("Niveau_Colere")

    const tileset = carteDuNiveau.addTilesetImage("tileset", "Tileset")

    const Plateformes = carteDuNiveau.createLayer(
        "Plateformes",
        tileset
    );

    const FinNiveau = carteDuNiveau.createLayer(
        "Passage",
        tileset
    );

    Plateformes.setCollisionByProperty({estSolide: true})
    FinNiveau.setCollisionByProperty({estFini: true})

    this.canJump = true;
    
    this.player = this.physics.add.sprite(550, 2500, 'ame');
    this.player.setBounce(0);    

    this.passageColereDepression = this.add.image(643, 378, "Passage_Colere_Depression").setVisible(false)
    this.passageColereDepression.setScale(0.49)
    this.passageColereDepression.setDepth(10)
    this.passageColereDepression.setScrollFactor(0)

    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(1.3);


    this.physics.add.collider(this.player, Plateformes)
    this.physics.add.collider(this.player, FinNiveau, this.changementLVL, null, this)

    this.cursors = this.input.keyboard.createCursorKeys();
    this.touche = this.input.keyboard.addKey();

    this.toucheQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.toucheSpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.toucheS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.toucheD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    
    this.physics.add.collider(this.player, )


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

    this
}
};
