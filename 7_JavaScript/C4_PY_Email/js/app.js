document.addEventListener('DOMContentLoaded', function () {
    const email = {
        email: '',
        asunto: '',
        cc: '',
        mensaje: ''
    }

    // SELECCIONAR ELEMENTOS
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    const inputCC = document.querySelector('#cc');

    // ASIGNAR EVENTOS
    inputEmail.addEventListener('input', validarInput);
    inputAsunto.addEventListener('input', validarInput);
    inputMensaje.addEventListener('input', validarInput);

    inputCC.addEventListener('input', validarCC);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', e => {
        e.preventDefault();

        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        email.cc = '';

        elminarAlerta(inputEmail.parentElement);
        elminarAlerta(inputMensaje.parentElement);
        elminarAlerta(inputAsunto.parentElement);

        formulario.reset();
        comprobarEmail();

        spinner.classList.remove('flex');
        spinner.classList.add('hidden');
    });

    // FUNCIONES
    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            email.email = '';
            email.asunto = '';
            email.mensaje = '';
            email.cc = '';

            elminarAlerta(inputEmail.parentElement);
            elminarAlerta(inputMensaje.parentElement);
            elminarAlerta(inputAsunto.parentElement);

            formulario.reset();
            comprobarEmail();

            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove
            }, 2000);

        }, 3000);
    }

    function validarCC(e){
        email[e.target.name] = e.target.value.trim().toLowerCase();

        if(!validarEmail(e.target.value)){
            mostrarAlerta('El email ingresado no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
        }else{
            elminarAlerta(e.target.parentElement);

        // Asignar Valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        // Comprobar Email
        comprobarEmail();
        };

        if(e.target.value === ''){
            delete email.cc;
            elminarAlerta(e.target.parentElement);
            comprobarEmail();
            return;
        };
    };

    function validarInput(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta(`El email ingresado no es valido`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        elminarAlerta(e.target.parentElement);

        // Asignar Valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        // Comprobar Email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        elminarAlerta(referencia);
        // Generar Alerta
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'alerta');
        // Insertar Alerta
        referencia.appendChild(error);
    }

    function elminarAlerta(referencia) {
        // Comprobar ALerta si ya existe
        const alerta = referencia.querySelector('.alerta');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email);
        return regex;
    }

    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

});

