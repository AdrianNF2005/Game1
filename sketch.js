
var firebaseConfig = {
  apiKey: "AIzaSyDF_0fXUVHiauVr83vsVIqBMkoXjNzRKlY",
  authDomain: "san-valero-4b07e.firebaseapp.com",
  databaseURL: "https://san-valero-4b07e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "san-valero-4b07e",
  storageBucket: "san-valero-4b07e.firebasestorage.app",
  messagingSenderId: "200137559098",
  appId: "1:200137559098:web:eab160b3bd45ba282ab903",
  measurementId: "G-0BS3YBJ3KG"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

let cols = 7; // Número de columnas
let rows = 6; // Número de filas
let grid;
let currentPlayer; // El jugador se decide aleatoriamente
let cellSize = 100; // Define el tamaño de cada celda
let selectorCol = 0; // Columna seleccionada por el usuario
let fallingPiece = null; // Para animar la ficha al caer
let arrowMovement = 0; // Para el efecto de movimiento de las flechas
let angle = 0; // Para hacer rotar el degradado
let offsetX; // Para el desplazamiento horizontal del tablero
let offsetY; // Para el desplazamiento vertical del tablero
let leftArrowImg, rightArrowImg; // Variables para las imágenes de las flechas
let myFont; // Fuente personalizada
let myFont2;

let Jugador;
let InicioJuego = true;
let LecturaEcha = false;

let Partida1;
let Partida2;
let Partida3;

let PlayerPos = 0;

let PartidaSel = 0;

let Turno = 1;

var ref;

let TiempoRegresivo = 5;

let TemporizadorMillisANT = 0;

let JugadorInicial;

let EnterPressed = false;

let selectorColANT = 0;

let VideoBG;
let Waiting;
let FondoConnect;
let LeftBird;
let RightBird;
let TextoConectar;
let CornerDer;
let CornerIzq;

let TwoPlayerConected = false;

let TemporizadorLecturaJugadores = 0;

let Desvanecido = 255;

let SinBird = 0;

let FadeText = 0;

let TextFadeIncrement = true;

let TextoWaiting = false;

let TextoPunto = 0;

let TiempoPartidaSec;
let TiempoPartidaMin;
let TiempoPartidaHour;

let Num1;
let Num2;
let Num3;
let Conecta4;

let NumeroANT = 0;

let FactorNum = 0;

let diferenciaSegundos = 0;
let diferenciaSegundosANT = 0;

let Solicitar1Vez = false;

let Musica;
let FinJuego = false;
let volumen = 1;

function preload() {
  // Carga las imágenes de las flechas (asegúrate de tener las imágenes en la carpeta de tu proyecto)
  leftArrowImg = loadImage('Flecha1.png');
  rightArrowImg = loadImage('Flecha2.png');
  FondoFicha = loadImage('Fondo.png');
  Logo2 = loadImage('Logo2.png');
  Logo = loadImage('Logo.png');
  myFont = loadFont('nasalization-rg.otf');
  myFont2 = loadFont('fixedsys.ttf');
  VideoBG = createVideo('LoopVideo.mp4');
  VideoBG.volume(0);
  VideoBG.loop();
  VideoBG.hide();
  Waiting = loadImage('Waiting.gif');
  FondoConnect = loadImage('Fondo4Conectar.png');
  LeftBird = loadImage('ImageLeftBird.png');
  RightBird = loadImage('ImageRightBird.png');
  TextoConectar = loadImage('TextoConectar.png');
  CornerDer = loadImage('CornerDer.png');
  CornerIzq = loadImage('CornerIzq.png');
  Num1 = loadImage('1Num.png');
  Num2 = loadImage('2Num.png');
  Num3 = loadImage('3Num.png');
  Conecta4 = loadImage('Conecta4.png');
  Musica = loadSound('Musica.mp3');
}

function gotDataPlayer(data) {
  Jugador = data.val();
  LecturaEcha = true;
}

function gotDataPartida1(data) {
  Partida1 = data.val();
}

function gotDataPartida2(data) {
  Partida2 = data.val();
}

function gotDataPartida3(data) {
  Partida3 = data.val();
}

function gotDataPlayerPos(data) {
  PlayerPos = data.val();
}

function gotDataTimeSec(data) {
  TiempoPartidaSec = data.val();
}

function gotDataTimeMin(data) {
  TiempoPartidaMin = data.val();
}

function gotDataTimeHour(data) {
  TiempoPartidaHour = data.val();
}


function setup() {
  createCanvas(1280, 740); // Resolución de 1280 x 740
  grid = Array.from({ length: rows }, () => Array(cols).fill(0)); // Inicializa la cuadrícula
  // Centrar el tablero horizontalmente, pero no verticalmente
  offsetX = (width - cols * cellSize) / 2;
  // Aseguramos que el tablero se ajuste verticalmente
  offsetY = (height - rows * cellSize) / 2;
  
  Musica.loop();

}

function draw() {
  
  if (FinJuego == false) {
  
  if (Partida1 === undefined) {
  
  ref = database.ref('Juegos/CuatroRaya/Partida1');
  ref.on('value', gotDataPartida1);
    
  }
  
  if (Partida2 === undefined) {
  
  ref = database.ref('Juegos/CuatroRaya/Partida2');
  ref.on('value', gotDataPartida2);
    
  }
  
  if (Partida3 === undefined) {
  
  ref = database.ref('Juegos/CuatroRaya/Partida3');
  ref.on('value', gotDataPartida3);
    
  }
  
  if (Partida1 === undefined || Partida2 === undefined || Partida3 === undefined) {
    
  } else {
  
  if (Jugador === undefined && PartidaSel == 0 && Solicitar1Vez == false) {
    
    Solicitar1Vez = true;
    
    if (Partida1 == 0 || Partida1 == 1) {
      
      PartidaSel = 1;
    
     ref = database.ref('Juegos/CuatroRaya/Partida1CuatroRayaPlayer');
  ref.on('value', gotDataPlayer);
      
     ref = database.ref('Juegos/CuatroRaya/Partida1');
    ref.set(Partida1 + 1);
    
    } else if (Partida2 == 0 || Partida2 == 1) {
      
      if (PartidaSel == 0) {
        
        PartidaSel = 2;
      
      ref = database.ref('Juegos/CuatroRaya/Partida2CuatroRayaPlayer');
  ref.on('value', gotDataPlayer);
    
     ref = database.ref('Juegos/CuatroRaya/Partida2');
    ref.set(Partida2 + 1);
        
      }
    
    } else if (Partida3 == 0 || Partida3 == 1) {
      
      if (PartidaSel == 0) {
        
        PartidaSel = 3;
      
    ref = database.ref('Juegos/CuatroRaya/Partida3CuatroRayaPlayer');
  ref.on('value', gotDataPlayer);
    
    ref = database.ref('Juegos/CuatroRaya/Partida3');
    ref.set(Partida3 + 1);
        
      }
    
    }
    
  }
    
  }
  
  if (currentPlayer === undefined) {
    
    if (Jugador === undefined) {
      
    } else {
  
  if (Jugador == 0) {
    
    Jugador = random() < 0.5 ? 1 : 2;
    
    if (PartidaSel == 1) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida1CuatroRayaPlayer');
    ref.set(Jugador);
    
    } else if (PartidaSel == 2) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida2CuatroRayaPlayer');
    ref.set(Jugador);
    
    } else if (PartidaSel == 3) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida3CuatroRayaPlayer');
    ref.set(Jugador);
    
    }
    
    currentPlayer = Jugador;
    Turno = 2;
    JugadorInicial = Jugador;
    
  } else if (Jugador == 1) {
    
    if (PartidaSel == 1) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida1CuatroRayaPlayer');
    ref.set(2);
    
    } else if (PartidaSel == 2) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida2CuatroRayaPlayer');
    ref.set(2);
    
    } else if (PartidaSel == 3) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida3CuatroRayaPlayer');
    ref.set(2);
    
    }
    
    currentPlayer = 2;
    Turno = 2;
    JugadorInicial = 2;
    
  } else if (Jugador == 2) {
    
    if (PartidaSel == 1) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida1CuatroRayaPlayer');
    ref.set(1);
    
    } else if (PartidaSel == 2) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida2CuatroRayaPlayer');
    ref.set(1);
    
    } else if (PartidaSel == 3) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida3CuatroRayaPlayer');
    ref.set(1);
    
    }
    
    currentPlayer = 1;
    Turno = 2;
    JugadorInicial = 1;
    
  }
      
  }
    
    TemporizadorMillisANT = millis();
    
  } else {
    
  if (millis() >= TemporizadorLecturaJugadores + 1000) {
    
    TemporizadorLecturaJugadores = millis();
    
    if (PartidaSel == 1) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida1');
  ref.on('value', gotDataPartida1);
      
      if (Partida1 >= 2) {
        
       TwoPlayerConected = true;
        
      } else {
        
       TwoPlayerConected = false; 
        
      }
    
    } else if (PartidaSel == 2) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida2');
  ref.on('value', gotDataPartida2);
      
      if (Partida2 >= 2) {
        
       TwoPlayerConected = true;
        
      } else {
        
       TwoPlayerConected = false; 
        
      }
    
    } else if (PartidaSel == 3) {
      
     ref = database.ref('Juegos/CuatroRaya/Partida3');
  ref.on('value', gotDataPartida3);
      
      if (Partida3 >= 2) {
        
       TwoPlayerConected = true;
        
      } else {
        
       TwoPlayerConected = false; 
        
      }
    
    }
    
  }
    
    if (TwoPlayerConected == true) {
      
    if (TiempoPartidaSec == null || TiempoPartidaMin == null || TiempoPartidaHour == null) {
        
    if (PartidaSel == 1) {
      
    if (JugadorInicial == 1) {
      
      ref = database.ref('Juegos/CuatroRaya/Partida1Sec');
      ref.set(second());
      ref = database.ref('Juegos/CuatroRaya/Partida1Min');
      ref.set(minute());
      ref = database.ref('Juegos/CuatroRaya/Partida1Hour');
      ref.set(hour());
      
      TiempoPartidaSec = second();
      TiempoPartidaMin = minute();
      TiempoPartidaHour = hour();
      
    }
      
    if (JugadorInicial == 2) {
      
      ref = database.ref('Juegos/CuatroRaya/Partida1Sec');
      ref.on('value', gotDataTimeSec);
      ref = database.ref('Juegos/CuatroRaya/Partida1Min');
      ref.on('value', gotDataTimeMin);
      ref = database.ref('Juegos/CuatroRaya/Partida1Hour');
      ref.on('value', gotDataTimeHour);
      
    }
      
    } else if (PartidaSel == 2) {
               
    if (JugadorInicial == 1) {
      
      ref = database.ref('Juegos/CuatroRaya/Partida2Sec');
      ref.set(second());
      ref = database.ref('Juegos/CuatroRaya/Partida2Min');
      ref.set(minute());
      ref = database.ref('Juegos/CuatroRaya/Partida2Hour');
      ref.set(hour());
      
      TiempoPartidaSec = second();
      TiempoPartidaMin = minute();
      TiempoPartidaHour = hour();
      
    }
      
    if (JugadorInicial == 2) {
      
      ref = database.ref('Juegos/CuatroRaya/Partida2Sec');
      ref.on('value', gotDataTimeSec);
      ref = database.ref('Juegos/CuatroRaya/Partida2Min');
      ref.on('value', gotDataTimeMin);
      ref = database.ref('Juegos/CuatroRaya/Partida2Hour');
      ref.on('value', gotDataTimeHour);
      
    }          
               
    } else if (PartidaSel == 3) {
               
    if (JugadorInicial == 1) {
      
      ref = database.ref('Juegos/CuatroRaya/Partida3Sec');
      ref.set(second());
      ref = database.ref('Juegos/CuatroRaya/Partida3Min');
      ref.set(minute());
      ref = database.ref('Juegos/CuatroRaya/Partida3Hour');
      ref.set(hour());
      
      TiempoPartidaSec = second();
      TiempoPartidaMin = minute();
      TiempoPartidaHour = hour();
      
    }
      
    if (JugadorInicial == 2) {
      
      ref = database.ref('Juegos/CuatroRaya/Partida3Sec');
      ref.on('value', gotDataTimeSec);
      ref = database.ref('Juegos/CuatroRaya/Partida3Min');
      ref.on('value', gotDataTimeMin);
      ref = database.ref('Juegos/CuatroRaya/Partida3Hour');
      ref.on('value', gotDataTimeHour);
      
    }          
               
    }
      
    }
      
  // Convertir ambos momentos a segundos desde medianoche
  let totalSegundosInicial = TiempoPartidaHour * 3600 + TiempoPartidaMin * 60 + TiempoPartidaSec;
      
  let totalSegundosActual = hour() * 3600 + minute() * 60 + second();

  // Calcular la diferencia
  diferenciaSegundos = totalSegundosActual - totalSegundosInicial;

  // Si es negativo, significa que cruzamos medianoche
  if (diferenciaSegundos < 0) {
    diferenciaSegundos += 24 * 3600;
  }
      
  background(0); // Fondo negro
  drawRotatingGradient(); // Dibuja el fondo degradado rotando
  drawGrid(); // Dibuja el tablero
  drawSelector(); // Dibuja la ficha seleccionada
      
  if (diferenciaSegundos >= 8) {
    
  drawArrows(); // Dibuja las flechas de movimiento
    
  } else {
    
    push();
    
    imageMode(CENTER);
    
    if (diferenciaSegundos == 1 || diferenciaSegundos == 2) {
      
      FactorNum = FactorNum + 0.02;
      
      let factorSin = 0;
      
      if (FactorNum < HALF_PI) {
      
        factorSin = sin(FactorNum);
        
      } else {
        
        factorSin = 1;
        
      }
      
      if (FactorNum <= 2) {
      
      image(Num3, width/2, map(factorSin, 0, 1, -Num3.height, height/2), Num3.width*map(FactorNum, 0, 2, 2, 0), Num3.height*map(FactorNum, 0, 2, 2, 0));
        
      NumeroANT = 3;
        
      }
      
    } else if (diferenciaSegundos == 3 || diferenciaSegundos == 4) {
      
      if (NumeroANT == 3) {
        
        FactorNum = 0;
        
      }
      
      FactorNum = FactorNum + 0.02;
      
      let factorSin = 0;
      
      if (FactorNum < HALF_PI) {
      
        factorSin = sin(FactorNum);
        
      } else {
        
        factorSin = 1;
        
      }
      
      if (FactorNum <= 2) {
      
      image(Num2, width/2, map(factorSin, 0, 1, -Num2.height, height/2), Num2.width*map(FactorNum, 0, 2, 2, 0), Num2.height*map(FactorNum, 0, 2, 2, 0));
        
       NumeroANT = 2;
        
      }
      
    } else if (diferenciaSegundos == 5 || diferenciaSegundos == 6) {
      
      if (NumeroANT == 2) {
        
        FactorNum = 0;
        
      }
      
      FactorNum = FactorNum + 0.02;
      
      let factorSin = 0;
      
      if (FactorNum < HALF_PI) {
      
        factorSin = sin(FactorNum);
        
      } else {
        
        factorSin = 1;
        
      }
      
      if (FactorNum <= 2) {
      
      image(Num1, width/2, map(factorSin, 0, 1, -Num1.height, height/2), Num1.width*map(FactorNum, 0, 2, 2, 0), Num1.height*map(FactorNum, 0, 2, 2, 0));
        
        NumeroANT = 1;
        
      }
      
    } else if (diferenciaSegundos == 7 || diferenciaSegundos == 8) {
      
      if (NumeroANT == 1) {
        
        FactorNum = 0;
        
        NumeroANT = 0;
        
      }
      
      FactorNum = FactorNum + 0.04;
      
      if (FactorNum <= PI) {
      
      image(Conecta4, width/2, height/2, Conecta4.width*sin(FactorNum*0.8), Conecta4.height*sin(FactorNum*0.8));
        
      }
      
    }
    
    pop();
    
  }
      
  image(CornerIzq, offsetX - 50, 0, CornerIzq.width, height);
  image(CornerDer, width - offsetX + 50 - CornerDer.width, 0, CornerDer.width, height);
  
  if (fallingPiece == null){ // Ignora teclas mientras hay animación
  if (JugadorInicial != Turno && TiempoRegresivo < 5  && TiempoRegresivo > 0) {
      
      let provisionalCol = round(map(mouseX, 0, width, 0, cols - 1));

    // Aseguramos que esté dentro de los límites
    provisionalCol = constrain(provisionalCol, 0, cols - 1);

    // Si la columna seleccionada está llena, buscamos una válida
    while (grid[0][provisionalCol] === 1 || grid[0][provisionalCol] === 2) {
        provisionalCol++;
        if (provisionalCol >= cols) { // Si llegamos al final, volvemos al principio
            provisionalCol = 0;
        }
        if (grid[0][provisionalCol] !== 1 && grid[0][provisionalCol] !== 2) {
            break; // Salimos del bucle al encontrar una columna válida
        }
    }

    // Asignamos la columna final
    selectorCol = provisionalCol;
    
    if (selectorCol != selectorColANT) {
          
      selectorColANT = selectorCol;
      
      if (PartidaSel == 1) {
      
        ref = database.ref('Juegos/CuatroRaya/Partida1PlayerPos');
        
      } else if (PartidaSel == 2) {
        
        ref = database.ref('Juegos/CuatroRaya/Partida2PlayerPos');
        
      } else if (PartidaSel == 3) {
        
        ref = database.ref('Juegos/CuatroRaya/Partida3PlayerPos');
        
      }
      ref.set(selectorCol);
      
    }
    
  } else {
    
    selectorColANT = -1;
    
    if (PartidaSel == 1) {
      
      ref = database.ref('Juegos/CuatroRaya/Partida1PlayerPos');
    
    } else if (PartidaSel == 2) {
      
      ref = database.ref('Juegos/CuatroRaya/Partida2PlayerPos');
      
    } else if (PartidaSel == 3) {
      
      ref = database.ref('Juegos/CuatroRaya/Partida3PlayerPos');
      
    }
    
    ref.on('value', gotDataPlayerPos);
    
    selectorCol = PlayerPos;
    
    if (selectorCol >= cols - 1) {
        
    selectorCol = cols - 1;
        
    }
    if (selectorCol <= 0) {
        
    selectorCol = 0;
        
    }
    
  }
  }
    
  if (EnterPressed == true && diferenciaSegundos >= 10) {
    EnterPressed = false;
    let targetRow = findAvailableRow(selectorCol);
    if (targetRow !== -1) {
      fallingPiece = {
        x: offsetX + selectorCol * cellSize + cellSize / 2,
        startY: offsetY + cellSize * 0.25,
        endY: offsetY + (targetRow + 1) * cellSize,
        row: targetRow,
        col: selectorCol,
        player: currentPlayer,
        progress: 0
      };
    }
    
    if (Turno == 1) {
      
      Turno = 2;
      
    } else {
      
     Turno = 1; 
      
    }
  }

  if (fallingPiece) {
    animateFallingPiece(); // Si hay ficha cayendo, dibuja la animación
  }
  checkWin(); // Verifica si hay un ganador
    
    if (diferenciaSegundos < 9) {
      
    TiempoRegresivo = 5;
      
    } else {
      
      if (diferenciaSegundos != diferenciaSegundosANT) {
        
        diferenciaSegundosANT = diferenciaSegundos;
        
        if (TiempoRegresivo <= 0) {
         
          TiempoRegresivo = 6;
          
          EnterPressed = true;
          
        }
        
        TiempoRegresivo = TiempoRegresivo - 1;
        
      }
      
    }
    
    if (Turno == 1) {
    
    push();
  
  textFont(myFont);
    fill(255, 156, 156);
        textSize(100);
        strokeWeight(0);
        textAlign(CENTER, CENTER);
        text(floor(TiempoRegresivo), width*0.1, height*0.1);
    
    pop();
    
  } else {
    
       push();
  
  textFont(myFont);
    fill(255, 248, 156);
        textSize(100);
        strokeWeight(0);
        textAlign(CENTER, CENTER);
        text(floor(TiempoRegresivo), width*0.9, height*0.1);
    
    pop(); 
    
  }
             
  
  } else {
   
  let img = VideoBG.get();
  image(img, 0, 0, width, height);
    image(FondoConnect, 0, 0, width, height);
    
    if (TextoWaiting == true) {
    
    push();
    
    tint(255, map(FadeText, 120, 255, 255, 200), map(FadeText, 120, 255, 120, 240));
    
    image(Waiting, width*0.18, height*0.68, Waiting.width*0.15, Waiting.height*0.15);
    
    pop();
    
    }
    
    if (Desvanecido > 0) {
      
     Desvanecido = Desvanecido - 1; 
      
    }
    
    fill(0, 0, 0, Desvanecido);
    
    rect(0, 0, width, height);
    
    if (Desvanecido <= 0) {
      
      if (SinBird < HALF_PI) {
        
        SinBird = SinBird + 0.03;
          
      } else {
        
        if (FadeText >= 255 && TextFadeIncrement == true) {
          
          TextFadeIncrement = false;
          
        }
        
        if (FadeText <= 120 && TextFadeIncrement == false) {
          
          TextFadeIncrement = true;
          
        }
        
        if (TextFadeIncrement == true) {
          
          FadeText = FadeText + 2;
          
        } else {
          
          FadeText = FadeText - 2;
          
        }
        
        if (FadeText >= 255) {
          
         FadeText = 255; 
          
        }
        
        push();
        
        tint(255, 255, 255, FadeText);
        
        image(TextoConectar, 0, height - TextoConectar.height, width, TextoConectar.height);
        
        pop();
        
        if (FadeText == 121 || TextoWaiting == true) {
          
          TextoWaiting = true;
            
        fill(208, 179, 255);
        textFont(myFont2);
        textSize(45);
        strokeWeight(6);
        stroke(0, 18, 77);
        textAlign(LEFT, CENTER);
          
        if (TextoPunto == 0) {
              
        text("Esperando a que se unan", width*0.25, height*0.72);  
          
        } else if (TextoPunto == 1) {
              
        text("Esperando a que se unan.", width*0.25, height*0.72);  
          
        } else if (TextoPunto == 2) {
              
        text("Esperando a que se unan..", width*0.25, height*0.72);  
          
        } else if (TextoPunto == 3) {
              
        text("Esperando a que se unan...", width*0.25, height*0.72);  
          
        }
          
        if (FadeText >= 255) {
           
        if (TextoPunto == 0) {
              
        TextoPunto = 1;
          
        } else if (TextoPunto == 1) {
              
        TextoPunto = 2;
          
        } else if (TextoPunto == 2) {
              
        TextoPunto = 3; 
          
        } else if (TextoPunto == 3) {
              
        TextoPunto = 0;
          
        }
            
        }
            
        }
        
      }
      
    image(LeftBird, map(sin(SinBird), 0, 1, 0, LeftBird.width*1.1) - LeftBird.width, height - LeftBird.height, LeftBird.width, LeftBird.height);
    image(RightBird,  width - map(sin(SinBird), 0, 1, 0, RightBird.width*1.1), height - RightBird.height, RightBird.width, RightBird.height);
        
    }
    
  }
    
  }
  
  } else {
    
    if(volumen > 0) {
      
      volumen = volumen - 0.002;
      
      Musica.setVolume(volumen);
    
    } else {
        
    Musica.setVolume(0);
      noLoop();
      
    }
  
}
  
}

