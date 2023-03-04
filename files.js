const fs = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

// crerate
// read
// finde

const createFile = (fileName, content) => {
  const file = { fileName, content };

  const { error } = dataValidator(file);

  //   console.log(isValid.error.details[0]);
  if (error) {
    console.log(
      chalk.red(`PLEASE specify ${error.details[0].context.key} parametr`)
    );
    return;
  }
  const { isExtentionValid, fileExtention } = checkExtention(fileName);
  if (!isExtentionValid) {
    return console.log(
      chalk.red(
        `Sorry this aplication dosen't suport ${fileExtention}, please enter `
      )
    );
    return;
  }
  const dirPath = path.join(__dirname, "files", fileName);
  fsPromises
    .writeFile(dirPath, content, "utf-8")
    .then((data) => {
      console.log(chalk.green("File created sucsessfully"));
    })
    .catch((e) => {
      console.log(e);
    });
};

const getFiles = () => {
  fs.readdir(path.join(__dirname, "./files"))
    .then((data) => {
      if (!data.length) {
        console.log(chalk.red("No files in this folder"));
        return;
      }
      data.forEach((el) => {
        console.log(el);
      });
    })
    .catch((e) => console.log(e));
};

const getFile = (name) => {
  fs.readdir(path.join(__dirname, "./files"))
    .then((data) => {
      const findeFileName = data.find((el) => el === name);
      if (!findeFileName) {
        console.log(chalk.red(`No file with name ${name} found`));
        return;
      }
      return fs.readFile(path.join(__dirname, "./files", name), "utf-8");
    })
    .then((data) => {
      const newObj = {
        message: "Sucsess",
        fileName: name,
        content: data,
        extention: checkExtention(name).fileExtention,
      };
      console.log(newObj);
    });
};

module.exports = { createFile, getFiles, getFile };
