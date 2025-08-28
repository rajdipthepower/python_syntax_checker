let pyodideReady = false;
let pyodide;
const fact = 'https://sv443.net/jokeapi/v2/joke/Any';
async function loadPyodideOnce() {
    if (!pyodideReady) {
        pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/" });
        pyodideReady = true;
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    get();
})

async function get(){
    try{
        let ftch = await fetch(fact);
        console.log(ftch);
        if(!ftch.ok) throw new Error(`HTTP ${ftch.status}`);
        else{
            let data = await ftch.json();
            console.log(data);
            if(data.type==="single")
                document.getElementById("fact").value = data.joke;
            else{
                document.getElementById("fact").value = `${data.setup}\n${data.delivery}`;
            }
        }
    }catch(err){console.log(err.message)};    
}


a = document.getElementById("text");

const targetUrl = "https://pythonium.net/api/checker";
document.getElementById("Submit").addEventListener("click",async ()=>
    {
    if(a.value!=''){

    // async function fetchdata(){
    //     try{
    //         let b = await fetch(targetUrl,{
    //         method: 'POST',
    //         headers: {'Content-type':'application/json'},
    //         body: JSON.stringify({code : a.value})
    //         });
    //         if(!b.ok) throw new Error(`HTTP ${b.status}`);
    //         else{
    //             let c = await b.json();
    //             document.getElementById("cont").value = c.message;
    //             console.log(c)
    //         }
    //     }catch(err){
    //         document.getElementById("cont").value = err.message;
    //     }    

    // }
    // fetchdata();
    // console.log(JSON.stringify({code : a.value}))
    await loadPyodideOnce();
        try {
            pyodide.runPython(a.value); // try running the code
            document.getElementById("cont").value = "No syntax errors detected :)";
        } catch (err) {
            document.getElementById("cont").value = "Syntax error: " + err.message;
        }
    }
    else{
        document.getElementById("cont").value = "";
    }
})
document.getElementById("reset").addEventListener("click",()=>{
    a.value = ""
    document.getElementById("cont").value = "";
})
