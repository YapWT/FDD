function showMessage(message) 
{
    const p = document.getElementById("p_message");
    p.style.visibility = 'visible';
    p.innerText = message;

    setTimeout(function () 
    {
        p.style.visibility = 'hidden';
    }, 5000); // 5000 milliseconds = 5 seconds
}

// fetch the header then run other program
window.onload = function() {
    var page = ["aboutNcontact.html", "activities.html", "index.html", "faq.html"];
    
    if (page.some(p => page.includes(p)))
        fetchHeader()
};

function fetchHeader() {
    if (document.getElementById("header"))
    {
        var xhr = new XMLHttpRequest();

        // Open a GET request to fetch the header content
        xhr.open('GET', 'header.html', true);

        // Define what happens on successful load
        xhr.onload = function() {
            if (xhr.status === 200) {
                var tempDiv = document.createElement('div');

                // Set the response content as innerHTML of the div
                tempDiv.innerHTML = xhr.responseText;

                // Find the header element inside the temporary div
                var headerElement = tempDiv.querySelector('header');

                // Get the container element where you want to insert the header
                var container = document.getElementById('header');

                container.appendChild(headerElement);
                header();
                loginNlogout();
            } 
        };

        // Handle errors
        xhr.onerror = function() {
            console.error('Network error while loading header');
        };

        // Send the request
        xhr.send();
    }
}

function header() {
    var currentPage = window.location.href;
    
    if (currentPage.includes('index.html'))
       document.getElementById('BTN_home').style.backgroundColor = 'rgb(191,226,255)';

    else if (currentPage.includes('activities.html')) 
       document.getElementById('BTN_act').style.backgroundColor = 'rgb(191,226,255)';
    
    else if (currentPage.includes('aboutNcontact.html') || currentPage.includes('faq.html')) 
       document.getElementById('BTN_about').style.backgroundColor = 'rgb(191,226,255)';
}

// change the text and function of the login or logout button
// text and function of the sign up or profile button 
function loginNlogout() 
{
    const button1 = document.getElementById("BTN_log");
    const button2 = document.getElementById("BTN_headerRight");
    
    if (localStorage.getItem("login")) 
    {
        button1.innerText = "Log Out";
        button1.addEventListener("click", function(){ logout(); });

        button2.innerText = "Profile";
        button2.style.fontSize = "x-large";
        button2.addEventListener("click", function() { window.location.href = "profile.html"; });

    } else 
    {
        button1.innerText = "Login";
        button1.addEventListener("click", function() { window.location.href = "login.html"; });

        button2.innerText = "Sign\nUp";
        button2.addEventListener("click", function() { window.location.href = 'sign_up.html'; });
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

    if (divID)
        scrollToSection(divID); // scroll in to the page
});

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
    {
        showMessage("Invalid TP number or password. Please try again. ")
        document.getElementById("INP_loginPass").value = ""
    }
}

// sign up.html
function sign_up()
{
    const TP = document.getElementById("INP_signTP").value.toUpperCase();
    const name = document.getElementById("INP_signName").value;
    const contact = document.getElementById("INP_signPhone").value;
    const pass = document.getElementById("INP_signPass").value;

    const member = JSON.parse(localStorage.getItem(TP));

    if (member)
        showMessage("This TP number has register to our website. Please try again. ")
    else if (!name || !pass || !contact)
        showMessage("Empty Input Found! Please try again. ")
    else if (!/^TP\d{6}$/.test(TP)) // /^TP\d{6}$/.test(TP) is a format TP123456
        showMessage("Invalid TP numbers. ")
    else if (!/^01\d-\d{7}$|^01\d-\d{8}$/.test(contact))
        showMessage("Invalid Phone Number. ")
    else
    {
        const m = {name, email: `${TP.toLowerCase()}@mail.apu.edu.my`, contact, pass}
        localStorage.setItem(TP, JSON.stringify(m));
        alert(`${TP} register sucessful! You can login to our website. `);
        
        window.location.href = "login.html";
    }
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
    var e = document.getElementsByClassName('faq_a')[questionNum - 1]

    if (window.getComputedStyle(e).display === "block")
        e.style.display = "none";
    else 
        e.style.display = "block"; // display answer
} 

// profile // fill in the detail of the user automatically
window.addEventListener("DOMContentLoaded", function() {
    profile();})

function profile()
{
    const member = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem("login"))));

    if (member && window.location.href.includes("profile.html"))
    {
        const name = document.getElementById("h3_userName");
        const TP = document.getElementById("p_TPnumber");
        const contact = document.getElementById("p_contact");
        const email = document.getElementById("p_email");
    
        name.innerText = `${member.name}`;
        TP.innerText = `TP Number: ${JSON.parse(localStorage.getItem("login"))}`;
        contact.innerText = `Contact: ${member.contact}`;
        email.innerText = `Email: ${member.email}`;
    }
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
        window.location.href = "login.html"
    }
}

// feedback // send feedback
function feedback()
{
    const feedback = document.getElementById("TXT").value;
    if (feedback != "")
    {
        const p = document.getElementById("p_message");
        p.style.visibility = 'visible';
        p.innerText = `We had receive your feeback! Thank You!\n
                        We look forward to see you!\n
                        If you have any questions, please contact us at [603 - 456 7890] or email us on [cotton_info@gmail.com].`
        document.getElementById("TXT").value = "";
    }
}

function loginStatus(page)
{
    if (localStorage.getItem("login"))
        window.location.href = page;

    else
    {
        if (window.confirm("Please login first! Do you want to go to the login page?"))
            window.location.href = "login.html";
    }
}

function appoinment()
{
    const act = document.getElementById("CBB_act").value;
    const num = document.getElementById("INP_person").value;

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Month (0-11, add 1 to get 1-12)
    const date = now.getDate(); // Day of the month (1-31)
    const hours = now.getHours(); // Hour (0-23)
    const minutes = now.getMinutes(); // Minute (0-59)
    const seconds = now.getSeconds(); // Second (0-59)

    if (act && num)
    {
        const p = document.getElementById("p_message");
        p.style.visibility = 'visible';
        p.innerText = `\nThank you for submitting your appointment request! Confirmation Number: [a${year}${month}${date}${hours}${minutes}${seconds}].\n
                        You will receive a confirmation email shortly. If you have any questions or need to make changes. \n
                        Please contact us at [603 - 456 7890] or email us on [cotton_info@gmail.com]. \n
                        We look forward to see you!`;
        document.getElementById("CBB_act").value = "";
    }
    else
        showMessage("\n\nPlease fill out all input fields! \n\n")
}