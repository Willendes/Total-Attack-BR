//Deixei esse troço o mais eficiente possível mas matei a legibilidade,
//boa sorte pro eu do futuro decifrar qualquer coisa aqui

var stats = {'atk':0, 'def':0, 'hp':0, 'sAtk': 0,'sDef': 0,'crit_r': 0,'crit_d': 0,'recHp': 0,'recMp': 0, 'finalResult': 0, 'estError': 0};
var tempMemory =  {'atk':0, 'def':0, 'hp':0, 'sAtk': 0,'sDef': 0,'crit_r': 0,'crit_d': 0,'recHp': 0,'recMp': 0, 'finalResult': 0, 'estError': 0};

  //updates tempMemory with local storage
if (localStorage.getItem("memory")){
  tempMemory = JSON.parse(localStorage.getItem("memory"))
} 

$(document).ready(function (){
  
  //fill memory table
  $('.data_saved span').each(function (e){
    $(this).text(Object.values(tempMemory)[e])
  })
  $('#stored span').text(`${tempMemory.finalResult} ± ${tempMemory.estError}`);

  //focus to the next
  $('input[type="string"]').keyup(function(e) {
      if(e.which == '13')
       {
          $(this).nextAll('input[type="string"]').first().focus();
       }
  });
  //calculate the equation on the input and total attack
  $('input[type="string"]').focusout(function() {
    $(this).val(
      stats[$(this).attr('id')] = inputEquation($(this).val())
    );
    atk_total();
  }); 
});

//calcs total attack
function atk_total() {

crit1 = stats.crit_r/100
crit2 = 1.2 + stats.crit_d/100

// offensive related
let o1 = 0.8 * stats.atk
let o2 = 7407/125 * (stats.atk + stats.sAtk) * (100 + stats.recMp) * (1/10000)
let o3 = (o1 + o2) * ((1 - crit1) + crit1 * crit2)

// defensive related
let d1 = (stats.def * 0.7) + (stats.sDef * 0.14)
let d2 = (stats.hp + (stats.hp * stats.recHp/100))*0.7
let d3 = d1 + d2




stats.finalResult = Math.round(o3 + d3)
stats.estError = Math.round(0.000089 * (o3 + d3))

if (check_error(stats.atk, stats.def, stats.hp, stats.sAtk, stats.sDef,stats.crit_r, stats.crit_d, stats.recHp, stats.recMp)){
  result.innerHTML = `<div>${"Ataque Total: "} <span class="yellow">${stats.finalResult} ± ${stats.estError}</span>`;
  
} else {
  result.innerHTML =`<div> ${"Ataque Total: "}<span class = "yellow">${'-'}</span>`;
  result.innerHTML +=`<div> <span class = "error">Reveja os valores inseridos.</span>`
}
}

// return True means there's an error
function check_error(ATK, DEF, HP, sATK, sDEF,crit_r, crit_d, rec_HP, rec_MP) {
var list = [ATK, DEF, HP, sATK, sDEF, crit_r, crit_d, rec_HP, rec_MP];
var test_values = true;

for (var i = 0; i < list.length; i++) {
  if (isNaN(list[i]) || list[i] < 0) {
    test_values = false;
    break;
  }
}

return test_values;
}

//performs the equation in input
function inputEquation(expression){
  expression = expression.replace(/\s+/g, '').replace(/,/g,".");
  const regex = /(\d+(?:\.\d+)?)([+-])(\d+(?:\.\d+)?)/;
  let match;
  while ((match = regex.exec(expression)) !== null) {
    let operand1 = parseFloat(match[1]);
    let operator = match[2];
    let operand2 = parseFloat(match[3]);
    let result;

    switch (operator) {
      case '+': result = operand1 + operand2; break;
      case '-': result = operand1 - operand2; break;
    }
    
    // Replace the matched expression with the result
    expression = expression.replace(match[0], result);
  }

  return Number(expression)
}

function save(){
  localStorage.setItem("memory", JSON.stringify(stats));
  tempMemory = JSON.parse(localStorage.getItem("memory"))

  $('.data_saved span').each(function (index){
    $(this).text(Object.values(stats)[index])
  })
  $('#stored span').text(`${stats.finalResult} ± ${stats.estError}`);

}

function load(){
  for (let key in tempMemory){
    stats[key] = tempMemory[key]
    try {
      document.getElementById(key).value = stats[key]
    } catch (error) {
    }
    
  }
  atk_total();
}


