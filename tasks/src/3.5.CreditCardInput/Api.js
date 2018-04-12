export default class Api {
  static async getValue() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("1234 5678 9012 3456");
      }, 3000);
    });
  }
}
