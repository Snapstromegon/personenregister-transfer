import {
  RegName,
  FullName,
  RoleName,
  NameLink,
  SurName,
  ForeName,
} from './Name.js';

import { Birth, Death, Marriage } from './LifeEvent.js';

export default class Person {
  gnd;
  regName = new RegName();
  fullName = new FullName();
  birth = new Birth();
  death = new Death();
  marriage = new Marriage();
  sex;
  occupations = [];
  notes = [];

  addNamePart(...nameParts) {
    for (const namePart of nameParts) {
      if (
        namePart instanceof RoleName ||
        namePart instanceof NameLink ||
        namePart instanceof SurName
      ) {
        this.regName.addNamePart(namePart);
        this.fullName.addNamePart(namePart);
      } else if (namePart instanceof ForeName) {
        if (this.fullName.foreNames.length == 0) {
          this.regName.addNamePart(namePart);
        }
        this.fullName.addNamePart(namePart);
      } else {
        console.log(typeof namePart);
        console.log('Unknown Name Type!', namePart);
        console.trace();
      }
    }
  }

  toXML() {
    const res = {
      pers: {
        idno: { '@type': 'gnd', '#text': this.gnd },
        persName: [this.regName.toXML(), this.fullName.toXML()],
        birth: this.birth.toXML(),
        death: this.death.toXML(),
        sex: { '@value': this.sex },
        occupation: this.occupations,
        note: [this.marriage.toXML(), this.notes.map((n) => n.toXML())],
      },
    };
    return res;
  }
}
