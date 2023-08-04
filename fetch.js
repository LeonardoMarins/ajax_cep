/*document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('btn-buscar-cep').addEventListener('click', function() {
        const xhttp = new XMLHttpRequest();
        const cep = document.getElementById('cep').value;
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;
        xhttp.open('GET', endpoint);
        xhttp.send();

        //https://viacep.com.br/ws/12231231/json
    })
});*/

// com jquery
$(document).ready(function () {
    $('#cep').mask('00000-000');

    $('#btn-buscar-cep').click(function () {
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;

        $(this).find('i').addClass('d-none');
        $(this).find('span').removeClass('d-none');

        fetch(endpoint)
        //then funciona como um try
            .then(function (response) {
                return response.json();

            })
            .then(function (json) {
                const logradouro = json.logradouro;
                const bairro = json.bairro;
                const cidade = json.localidade;
                const estado = json.uf;
                const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
                $("#endereco").val(endereco);
            })
            // se ocorrer um erro vai ser executado esse codigo
            .catch(function (erro) {
                alert("ocorreu um erro ao buscar um endereço tente novamente mais tarde.")
            })
            // vai exibir de qualquer jeito
            .finally(function() {
                setTimeout(function(){
                    $('#btn-buscar-cep').find('i').removeClass('d-none');
                    $('#btn-buscar-cep').find('span').addClass('d-none');
                }, 4000);
            })
    })

    $('#formulario-pedido').submit(function(evento) {
        evento.preventDefault();

        if($('#nome').val().length == 0) {
            throw new Error('digite o nome');
        }
    })
})