const fs = require("fs");
const path = require("path");
const qs = require('querystring');

const saveUser = user => {
  // получить файл с юзером
  // найти путь папки users
  // сохранить туда файл
};

const signUpRoute = (request, response) => {
  // Взять данные что пришли

  let body = '';

  request.on('data', function (data) {
    body = body + data;

    console.log('Incoming data!!!!');
  });

  request.on('end', function () {
    const post = Object.keys(qs.parse(body))[0];
    console.log(post);

    // Взять username с данных, сохранить в переменную
    const { username } = JSON.parse(body)

    // Сохраняем данные в <username>.json
    // Сохранить <username>.json в папку users
    const userFile = path.join(__dirname, '../../db/users', username + ".json")
    fs.writeFileSync(userFile, post)

    fs.open(userFile, (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          console.error('myfile does not exist');
          return;
        }

        throw err;
      }

      const responseSuccess = {
        status: "success",
        // Отправляем файл в ответе с данными юзера
        user: JSON.parse(data)
      };

      // использовать response
      response.end(JSON.stringify(responseSuccess));
    });
  });


};

module.exports = signUpRoute;