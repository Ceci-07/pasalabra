const total_preguntas = 26;

let preguntasAcertadas = 0;

let numeroPregActual = -1;

let estadoPreg = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];


const video_game = [
    {
        id:'A',
        pregunta:'Planta  con flor muy viscosa y resistente',
        respuesta:'agapanthus',
    }, {
        id:'B',
        pregunta:'Máquina para recortar o emparejar bordes. Hay eléctricas o a batería',
        respuesta:'bordeadora',
    },
    {
        id:'C',
        pregunta:'Cordón formado por varios conductores aislados unos de otros y protegido generalmente por una envoltura flexible y resistente',
        respuesta:'cable',
    },
    {
        id:'D',
        pregunta:'Herramienta diseñada para apretar o aflojar tornillos',
        respuesta:'destornillador',
    },
    {
        id:'E',
        pregunta:'Tipo de árbol perenne que es miembro de la familia del arrayán',
        respuesta:'eucalipto',
    },
    {
        id:'F',
        pregunta:'Nombre de persona que tiene nombre de Flor',
        respuesta:'florencia',
    },
    {
        id:'G',
        pregunta:'Prenda para cubrir la mano, por lo común de tela, de piel o tejido de punto y tiene una funda para cada dedo',
        respuesta:'guante',
    },
    {
        id:'H',
        pregunta:'Instrumento por lo común de acero o de hierro',
        respuesta:'herramienta',
    },
    {
        id:'I',
        pregunta:'Contiene I, día de la semana que deseamos que llegue la noche para descansar',
        respuesta:'viernes',
    },
    {
        id:'J',
        pregunta:'Contiene J, abrazadera de metal con que se asegura algo',
        respuesta:'manija',
    },
    {
        id:'K',
        pregunta:'Prefijo utilizado para denotar mil o el multiplicar por un factor de 1000. Su simbolo es K',
        respuesta:'kilo',
    },
    {
        id:'L',
        pregunta:'Los lumbricidos, son una familia de lombrices de tierra',
        respuesta:'lombriz',
    },
    {
        id:'M',
        pregunta:'Árbol de la familia de las resáceas, cultivado por su fruto, apreciado como alimento',
        respuesta:'manzano',
    },
    {
        id:'N',
        pregunta:'Fertilizante granulado complejo NKP con bajo contenido de cloro',
        respuesta:'nitrofosca',
    },
    {
        id:'O',
        pregunta:'Contiene O, último día de la semana para descansar de la jornada laboral',
        respuesta:'domingo',
    },
    {
        id:'P',
        pregunta:'Herramienta de mano empleadas o utilizadas para excavar o mever cualquier tipo de material',
        respuesta:'pala',
    },
    {
        id:'Q',
        pregunta:'Contiene Q, paquete que llega por una encomienda',
        respuesta:'paquete',
    },
    {
        id:'R',
        pregunta:'Instrumento compuesto de un mango largo con dientes gruesos de alambre o plástico, sirve para recoger hierba, paja, etc.',
        respuesta:'rastrillo',
    },
    {
        id:'S',
        pregunta:'Grano que en diversas formas producen las plantas y que al caer o ser sembrado produce nuevas plantas de la misma especie',
        respuesta:'semilla',
    },
    {
        id:'T',
        pregunta:'Hilo transparente de nylon grueso muy utilizado para el cosido al borde de un tejido',
        respuesta:'tanza',
    },
    {
        id:'U',
        pregunta:'Producto nitrogenador que constituye la mayor parte de la materia orgánica contenida en la orina de los vertebrados terrestres.',
        respuesta:'urea',
    },
    {
        id:'V',
        pregunta:'Cosa nociva a la salud',
        respuesta:'veneno',
    },
    {
        id:'W',
        pregunta:'Transceptor de radio portátil, es decir, un dispositivo que realiza tanto las funciones de emisión como de recepción',
        respuesta:'woki toki',
    },
    {
        id:'X',
        pregunta:'Contiene X, capa de diversos colores que se forma en la superficie de los metales por oxidación',
        respuesta:'oxido',
    },
    {
        id:'Y',
        pregunta:'Hierba propia de las regiones tropicales y templadas de casi todo el mundo',
        respuesta:'yuyo',
    },
    {
        id:'Z',
        pregunta:'Excavar la tierra',
        respuesta:'zanja',
    },
]

