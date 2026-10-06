// ======================================================
// FITTRACK
// ======================================================

let timer = 60;
let intervalo = null;

let exerciciosConcluidos =
    Number(localStorage.getItem("exerciciosConcluidos")) || 0;

let treinosConcluidos =
    Number(localStorage.getItem("treinosConcluidos")) || 0;

let listaPersonalizada =
    JSON.parse(
        localStorage.getItem("listaPersonalizada")
    ) || [];


// ======================================================
// PROGRAMAÇÃO SEMANAL
// ======================================================

const programacao = {

    domingo: {
        nome: "Descanso",
        descricao: "Dia de recuperação"
    },

    segunda: {
        nome: "Peito + Tríceps",
        descricao: "Treino de peito e tríceps"
    },

    terca: {
        nome: "Pernas",
        descricao: "Treino completo de pernas"
    },

    quarta: {
        nome: "Descanso",
        descricao: "Dia de recuperação"
    },

    quinta: {
        nome: "Costas + Bíceps",
        descricao: "Treino de costas e bíceps"
    },

    sexta: {
        nome: "Ombros",
        descricao: "Treino de ombros"
    },

    sabado: {
        nome: "Cardio",
        descricao: "Corrida, bicicleta ou caminhada"
    }

};


// ======================================================
// DESCOBRIR DIA ATUAL
// ======================================================

function obterDiaAtual() {

    const dias = [
        "domingo",
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado"
    ];

    const numeroDia =
        new Date().getDay();

    return dias[numeroDia];
}


// ======================================================
// MOSTRAR DIA ATUAL
// ======================================================

function destacarDiaAtual() {

    const diaAtual =
        obterDiaAtual();

    const dias =
        document.querySelectorAll(".dia-treino");

    dias.forEach(function(dia) {

        dia.classList.remove("hoje");

        if (
            dia.dataset.dia === diaAtual
        ) {
            dia.classList.add("hoje");
        }

    });

}


// ======================================================
// TREINO DE HOJE
// ======================================================

function atualizarTreinoHoje() {

    const diaAtual =
        obterDiaAtual();

    const treino =
        programacao[diaAtual];

    if (!treino) {
        return;
    }

    document.getElementById(
        "treinoHojeNome"
    ).textContent = treino.nome;

    document.getElementById(
        "treinoHojeDescricao"
    ).textContent = treino.descricao;

}


// ======================================================
// CLICAR EM UM DIA DA SEMANA
// ======================================================

function selecionarDia(dia) {

    const treino =
        programacao[dia];

    if (!treino) {
        return;
    }


    if (treino.nome === "Descanso") {

        alert(
            "Hoje é dia de descanso 😴\n\n" +
            "Aproveite para recuperar o corpo!"
        );

        return;
    }


    const iniciar =
        confirm(
            "Treino de " +
            treino.nome +
            ".\n\n" +
            "Deseja começar esse treino?"
        );


    if (iniciar) {

        mostrarTela("treinos");

    }

}


// ======================================================
// ABRIR TREINO DE HOJE
// ======================================================

function abrirTreinoHoje() {

    const diaAtual =
        obterDiaAtual();

    const treino =
        programacao[diaAtual];


    if (treino.nome === "Descanso") {

        alert(
            "Hoje é dia de descanso 😴\n\n" +
            "A recuperação também faz parte do treino!"
        );

        return;
    }


    mostrarTela("treinos");

}


// ======================================================
// LOGIN
// ======================================================

function entrar() {

    const input =
        document.getElementById("nomeLogin");

    const nome =
        input.value.trim();


    if (nome === "") {

        alert(
            "Digite seu nome para entrar."
        );

        input.focus();

        return;
    }


    localStorage.setItem(
        "nomeUsuario",
        nome
    );


    document.getElementById(
        "nomeUsuario"
    ).textContent = nome;

    document.getElementById(
        "nomePerfil"
    ).value = nome;


    document.getElementById(
        "login"
    ).classList.add("hidden");


    document.getElementById(
        "app"
    ).classList.remove("hidden");


    atualizarEstatisticas();

}


// ======================================================
// SAIR
// ======================================================

function sair() {

    document
        .getElementById("app")
        .classList.add("hidden");

    document
        .getElementById("login")
        .classList.remove("hidden");

}


// ======================================================
// NAVEGAÇÃO
// ======================================================

