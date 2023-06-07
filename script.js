import { Cinematique_Debut } from "./Cinematique_Debut.js";
import { Menu } from "./Menu.js"
import { Niveau_Colere } from "./Niveau_Colere.js";
import { Niveau_Deni } from "./Niveau_Deni.js"
import { Niveau_Depression } from "./Niveau_Depression.js";
import { Niveau_Marchandage } from "./Niveau_Marchandage.js";
import { Cinematique_Fin } from "./Cinematique_Fin.js";

var config =
{
    type: Phaser.AUTO,
    width: 1280, height: 720,
    physics:
    {
        default: 'arcade',
        arcade:
        {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [Menu, Cinematique_Debut, Niveau_Deni, Niveau_Colere, Niveau_Marchandage, Niveau_Depression, Cinematique_Fin],

};
new Phaser.Game(config);
