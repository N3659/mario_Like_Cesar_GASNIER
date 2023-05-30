export class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
        this.click = false;
    }

    preload (){

        this.load.image("Ecran_Menu", 'assets/menu.png')
        this.load.image("Bouton_Start", 'assets/commencer.png')

        this.load.audio("Musique_Menu", 'assets/Music/Musique_Menu.mp3')
    }

    create () {

        this.musiqueDeFond = this.sound.add("Musique_Menu");
        this.musiqueDeFond.play();
    
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

        this.musiqueDeFond.stop();

        this.scene.start('Niveau_Depression')

    }

}