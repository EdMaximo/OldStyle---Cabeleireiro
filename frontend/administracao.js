// const totalusers = await usersRepository.count()
const totalClients = document.getElementById("totalClients");
const AgendPend = document.getElementById("AgendPend");
const dayotm = document.getElementById("dayotm");

// Botões de confirmar e cancelar
const cancelButton = document.getElementById("cancelButton");
const confirmButton = document.getElementById("confirmButton")

const date = new Date();
// console.log(date.getDate()) // ISO


document.addEventListener("DOMContentLoaded", async (event) => {
  event.preventDefault(); // Evita que a pagina recarregue
  dayotm.innerText = date.getDate();
  
  // Consulta para a dataUsers
  try {
    // Seguindo a base de: https://satellasoft.com/javascript/requisies-get-com-fetch-api-do-javascript?
    const response = await fetch("http://localhost:3333/agendamento/listarAgendamentos", {
        method: "GET",
        // body: JSON.stringify(dadosCliente), // Converte o arquivo javascript para json

      });
      const resultado = await response.json();
      const agendamentos = resultado.agendamentos;
      
      if(agendamentos){
        agendamentos.forEach((agendamento) => {

          const cliente = agendamento.cliente.name;
          const corte = agendamento.corte.nome;
          const barbeiro = agendamento.cabelereiro.nome;
          const dataHora = agendamento.data_hora;
          const status = agendamento.status;

          // Separa hora e data
          const data = new Date(dataHora);

          // Formatando...
          const dia = String(data.getDate()).padStart(2, "0");
          const mes = String(data.getMonth() + 1).padStart(2, "0");
          const ano = data.getFullYear();

          const dataFormatada = `${dia}/${mes}/${ano}`;
          const horaFormatada = `${String(data.getHours()).padStart(2, "0")}:${String(data.getMinutes()).padStart(2, "0")}`;

          // console.log(cliente)
          
          const DataDivs = document.createElement("div");
          // Adiciona a class "divEachData" para o DataDiv
          DataDivs.classList.add("divEachData");

          DataDivs.innerHTML = ` 
            <h3 class="ClientName">${cliente}</h3>
            <span class="tableSubInfo">${corte}</span>
            <span class="tableSubInfo">${barbeiro}</span>
            <span class="tableSubInfo">${dataFormatada}</span>
            <span class="tableSubInfo">${horaFormatada}</span>

            <span class="statusPendente">${status}</span> 

            <div style="display: flex; gap: 5px;">
              <button class="ConfirmSchedule" id="confirmButton" data-id="${agendamento.id_agendamento}">Confirmar</button> 
              <button class="CancelSchedule" id="cancelButton">Cancelar</button> 
            </div> 
          `
          console.log(agendamento.id_agendamento);

          // confirmButton.dataset.id = agendamento.id_agendamento;

          // TODO: ADICIONAR OS BOTÕES (usar if?)
          const confirmButton = DataDivs.querySelector(".ConfirmSchedule");

          confirmButton.addEventListener("click", async (event) => {
          const id_agendamento = event.currentTarget.dataset.id;

          try {
            const response = await fetch(
            `http://localhost:3333/agendamento/AllAgend?id_agendamento=${id_agendamento}`,
            {
                method: "PATCH",
            }
          );

          if (!response.ok) {
            throw new Error("Erro ao confirmar agendamento");
          }

          alert("Agend confirmado!");
          const statusElement = DataDivs.querySelector(".statusPendente");
          statusElement.textContent = "aceito";
          } catch (error) {
          console.error(error);
          alert("Não foi possível confirmar o agendamento.");
          }
          });

          divEachDataTH.appendChild(DataDivs)

          // console.log(agendamentos)

          
          // console.log(cliente,corte,barbeiro,dataHora, status)
        })
      }
    }catch(erro) {
      console.error("Erro de conexão com a API:", erro);
      alert("Não foi possível conectar ao servidor.");
    }
  
  // // Objeto que será mandado para o back
  // const dadosCliente = {
    //   name: name,
    //   password: password,
    //   email: email,
    //   telefone: telefone,
    // };
    
    // fazer um try usando o metodo post para enviar para o back
    try {
      const response = await fetch("http://localhost:3333/cliente/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json", //Informa q estamos mandando um arquivo json
        },
        // body: JSON.stringify(dadosCliente), // Converte o arquivo javascript para json
      });
  
      const resultado = await response.json();
      totalClients.innerText = resultado;
      // console.log(resultado)
     
    } catch (erro) {
      console.error("Erro de conexão com a API:", erro);
      alert("Não foi possível conectar ao servidor.");
    }

    try {
      const response = await fetch("http://localhost:3333/agendamento/totalAgend", {
        method: "GET",
        headers: {
          "Content-Type": "application/json", //Informa q estamos mandando um arquivo json
        },
        // body: JSON.stringify(dadosCliente), // Converte o arquivo javascript para json
      });
  
      const resultado = await response.json();
      AgendPend.innerText = resultado;
      // console.log(resultado)
     
    } catch (erro) {
      console.error("Erro de conexão com a API:", erro);
      alert("Não foi possível conectar ao servidor.");
    }

  }
)

// confirmButton.addEventListener("click", async () => {
//     const id = botaoConfirmar.dataset.id;

//     // console.log(id);
// });




// confirmButton.addEventListener("click", async (event) => {
//   event.preventDefault();

//   try {
//       const response = await fetch("http://localhost:3333/agendamento/allAgend", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json", //Informa q estamos mandando um arquivo json
//         },
//         body: JSON.stringify(dadosCliente), // Converte o arquivo javascript para json
//       });
  
//       const resultado = await response.json();
//       AgendPend.innerText = resultado;
//       console.log(resultado)
     
//     } catch (erro) {
//       console.error("Erro de conexão com a API:", erro);
//       alert("Não foi possível conectar ao servidor.");
//     }

// })

// cancelButton.addEventListener("click", async (event) => {
//   event.preventDefault();


// })
