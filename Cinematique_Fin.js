export class Cinematique_Fin extends Phaser.Scene{
    constructor(){
        super("Cinematique_Fin");
    }

    preload (){

        this.load.audio('Musique', '/assets/Cinematiques/Fin/Musique_Fin.mp3')
        //ajout musique de fond

        this.load.image('BLack_Screen', '/assets/Cinematiques/Fin/BS.png')

        this.load.image('Oeil_1', '/assets/Cinematiques/Fin/Oeil_1.png');
        this.load.image('Oeil_2', '/assets/Cinematiques/Fin/Oeil_2.png');
        this.load.image('Oeil_3', '/assets/Cinematiques/Fin/Oeil_3.png');
        this.load.image('Oeil_4', '/assets/Cinematiques/Fin/Oeil_4.png');
        this.load.image('Oeil_5', '/assets/Cinematiques/Fin/Oeil_5.png');
        this.load.image('Oeil_6', '/assets/Cinematiques/Fin/Oeil_6.png');

        //ajout de toutes les images

        this.load.image('Fin_txt1', '/assets/Cinematiques/Fin/Fin_txt1.png');
        this.load.image('Fin_txt2', '/assets/Cinematiques/Fin/Fin_txt2.png');
        this.load.image('Fin_txt3', '/assets/Cinematiques/Fin/Fin_txt3.png');

        this.load.image('Fin_Humain_1', '/assets/Cinematiques/Fin/Fin_Humain_1.png');
        this.load.image('Fin_Humain_2', '/assets/Cinematiques/Fin/Fin_Humain_2.png');
        this.load.image('Fin_Humain_3', '/assets/Cinematiques/Fin/Fin_Humain_3.png');

    }

    create(){

        this.Musique = this.sound.add('Musique')
        this.Musique.play()

        this.BlSc = this.add.image(650, 350, 'Black_Screen')
        this.BlSc.setScale(2)

        this.Oeil1 = this.add.image(650, 350, 'Oeil_1')
        this.Oeil1.setScale(2)

        this.Oeil2 = this.add.image(650, 350, 'Oeil_2').setVisible(false)
        this.Oeil2.setScale(1.428)

        this.Oeil3 = this.add.image(650, 350, 'Oeil_3').setVisible(false)
        this.Oeil3.setScale(1.428)

        this.Oeil4 = this.add.image(650, 350, 'Oeil_4').setVisible(false)
        this.Oeil4.setScale(1.428)

        this.Oeil5 = this.add.image(650, 350, 'Oeil_5').setVisible(false)
        this.Oeil5.setScale(1.428)

        this.Oeil6 = this.add.image(650, 350, 'Oeil_6').setVisible(false)
        this.Oeil6.setScale(1.428)

        this.Fin_Txt1 = this.add.image(650, 350, 'Fin_txt1').setVisible(false)
        this.Fin_Txt1.setScale(0.65)

        this.Fin_Txt2 = this.add.image(650, 350, 'Fin_txt2').setVisible(false)
        this.Fin_Txt2.setScale(0.65)

        this.Fin_Txt3 = this.add.image(650, 350, 'Fin_txt3').setVisible(false)
        this.Fin_Txt3.setScale(0.65)

        this.FinHumain1 = this.add.image(650, 350, 'Fin_Humain_1').setVisible(false)
        this.FinHumain1.setScale(0.65)

        this.FinHumain2 = this.add.image(650, 350, 'Fin_Humain_2').setVisible(false)
        this.FinHumain2.setScale(0.65)

        this.FinHumain3 = this.add.image(650, 350, 'Fin_Humain_3').setVisible(false)
        this.FinHumain3.setScale(0.65)

        //ajout des images dans des variables et mise a l'echelle


        //--------------------------------------------------------------

        setTimeout(() => {

            this.Oeil2.setVisible(true)

            setTimeout(() => {

                this.Oeil3.setVisible(true)

                setTimeout(() => {

                    this.Oeil4.setVisible(true)

                    setTimeout(() => {

                        this.Oeil5.setVisible(true)

                        setTimeout(() => {

                            this.Oeil6.setVisible(true)

                            setTimeout(() => {

                                this.Fin_Txt1.setVisible(true)

                                setTimeout(() => {

                                    this.Fin_Txt2.setVisible(true)

                                    setTimeout(() => {

                                        this.Fin_Txt3.setVisible(true)

                                        setTimeout(() => {

                                            this.BlSc.setVisible(true)

                                            setTimeout(() => {

                                                this.FinHumain1.setVisible(true)

                                                setTimeout(() => {

                                                    this.FinHumain2.setVisible(true)

                                                    setTimeout(() => {

                                                        this.FinHumain3.setVisible(true)

                                                        setTimeout(() => {

                                                            this.Musique.stop()

                                                            this.scene.start('Menu')
                                                                            
                                                        }, 2500)
                                                                        
                                                    }, 2500)
                                                                    
                                                }, 2500)
                                                                
                                            }, 3000)
                                                            
                                        }, 3000)
                                                        
                                    }, 3000)
                                                    
                                }, 3000)
                                                
                            }, 500)
                                            
                        }, 500)
                                        
                    }, 500)
                                    
                }, 500)
    
            }, 500)

        }, 500)

        this.add.image(this.Oeil1)

        //Les images sont mises les unes après les autres, d'autres supprimés, pour créer l'effet cinématique


    }

}