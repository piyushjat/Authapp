function loginparseddata(data)
{
    console.log(data);
    var email=document.getElementById("email");
    var password=document.getElementById("password");
    email.value="";
    password.value="";
    if(data.success)
    alert("Logged in Successfully.....")
else
alert("Invalid Email or Password......\nPlease try again.")


}

function logincallback(resp)
{
    resp.json().then(loginparseddata);
}

function login(){
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    fetch("http://localhost:3000/api/v1/login",
    {
        method:"POST",
        body:JSON.stringify({
            email:email,
            password:password

        }),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(logincallback)
}



function signup()
{
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var role=document.getElementById("role").value
    fetch("http://localhost:3000/api/v1/signup",
    {
        method:"POST",
        body:JSON.stingify({
            name:name,
            email:email,
            password:password,
            role:role
    }),
    headers:{
        "Content-Type":"application/json"
    }
    }).then(callback=>{
        if(data.success==true)
        {
            alert("Entry Created Successfully...")
            console.log(data);
            window.location="login.html";
        }
        else
        {
            console.log(err);
        }
    })
}


function signupParsedResponse(data)
{
    if(data.success==true)
    {
        alert("Entry Created Successfully...")
        console.log(data);
        window.location="login.html";
    }
    else
    {   
        console.log(err);
    }
}


function signupCallback(resp)
{
    resp.json().then(signupParsedResponse);
}



function signup()
{
    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    var role=document.getElementById("role").value
    fetch("http://localhost:3000/api/v1/signup",
    {
        method:"POST",
        body:JSON.stringify(
            {
                name:name,
                email:email,
                password:password,
                role:role
            }),
        headers:
        {
            "Content-Type":"application/json"
        }
    }).then(signupCallback)
}