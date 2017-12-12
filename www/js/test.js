
function onSignIn(googleUser) {
    console.log(googleUser.getBasicProfile().getEmail());
}

$(document).ready(function() {

    var key = 0;
    var tab_key = [];



    // function creerChiffre() {
    //     this.keyBD = "";
    //     this.textAChiffrer = "";
    //
    // }

    $("#chiffrer").click(function () {

        // var  nouvelleEntree = new creerChiffre();
        // nouvelleEntree.keyBD = key;
        // nouvelleEntree.textAChiffrer = $("#plaintext").val();
        key = key +1;
        tab_key.push(key);

        // tab_chiffres.push(localStorage.getItem("tab"));
        console.log(tab_key);
        var mdp = $("#mdp").val();
        var plaintext = $("#plaintext").val();
        console.log(mdp+" "+plaintext);
        var cryptedText = sjcl.encrypt(mdp,plaintext);


        localStorage.setItem(key,cryptedText);


        // console.log("cleBD : "+nouvelleEntree.keyBD+" message : "+nouvelleEntree.textAChiffrer
        // +" mdp : "+ $("#mdp").val());
        // //
        // var mdp = $("#mdp").val();
        // var plaintext = $("#plaintext").val();
        // // console.log("mdp : "+mdp+" et text : "+plaintext);
        //
        // var cryptedText = sjcl.encrypt(mdp,plaintext);
        //
        // console.log("cryptogramme : "+ cryptedText);
        //
        var textcrypted = JSON.parse(cryptedText);
        var ct = textcrypted.ct;
        // console.log("cryptogramme : "+ ct);
        //
        // localStorage.setItem(key,cryptedText);
        // key = key + 1;
        //
        $("#cryptogramme").text("le chiffré est : "+ct);

    });

    $("#dechiffrer").click(function () {
        var text = "le message dechiffré : ";
        tab = localStorage.getItem("tab")
        for (i=0; i<tab_key.length; i++){
            console.log("mdp : "+$("#mdp").val());

            var cle = tab_key[i];
            console.log("cle du tableau :"+cle);
            var cryptogramme = localStorage.getItem(cle);
            console.log("cryptogramme : "+cryptogramme);
            // var ctJson = JSON.parse(ct);
            var mdp = $("#mdp").val()
            // console.log("ct : "+ct);
            var dechiffreText = sjcl.decrypt(mdp,cryptogramme);
            text = text + " "+ dechiffreText ;
            console.log(text);

        }
        console.log(text);
        // console.log("i="+i+" key="+key);
        $("#clair").text(text);



        // var dechiffreText = sjcl.decrypt(localStorage.getItem("mdp"),localStorage.getItem("ct"));
       // console.log("dechiffré : "+dechiffreText);


    });

});