const timer = document.getElementById('time')

const tiempo_del_juego = 170;

let timeLeft = tiempo_del_juego;

let countdown;



const container = document.querySelector('.container');

for(let i = 0; i < total_preguntas; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.textContent = String.fromCharCode(65 + i);
    circle.id = String.fromCharCode(65 + i).toUpperCase();
    container.appendChild(circle);

    const angle = ((i - 1) / total_preguntas) * Math.PI * 2 - (Math.PI / 2)

    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}

let comenzar = document.getElementById('comenzar')
comenzar.addEventListener('click', function(event) {
    document.getElementById('main-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    largarTime();
    cargarPreg();
})

function largarTime() {
    countdown = setInterval(() => {
        timeLeft--;

        timer.innerText = timeLeft;

        if(timeLeft < 0){
            clearInterval(countdown);
            showFinalScreen()
        }
    }, 1000);
}

function cargarPreg () {
    numeroPregActual++;

    if(numeroPregActual >= total_preguntas) {
        numeroPregActual = 0
    }

    if(estadoPreg.indexOf(0) >= 0) {
      while(estadoPreg[numeroPregActual] == 1) {
        numeroPregActual++;
        if(numeroPregActual >= total_preguntas) {
            numeroPregActual = 0;
        }
      }

      document.getElementById('letter').textContent = video_game[numeroPregActual].id;
      document.getElementById('question').textContent = video_game[numeroPregActual].pregunta;

      let letter = video_game[numeroPregActual].id;
      document.getElementById(letter).classList.add('pregunta-actual');
    } else{
        clearInterval(countdown);
        showFinalScreen()
    }
}

let answer = document.getElementById('answer');
answer.addEventListener('keyup',function(event) {
    if(event.keyCode === 13) {
        if(answer.value == '') {
            alert('Debe ingresar una respuesta');
            return;
        }

        let txtResp = answer.value;
        controlarResp(txtResp.toLowerCase())
    }
})


function controlarResp(txtResp) {
    if(txtResp === video_game[numeroPregActual].respuesta) {
        preguntasAcertadas++;

        estadoPreg[numeroPregActual] = 1;

        let letter = video_game[numeroPregActual].id;

        document.getElementById(letter).classList.remove('pregunta-actual')
        document.getElementById(letter).classList.add('bien-respondida');
    }else {
        estadoPreg[numeroPregActual] = 1;
        let letter = video_game[numeroPregActual].id;

        document.getElementById(letter).classList.remove('pregunta-actual');
        document.getElementById(letter).classList.add('mal-respondida')
     }

    answer.value = '';
    cargarPreg();
}

let pass = document.getElementById('pass')
pass.addEventListener('click', function(event) {
    let letter = video_game[numeroPregActual].id;

    document.getElementById(letter).classList.remove('pregunta-actual')
  
    cargarPreg();

})
function showFinalScreen() {
    document.getElementById('correct').textContent = preguntasAcertadas;
    document.getElementById('score').textContent = (preguntasAcertadas * 100) / 26 + '% de acierto';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('final-screen').style.display = 'block';
}

let startAgain = document.getElementById('start-again')
startAgain.addEventListener('click', function(event) {
    numeroPregActual = -1;
    timeLeft = tiempo_del_juego;
    timer.innerText = timeLeft;

    preguntasAcertadas = 0;

    estadoPreg = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

let circles = document.getElementsByClassName('circle');

    for(i = 0;i < circles.length; i++) {
        circles[i].classList.remove('pregunta-actual');
        circles[i].classList.remove('bien-respondida');
        circles[i].classList.remove('mal-respondida');
    }

    document.getElementById('final-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';

    respuesta.value = '';

    largarTime();
    cargarPreg();
})



