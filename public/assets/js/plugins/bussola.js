sy = $(window).height();
sx = $(window).width();

//alert('width: ' + sx + '; height: '+sy);

function bussola(canvas, ctx, c, context, bd_bolinhas, bd_circulos, eixo, index, interact){
  draw(canvas, ctx, bd_bolinhas, bd_circulos, eixo);
  draw_ex(c, context, bd_bolinhas, bd_circulos, eixo);
  events(canvas, ctx, c, context, bd_bolinhas, bd_circulos, eixo, index, interact);
}

function intersect_bolinhas(point, bolinha) {
  return Math.sqrt((point.x-bolinha.x) ** 2 + (point.y - bolinha.y) ** 2) < bolinha.radius;
}

function intersect_circulos(point, circulo){
  return Math.sqrt((point.x-circulo.x) ** 2 + (point.y - circulo.y) ** 2) < circulo.radius;
}

function draw(canvas, ctx, bd_bolinhas, bd_circulos, eixo){  
  
  canvas.height = 600;
  calc_height = false;
  canvas.width = $(canvas.parentNode).width();

  sy < 650 ? (canvas.height = sy/1.205) && (calc_height = true) : false;
  sx < 900 ? (canvas.height = sy/1.7) && (calc_height = true) : false;
    
  var height = canvas.height;
  var width = canvas.width;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (calc_height){
    var raio = height / 20;  //Raio do primeiro círculo (menor) = 30
    var acrescimo_raio = height/24; // Distância entre um círculo externo a outro = 25  
    var tamanho_bolinhas = height/85.71; //Raio das bolinhas com número dentro = 7
  } else {

    var raio = 30;
    var acrescimo_raio = 25;
    var tamanho_bolinhas = 7;

  }
  
  var centro_bolinhas = raio; // aonde a bolinha está localizada  
  bolinhas = [];  
  circulos = [];
  escritas = [];
  
  //DESENHANDO CÍRCULOS

  for(i = 0; i < 10; i++){    

    if(i == bd_circulos){

      ctx.strokeStyle = 'rgba(0, 237, 179, 1)';
      ctx.lineWidth = 3;

    } else{

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 1;

    }

    ctx.beginPath();
    ctx.arc(width/2, height/2, raio, 0, (Math.PI * 2), true);         
    ctx.closePath();
    ctx.stroke();
    circulos.push({
      x: width/2,
      y: height/2,
      numero: i,
      radius: raio
    });
    raio += acrescimo_raio;
  }   

  // DESENHANDO AS RETAS
  ctx.lineWidth = 1;

  var ang = 0;

  for(i = 0; i < 8; i++){      

    if(i == eixo[0] || i == eixo[1]){

      ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    } else if(eixo[0] + eixo[1] < 0){

      ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

    } else{

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'

    }      

    ctx.beginPath();
    ctx.moveTo(width/2, height/2);        
    ctx.lineTo( (Math.cos(ang) * (raio)) + width/2, (Math.sin(ang) * (raio)) + height/2 );
    ctx.closePath();
    ctx.stroke();       

    //DESENHANDO AS BOLINHAS    

    var contador_centro = centro_bolinhas;

    for(j = 1; j < 11; j++){        

      if(bd_bolinhas[i] >= j ){

        if(i == eixo[0] || i == eixo[1]){

          ctx.fillStyle = 'rgba(0, 0, 80, 1)';

        } else if(eixo[0] + eixo[1] < 0){

          ctx.fillStyle = 'rgba(0, 0, 80, 1)';

        } else{

          ctx.fillStyle = 'rgba(0, 0, 80, .1)';

        }                

      } else if(j > bd_bolinhas[i] && j <= bd_circulos + 1){

        if(i == eixo[0] || i == eixo[1]){

          ctx.fillStyle = 'rgba(229, 79, 80, 1)'; 

        } else if(eixo[0] + eixo[1] < 0){

          ctx.fillStyle = 'rgba(229, 79, 80, 1)'; 

        } else{

          ctx.fillStyle = 'rgba(229, 79, 80, .1)'; 

        }          

      } else {

        if(i == eixo[0] || i == eixo[1]){

          ctx.fillStyle = 'rgba(255, 255, 255, 1)'; 

        } else if(eixo[0] + eixo[1] < 0){

          ctx.fillStyle = 'rgba(255, 255, 255, 1)'; 

        } else{

          ctx.fillStyle = 'rgba(255, 255, 255, .1)'; 

        }              

      }

      ctx.beginPath();        
      ctx.arc( (Math.cos(ang) * (contador_centro)) + (width/2) , (Math.sin(ang) * (contador_centro)) + (height/2) , tamanho_bolinhas, 0, (Math.PI * 2), true);              
      ctx.closePath();
      ctx.fill();
      ctx.closePath();
      ctx.stroke();

      bolinhas.push({
        x: (Math.cos(ang) * (contador_centro)) + (width/2),
        y: (Math.sin(ang) * (contador_centro)) + (height/2),
        radius: tamanho_bolinhas,
        numero: j,          
        num_eixo: i,        
      });

      //NÚMEROS DENTRO DAS BOLINHAS

      if(bd_bolinhas[i] >= j ){

        if(i == eixo[0] || i == eixo[1]){

          ctx.fillStyle = 'rgba(0, 0, 80, 1)'; 

        } else if(eixo[0] + eixo[1] < 0){

          ctx.fillStyle = 'rgba(0, 0, 80, 1)'; 

        } else{

          ctx.fillStyle = 'rgba(0, 0, 80, .1)'; 

        }                       

      } else if(j > bd_bolinhas[i] && j <= bd_circulos + 1){

        if(i == eixo[0] || i == eixo[1]){

          ctx.fillStyle = 'rgba(229, 79, 80, 1)'; 

        } else if(eixo[0] + eixo[1] < 0){

          ctx.fillStyle = 'rgba(229, 79, 80, 1)'; 

        } else{

          ctx.fillStyle = 'rgba(229, 79, 80, .1)'; 

        }        

      } else {

        if(i == eixo[0] || i == eixo[1]){

          ctx.fillStyle = 'rgba(0, 0, 0, 1)'; 

        } else if(eixo[0] + eixo[1] < 0){

          ctx.fillStyle = 'rgba(0, 0, 0, 1)'; 

        } else{

          ctx.fillStyle = 'rgba(0, 0, 0, .1)'; 

        }        

      }
       
      if(calc_height){
        ctx.font = "bold "+height/60+"px Arial";
      } else {
        ctx.font = "bold 10px Arial";
      }
       
      ctx.textAlign = "center";
      ctx.fillText(j, (Math.cos(ang) * (contador_centro)) + (width/2)  , (Math.sin(ang) * (contador_centro)) + (height/2) + 3);

      contador_centro += acrescimo_raio;              
    }

    ang += (Math.PI / 4);
  }           
  // COISAS ESCRITAS 


  ctx.fillStyle = 'rgba(0, 0, 0, 1)';   

  if(calc_height){
    ctx.font = "bold "+height/35+"px Arial"; //20
  } else{
    ctx.font = "bold 17px Arial"; 
  }
  
  ctx.textAlign = "left";
  
  ctx.fillText('Relacionamentos', (Math.cos(0) * (raio)) - 15 + width/2   , (Math.sin(0) * (raio)) - 15 + height/2);
  ctx.fillText('Tempo', (Math.cos((-Math.PI/4)) * (raio)) + width/2 + 20  , (Math.sin((-Math.PI/4)) * (raio)) + height/2);
  ctx.fillText('Espírito', (Math.cos((-Math.PI/2)) * (raio)) + width/2 + 20  , (Math.sin((-Math.PI/2)) * (raio)) + height/2); 
  ctx.fillText('Mente', (Math.cos((-Math.PI * 0.75)) * (raio)) + width/2 - 70  , (Math.sin((-Math.PI * 0.75)) * (raio)) + height/2);
  ctx.fillText('Trabalho', (Math.cos(-Math.PI) * (raio)) + width/2 - 90  , (Math.sin(-Math.PI) * (raio)) + height/2);
  ctx.fillText('Dinheiro', (Math.cos((-Math.PI * 1.25)) * (raio)) + width/2 - 90  , (Math.sin((-Math.PI * 1.25)) * (raio)) + height/2);
  ctx.fillText('Corpo', (Math.cos((-Math.PI * 1.5)) * (raio)) + width/2 + 20  , (Math.sin((-Math.PI * 1.5)) * (raio)) + height/2 + 10);
  ctx.fillText('Emoções', (Math.cos(-Math.PI * 1.75) * (raio)) + width/2 + 20  , (Math.sin(-Math.PI * 1.75) * (raio)) + height/2);
  
  escritas.push({
    left: (Math.cos(0) * (raio)) - 15 + width/2,
    top: (Math.sin(0) * (raio)) - 15 + height/2,
    width: ctx.measureText('Relacionamentos').width,
    height: -parseInt(ctx.font.match(/\d+/), 10),
    eixo: 0,
  });

  escritas.push({
    left: (Math.cos((-Math.PI/4)) * (raio)) + width/2 + 20,
    top: (Math.sin((-Math.PI/4)) * (raio)) + height/2,
    width: ctx.measureText('Tempo').width,
    height: -parseInt(ctx.font.match(/\d+/), 10),
    eixo: 7,
  });

  
  escritas.push({
    left: (Math.cos((-Math.PI/2)) * (raio)) + width/2 + 20,
    top: (Math.sin((-Math.PI/2)) * (raio)) + height/2,
    width: ctx.measureText('Espírito').width,
    height: -parseInt(ctx.font.match(/\d+/), 10),
    eixo: 2,
  });

  escritas.push({
    left: (Math.cos((-Math.PI * 0.75)) * (raio)) + width/2 - 70,
    top: (Math.sin((-Math.PI * 0.75)) * (raio)) + height/2,
    width: ctx.measureText('Mente').width,
    height: -parseInt(ctx.font.match(/\d+/), 10),
    eixo: 5,
  });

  escritas.push({
    left: (Math.cos(-Math.PI) * (raio)) + width/2 - 90,
    top: (Math.sin(-Math.PI) * (raio)) + height/2,
    width: ctx.measureText('Trabalho').width,
    height: -parseInt(ctx.font.match(/\d+/), 10),
    eixo: 4,
  });

  escritas.push({
    left: (Math.cos((-Math.PI * 1.25)) * (raio)) + width/2 - 90,
    top: (Math.sin((-Math.PI * 1.25)) * (raio)) + height/2,
    width: ctx.measureText('Dinheiro').width,
    height: -parseInt(ctx.font.match(/\d+/), 10),
    eixo: 3,
  });

  escritas.push({
    left: (Math.cos((-Math.PI * 1.5)) * (raio)) + width/2 + 20,
    top: (Math.sin((-Math.PI * 1.5)) * (raio)) + height/2 + 10,
    width: ctx.measureText('Corpo').width,
    height: -parseInt(ctx.font.match(/\d+/), 10),
    eixo: 6,
  });

  escritas.push({
    left: (Math.cos(-Math.PI * 1.75) * (raio)) + width/2 + 20,
    top: (Math.sin(-Math.PI * 1.75) * (raio)) + height/2,
    width: ctx.measureText('Emoções').width,
    height: -parseInt(ctx.font.match(/\d+/), 10),
    eixo: 1,
  });  

  

} 

