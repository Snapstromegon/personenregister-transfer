import mammoth from 'mammoth';
import { promises as fs } from 'fs';
import xmlbuilder from 'xmlbuilder2';
import globby from 'globby';
import path from 'path';

import Person from './models/Person.js';
import { SurName, RoleName, NameLink, ForeName } from './models/Name.js';
import { capitalize } from './lib/utils.js';
import Bibl from './models/Bibl.js';
import { inputFolder, inputGlob, outputFile } from './config.js';

const ROLE_NAMES = ['FREIHERR'];
const NAME_LINKS = ['VON', 'ZU'];

async function main() {
  const personen = [];
  console.log('Reading personen from', path.join(inputFolder, inputGlob));
  for await (const path of globby.stream(inputGlob)) {
    if (path.includes('node_modules')) {
      continue;
    }
    console.log('Reading file', path);
    const text = await mammoth.extractRawText({ path });
    const lines = text.value.split('\n');

    const person = new Person();
    personen.push(person);

    for (const line of lines) {
      const lineParts = line.split(':');
      const key = lineParts[0].trim();
      const value = lineParts.slice(1).join(':').trim();
      if (lineParts.length > 1) {
        switch (key.toLowerCase()) {
          case 'gnd':
            person.gnd = parseInt(value);
            break;
          case 'Beruf(e) / Tätigkeit(en) (ggf. inkl. Ort)'.toLowerCase():
            person.occupations.push(
              ...value.split(/,(?![^(]*\))/).map((o) => o.trim())
            );
            break;
          case 'name':
            person.addNamePart(
              ...value.split(/\s/).map((name) => new SurName(capitalize(name)))
            );
            break;
          case 'vorname(n)':
            const parts = value.split(/\s/);
            for (const part of parts) {
              if (ROLE_NAMES.includes(part)) {
                person.addNamePart(new RoleName(capitalize(part)));
              } else if (NAME_LINKS.includes(part)) {
                person.addNamePart(new NameLink(part.toLowerCase()));
              } else {
                person.addNamePart(new ForeName(capitalize(part)));
              }
            }
            break;
          case 'geschlecht':
            person.sex = value[0].toUpperCase();
            break;
          case 'geburtsdatum':
            person.birth.date = value;
            break;
          case 'geburtsort':
            person.birth.place = value;
            break;
          case 'sterbedatum':
            person.death.date = value;
            break;
          case 'sterbeort':
            person.death.place = value;
            break;
          case 'Verheiratet mit (falls zutreffend)'.toLowerCase():
            person.marriage.partner = value;
            break;
          case 'heirat':
            person.marriage.date = value;
            break;
          case '':
            break;
          default:
            console.log('Unknown Key', key);
        }
      } else {
        if (line.match(/\w+, \d+/)) {
          person.notes.push(new Bibl({ content: line }));
        }
      }
    }
  }
  const xmlString = xmlbuilder
    .create(personen.map((p) => p.toXML()))
    .end({ prettyPrint: true });

  await fs.writeFile(outputFile, xmlString);
}

main();
