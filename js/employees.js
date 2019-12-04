const employeeList = document.getElementById('employeeList');
const url = 'https://randomuser.me/api/?results=12';
const list = [];
let index = 0;
const modal = document.createElement('div');
const closeBtn = document.createElement('span');
const myModal = document.createElement('div');
modal.className = 'modal';
closeBtn.id = 'closeBtn';
myModal.className = 'my_modal';


fetch(url)
  .then(response => response.json())
  .then(data => {
    listEmployees(data.results);
    console.log(data.results);
  })
  

function listEmployees(data) {
  data.map(result => {
    const info = `
      
        <div class = 'employee_info' index = ${index}>
          <img class ="employee_img" src='${result.picture.large}' alt = 'profile-image'>
            <h4 class ="employee-details">${result.name.first} ${result.name.last}</h4>
            <span class="employee_details">${result.email}</p>
            <p class="employee_details">${result.location.city}</p>
         
        </div>
  
    `
    index++;
    list.push(result);
    employeeList.innerHTML += info;
  })
};

function ModalInfo(index) {
  const main = document.querySelector('main');
  const person = list[index];
  const birthday = new Date(person.dob.date).toLocaleString().split(',')[0];
  const info = `
    <div class = 'modal_content'>
      <img class ='employee_img' src='${person.picture.large}' alt = 'profile-image'>
      <div class ='modal_info'>
        <h3>${person.name.first} ${person.name.last}</h3>
        <p>${person.email}</p>
        <p>${person.location.city}</p>
        <hr>
        <p>${person.cell}</p>
        <p>${person.location.street.number} ${person.location.street.name} ${person.location.state} ${person.location.postcode}
        <p>Birthday: ${birthday}
      </div>
    </div>
    
  `
  main.appendChild(modal);
  closeBtn.innerHTML = '&times';
  myModal.innerHTML = info;
  modal.appendChild(myModal);
  modal.appendChild(closeBtn);
};


// help function

function getIndex(e) {
  if(e.target.className === 'employee_info') {
    return e.target.getAttribute('index');
  } else if (e.target.parentNode.className === 'employee_info') {
    return e.target.parentNode.getAttribute('index');
  }
}

function creatModal(e) {
  const modal = document.querySelector('.modal');
  let personIndex = getIndex(e);
  ModalInfo(personIndex);
  return ModalInfo;
}

function openModal() {
  myModal.style.display = 'block';
  closeBtn.style.display = 'block';
}

function closeModal() {
  myModal.style.display = 'none';
  closeBtn.style.display = 'none';
}


function outsideClose(e) {
  if(e.target === myModal) {
    closeModal();
  }
}

// Events

employeeList.addEventListener('click', (e) => {
  if (e.target.className === 'employee_info' || e.target.className === 'employee_img' ) {
    creatModal(e);
    openModal();
  }
});

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', outsideClose);

document.addEventListener('keydown', closeModal);
	