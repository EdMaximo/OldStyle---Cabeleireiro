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
      alert("Cadastro de Usuario feito com sucesso");
      console.log(resposta);
    } else {
      alert("Erro ao realizar o cadastro" + resultado.response);
    }
  } catch (erro) {
    console.error("Erro de conexão com a API:", erro);
    alert("Não foi possível conectar ao servidor.");
  }
});
