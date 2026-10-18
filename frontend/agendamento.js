// EDUARDO - AGENDAMENTO!!

// Ao carregar o DOM (HTML)...
document.addEventListener("DOMContentLoaded", () => {
  const NameClient = document.getElementById("NameClient")
  const name = localStorage.getItem("name")
  NameClient.innerText = ` ${name}`
});



// TODO: COLOCAR O NOME DO USUÁRIO E TORNAR OBRIGATÓRIO!!!!!!!

// Para mudar o title "data e hora" da div "REVISÃO"
const RevisionTitleDate = document.getElementById("RevisionTitleDate")
const RevisionTitleHour = document.getElementById("RevisionTitleHour")
const dateRadios = document.querySelectorAll('input[name="data"]')
const hourRadios = document.querySelectorAll('input[name="Hour"]')

// Dia
dateRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    RevisionTitleDate.innerText = ` ${radio.value} `
  })
})

// Hora
hourRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    RevisionTitleHour.innerText = ` ${radio.value} `
  })
})

// Corte
const cutRadio = document.querySelectorAll('input[name="Cut"]')
const CutName = document.getElementById("CutName")
const CutValue = document.getElementById("CutValue")
const finalValue = document.getElementById("Price")

cutRadio.forEach((radio) => {
  radio.addEventListener("change", () => {
    if(radio.value === "1"){
      CutName.innerText = "Fade preciso"
      CutValue.innerText = "45 minutos - R$75"
      finalValue.innerText = "R$75"

    }else if(radio.value === "2"){
      CutName.innerText = "Clássico atual"
      CutValue.innerText = "45 minutos - R$85"
      finalValue.innerText = "R$85"

    }else if(radio.value === "3"){
      CutName.innerText = "Crespo natural"
      CutValue.innerText = "45 minutos - R$90"
      finalValue.innerText = "R$90"

    }
  })
})



// Mudar o profissional
const ClientMadeChoices = document.getElementById("ProfessionalName")
const ProfessionalRadio = document.querySelectorAll('input[name="Professional"]')


ProfessionalRadio.forEach((radio) => {
  radio.addEventListener("change", () => {
    if(radio.value === "1"){
      ClientMadeChoices.innerText = "Rafael nunes"
    }else if(radio.value === "2"){
      ClientMadeChoices.innerText =  "Caio martins"
    }
  })
})



const ButtonConfirm = document.getElementById("ButtonConfirm");

if (ButtonConfirm) {
  ButtonConfirm.addEventListener("click", async (event) => {
    event.preventDefault(); 



    const selectedDate = document.querySelector('input[name="data"]:checked');
    const selectedHour = document.querySelector('input[name="Hour"]:checked');
    const selectedCut = document.querySelector('input[name="Cut"]:checked');
    const selectedProfessional = document.querySelector('input[name="Professional"]:checked');

    
    

    

    

    if(selectedDate && selectedHour && selectedCut && selectedProfessional){
      const data_hora = `${selectedDate.value} ${selectedHour.value}`;
      const corte = document.querySelector('input[name="Cut"]:checked').value;
      const cabelereiro = document.querySelector('input[name="Professional"]:checked').value;
      const cliente = localStorage.getItem("id")

      const dadosAgendamento = {
        data_hora: data_hora,
        corte: corte,
        cabelereiro: cabelereiro,
        cliente: Number(cliente),
      };

      console.log(dadosAgendamento)
      
      // fazer um try usando o metodo post para enviar para o back
      try {
        const response = await fetch("http://localhost:3333/agendamento",   {
          method: "POST",
          headers: {
            "Content-Type": "application/json", //Informa q estamos   mandando um arquivo json
          },
          body: JSON.stringify(dadosAgendamento), // Converte o arquivo   javascript para json
        });
      
        const resultado = await response.json();
      
        if (response.ok) // Se a respota for um sucesso
        {
          alert("Agendamento feito com sucesso!");
          console.log(resultado);
        } else {
          console.error("Erro no cadastro:" + resultado);
          alert("Erro ao realizar o agendamento.");
        }
      } catch (erro) {
        console.error("Erro de conexão com a API:", erro);
        alert("Não foi possível conectar ao servidor.");
      }
    }else {
      alert("Escolha as opções de agendamento!")
    }
  });
}