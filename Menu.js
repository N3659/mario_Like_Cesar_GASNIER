export class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
        this.click = false;
    }

    preload (){

        this.load.image("Ecran_Menu", 'assets/menu.png')
        this.load.image("Bouton_Start", 'assets/commencer.png')
    }

    create () {

    
        this.add.image(640,355, "Ecran_Menu").setScale(0.659);
        this.add.image(600, 600, "Bouton_Start").setScale(0.4).setInteractive();
        this.input.on('pointerdown', () => {this.click = true});
    }

    update(){
        if (this.click){
            this.LancementJeu();
            this.click = false;
        }
    }
    LancementJeu(){

        this.scene.start('Niveau_Deni')

    }

}