function drawRotatingGradient() {
  angle += 0.002; // Incrementa el ángulo para rotar el degradado
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 255);
    let r = map(sin(angle), -1, 1, 50, 255);
    let g = map(cos(angle), -1, 1, 50, 255);
    let b = map(sin(angle + HALF_PI), -1, 1, 50, 255);
    stroke(r, g, b, inter);
    line(0, i, width, i);
  }
  
}

function drawGrid() {
  // Dibuja los rectángulos negros en los laterales del tablero, cubriendo toda la altura
  fill(0);
  noStroke();
  rect(0, 0, offsetX - 50, height); // Lado izquierdo
  rect(width - offsetX + 50, 0, offsetX - 50, height); // Lado derecho
  
  // Dibuja las celdas del tablero
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Dibuja celdas blancas
      fill(209, 237, 227); // Celdas blancas
      stroke(0);
      ellipse(offsetX + col * cellSize + cellSize / 2, offsetY + (row + 1) * cellSize, cellSize * 0.8);
      if (grid[row][col] === 1) {
        if (JugadorInicial == 2) {
        fill('red');
  } else {
  fill('yellow');
  }
        ellipse(offsetX + col * cellSize + cellSize / 2, offsetY + (row + 1) * cellSize, cellSize * 0.8); // Dibuja las fichas
      image(Logo2,offsetX + col * cellSize + cellSize / 2 - 28, offsetY + (row + 1) * cellSize - 30, 60, 60);
      } else if (grid[row][col] === 2) {
        if (JugadorInicial == 2) {
  fill('yellow');
  } else {
  fill('red');
  }
        ellipse(offsetX + col * cellSize + cellSize / 2, offsetY + (row + 1) * cellSize, cellSize * 0.8); // Dibuja las fichas
      image(Logo2,offsetX + col * cellSize + cellSize / 2 - 28, offsetY + (row + 1) * cellSize - 30, 60, 60);
      }
      
    }
  }
}

