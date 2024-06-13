function generateInputFields() {
    var personCount = parseInt(document.getElementById('person_count').value);
    var inputFieldsHTML = '';
  
    for (var i = 0; i < personCount; i++) {
      inputFieldsHTML += `
        <div class="input-field">
          <label for="previous_${i}">第 ${i + 1} 人的上期電表數值：</label>
          <input type="number" id="previous_${i}">
        </div>
        <div class="input-field">
          <label for="current_${i}">第 ${i + 1} 人的本期電表數值：</label>
          <input type="number" id="current_${i}">
        </div>
      `;
    }
  
    document.getElementById('input_fields').innerHTML = inputFieldsHTML;
    
  }
  
  function calculate() {
    var total_usage = parseFloat(document.getElementById('total_usage').value);
    var total_bill = parseFloat(document.getElementById('total_bill').value);
    var personCount = parseInt(document.getElementById('person_count').value);
    var electricity_usages = [];
    var inputsValid = true;
  
    if (total_bill < total_usage) {
      alert('請確保本期電費總金額以及本期總用電度數輸入於正確欄位');
      return;
    }
  
    for (var i = 0; i < personCount; i++) {
      var previousReading = parseFloat(document.getElementById(`previous_${i}`).value);
      var currentReading = parseFloat(document.getElementById(`current_${i}`).value);
      
      if (isNaN(previousReading) || isNaN(currentReading)) {
        inputsValid = false;
        break;
      }
      
      electricity_usages.push(currentReading - previousReading);
    }
  
    if (!inputsValid) {
      alert('請確保輸入有效數字。');
      return;
    }
  
    var common_electricity = (total_usage - electricity_usages.reduce((a, b) => a + b, 0)) / personCount;
    var cost_per_unit = total_bill / total_usage;
    var personal_electricity_bills = electricity_usages.map(usage => (usage + common_electricity) * cost_per_unit);
  
    var resultHTML = '<h3>計算結果：</h3>';
    resultHTML += '<ul>';
    for (var i = 0; i < personCount; i++) {
      resultHTML += `<li>第 ${i + 1} 人的電費為：${personal_electricity_bills[i].toFixed(2)} 元</li>`;
    }
    resultHTML += '</ul>';
  
    document.getElementById('result').innerHTML = resultHTML;
    document.getElementById('cost_per_unit').innerHTML = `每度電費用為：${cost_per_unit.toFixed(2)} 元`;
    document.getElementById('common_electricity').innerHTML = `公共用電平均一人度數為：${common_electricity.toFixed(2)} 度`;
  
  }