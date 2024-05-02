var ATK = DEF = HP = sATK = sDEF = crit_r = crit_d = rec_HP = rec_MP = 0;

function atk_total(stat) {

  switch (stat) {
  case 'atk': 
    document.getElementById("Ataque").value = ATK = lineEquation(document.getElementById("Ataque").value)
    break;
  case 'def': document.getElementById("Defesa").value = DEF = lineEquation(document.getElementById("Defesa").value);
    break;
  case 'hp': document.getElementById("HP").value = HP = lineEquation(document.getElementById("HP").value);
    break;
  case 'sAtk': document.getElementById("Ataque_Especial").value = sATK = lineEquation(document.getElementById("Ataque_Especial").value);
  break;
  
  case 'sDef': document.getElementById("Defesa_Especial").value = sDEF = lineEquation(document.getElementById("Defesa_Especial").value);
  break;
  
  case 'critR': document.getElementById("Critico").value = crit_r = lineEquation(document.getElementById("Critico").value);
  break;
  
  case 'critD': document.getElementById("Dano_Critico").value = crit_d = lineEquation(document.getElementById("Dano_Critico").value);
  break;
  
  case 'recHp': document.getElementById("Recuperar_HP").value = rec_HP = lineEquation(document.getElementById("Recuperar_HP").value);
  break;
   
  case 'recMp': document.getElementById("Recuperar_MP").value = rec_MP = lineEquation(document.getElementById("Recuperar_MP").value);
  break;
  case null: break;
}
  
crit1 = crit_r/100
console.log(crit_r)
crit2 = 1.2 + crit_d/100
console.log(crit_d)

console.log(ATK, DEF, HP, sATK, sDEF, crit_r, crit_d, rec_HP, rec_MP)

// offensive related
let o1 = 0.8 * ATK
console.log(o1)
let o2 = 7407/125 * (ATK + sATK) * (100 + rec_MP) * (1/10000)
console.log(o2)
let o3 = (o1 + o2) * ((1 - crit1) + crit1 * crit2)
console.log(o3)

// defensive related
let d1 = (DEF * 0.7) + (sDEF * 0.14)
console.log(d1)
let d2 = (HP + (HP * rec_HP/100))*0.7
console.log(d2)
let d3 = d1 + d2
console.log(d3)



let final_result = Math.round(o3 + d3)
let est_error = Math.round(0.000089 * (o3 + d3))

if (check_error(ATK, DEF, HP, sATK, sDEF,crit_r, crit_d, rec_HP, rec_MP)){
  result.innerHTML = `<div>${"Ataque Total: "} <span class="yellow">${final_result} ± ${est_error}</span>`;
  
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

function lineEquation(expression){
  expression = expression.replace(/\s+/g, '').replace(/,/g,".");
  const regex = /(\d+(?:\.\d+)?)([+-])(\d+(?:\.\d+)?)/;
  let match;
  while ((match = regex.exec(expression)) !== null) {
    console.log(match)
    let operand1 = parseFloat(match[1]);
    console.log(operand1)
    let operator = match[2];
    console.log(operator)
    let operand2 = parseFloat(match[3]);
    console.log(operand2)
    let result;

    switch (operator) {
      case '+': result = operand1 + operand2; break;
      case '-': result = operand1 - operand2; break;
    }

    console.log(result)
    // Replace the matched expression with the result
    expression = expression.replace(match[0], result);
  }

  return Number(expression)
}
function save(){
  localStorage.setItem("atk", ATK);
  localStorage.setItem("def", DEF);
  localStorage.setItem("hp", HP);
  localStorage.setItem("sAtk", sATK);
  localStorage.setItem("sDef", sDEF);
  localStorage.setItem("crit_r", crit_r);
  localStorage.setItem("crit_d", crit_d);
  localStorage.setItem("rec_HP", rec_HP);
  localStorage.setItem("rec_MP", rec_MP);
  
}

function load(){
  document.getElementById("Ataque").value  = ATK =Number(localStorage.getItem("atk"));
  document.getElementById("Defesa").value = DEF =Number(localStorage.getItem("def"));
  document.getElementById("HP").value = HP =Number(localStorage.getItem("hp"));
  document.getElementById("Ataque_Especial").value = sATK= Number(localStorage.getItem("sAtk",));
  document.getElementById("Defesa_Especial").value = sDEF= Number(localStorage.getItem("sDef"));
  document.getElementById("Critico").value = crit_r = Number(localStorage.getItem("crit_r"));
  document.getElementById("Dano_Critico").value = crit_d = Number(localStorage.getItem("crit_d"));
  document.getElementById("Recuperar_HP").value = rec_HP = Number(localStorage.getItem("rec_HP"));
  document.getElementById("Recuperar_MP").value = rec_MP = Number(localStorage.getItem("rec_MP"));
  atk_total();
}
