var currentGoogleUser;

function onSignIn(googleUser) {
    currentGoogleUser = googleUser.getBasicProfile();
}

$(document).ready(function() {

    $("#chiffrer").click(function() {
        var user = currentGoogleUser.getEmail();
        if(user.length > 1) {
            var website = $("#website").val();
            if (website.length < 1){
                alert("le champ Site/API est vide!")
                // noinspection JSAnnotator
                return
            }
            var password = $("#password").val();
            if (password.length < 1){
                alert("le champ mot de passe est vide!")
                // noinspection JSAnnotator
                return;}
            var encryptedPassword = sjcl.encrypt(user, password);

            var valueToStore = JSON.parse(localStorage.getItem(user));
            console.log("Valeur récupérée depuis la BDD: " + valueToStore);

            if (valueToStore == null) {
                valueToStore = [];
            }

            valueToStore.push([website, encryptedPassword]);

            console.log("Valeur à stocker: " + valueToStore);
            localStorage.setItem(user, JSON.stringify(valueToStore));


            $("#message").text("Cryptogramme : " + JSON.parse(encryptedPassword).ct);
            console.log("Cryptogramme : " + JSON.parse(encryptedPassword).ct)
            // $("#clair").text(password);
            // $("#afficheMdpClairs").empty();
            // $("#afficheMdpChiffres").empty();
        }
        else alert("Connectez vous avec google!")
    });


    $("#dechiffrer").click(function() {
        var user = currentGoogleUser.getEmail();
        console.log("user : "+user)
        // var labelAfficheMdp = $("#afficheMdp");
        var passwords = JSON.parse(localStorage.getItem(user));
        console.log("taille localstorage : "+passwords.length)



        // $("#cryptogramme").empty();
        // $("#clair").empty();
        // labelAfficheMdp.empty();

        if(passwords == null) {
            $("#message").text("Pas de mdp pour "+ user+ ".");
        }
        else {
            var length = passwords.length;
            console.log("taille localstorage : "+length)

            var encryptedPassword, password, website;

            // labelAfficheMdp.append("Utilisateur: " + user + "<br><br>");
            var message = "Vos mots de passe : "
            for(var i = 0; i < length; i++) {

                encryptedPassword = passwords[i][1];
                password = sjcl.decrypt(user, encryptedPassword);
                website = passwords[i][0];
                message = message + "rôle : " + website + ", mot de passe : " + password + "  ||  "
                console.log("role et mot de passe : " +website + " " + password)

            }

                // $("#afficheMdp").append("Site: " + website + "<br>Mot de passe: " + password + "<br>Chiffré: " + JSON.parse(encryptedPassword).ct + "<br><br>");
                $("#message").text(message);
            }

    })

    $("#boutonSignOut").click(function() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
            currentGoogleUser = null;
        })
    })
});