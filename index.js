function showMessage(message) 
{
    var text = document.createElement('p');
    text.innerText = message;
    document.body.appendChild(text);

    setTimeout(function () 
    {
        text.innerText = '';
    }, 5000); // 10 000 milliseconds = 10 seconds
}

function clearInputFields(...ids) 
{
    ids.forEach(id => 
    {
      document.getElementById(id).value = '';
    });
}

// fetch the header then run other program
window.onload = function() 
{
    fetchHeader().then(() => {
        loginNlogout();
        sign_upButtonContent();
        profile();
    });
};

function fetchHeader() 
{
    return fetch('header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
        })
        .catch(error => console.error('Error fetching header content:', error));
}

// change the text and function of the login or logout button
function loginNlogout() 
{
    const button = document.getElementById("BTN_log");
    
    if (localStorage.getItem("login")) 
    {
        button.innerText = "Log Out";
        button.addEventListener("click", function(){ logout(); });

    } else 
    {
        button.innerText = "Login";
        button.addEventListener("click", function() { window.location.href = "login.html"; });
    }
}

// text and function of the sign up or profile button 
function sign_upButtonContent() 
{
    const button = document.getElementById("BTN_headerRight");
    const member = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem("login"))));
    
    if (member)
    {
        button.innerHTML = `<a href='profile.html'><button id="BTN_headerRight">${member.name}</button></a>`;
        button.style.fontSize = 'medium';
    } 
    else 
    {
        button.innerHTML = `<a href="sign_up.html"><button id="BTN_headerRight">Join Now</button></a>`;
    }
}

// login.html
function login()
{
    const TP = document.getElementById("INP_loginTP").value.toUpperCase();
    const pass = document.getElementById("INP_loginPass").value;

    const member = JSON.parse(localStorage.getItem(TP));

    if (member && pass == member.pass)
    {
        localStorage.setItem("login", JSON.stringify(TP));
        window.location.href = 'index.html';
    } else
        showMessage("Invalid TP number or password. Please try again. ")

}

// sign up.html
function sign_up()
{
    const TP = document.getElementById("INP_signTP").value.toUpperCase();
    const name = document.getElementById("INP_signName").value;
    const email = document.getElementById("INP_signEmail").value;
    const contact = document.getElementById("INP_signPhone").value;
    const pass = document.getElementById("INP_signPass").value;

    const member = JSON.parse(localStorage.getItem(TP));

    if (member)
        showMessage("This TP number has register to our website. Please try again. ")
    else if (!name || !pass || !email || !contact)
        showMessage("Empty Input Found! Please try again. ")
    else if (!checkTP(TP))
        showMessage("Invalid TP numbers. ")
    else
    {
        const m = {name, email, contact, pass}
        localStorage.setItem(TP, JSON.stringify(m));
        alert(`${TP} register sucessful! You can login to our website. `);
        
        window.location.href = "login.html";
    }
    clearInputFields(TP,name,email, contact, pass)
}

function checkTP(TP)
{
    return  /^TP\d{6}$/.test(TP)
}

// logout button's fucntion
function logout()
{
    localStorage.removeItem("login");
    window.location.href = 'index.html';
}

