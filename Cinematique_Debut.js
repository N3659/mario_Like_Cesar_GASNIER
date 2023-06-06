export class Cinematique_Debut extends Phaser.Scene{
    constructor(){
        super("Cinematique_Debut");
        this.click1 = false;
        this.click2 = false;
        this.click3 = false;
        this.click4 = false;
        this.click5 = false;
    }


preload(){

    this.load.image('Texte1', '/assets/Cinematiques/Debut/Txt1.png');
    this.load.image('Texte2', '/assets/Cinematiques/Debut/Txt2.png');
    this.load.image('Texte3', '/assets/Cinematiques/Debut/Txt3.png');
    this.load.image('Texte4', '/assets/Cinematiques/Debut/Txt4.png');
    this.load.image('Texte5', '/assets/Cinematiques/Debut/Txt5.png');
    this.load.image('Texte6', '/assets/Cinematiques/Debut/Txt6.png');

}

create(){

    this.input.on('pointerdown', () => {this.click1 = true});
    this.input.on('pointerdown', () => {this.click2 = true});
    this.input.on('pointerdown', () => {this.click3 = true});
    this.input.on('pointerdown', () => {this.click4 = true});
    this.input.on('pointerdown', () => {this.click5 = true});

    
    this.Texte1 = this.add.image(650, 405, 'Texte1')
    this.Texte1.setScale(0.65)

    this.Texte2 = this.add.image(650, 360, 'Texte2').setVisible(false)
    this.Texte2.setScale(0.65)

    this.Texte3 = this.add.image(650, 409, 'Texte3').setVisible(false)
    this.Texte3.setScale(0.65)

    this.Texte4 = this.add.image(650, 409, 'Texte4').setVisible(false)
    this.Texte4.setScale(0.65)

    this.Texte5 = this.add.image(650, 409, 'Texte5').setVisible(false)
    this.Texte5.setScale(0.65)

    this.Texte6 = this.add.image(650, 409, 'Texte6').setVisible(false)
    this.Texte6.setScale(0.65)

}

update(){


    if (this.click1){

        this.Texte1.setVisible(false)
        this.Texte2.setVisible(true)

        this.click1 = false;

        if (this.click2){

            this.Texte2.setVisible(false)
            this.Texte3.setVisible(true)

            this.click2 = false

            if (this.click3){

                this.Texte3.setVisible(false)
                this.Texte4.setVisible(true)
    
                this.click3 = false

                if (this.click4){

                    this.Texte4.setVisible(false)
                    this.Texte5.setVisible(true)
        
                    this.click4 = false

                    if (this.click5){

                        this.Texte5.setVisible(false)
                        this.Texte6.setVisible(true)
            
                        this.click5 = false
            
                    }
        
                }
    
            }

        }
        
    }

}


}
    