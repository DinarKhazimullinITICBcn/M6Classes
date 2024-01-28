//Exportem la clase Cicle per a que es pugui utilitzar en arxius on el importen
export class Cicle {
    //Id statica per poder tenir id autoincremental
    static seguentId = 1;
    constructor(nom) {
        this.id = Cicle.seguentId++;
        this.nom = nom;
        this.numEdicions = 0;
        this.ultimaModificacio;
        this.moduls = [];
    }
    //Afegeix un comptador al numEdicions i guarda la ultima data de modificacio
    setNumEdicions() {
        this.numEdicions++;
        this.ultimaModificacio = new Date();
    }
    //Afegeix un modul al array de moduls
    addModul(modul) {
        this.moduls.push(modul);
    }
    //Calcula totes les hores d'un modul
    calcularHores() {
        return this.moduls.reduce((total, modul) => total + modul.hores, 0);
    }
    //Fa un toString. Fet amb newLines per a que funcioni en un console log, ja que per html ho tinc amb taules.
    toString() {
        let modulsOrdenads = this.moduls.sort((a, b) => a.numero - b.numero);
        let modulsString = modulsOrdenads.map(modul => '    ' + modul.toString()).join('\n');
        return `Id: ${this.id}\nNom: ${this.nom}\nNumEdicions: ${this.numEdicions}\nUltima Modificacio: ${this.ultimaModificacio}\nModuls:\n${modulsString}`;
    }
}
//Exportem la clase Modul per a que es pugui utilitzar en arxius on el importen
export class Modul {
    constructor(num, nom, hores) {
        this.num = num;
        this.nom = nom;
        this.hores = hores;
    }

    toString() {
        return `MP${this.num}. ${this.nom} (${this.hores}h)`;
    }
}
