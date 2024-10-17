const validdate = {
    'Jan': 31,
    'Feb': 29,
    'Mar': 31,
    'Apr': 30,
    'May': 31,
    'Jun': 30,
    'Jul': 31,
    'Aug': 31,
    'Sep': 30,
    'Oct': 31,
    'Nov': 30,
    'Dec': 31,
};

function validateDate() {
    softReset();
    let dayval = parseInt(document.forms["birthday"]["d"].value);
    let monthval = document.forms["birthday"]["mo"].value;
    if (dayval > validdate[monthval]) {
        alert(`${monthval} has only ${validdate[monthval]} possible days. Please enter a valid day.`);
        return;
    }
    if (dayval < 1) {
        alert('Day must be greater than zero. Please enter a valid day.');
        return;
    }
    let taxa = data[`${monthval}-${dayval}`];
    const taxaarr = taxa.split("|");
    const randidx = Math.floor(Math.random() * taxaarr.length)
    document.getElementById('result').innerHTML = taxaarr[randidx];
    document.getElementById('banner').innerHTML = 'See your results below';
    document.getElementById('bannersp').innerHTML = 'Vea sus resultados a continuación';
    document.getElementById('msg').innerHTML =  milspec[`${monthval}-${dayval}`];
    document.getElementById('d').disabled = true;
    document.getElementById('mo').disabled = true;
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width : 100,
        height : 100
    });
    
    function makeCode () {
        var elText = document.getElementById("spec");
        
        qrcode.makeCode(elText.value);
    }
    
    makeCode();
    idleTimer();
}

function softReset() {
    document.getElementById('result').innerHTML = '';
    document.getElementById('qrcode').innerHTML = '';
    document.getElementById('msg').innerHTML = '';
    document.getElementById('d').disabled = false;
    document.getElementById('mo').disabled = false;
}

function resetForm() {
    document.forms["birthday"]["d"].value = '';
    document.forms["birthday"]["mo"].value = '';
    document.getElementById('result').innerHTML = '';
    document.getElementById('qrcode').innerHTML = '';
    document.getElementById('msg').innerHTML = '';
    document.getElementById('banner').innerHTML = 'Enter a date to see which plant became a species on that day';
    document.getElementById('bannersp').innerHTML = 'Introduzca una fecha para ver qué planta se convirtió en especie ese día';
    document.getElementById('d').disabled = false;
    document.getElementById('mo').disabled = false;
}

function idleTimer() {
    var t;
    //window.onload = resetTimer;
    window.onmousemove = resetTimer; // catches mouse movements
    window.onmousedown = resetTimer; // catches mouse movements
    window.onclick = resetTimer;     // catches mouse clicks
    window.onscroll = resetTimer;    // catches scrolling
    window.onkeypress = resetTimer;  //catches keyboard actions

   function reload() {
        console.log("reloaded");
          window.location = self.location.href;  //Reloads the current page
   }

   function resetTimer() {
        clearTimeout(t);
        t= setTimeout(reload, 90000);  // time is in milliseconds (1000 is 1 second)
    }
}

idleTimer();