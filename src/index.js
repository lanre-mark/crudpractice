let mainForm = `
    <h1>Practice CRUD APP</h1>
    <form>
    <label for="username-box"> Username </label>
      <input type="text" name="username" id="username-box" /><br/>
      <label for="password-box"> Password </label>
      <input type="text" name="password" id="password-box" /><br/>
      <input type="submit" value="Submit"  name="submit-button" id="submit-button"/>
    </form><br />`;

let app = document.getElementById('app');

app.innerHTML = mainForm;

let submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  postForm();
});

const postForm = () => {
  let username = document.getElementById('username-box').value;
  let password = document.getElementById('password-box').value;
  fetch('/api/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res && res.status === 'successful') {
        // redirect
        app.innerHTML = '<h1>Login Successful</h1>';
        localStorage.removeItem('errorMsg');
        localStorage.setItem('userId', res.id);
        localStorage.setItem('userName', res.username);
        window.location.href = '/main';
      } else {
        // app.innerHTML = `<h1>Login Failed :: ${res.status} </h1> ${mainForm}`;
        localStorage.setItem('errorMsg', res.status);
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        window.location.href = '/error';
      }
    })
    .catch(console.log);
};