function mostrarTela(nomeTela) {

    const telas =
        document.querySelectorAll(".tela");


    telas.forEach(function(tela) {

        tela.classList.add("hidden");

    });


    const tela =
        document.getElementById(nomeTela);


    if (tela) {

        tela.classList.remove("hidden");

    }


    const botoes =
        document.querySelectorAll(".menu-btn");


    botoes.forEach(function(botao) {

        botao.classList.remove("active");


        const comando =
            botao.getAttribute("onclick");


        if (
            comando &&
            comando.includes(
                "'" + nomeTela + "'"
            )
        ) {

            botao.classList.add("active");

        }

    });

}


// ======================================================
// FILTROS
// ======================================================

function filtrar(categoria, botao) {

    const exercicios =
        document.querySelectorAll(".exercicio");


    const filtros =
        document.querySelectorAll(".filtro");


    filtros.forEach(function(filtro) {

        filtro.classList.remove("ativo");

    });


    if (botao) {

        botao.classList.add("ativo");

    }


    exercicios.forEach(function(exercicio) {

        if (categoria === "todos") {

            exercicio.style.display =
                "flex";

        }

        else if (
            exercicio.classList.contains(
                categoria
            )
        ) {

            exercicio.style.display =
                "flex";

        }

        else {

            exercicio.style.display =
                "none";

        }

    });

}


// ======================================================
// CONCLUIR EXERCÍCIO
// ======================================================

function concluirExercicio(botao) {

    const exercicio =
        botao.closest(".exercicio");


    if (
        exercicio.classList.contains(
            "concluido"
        )
    ) {

        return;

    }


    exercicio.classList.add(
        "concluido"
    );


    botao.textContent =
        "Concluído";


    exerciciosConcluidos++;


    localStorage.setItem(
        "exerciciosConcluidos",
        exerciciosConcluidos
    );


    atualizarEstatisticas();

}


// ======================================================
// FINALIZAR TREINO
// ======================================================

function finalizarTreino() {

    const exercicios =
        document.querySelectorAll(
            ".exercicio"
        );


    let quantidade =
        0;


    exercicios.forEach(
        function(exercicio) {

            if (
                exercicio.classList.contains(
                    "concluido"
                )
            ) {

                quantidade++;

            }

        }
    );


    if (quantidade === 0) {

        alert(
            "Conclua pelo menos um exercício antes de finalizar o treino."
        );

        return;

    }


    treinosConcluidos++;


    localStorage.setItem(
        "treinosConcluidos",
        treinosConcluidos
    );


    alert(
        "Treino finalizado! 💪🔥"
    );


    atualizarEstatisticas();

}


// ======================================================
// ESTATÍSTICAS
// ======================================================

function atualizarEstatisticas() {

    document.getElementById(
        "exerciciosConcluidos"
    ).textContent =
        exerciciosConcluidos;


    document.getElementById(
        "treinosConcluidos"
    ).textContent =
        treinosConcluidos;


    document.getElementById(
        "sequencia"
    ).textContent =
        treinosConcluidos;

}


// ======================================================
// MONTAR TREINO
// ======================================================

function adicionarExercicio() {

    const select =
        document.getElementById(
            "exercicioSelect"
        );


    const nome =
        select.value;


    listaPersonalizada.push(nome);


    atualizarListaTreino();

}


function removerExercicio(index) {

    listaPersonalizada.splice(
        index,
        1
    );


    atualizarListaTreino();

}


function atualizarListaTreino() {

    const lista =
        document.getElementById(
            "listaTreino"
        );


    lista.innerHTML = "";


    if (
        listaPersonalizada.length === 0
    ) {

        lista.innerHTML =
            "<p style='color:#888'>" +
            "Nenhum exercício adicionado." +
            "</p>";

        return;

    }


    listaPersonalizada.forEach(
        function(nome, index) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "item-treino";


            item.innerHTML = `

                <span>
                    ${nome}
                </span>

                <button
                    onclick="removerExercicio(${index})"
                >
                    <i class="bi bi-trash"></i>
                </button>

            `;


            lista.appendChild(item);

        }
    );

}


function salvarTreino() {

    localStorage.setItem(
        "listaPersonalizada",
        JSON.stringify(
            listaPersonalizada
        )
    );


    alert(
        "Seu treino foi salvo! 💪"
    );

}


// ======================================================
// CRONÔMETRO
// ======================================================

function atualizarTimer() {

    const minutos =
        Math.floor(timer / 60)
            .toString()
            .padStart(2, "0");


    const segundos =
        (timer % 60)
            .toString()
            .padStart(2, "0");


    document.getElementById(
        "tempo"
    ).textContent =
        `${minutos}:${segundos}`;

}


