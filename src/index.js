document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.querySelector('.login__form');
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    function setError(input, message) {
        input.classList.add('input__error');
        input.classList.remove('input__success');
       
        let msg = input.nextElementSibling;
        if (msg && msg.classList.contains('error__message')) {
            msg.remove();
        }
     
        msg = document.createElement('div');
        msg.className = 'error__message';
        msg.textContent = message;
        input.insertAdjacentElement('afterend', msg);
    }

    function setSuccess(input) {
        input.classList.remove('input__error');
        input.classList.add('input__success');
        let msg = input.nextElementSibling;
        if (msg && msg.classList.contains('error__message')) {
            msg.remove();
        }
    }

    function isStrongPassword(password) {
       
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
    }

    function validateInput(input) {
        if (input === nome) {
            if (!nome.value.trim()) {
                setError(nome, 'Preencha o nome.');
                return false;
            } else {
                setSuccess(nome);
                return true;
            }
        }
        if (input === email) {
            if (!email.value.trim()) {
                setError(email, 'Preencha o e-mail.');
                return false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                setError(email, 'E-mail inválido.');
                return false;
            } else {
                setSuccess(email);
                return true;
            }
        }
        if (input === password) {
            if (!password.value.trim()) {
                setError(password, 'Preencha a senha.');
                return false;
            } else if (!isStrongPassword(password.value)) {
                setError(password, 'A senha deve ter pelo menos 8 caracteres, incluindo maiúscula, minúscula, número e símbolo.');
                return false;
            } else {
                setSuccess(password);
                return true;
            }
        }
    }

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;
        [nome, email, password].forEach(input => {
            if (!validateInput(input)) valid = false;
        });

        if (valid) {
            alert('Cadastro realizado com sucesso!');
            formulario.reset();
            [nome, email, password].forEach(input => {
                input.classList.remove('input__success');
            });
            document.querySelectorAll('.error__message').forEach(e => e.remove());
        }
    });

    [nome, email, password].forEach(input => {
        input.addEventListener('input', () => validateInput(input));
    });
});