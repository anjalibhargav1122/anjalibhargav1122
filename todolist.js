const adduserbtn = document.getElementById("adduser");
const btntext = adduserbtn.innerText;
const usernametextfield = document.getElementById("username");
const recordsdisplay = document.getElementById("records");

let userarray = [];
let edit_id = null;

let objstr = localStorage.getItem("users");
if (objstr != null) {
    userarray = JSON.parse(objstr);
}



adduserbtn.onclick = () => {

    const name = usernametextfield.value;

    if (edit_id != null) {
        userarray.splice(edit_id, 1, { "name": name });
        edit_id = null;
    }
    else {

        userarray.push({ "name": name });
    }

    saveinfo(userarray);
    usernametextfield.value = "";

    adduserbtn.innerText = btntext;
}

function saveinfo() {
    let str = JSON.stringify(userarray);
    localStorage.setItem("users", str);
    displayinfo();
}





function displayinfo() {
    let statement = "";
    userarray.forEach((user, i) => {
        let completedClass = user.completed ? 'completed' : '';
        statement += `<tr id="task-${i}" class="${completedClass}  ">
            <th class="text-white" scope="row">${i + 1}</th>
            <td class="task-name text-white">${user.name}</td>
            <td>
                <input type="checkbox" onchange="toggleCompleted(${i})" ${user.completed ? 'checked' : ''}>
                <i class="btn text-white btn-info mx-2 fa fa-edit" onclick="editinfo(${i})"></i>
                <i class="btn text-white btn-danger fa fa-trash" onclick="deleteinfo(${i})"></i>
            </td>
        </tr>`;
    });
    recordsdisplay.innerHTML = statement;
}



function editinfo(id) {
    edit_id = id;
    usernametextfield.value = userarray[id].name;
    adduserbtn.innerText = "Save Changes";

}

function deleteinfo(id) {
    userarray.splice(id, 1);
    saveinfo(userarray);

}


function toggleCompleted(id) {
    const taskElement = document.getElementById(task-id);
    taskElement.classList.toggle('completed');
}