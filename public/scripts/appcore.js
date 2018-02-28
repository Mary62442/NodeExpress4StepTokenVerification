fetchPostDataJson = () => {
  let name = document.getElementById('namePostFetch').value;
  let surname = document.getElementById('surnamePostFetch').value;
 
  fetch(`/postdataasyncfetch`, { 
    method: "POST",
    body:JSON.stringify({name:name, surname:surname}),
    headers: {
      'Content-type':'application/json',
      'Custom-Auth-Step1' : 'First password',
      'Custom-Auth-Step2' : 'Second password',
      'Custom-Auth-Step3' : 'Third password',
      'Custom-Auth-Step4' : 'Fourth password',
      'Custom-Auth-Step5' : 'Fifth password',
    }
  })
  .then(response => {
    if (response.status >= 400) {
      status = response.status;
      console.log(response.status);      
    }    
    return response.json();
  })
  .then(data => {
    console.log(data);
    document.getElementById('resultPostFetch').innerHTML = data;
  }); 
}

