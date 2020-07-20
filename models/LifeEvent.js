export default class LifeEvent {
  constructor({ date, place } = {}) {
    this.date = date;
    this.place = place;
  }

  toXML() {
    return {
      date: { '@when': this.date },
      placeName: { '@ref': `#place.${this.place}` },
    };
  }
}

export class Birth extends LifeEvent {}
export class Death extends LifeEvent {}

export class Marriage extends LifeEvent {
  constructor({ partner, ...opts } = {}) {
    super(opts);
    this.partner = partner;
  }

  toXML() {
    return {
      '@type': 'relation',
      persName: {
        '@ref': `#pers.partic.${this.partner}`,
        '#text': this.partner,
      },
      date: { '@when': this.date, '#text': this.date },
    };
  }
}
