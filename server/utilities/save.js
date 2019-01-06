// Copyright 2019 Lewis Ardern. All rights reserved.

const path = require('path');

const dir = path.normalize(`${__dirname}/../../server/found/`);
const urls = path.normalize(`${dir}urls.txt`);
const date = path.normalize(`${dir}date.txt`);
const fs = require('fs');
const moment = require('moment');
const template = require('./templates/markdown');

exports.saveCapuredResults = (guid, domain, config) => {
  const file = `${dir}${guid}.md`;
  this.saveDomain(domain);
  fs.appendFileSync(file, template.createMarkdownTemplate(domain, config), err =>
    console.log(err || 'The file was saved!')
  );
};

// save domain if it does not exist in urls.txt
exports.saveDomain = domain => {
  fs.readFile(urls, 'utf8', (readFileError, data) => {
    if (readFileError) {
      console.log(readFileError);
    }
    if (data && !data.includes(domain.url) && !readFileError) {
      fs.appendFile(urls, `${domain.url}\n`, saveFileError =>
        saveFileError ? console.log(saveFileError) : ''
      );
    }
  });
};

exports.saveTodaysDate = () => {
  // This is only used as it's unlikely there will be more than one ping a day from bug bounties
  // Will change to a shorter time if that changes.
  fs.writeFileSync(date, moment().format('YYYY-MM-DD'), err =>
    console.log(err || 'Todays date was saved in date.txt')
  );
};

// Checks if folders exist, creates otherwise
exports.folderOrFileExists = () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  if (!fs.existsSync(urls)) {
    fs.writeFileSync(urls, 'http://example.com:3000/index.html\r\n', err => {
      if (err) throw err;
      console.log(`Created ${urls}`);
    });
  }
  if (!fs.existsSync(date)) {
    fs.writeFileSync(
      date,
      moment()
        .subtract(1, 'day')
        .format('YYYY-MM-DD'),
      err => {
        if (err) throw err;
        console.log(`Created ${date}`);
      }
    );
  }
};
