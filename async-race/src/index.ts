import App from './app/app';

const app = new App();

app
  .start()
  .then((render) => render)
  .catch((err) => console.log(err));
