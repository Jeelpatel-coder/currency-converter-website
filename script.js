const dropList = document.querySelectorAll(".select-box select");

const button = document.querySelector("button");

const fromCurrency = document.querySelector(".from select");

const toCurrency = document.querySelector(".to select");

for(let i=0;i<dropList.length;i++){
    for(let currency_code in country_code){
        let selected;
        if(i==0){
            selected = currency_code == "USD" ? "selected" : "";
        }
        else if(i==1){
            selected = currency_code == "INR" ? "selected" : "";
        }
        // console.log(currency_code);
        const optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend",optionTag);
    }
    dropList[i].addEventListener("change",(e) => {
        loadFlag(e.target);
    })
}

function loadFlag(element){
    for(let code in country_code){
        if(code==element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
        }
    }
}

const icon = document.querySelector(".icon");
icon.addEventListener("click",() => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

window.addEventListener("load",() => {
    getExchangeRate();
})

button.addEventListener("click",(e) => {
    e.preventDefault();
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    const exchange = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if(amountVal=="" || amountVal=="0"){
        amount.value = "1";
        amountVal = 1;
    }

    exchange.innerText = `Getting Exchange Rate...`;

    const URL = `https://v6.exchangerate-api.com/v6/7cef58eeb48bef22364cca0f/latest/${fromCurrency.value}`;
    fetch(URL).then(response => response.json()).then(result => {
        // console.log(result);
        const exchangeRate = result.conversion_rates[toCurrency.value];
        // console.log(exchangeRate);
        const totalExchangeRate = (amountVal*exchangeRate).toFixed(2);
        // console.log(totalExchangeRate);
        exchange.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
}