var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; //list of letters for conversion

function ConvertCheck(numbers, sys_number){ //check if input meets requirements
    let tmp = 0; //used to determine compatibility of numeric system under certain conditions

    if (sys_number > 20) //if numeric system out of range
    {
        alert("Numeric system out of range!");
        return false; 
    }
     
    for (let i = 0; i < numbers.length; i++) //check if every element of input array meets requirements
    {   
        if (numbers[i] >= 'A' && numbers[i] <='J'){ //if element is a letter in a range:
            if (sys_number <= 10) //if system is lower than 11, stop because it doesn't allow letters
            {
                alert("Given numeric system doesn't allow letters!");
                return false; 
            }
            for (j = 0; j < letters.length; j++)  //check integrity with golbal array of letters        
            {
                if (numbers[i] == letters[j]) //if element of input array is compatible with a letter in a global letter array
                {
                    tmp = 10 + j; //position + 10 gives numeric system + 1 that would allow this letter
                    if (tmp >= sys_number){ //if allowing numeric system is greater than input numeric system 
                        alert("Number includes letters not allowed in given numeric system!");
                        return false; 
                    }
                }
            }
        }
        else if (numbers[i] >= sys_number && sys_number <= 10) //if input array includes ciphers not allowed in input numeric system 
        {
            alert("Number can't include characters greater than allowed in given numeric system!");
            return false; 
        }
    }
    return true; //if function got here - input meets the requirements for conversion
}

function ConvertOther(){ 
    let number = document.getElementById("other_input").value; //number to convert from
    let numbers = number.toString().split(''); //array of all elements of input
    let sys_number = document.getElementById("sys_input_other").value; //numeric system to convert to
    let check = ConvertCheck(numbers, sys_number); //outcome of ConvertCheck function
    if (check == false) return false;

    document.getElementById("results_other").innerHTML = ""; //clear result element
    document.getElementById("steps_other").innerHTML = ""; //clear steps element
    let result = 0; 
    let mult = 0;
    
    for (let i = 0, j = numbers.length; i<numbers.length, j > 0; i++, j--) //i = element's index (going up), j-1 = power to apply in multiplication (going down)
    {
        if (numbers[i] >= 'A' && numbers[i] <='J') //if input includes letters
        {
            for (k = 0; k < letters.length; k++) //find letter element's position in global letter array
            {
                if (numbers[i] == letters[k]) 
                {
                    numbers[i] = 10 + k; //real value of letter element is its position in global letter array + 10
                }
            }
        }
        mult = numbers[i] * Math.pow(sys_number, j-1); 
        result += mult; //add result of multiplication to outcome
        document.getElementById("steps_other").innerHTML += numbers[i] + " * " + sys_number + "<sup>" + //write this step into steps element
         (j-1) + "</sup> = " + mult + "<br>";
    }
    
    document.getElementById("other_inputed").innerHTML = number + "<sub>" + sys_number + "</sub>";  //write input number and its system as left side of equation
    document.getElementById("results_other").innerHTML = (result + "<sub>10</sub>"); //write result and its numeric system as right side of equation
    return false; //stop
}

function ConvertDec(){
    let dec_number = document.getElementById("dec_input").value; //input decimal number
    let sys_number = document.getElementById("sys_input").value; //input numeric system
    document.getElementById("results").innerHTML = ""; //clear results element
    document.getElementById("steps").innerHTML = ""; //clear steps element
    let mod, mod2; 
    let n = dec_number; // copy input number to other variable
    let results = [];

    if (sys_number > 20) //if given numeric system is oout of range
    {
        alert("Numeric system out of range!");
        return false;
    }
    
    do //complete this at least once as long as actual number is >= 1
    {
        document.getElementById("steps").innerHTML += n; //write actual number as first element of step's line
        mod = n % sys_number; //modulo of actual number divided by input numeric system
        n = ~~(n / sys_number); //round the divided number into integer
        mod2 = mod; //copy modulo to other variable
        if (mod >= 10) //if modulo is greater than nine, it will be represented with letter
        {
            mod2 = letters[mod-10]; //representation is [modulo - 10] position on global letter list
        }
        results.push(mod2); //write representation on beggining of results array
        document.getElementById("steps").innerHTML += (" : " + sys_number + " | " + mod2 + "<br>"); //write this step into step's element
    } while (n>=1); 

    //belows writes out the result's equation
    document.getElementById("dec_inputed").innerHTML = (dec_number + "<sub>10</sub>"); 
    document.getElementById("sys_inputed").innerHTML = sys_number;

    for (let i = results.length-1;  i >= 0; i--)
    {
        document.getElementById("results").innerHTML += results[i];
    }


    return false;
}

function ChangeVisibility(id){
    let parameter = document.getElementById(id).value; //read button's value
    let element = id.toString().split(''); //convert button's ID into array
    let text = '';
    element = element.slice(4); //extract part of array: from 4th element to the end (cut "btn_")
    element = element.join(''); //convert array to string and join elements with no character
    document.getElementById(element).style.display=parameter; //change display parameter
    if (parameter == "none")
    {
        parameter = "block"; //switch button's value and text
        text = "Show";
    }
    else 
    {
        parameter = "none";
        text = "Hide";
    }
    document.getElementById(id).value = parameter;
    document.getElementById(id).innerHTML = text;
}