function drawSelector() {
  image(FondoFicha, offsetX + selectorCol * cellSize + cellSize / 2 - 60, offsetY + cellSize * 0.25 - 50 - 60, 120, 120);
  // Dibuja la ficha del jugador actual sobre la columna seleccionada, más alejada
  if (JugadorInicial == 2) {
  fill(currentPlayer === 1 ? 'red' : 'yellow');
  } else {
  fill(currentPlayer === 1 ? 'yellow' : 'red');
  }
  stroke(0); // Borde de la ficha
  strokeWeight(4); // Grosor del borde
  
  // La ficha seleccionada estará un poco más arriba
  ellipse(offsetX + selectorCol * cellSize + cellSize / 2, offsetY + cellSize * 0.25 - 50, cellSize * 0.8); // Ajustamos la posición para separarla más
  image(Logo, offsetX + selectorCol * cellSize + cellSize / 2 - 38, offsetY + cellSize * 0.25 - 50 - 40, 80, 80);
}

function drawArrows() {
  
  if (JugadorInicial != Turno) {
  arrowMovement = sin(frameCount * 0.1) * 5; // Efecto flotante para las flechas
  let arrowSize =50; // Tamaño de las flechas
  
  // Flecha izquierda (solo se muestra si no estás en la primera columna)
  if (selectorCol > 0) {
    image(leftArrowImg, offsetX + selectorCol * cellSize - arrowSize + 10, offsetY + cellSize * 0.25 - arrowSize / 2 + arrowMovement - 50, arrowSize, arrowSize);
  }
  // Flecha derecha (solo se muestra si no estás en la última columna)
  if (selectorCol < cols - 1) {
    image(rightArrowImg, offsetX + selectorCol * cellSize + arrowSize + 40, offsetY + cellSize * 0.25 - arrowSize / 2 + arrowMovement - 50, arrowSize, arrowSize);
  }
  }
}

