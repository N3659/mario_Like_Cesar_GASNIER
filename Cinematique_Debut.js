export class sceneExemple extends Phaser.Scene{
    constructor(){
        super("sceneExemple");
    }


preload(){

}

create(){

    dia = ''

    fadeInAndOut(duration, fadeOutDelay); {

        const initialOpacity = 100;


        this.tweens.add({
            alpha: 1,
            duration: duration / 2, 
            onComplete: () => {

                this.time.delayedCall(fadeOutDelay, () => {

                    this.tweens.add({
                        targets: image,
                        alpha: initialOpacity,
                        duration: duration / 2, 
                    });
                });
            }
        });
    }
}

update(){

    this.dia = this.add.text(230, 790, "Tu n'es plus, humain.", { 
        font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
            this.fadeInAndOut(this.dia,3000,2000)
    
    this.dia = this.add.text(230, 790, "Tu as touché à ta fin. Ta vie fût remplie, c’est certain.", { 
        font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
            this.fadeInAndOut(this.dia,3000,2000)
    
    this.dia = this.add.text(230, 790, "Mais tu vas renaître et connaître demain." , { 
        font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
            this.fadeInAndOut(this.dia,3000,2000)
    
    this.dia = this.add.text(230, 790, "La réincarnation t’attend, viens toucher ma main.", { 
        font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
            this.fadeInAndOut(this.dia,3000,2000)
    
    this.dia = this.add.text(230, 790, "La réincarnation t’attend, c’est ton destin…", { 
        font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
            this.fadeInAndOut(this.dia,3000,2000)

    }

}
    