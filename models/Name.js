export default class Name {
  roleNames = [];
  foreNames = [];
  nameLinks = [];
  surNames = [];

  get nameParts() {
    return [
      ...this.roleNames,
      ...this.foreNames,
      ...this.nameLinks,
      ...this.surNames,
    ];
  }

  addNamePart(...nameParts) {
    for (const namePart of nameParts) {
      if (namePart instanceof RoleName) {
        this.roleNames.push(namePart);
      } else if (namePart instanceof ForeName) {
        this.foreNames.push(namePart);
      } else if (namePart instanceof NameLink) {
        this.nameLinks.push(namePart);
      } else if (namePart instanceof SurName) {
        this.surNames.push(namePart);
      } else {
        console.log('Unknown Name Type!', namePart);
        console.trace();
      }
    }
  }

  toXML() {
    return {
      '@type': this.$type,
      roleName: this.roleNames.map((n) => n.name),
      foreNames: this.foreNames.map((n) => n.name),
      nameLinks: this.nameLinks.map((n) => n.name),
      surNames: this.surNames.map((n) => n.name),
    };
  }
}

export class RegName extends Name {
  $type = 'reg';
}

export class FullName extends Name {
  $type = 'full';
}

export class NamePart {
  constructor(name) {
    this.name = name;
  }

  toXML() {
    return {
      [this.xmlTagName]: this.name,
    };
  }
}

export class RoleName extends NamePart {
  xmlTagName = 'roleName';
}
export class ForeName extends NamePart {
  xmlTagName = 'forename';
}
export class NameLink extends NamePart {
  xmlTagName = 'nameLink';
}
export class SurName extends NamePart {
  xmlTagName = 'surname';
}