function findAvailableRow(col) {
  for (let row = rows - 1; row >= 0; row--) {
    if (grid[row][col] === 0) {
      return row;
    }
  }
  return -1;
}

function animateFallingPiece() {
  if (!fallingPiece) return;
  let { x, startY, endY, row, col, player } = fallingPiece;
  let t = fallingPiece.progress;

  // Movimiento con aceleración y desaceleración
  let y = lerp(startY, endY, easeInOut(t));
  image(FondoFicha, x - 64, y - 64, 128, 128);
  if (JugadorInicial == 2) {
  fill(player === 1 ? 'red' : 'yellow');
  } else {
  fill(player === 1 ? 'yellow' : 'red');
  }
  ellipse(x, y, cellSize * 0.8);
  image(Logo, x - 38, y - 40, 80, 80);
  fallingPiece.progress += 0.03;
  if (fallingPiece.progress >= 1) {
    grid[row][col] = player;
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    fallingPiece = null;
  }
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function checkWin() {
  
  let isDraw = true;
  for (let col = 0; col < cols; col++) {
    if (grid[0][col] === 0) { // Si alguna celda en la fila superior está vacía
      isDraw = false;
      break;
    }
  }
  
  if (isDraw == true) {
    
        //noLoop();
    
        fill('orange');
        textFont(myFont);
        textSize(80);
        strokeWeight(20);
        textAlign(CENTER, CENTER);
        text("¿Empate?", width / 2, height / 2);
    
  if (InicioJuego == true) {
          InicioJuego = false;
      }
        
        if (PartidaSel == 1) {
          
        ref = database.ref('Juegos/CuatroRaya/Partida1Sec');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1Min');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1Hour');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1CuatroRayaPlayer');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1PlayerPos');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1Fin');
      ref.set(1);
          
        } else if (PartidaSel == 2) {
          
        ref = database.ref('Juegos/CuatroRaya/Partida2Sec');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida2Min');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida2Hour');
      ref.set(0);
          ref = database.ref('Juegos/CuatroRaya/Partida2');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida2CuatroRayaPlayer');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida2PlayerPos');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida2Fin');
      ref.set(1);
          
        } else if (PartidaSel == 3) {
          
        ref = database.ref('Juegos/CuatroRaya/Partida3Sec');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida3Min');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida3Hour');
      ref.set(0);
          ref = database.ref('Juegos/CuatroRaya/Partida3');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida3CuatroRayaPlayer');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida3PlayerPos');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida3Fin');
      ref.set(1);
          
        } 
    
    FinJuego = true;
    
  }
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (checkDirection(row, col, 1, 0) || checkDirection(row, col, 0, 1) || checkDirection(row, col, 1, 1) || checkDirection(row, col, 1, -1)) {
        //noLoop();
        // Mostrar el mensaje con el color correcto y fuente personalizada
        if (JugadorInicial == 2) {
        fill(grid[row][col] === 1 ? 'red' : 'yellow');
        } else {
        fill(grid[row][col] === 1 ? 'yellow' : 'red');
        }
        textFont(myFont);
        textSize(80);
        strokeWeight(20);
        textAlign(CENTER, CENTER);
        if (JugadorInicial == 2) {
        text(grid[row][col] === 1 ? "¡Rojo gana!" : "¡Amarillo gana!", width / 2, height / 2);
        } else {
        text(grid[row][col] === 1 ? "¡Amarillo gana!" : "¡Rojo gana!", width / 2, height / 2); 
        }
        
        if (InicioJuego == true) {
          InicioJuego = false;
      }
        
        if (PartidaSel == 1) {
          
        ref = database.ref('Juegos/CuatroRaya/Partida1Sec');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1Min');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1Hour');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1CuatroRayaPlayer');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1PlayerPos');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida1Fin');
      ref.set(1);
          
        } else if (PartidaSel == 2) {
          
        ref = database.ref('Juegos/CuatroRaya/Partida2Sec');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida2Min');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida2Hour');
      ref.set(0);
          ref = database.ref('Juegos/CuatroRaya/Partida2');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida2CuatroRayaPlayer');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida2PlayerPos');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida2Fin');
      ref.set(1);
          
        } else if (PartidaSel == 3) {
          
        ref = database.ref('Juegos/CuatroRaya/Partida3Sec');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida3Min');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida3Hour');
      ref.set(0);
          ref = database.ref('Juegos/CuatroRaya/Partida3');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida3CuatroRayaPlayer');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida3PlayerPos');
      ref.set(0);
      ref = database.ref('Juegos/CuatroRaya/Partida3Fin');
      ref.set(1);
          
        } 

        FinJuego = true;
        
        return;
      }
    }
  }
}

function checkDirection(row, col, dRow, dCol) {
  let player = grid[row][col];
  if (player === 0) return false;

  for (let i = 1; i < 4; i++) {
    let r = row + i * dRow;
    let c = col + i * dCol;
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== player) {
      return false;
    }
  }
  return true;
}