//EVENTO DO CLIQUE

function events(canvas, ctx, c, context, bd_bolinhas, bd_circulos, eixo, index, interact){

  setTimeout(function(){

    canvas.addEventListener('click', function(e) {    

      const pos = {
        x: e.pageX - $(canvas).offset().left,
        y: e.pageY - $(canvas).offset().top
      };         

      //alert('width: ' + pos.x + '; height: ' + pos.y) ;              

      for(e = 0; e < escritas.length; e++){
        
        if(pos.y < escritas[e].top && pos.y > escritas[e].top + escritas[e].height && pos.x > escritas[e].left && pos.x < escritas[e].left + escritas[e].width){

          if(escritas[e].eixo < 4){

            var mud_eixo = [escritas[e].eixo, escritas[e].eixo + 4];
            
          } else{

            var mud_eixo = [escritas[e].eixo - 4, escritas[e].eixo];
            
          }   
          
          eixo[0] = mud_eixo[0];
          eixo[1] = mud_eixo[1];
          draw(canvas, ctx, bd_bolinhas, bd_circulos, eixo);
          draw_ex(c, context, bd_bolinhas, bd_circulos, eixo);                       

          return;
        }
      } 

      if(interact){
        for(b = 0; b < bolinhas.length; b++){         
          if (intersect_bolinhas(pos, bolinhas[b])) {  
            
            bd_bolinhas[bolinhas[b].num_eixo] = bolinhas[b].numero;
            draw(canvas, ctx, bd_bolinhas, bd_circulos, eixo);
            draw_ex(c, context, bd_bolinhas, bd_circulos, eixo);                

            return;
          }
        }

        var verify = 0;

        bd_bolinhas.forEach( function(num){
          verify += num
        });

        if(!(verify < 0)){

          for(ca = 0; ca < circulos.length; ca++){
            if(intersect_circulos(pos, circulos[ca])) {   
              bd_circulos = circulos[ca].numero;   
              dados[index] = bd_circulos;         
              draw(canvas, ctx, bd_bolinhas, bd_circulos, eixo);
              draw_ex(c, context, bd_bolinhas, bd_circulos, eixo);                                                 
              return;
            }
          }

        }  
      }     

      eixo[0] = -1;
      eixo[1] = -1;      

      draw(canvas, ctx, bd_bolinhas, bd_circulos, eixo);
      draw_ex(c, context, bd_bolinhas, bd_circulos, eixo);              
          
    });

    //MUDAR CURSOR AO PASSAR NA BOLINHA

    canvas.addEventListener('mousemove', function(e){
      const pos = {
        x: e.pageX - $(canvas).offset().left,
        y: e.pageY - $(canvas).offset().top
      };  

      if(interact){
        for(b = 0; b < bolinhas.length; b++){         
          if (intersect_bolinhas(pos, bolinhas[b])) {       
            canvas.style.cursor = 'pointer'
            return;

          } 
        }
      }


      for(e = 0; e < escritas.length; e++){
        if(pos.y < escritas[e].top && pos.y > escritas[e].top + escritas[e].height && pos.x > escritas[e].left && pos.x < escritas[e].left + escritas[e].width){
          canvas.style.cursor = 'pointer'
          return;
        }
      }


      canvas.style.cursor = 'default';        

    });

  }, 2000);

}

