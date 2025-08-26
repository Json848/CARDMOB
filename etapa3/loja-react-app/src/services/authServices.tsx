export async function fakeLogin(email: string, password: string):
Promise<string> {
  if (email === 'dal@yan.com' && password === '123') {
    return Promise.resolve('fake-jwt-token');
  }else{
    return Promise.reject('Credenciais inválidas');
  }
}