// faq
function faq(questionNum)
{
    if (questionNum == 1)
    {
        if (window.getComputedStyle(document.getElementById('faq_a1')).display === 'block')
            document.getElementById('faq_a1').style.display = 'none'; 
        else
            document.getElementById('faq_a1').style.display = 'block';
    }
    else if (questionNum == 2)
    {
        if (window.getComputedStyle(document.getElementById('faq_a2')).display === 'block')
            document.getElementById('faq_a2').style.display = 'none';
        else
            document.getElementById('faq_a2').style.display = 'block';
    }
    else if (questionNum == 3)
    {
        if (window.getComputedStyle(document.getElementById('faq_a3')).display === 'block')
        document.getElementById('faq_a3').style.display = 'none';
        else
        document.getElementById('faq_a3').style.display = 'block';
    }
    else if (questionNum == 4)
    {
        if (window.getComputedStyle(document.getElementById('faq_a4')).display === 'block')
        document.getElementById('faq_a4').style.display = 'none';
        else
        document.getElementById('faq_a4').style.display = 'block';
    }
    else if (questionNum == 5)
    {
        if (window.getComputedStyle(document.getElementById('faq_a5')).display === 'block')
            document.getElementById('faq_a5').style.display = 'none';
        else
            document.getElementById('faq_a5').style.display = 'block';
    }
    else if (questionNum == 6)
    {
        if (window.getComputedStyle(document.getElementById('faq_a6')).display === 'block')
            document.getElementById('faq_a6').style.display = 'none';
        else
            document.getElementById('faq_a6').style.display = 'block';
    }
    else if (questionNum == 7)
    {
        if (window.getComputedStyle(document.getElementById('faq_a7')).display === 'block')
        document.getElementById('faq_a7').style.display = 'none';
        else
        document.getElementById('faq_a7').style.display = 'block';
    }
    else if (questionNum == 8)
    {
        if (window.getComputedStyle(document.getElementById('faq_a8')).display === 'block')
            document.getElementById('faq_a8').style.display = 'none';
        else
            document.getElementById('faq_a8').style.display = 'block';
    }
    else if (questionNum == 9)
    {
        if (window.getComputedStyle(document.getElementById('faq_a9')).display === 'block')
            document.getElementById('faq_a9').style.display = 'none';
        else
            document.getElementById('faq_a9').style.display = 'block';
    }
    else if (questionNum == 10)
    {
        if (window.getComputedStyle(document.getElementById('faq_a10')).display === 'block')
            document.getElementById('faq_a10').style.display = 'none';
        else
            document.getElementById('faq_a10').style.display = 'block';
    }
}

// about page, scroll fucntion
document.addEventListener("DOMContentLoaded", function() {
    // Function to scroll to the respective sections
    function scrollToSection(DIV) {
        document.getElementById(DIV).scrollIntoView({behavior: "smooth"})
    }

    var s = new URLSearchParams(window.location.search); // window.location.search == ?section=DIV_contact
    // URLSearchParams got Parameter name: 'section' and Parameter value: 'DIV_contact'
    var divID = s.get('section'); // s.get('section') return "DIV_contact" then saves it in divID

    scrollToSection(divID); // scroll in to the page
});

// profile
function profile() 
{
    const name = document.getElementById("h3_userName");
    const TP = document.getElementById("p_TPnumber");
    const contact = document.getElementById("p_contact");
    const email = document.getElementById("p_email");

    const member = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem("login"))));

    name.innerText = `${member.name}`;
    TP.innerText = `TP Number: ${JSON.parse(localStorage.getItem("login"))}`;
    contact.innerText = `Contact: ${member.contact}`;
    email.innerText = `Email: ${member.email}`;
}

// change password
function changePass()
{
    const TP = document.getElementById("ID_cTP").value.toUpperCase();
    const oldP = document.getElementById("ID_cOld").value;
    const newP = document.getElementById("ID_cNewP").value;
    const confirmP = document.getElementById("ID_cConfirm").value;
    
    const member = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem("login"))));

    if (!TP || !oldP || !newP || !confirmP)
        showMessage("Empty Input Found!")
    else if (JSON.parse(localStorage.getItem(TP)) == member || oldP != member.pass)
        showMessage("Wrong TP number or password. ")
    else if (newP == oldP)
        showMessage("New Password is same with old password. ")
    else if (newP != confirmP)
        showMessage("Confirm password is incorrect. ")
    else
    {
        member.pass = newP
        localStorage.setItem(TP, JSON.stringify(member))
        logout()
    }
    clearInputFields(TP,oldP,newP,confirmP)
}