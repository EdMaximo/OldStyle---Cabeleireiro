// HENRY && +-EDUARDO - LOGIN


const btnLogin = document.getElementById("buttonOutput"); // Pega o id do butão do html

btnLogin.addEventListener("click", async (event) => {
  event.preventDefault(); // Evita que a pagina recarregue

  // Pegar os valores que o usuario digitou
  const name = document.getElementById("inputName").value;
  const password = document.getElementById("inputPassword").value;
  const email = document.getElementById("inputEmail").value;
  const telefone = document.getElementById("inputTelefone").value;

  // Objeto que será mandado para o back
  const dadosCliente = {
    name: name,
    password: password,
    email: email,
    telefone: telefone,
  };


  // Validação dos dados de entrada

  const nomeRegex = /^[A-Za-zÀ-ÿ]+(\s[A-Za-zÀ-ÿ]+)+$/;
  const senhaRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])^[\x21-\x7e]{1,60}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telefoneRegex = /^\([1-9]{2}\)\s?9?[0-9]{4}-?[0-9]{4}$/


  if (!nomeRegex.test(dadosCliente.name) || !senhaRegex.test(dadosCliente.password) || !emailRegex.test(dadosCliente.email) || !telefoneRegex.test(dadosCliente.telefone)){
    alert("Dados incorretos! Confira se estão de acordo com o padrão requisitado.")
    return
  }else {
    
    // fazer um try usando o metodo post para enviar para o back
    try {
      const response = await fetch("http://localhost:3333/cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", //Informa q estamos mandando um arquivo json
        },
        body: JSON.stringify(dadosCliente), // Converte o arquivo javascript para json
      });
  
      const resultado = await response.json();
  
      if (response.ok) // Se a respota for um sucesso
      {
        console.log(resultado);
        localStorage.setItem("id", resultado.id_cliente)
        alert("Cadastro de Usuario feito com sucesso");
        localStorage.setItem("name", dadosCliente.name);
        window.location.href = "index.html";
      } else {
        console.error("Erro no cadastro:", resultado);
        alert("Erro ao realizar o cadastro");
      }
    } catch (erro) {
      console.error("Erro de conexão com a API:", erro);
      alert("Não foi possível conectar ao servidor.");
    }

  }

});






