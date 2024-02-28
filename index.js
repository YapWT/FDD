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

// header then other
window.onload = function() {
    fetchHeader().then(() => {
        loginNlogout();
        sign_upButtonContent();
    });
};

function fetchHeader() {
    return fetch('header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header').innerHTML = html;
        })
        .catch(error => console.error('Error fetching header content:', error));
}

// change the login or logout button text and function
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

// sign up or profile button text and function
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
        button.innerHTML = `<a href="sign_up.html"><button id="BTN_headerRight">Join<br>Now</button></a>`;
    }
}

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

function sign_up()
{
    const TP = document.getElementById("INP_signTP").value.toUpperCase();
    const name = document.getElementById("INP_signName").value;
    const pass = document.getElementById("INP_signPass").value;

    const member = JSON.parse(localStorage.getItem(TP));

    if (member)
        showMessage("This TP number has register to our website. Please try again. ")
    else if (!TP || !name || !pass)
        showMessage("Empty Input Found! Please try again. ")
    else
    {
        const m = {name, pass}
        localStorage.setItem(TP, JSON.stringify(m));
        alert(`${TP} register sucessful! You can login to our website. `);
        
        window.location.href = "index.html";
    }
    clearInputFields(TP,name,pass)
}

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
            { document.getElementById('faq_a1').style.display = 'none'; }
        else
            { document.getElementById('faq_a1').style.display = 'block'; }
    }
    else if (questionNum == 2)
    {
        if (window.getComputedStyle(document.getElementById('faq_a2')).display === 'block')
            { document.getElementById('faq_a2').style.display = 'none'; }
        else
            { document.getElementById('faq_a2').style.display = 'block'; }
    }
    else if (questionNum == 3)
    {
        if (window.getComputedStyle(document.getElementById('faq_a3')).display === 'block')
        { document.getElementById('faq_a3').style.display = 'none'; }
        else
        { document.getElementById('faq_a3').style.display = 'block'; }
    }
    else if (questionNum == 4)
    {
        if (window.getComputedStyle(document.getElementById('faq_a4')).display === 'block')
        { document.getElementById('faq_a4').style.display = 'none'; }
        else
        { document.getElementById('faq_a4').style.display = 'block'; }
    }
    else if (questionNum == 5)
    {
        if (window.getComputedStyle(document.getElementById('faq_a5')).display === 'block')
            { document.getElementById('faq_a5').style.display = 'none'; }
        else
            { document.getElementById('faq_a5').style.display = 'block'; }
    }
    else if (questionNum == 6)
    {
        if (window.getComputedStyle(document.getElementById('faq_a6')).display === 'block')
            { document.getElementById('faq_a6').style.display = 'none'; }
        else
            { document.getElementById('faq_a6').style.display = 'block'; }
    }
    else if (questionNum == 7)
    {
        if (window.getComputedStyle(document.getElementById('faq_a7')).display === 'block')
        { document.getElementById('faq_a7').style.display = 'none'; }
        else
        { document.getElementById('faq_a7').style.display = 'block'; }
    }
    else if (questionNum == 8)
    {
        if (window.getComputedStyle(document.getElementById('faq_a8')).display === 'block')
            { document.getElementById('faq_a8').style.display = 'none'; }
        else
            { document.getElementById('faq_a8').style.display = 'block'; }
    }
    else if (questionNum == 9)
    {
        if (window.getComputedStyle(document.getElementById('faq_a9')).display === 'block')
            { document.getElementById('faq_a9').style.display = 'none'; }
        else
            { document.getElementById('faq_a9').style.display = 'block'; }
    }
}

// about
function scrollToSection(sectionID) {
    var url = 'about_us.html#' + sectionID;
    window.location.href = url; // Redirect to the specified URL
}