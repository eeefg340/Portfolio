const BodyPromise = (body) => {
  return new Promise((resolve, reject) => {
    console.log(body);
    if (body.FirstName && body.LastName && body.Email && body.Subject) {
      resolve("complete");
    } else {
      reject(new Error());
    }
  });
};

module.exports = {BodyPromise}