function draw_ex(c, context, bd_bolinhas, bd_circulos, eixo){   

  context.clearRect(0, 0, c.width, c.height);

  c.width = $(c.parentNode).width();
  c.height = 300;

  var val_eixos = bd_circulos < 0 ? [0, 0, 0, 0] : [ ((bd_circulos + 1 - bd_bolinhas[0]) > 0 ? bd_circulos + 1 - bd_bolinhas[0] : 0) + ((bd_circulos + 1 - bd_bolinhas[4]) > 0 ? bd_circulos + 1 - bd_bolinhas[4] : 0) , ((bd_circulos + 1 - bd_bolinhas[3]) > 0 ? bd_circulos + 1 - bd_bolinhas[3] : 0) + ((bd_circulos + 1 - bd_bolinhas[7]) > 0 ? bd_circulos + 1 - bd_bolinhas[7] : 0), ((bd_circulos + 1 - bd_bolinhas[2]) > 0 ? bd_circulos + 1 - bd_bolinhas[2] : 0) + ((bd_circulos + 1 - bd_bolinhas[6]) > 0 ? bd_circulos + 1 - bd_bolinhas[6] : 0), ((bd_circulos + 1 - bd_bolinhas[1]) > 0 ? bd_circulos + 1 - bd_bolinhas[1] : 0) + ((bd_circulos + 1 - bd_bolinhas[5]) > 0 ? bd_circulos + 1 - bd_bolinhas[5] : 0)];
     
  raio = c.height/3;

  context.lineWidth = 1;
  eixo[0] + eixo[1] < 0 ? context.strokeStyle = 'rgba(0, 0, 0, 1)' : context.strokeStyle = 'rgba(0, 0, 0, .1)';    

  context.beginPath();
  context.arc(c.width/2, c.height/2, raio, 0, (Math.PI * 2), true);
  context.closePath();
  context.stroke();  

  var ang = 0;
  
  for(i = 0; i < 8; i++){

    if(i == eixo[0] || i == eixo[1]){

      context.fillStyle = 'rgba(0, 0, 80, 1)'; 
      context.strokeStyle = 'rgba(0, 0, 80, 1)';
      context.lineWidth = 3;



    } else if(eixo[0] + eixo[1] < 0){
      context.lineWidth = 1;
      context.fillStyle = 'rgba(0, 0, 0, 1)'; 
      context.strokeStyle = 'rgba(0, 0, 0, 1)';

    } else{
      context.lineWidth = 1;
      context.fillStyle = 'rgba(0, 0, 0, .2)'; 
      context.strokeStyle = 'rgba(0, 0, 0, .1)';

    }      
    
    context.beginPath();
    context.moveTo(c.width/2, c.height/2);        
    context.lineTo( (Math.cos(ang) * (raio + 15)) + c.width/2, (Math.sin(ang) * (raio + 15)) + c.height/2 );
    context.closePath();
    context.stroke();


    context.font = "bold 14px Arial"; 
    
    context.textAlign = "left";

    if(i == 0){

      if(eixo[0] == 0){
        context.fillStyle = 'rgba(0, 0, 80, 1)';
      } else if(eixo[0] < 0 ){
        context.fillStyle = 'rgba(0, 0, 0, 1)';
      } else {
        context.fillStyle = 'rgba(0, 0, 0, .1)';
      }

      context.fillText('Servir', (Math.cos(-ang) * (raio)) + 20 + c.width/2   , (Math.sin(-ang) * (raio)) + 4 + c.height/2);        
      context.fillText(val_eixos[0], (Math.cos(-ang) * (raio)) + 20 + c.width/2   , (Math.sin(-ang) * (raio)) + -10 + c.height/2);

    } else if(i == 1){

      if(eixo[0] == 3){
        context.fillStyle = 'rgba(0, 0, 80, 1)';
      } else if(eixo[0] < 0 ){
        context.fillStyle = 'rgba(0,0,0,1)';
      } else {
        context.fillStyle = 'rgba(0, 0, 0, .1)';
      }

      context.fillText('Viver Bem', (Math.cos(-ang) * (raio)) + 15 + c.width/2, (Math.sin(-ang) * (raio)) - 15 + c.height/2);
      context.fillText(val_eixos[1], (Math.cos(-ang) * (raio)) + 15 + c.width/2, (Math.sin(-ang) * (raio)) - 30 + c.height/2);

    } else if(i == 2){

      if(eixo[0] == 2){
        context.fillStyle = 'rgba(0, 0, 80, 1)';
      } else if(eixo[0] < 0 ){
        context.fillStyle = 'rgba(0,0,0,1)';
      } else {
        context.fillStyle = 'rgba(0, 0, 0, .1)';
      }

      context.fillText('Amar', (Math.cos(-ang) * (raio)) + c.width/2 - 12  , (Math.sin(-ang) * (raio)) - 20 + c.height/2);
      context.fillText(val_eixos[2], (Math.cos(-ang) * (raio)) + c.width/2 - 12  , (Math.sin(-ang) * (raio)) - 35 + c.height/2);

    } else if(i == 3){

      if(eixo[0] == 1){
        context.fillStyle = 'rgba(0, 0, 80, 1)';
      } else if(eixo[0] < 0 ){
        context.fillStyle = 'rgba(0,0,0,1)';
      } else {
        context.fillStyle = 'rgba(0, 0, 0, .1)';
      }

      context.fillText('Aprender', (Math.cos(-ang) * (raio)) + c.width/2 - 50  , (Math.sin(-ang) * (raio)) - 15 + c.height/2);
      context.fillText(val_eixos[3], (Math.cos(-ang) * (raio)) + c.width/2 - 50  , (Math.sin(-ang) * (raio)) - 30 + c.height/2);
    }
                            
    ang += (Math.PI / 4);

  }   

}

