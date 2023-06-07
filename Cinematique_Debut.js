export class Cinematique_Debut extends Phaser.Scene{
    constructor(){
        super("Cinematique_Debut");
    }


preload(){

    this.load.audio('Musique', '/assets/Cinematiques/Debut/Musique_Cine.mp3')
    //musique cinématqiue
    this.load.audio('Passage', '/assets/Cinematiques/Debut/Son_Niveau_1.mp3')
    //tentative son passage fin ciné => niveau déni

    this.load.image('Texte1', '/assets/Cinematiques/Debut/Txt1.png');
    this.load.image('Texte2', '/assets/Cinematiques/Debut/Txt2.png');
    this.load.image('Texte3', '/assets/Cinematiques/Debut/Txt3.png');
    this.load.image('Texte4', '/assets/Cinematiques/Debut/Txt4.png');
    this.load.image('Texte5', '/assets/Cinematiques/Debut/Txt5.png');
    this.load.image('Texte6', '/assets/Cinematiques/Debut/Txt6.png');
    this.load.image('Texte7', '/assets/Cinematiques/Debut/Txt7.png');

    //ajout de toutes les images

    this.load.image('Bidonville', '/Image_Monde_Moche/bidonville.png')
    this.load.image('Guerre', '/Image_Monde_Moche/guerre.png')
    this.load.image('Nucleaire', '/Image_Monde_Moche/nucleaire.png')
    this.load.image('Surpopulation', '/Image_Monde_Moche/surpopulation.png')
    this.load.image('Usine', '/Image_Monde_Moche/Usine.png')


}

create(){

    this.Musique = this.sound.add('Musique')
    this.Musique.play()
    
    this.Texte1 = this.add.image(650, 405, 'Texte1')
    this.Texte1.setScale(0.65)

    this.Texte2 = this.add.image(650, 360, 'Texte2').setVisible(false)
    this.Texte2.setScale(0.65)

    this.Texte3 = this.add.image(650, 368, 'Texte3').setVisible(false)
    this.Texte3.setScale(0.65)

    this.Texte4 = this.add.image(630, 370, 'Texte4').setVisible(false)
    this.Texte4.setScale(0.7)

    this.Texte5 = this.add.image(660, 420, 'Texte5').setVisible(false)
    this.Texte5.setScale(0.659)

    this.Texte6 = this.add.image(650, 369, 'Texte6').setVisible(false)
    this.Texte6.setScale(0.655)

    this.Texte7 = this.add.image(650, 358, 'Texte7').setVisible(false)
    this.Texte6.setScale(0.8)

    this.Bidonville = this.add.image(640, 340, 'Bidonville').setVisible(false)
    this.Bidonville.setScale(2)

    this.Guerre = this.add.image(640, 400, 'Guerre').setVisible(false)
    this.Guerre.setScale(2)

    this.Nucleaire = this.add.image(610, 320, 'Nucleaire').setVisible(false)
    this.Nucleaire.setScale(2.2)

    this.Usine = this.add.image(640, 200, 'Usine').setVisible(false)
    this.Usine.setScale(2)

    //ajout des images dans des variables et mise a l'echelle

    setTimeout(() => {

        setTimeout(() => {

            this.Texte2.setVisible(true)

            })


            setTimeout(() => {

                this.Texte3.setVisible(true)

                setTimeout(() => {

                    this.Texte4.setVisible(true)

                    setTimeout(() => {

                        this.Bidonville.setVisible(true)

                    }, 2400)

                    setTimeout(() => {

                    this.Texte5.setVisible(true)

                    setTimeout(() => {

                        this.Guerre.setVisible(true)                   

                    }, 2400)

                        setTimeout(() => {

                            this.Texte6.setVisible(true)

                            setTimeout(() => {

                                this.Nucleaire.setVisible(true)

                            }, 1800)

                            setTimeout(() => {

                                this.Nucleaire.destroy()

                                this.Usine.setVisible(true)                           
                            
                            }, 2400)

                            setTimeout(() => {

                                this.Usine.destroy()

                                this.Texte7.setVisible(true)

                                setTimeout(() => {

                                    this.Musique.stop()

                                    this.scene.start('Niveau_Deni')                                           

                                }, 2000)

                            }, 3000)

                            this.Guerre.destroy()

                        }, 3000)

                        this.Bidonville.destroy()
                    
                    }, 3000)
                
                }, 3000)

            }, 4000)

        }, 3500)

    this.add.image(this.Texte1)

    //avec tous ces timeout, les images sont mises les unes après les autres, d'autres supprimés, pour créer la cinématique

}

update(){
    

    

    }
}

    