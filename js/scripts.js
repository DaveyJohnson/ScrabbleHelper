document.body.onload = () => {

const input = document.getElementById('letters');
const form  = document.getElementById('theform');
const btn = document.getElementById('search');

let elem           = document.createElement('div');
elem.id            = 'notify';
elem.style.display = 'none';

form.appendChild(elem);

input.oninvalid = function(event) {
    event.target.setCustomValidity('Input should only contain letters. e.g. ABCD');
}

btn.onclick = function(){
    let results = [];
    arr = combinations(input.value);
    arr.forEach(item => {
        check_if_word_exists(item, results);
    })
}

input.onchange = function(event) {
    event.target.value = event.target.value.toUpperCase();
}

input.addEventListener('invalid', function(event) {
    event.preventDefault();
    if ( ! event.target.validity.valid ) {
        elem.textContent   = 'Input should only contain letters e.g. JOHN';
        elem.className     = 'error';
        elem.style.display = 'block';
    
        input.className    = 'invalid animated shake';
    }
});

}

let arr = [];
let index = 0;

function check_if_word_exists(word, results) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
    httpGetAsync(url, (data) => {
        //console.log(data)
        if(data) {
            results.push(word);
        }
        const div = document.getElementById('notify');
        if(word.length > 1) {
            div.innerText = div.innerText + " " + word + " ";
        }
        
        div.style.display = "block";
    })
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function combinations(str) {
    var fn = function(active, rest, a) {
        if (!active && !rest)
            return;
        if (!rest) {
            a.push(active);
        } else {
            fn(active + rest[0], rest.slice(1), a);
            fn(active, rest.slice(1), a);
        }
        return a;
    }
    return fn("", str, []);
}