function iniciarTimer() {

    if (intervalo !== null) {
        return;
    }


    intervalo =
        setInterval(
            function() {

                if (timer > 0) {

                    timer--;

                    atualizarTimer();

                }

                else {

                    clearInterval(
                        intervalo
                    );

                    intervalo = null;


                    alert(
                        "Tempo de descanso terminado! 🔥"
                    );

                }

            },
            1000
        );

}


function pausarTimer() {

    clearInterval(
        intervalo
    );

    intervalo = null;

}


function resetarTimer() {

    clearInterval(
        intervalo
    );

    intervalo = null;

    timer = 60;

    atualizarTimer();

}


// ======================================================
// PERFIL
// ======================================================

function salvarPerfil() {

    const nome =
        document
            .getElementById("nomePerfil")
            .value
            .trim();


    const idade =
        document.getElementById(
            "idadePerfil"
        ).value;


    const peso =
        Number(
            document.getElementById(
                "pesoPerfil"
            ).value
        );


    const altura =
        Number(
            document.getElementById(
                "alturaPerfil"
            ).value
        );


    const objetivo =
        document.getElementById(
            "objetivoPerfil"
        ).value;


    if (nome === "") {

        alert(
            "Digite seu nome."
        );

        return;

    }


    localStorage.setItem(
        "nomeUsuario",
        nome
    );


    localStorage.setItem(
        "idade",
        idade
    );


    localStorage.setItem(
        "peso",
        peso
    );


    localStorage.setItem(
        "altura",
        altura
    );


    localStorage.setItem(
        "objetivo",
        objetivo
    );


    document.getElementById(
        "nomeUsuario"
    ).textContent =
        nome;


    atualizarProgresso();


    alert(
        "Perfil salvo com sucesso! ✅"
    );

}


// ======================================================
// PROGRESSO
// ======================================================

function atualizarProgresso() {

    const peso =
        Number(
            localStorage.getItem(
                "peso"
            )
        ) || 0;


    const altura =
        Number(
            localStorage.getItem(
                "altura"
            )
        ) || 0;


    document.getElementById(
        "pesoProgresso"
    ).textContent =
        peso > 0
            ? peso + " kg"
            : "-- kg";


    document.getElementById(
        "alturaProgresso"
    ).textContent =
        altura > 0
            ? altura + " cm"
            : "-- cm";


    if (
        peso > 0 &&
        altura > 0
    ) {

        const alturaMetros =
            altura / 100;


        const imc =
            peso /
            (
                alturaMetros *
                alturaMetros
            );


        document.getElementById(
            "imcProgresso"
        ).textContent =
            imc.toFixed(1);

    }

    else {

        document.getElementById(
            "imcProgresso"
        ).textContent =
            "--";

    }

}


// ======================================================
// CARREGAR DADOS
// ======================================================

function carregarDados() {

    const nome =
        localStorage.getItem(
            "nomeUsuario"
        );


    if (nome) {

        document.getElementById(
            "nomeUsuario"
        ).textContent =
            nome;


        document.getElementById(
            "nomeLogin"
        ).value =
            nome;


        document.getElementById(
            "nomePerfil"
        ).value =
            nome;


        document.getElementById(
            "login"
        ).classList.add(
            "hidden"
        );


        document.getElementById(
            "app"
        ).classList.remove(
            "hidden"
        );

    }


    const idade =
        localStorage.getItem(
            "idade"
        );


    const peso =
        localStorage.getItem(
            "peso"
        );


    const altura =
        localStorage.getItem(
            "altura"
        );


    const objetivo =
        localStorage.getItem(
            "objetivo"
        );


    if (idade) {

        document.getElementById(
            "idadePerfil"
        ).value =
            idade;

    }


    if (peso) {

        document.getElementById(
            "pesoPerfil"
        ).value =
            peso;

    }


    if (altura) {

        document.getElementById(
            "alturaPerfil"
        ).value =
            altura;

    }


    if (objetivo) {

        document.getElementById(
            "objetivoPerfil"
        ).value =
            objetivo;

    }


    atualizarEstatisticas();

    atualizarProgresso();

    atualizarListaTreino();

    atualizarTimer();

    atualizarTreinoHoje();

    destacarDiaAtual();

}


// ======================================================
// ENTER NO LOGIN
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const input =
            document.getElementById(
                "nomeLogin"
            );


        input.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter"
                ) {

                    entrar();

                }

            }
        );


        carregarDados();

    }
);