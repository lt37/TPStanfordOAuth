var currentGoogleUser;

function onSignIn(googleUser) {
    currentGoogleUser = googleUser.getBasicProfile();
}

$(document).ready(function() {

    $("#chiffrer").click(function() {
        var user = currentGoogleUser.getEmail();
        var website = $("#website").val();
        var password = $("#password").val();
        var encryptedPassword = sjcl.encrypt(user, password);

        var valueToStore = JSON.parse(localStorage.getItem(user));
        console.log("Valeur récupérée depuis la BDD: " + valueToStore);

        if (valueToStore == null) {
            valueToStore = [];
        }

        valueToStore.push([website, encryptedPassword]);

        console.log("Valeur à stocker: " + valueToStore);
        localStorage.setItem(user, JSON.stringify(valueToStore));


        $("#cryptogramme").text(encryptedPassword);
        $("#clair").text(password);
        $("#afficheMdpClairs").empty();
        $("#afficheMdpChiffres").empty();
    });


    $("#afficherMdp").click(function() {
        var user = currentGoogleUser.getEmail();
        var labelAfficheMdp = $("#afficheMdp");
        var passwords = JSON.parse(localStorage.getItem(user));


        $("#cryptogramme").empty();
        $("#clair").empty();
        labelAfficheMdp.empty();

        if(passwords == null) {
            $("#afficheMdp").text("Pas de mdp pour cet utilisateur.");
        }
        else {
            var length = localStorage.length;

            var encryptedPassword, password, website;

            labelAfficheMdp.append("Utilisateur: " + user + "<br><br>");
            for(var i = 0; i < length; i++) {
                encryptedPassword = passwords[i][1];
                password = sjcl.decrypt(user, encryptedPassword);
                website = passwords[i][0];

                $("#afficheMdp").append("Site: " + website + "<br>Mot de passe: " + password + "<br>Chiffré: " + JSON.parse(encryptedPassword).ct + "<br><br>");
            }
        }
    })
});