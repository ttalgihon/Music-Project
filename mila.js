 $(document).ready(function () {
    $('#btnSignUp').on("click", function (event) {
       event.preventDefault();
       const email = $('input[type = "email"]').val();
       const password = $('input[type = "password"]').val();
       const firstname = $('input[type = "firstname"]').val();
       const lastname = $('input[type = "lastname"]').val();
       console.log('Email', email);
       console.log('Password', password);

      // firebase auth for creating a user with email and password
       firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function (data) {
             console.log('Data', data);
          })
          .catch(function (error) {
             console.log('Error', error);
             // error.message
             console.log("message", error.message);
             modal();
             $('#exampleModalLabel').html(error.message);
          });
       function modal() {
          $("#exampleModal").modal("show")
       }
       // $('form').get(0).reset();
       dataRef().ref().push({
          email: email,
          password: password,
          firstname: firstname,
          lastname: lastname
       });
       dataRef().ref().on('child_added', function (addRow) {
          let email = addRow.val().email;
          let password = addRow.val().password;
          let firstname = addRow.val().firstname;
          let lastname = addRow.val().lastname;
       });
    });
 });
