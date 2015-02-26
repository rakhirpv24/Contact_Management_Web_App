
function validateData() 
{
    var email= document.getElementById("email").value;	
    var firstname= document.getElementById("firstname").value;	
	var lastname= document.getElementById("lastname").value;	
	var username= document.getElementById("username").value;
    var password= document.getElementById("password").value;	
	var confirm= document.getElementById("confirmpassword").value;	
    var license= document.getElementById("license");	
    var re = /\S+@\S+\.\S+/;
	if (firstname==null || firstname=="" || lastname==null || lastname=="" ||
		email==null || email=="" || password==null || password=="" || confirm==null || confirm=="")
	  {
	  alert("Please Fill All Required Fields");
	  return false;
	  }
	else if(re.test(email)==false) { 
		alert("You have entered incorrect email. Please try again!!");
		return false;
	  }
	else if(password!=confirm)
	  {
		alert("passwords do not match. Please check!");
		return false;
	  }
	  else if(license.checked==false){
	    alert("You must agree to the terms and conditions");
		return false;
	  }
	  else {
	    window.open("registrationsuccessful.html");	  
	  }    
}

function validateEmail() 
{
    var email= document.getElementById("emailid").value;	 
    var re = /\S+@\S+\.\S+/;
    if(re.test(email)) {
	    //window.open("reset_email.html");
		window.location.href = 'reset_email.html';
	}
	else {
	    alert("You have entered incorrect email. Please try again!!");
	}
}
