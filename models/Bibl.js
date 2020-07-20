export default class Bibl {
  constructor({ content } = {}) {
    this.content = content;
  }

  toXML() {
    return {
      '@type': 'bibl',
      bibl: this.content,
    };
  }
}
