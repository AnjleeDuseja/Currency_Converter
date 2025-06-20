let convertBtn = document.querySelector("button");
let input = document.querySelector("input");
let error = document.querySelector("#error-msg");
let result = document.querySelector(".result");
let fromCurrency = document.querySelector("#from-currency");
let toCurrency = document.querySelector("#to-currency");
let fromCurrencyValue = "USD"
let toCurrencyValue = "JPY"

// Function to fetch all currency options and populate the dropdowns
// Using the Frankfurter API to get currency data
const getAllOptions = async () => {

     let response = await fetch("https://api.frankfurter.dev/v1/currencies");

     if(response.status !== 200){
        alert("Error fetching currency data!")
        return;
     }
     
     let data = await response.json();
     
     
    Object.keys(data).forEach((symbol) => {

        let fromOption= document.createElement("option");
        let toOption = document.createElement("option");

        fromOption.value = symbol
        toOption.value = symbol

        fromOption.innerText = `${symbol} - ${data[symbol]}`;
        toOption.innerText = `${symbol} - ${data[symbol]}`;

        fromCurrency.appendChild(fromOption);
        toCurrency.appendChild(toOption);

        if(fromOption.value === "USD"){
            fromOption.selected = true;
        }  
        if(toOption.value === "JPY"){
                toOption.selected = true;
          } 
    })
  
}

getAllOptions();


// Event listeners for currency dropdowns to update values
fromCurrency.addEventListener("change", () => {
    fromCurrencyValue = fromCurrency.value;
    convertBtn.click(); // Automatically convert when currency changes
});

toCurrency.addEventListener("change", () => {
    toCurrencyValue = toCurrency.value;
    convertBtn.click(); // Automatically convert when currency changes
});




// Function to convert currency
const convertCurrency = async (from, to, amount) => {

    let response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}`);
   
    if(response.status === 200){
       let data = await response.json();
       let convertedAmount=amount*data.rates[to]
       return convertedAmount;
    
    }

}
// Event listener for the convert button
convertBtn.addEventListener("click", () => {
    if (input.value === "") {
       error.innerText = "Please enter a value to convert!";
        
    }
    else{
        error.innerText = "";
      let resultVal= convertCurrency(fromCurrencyValue, toCurrencyValue, input.value);

      resultVal.then((value) => {
          result.innerText = `${input.value} ${fromCurrencyValue} = ${value.toFixed(2)} ${toCurrencyValue}`;
      }).catch((err) => {
          result.innerText = "Error converting currency!";
          console.error(err);
      });
    }
   
})


