const form = document.getElementById('form');

// ***** Validação CPF *****

document.getElementById('cpf').addEventListener('input', function(e) {
    var value = e.target.value;
    var cpfPattern = value.replace(/\D/g, '') // Remove qualquer coisa que não seja número
                          .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o terceiro dígito
                          .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o sexto dígito
                          .replace(/(\d{3})(\d)/, '$1-$2') // Adiciona traço após o nono dígito
                          .replace(/(-\d{2})\d+?$/, '$1'); // Impede entrada de mais de 11 dígitos
    e.target.value = cpfPattern;
  });




// ***** Validação telefone *****

   function preencherNumeros (v) {
    //remove caracteres não numéricos
    v.value = v.value.replace(/\D/g, '');
  }

      // Monta a URL para consulta
function ajustaTelefone(v) {
    v.value = v.value.replace(/\D/g, '');
    //adiciona parênteses no DDD
    v.value = v.value.replace(/^(\d\d)(\d)/g, "($1) $2");
    //adiciona hífen no número do telefone
    v.value = v.value.replace(/(\d{5})(\d)/, "$1-$2");


}


 // ***** Validação CEP *****

 form.addEventListener("submit", (event) => {
    preencherEndereco (v);

 });

 function preencherEndereco (v) {
  var cep = v.value;

  cep = cep.replace(/\D/g, '');

    // Monta a URL para consulta
  if (cep.length === 8 ){
      var url = 'https://viacep.com.br/ws/' + cep + '/json/';

      fetch(url)
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          if (!data.erro) {
              document.getElementById('idRua').value = data.logradouro;
              document.getElementById('idBairro').value = data.bairro;e;
              document.getElementById('idUf').value = data.localidade + "-" + data.uf;
  
          }
      })

      .catch(function(error){
          console.log('Ocorreu um erro', error);

      })

  }


}


document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let hasError = false;

    // Clear previous errors
    document.querySelectorAll('.error').forEach(function(el) {
        el.textContent = '';
    });

    // Nome
    const nome = document.getElementById('nome').value;
    if (!/^[A-Z][a-zA-Z ]{9,}$/.test(nome)) {
        document.getElementById('nomeError').textContent = 'Nome deve ter pelo menos 10 caracteres alfabéticos e começar com uma letra maiúscula.';
        hasError = true;
    }

    // Nome Materno
    const nomeMaterno = document.getElementById('nomeMaterno').value;
    if (!/^[A-Z][a-zA-Z ]{9,}$/.test(nomeMaterno)) {
        document.getElementById('nomeMaternoError').textContent = 'Nome Materno deve ter pelo menos 10 caracteres alfabéticos e começar com uma letra maiúscula.';
        hasError = true;
    }

    // CPF
    const cpf = document.getElementById('cpf').value;
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
        document.getElementById('cpfError').textContent = 'CPF deve estar no formato 000.000.000-00.';
        hasError = true;
    }

    // Celular
    const celular = document.getElementById('celular').value;
    if (!/^\+55\(\d{2}\)9\d{4}-\d{4}$/.test(celular)) {
        document.getElementById('celularError').textContent = 'Celular deve estar no formato +55(21)99999-9999.';
        hasError = true;
    }

    // Telefone Fixo
    const telefoneFixo = document.getElementById('telefoneFixo').value;
    if (!/^\+55\(\d{2}\)[2345]\d{3}-\d{4}$/.test(telefoneFixo)) {
        document.getElementById('telefoneFixoError').textContent = 'Telefone Fixo deve estar no formato +55(21)2XXX-XXXX, +55(21)3XXX-XXXX, +55(21)4XXX-XXXX ou +55(21)5XXX-XXXX.';
        hasError = true;
    }

    // Endereço Completo
    const endereco = document.getElementById('endereco').value;
    if (!/^(Rua|Avenida|Av\.|Travessa)\s.{10,}$/i.test(endereco)) {
        document.getElementById('enderecoError').textContent = 'Endereço deve começar com Rua, Avenida, Av., ou Travessa e conter pelo menos 10 caracteres alfanuméricos após isso.';
        hasError = true;
    }

    // Login
    const login = document.getElementById('login').value;
    if (!/^[A-Z]{5}$/.test(login)) {
        document.getElementById('loginError').textContent = 'Login deve conter exatamente 5 caracteres alfabéticos em maiúsculo.';
        hasError = true;
    }

    // Senha
    const senha = document.getElementById('senha').value;
    if (!/^[a-zA-Z0-9]{7}$/.test(senha)) {
        document.getElementById('senhaError').textContent = 'Senha deve conter exatamente 7 caracteres alfanuméricos.';
        hasError = true;
    }

    const confirmSenha = document.getElementById('confirmSenha').value;
    if (!/^[a-zA-Z0-9]{7}$/.test(confirmSenha)) {
        document.getElementById('confSenhaError').textContent = 'Senha deve conter exatamente 7 caracteres alfanuméricos.';
        hasError = true;
    }

    if (!hasError) {
        alert('Formulário submetido com sucesso!');
        // Aqui você pode enviar o formulário ou realizar outras ações necessárias
    }
});
