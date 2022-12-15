document.getElementById("btn").addEventListener('click',function(e){
    if (8 > document.getElementById('pass').value.length){
        document.getElementById('span').textContent="Logintud minima de la contraseña = 8 caracteres!";
        e.preventDefault();
    }
    else if(document.getElementById('rep_pass').value != document.getElementById('pass').value){
        document.getElementById('span').textContent="Las contraseñas no coinciden!";
        e.preventDefault();
    }
    else if(document.getElementById('rep_pass').value == document.getElementById('pass').value){
        document.getElementById('span').textContent="";
        //document.getElementById('btn').type="sumbit"; //se convierte el boton en un submit
    }
});

//function equals_passwords(){
    //declarar aqui las constantes
    //if(document.getElementById('rep_pass').value != document.getElementById('pass').value){
      //  document.getElementById('span').textContent="Las contraseñas no coinciden!";
        //return false;
        //alert("las contraseñas no coinciden!");
        //document.getElementById('btn').type="button"; //para que no se mantenga escuchando
    //}
    //else if(document.getElementById('rep_pass').value == document.getElementById('pass').value){
     //   document.getElementById('span').textContent="";
       // document.getElementById('btn').type="sumbit"; //se convierte el boton en un submit
    //}
//};


