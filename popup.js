// import { postData,serverhost,token } from './lib.js';
var serverhost = 'http://127.0.0.1:8000';
var token='2a1f52e7dfab9ef3658b1263daa5dc3df5448eed'; 
var headers =  {
    'Content-Type': 'application/json',
    'Authorization': 'Token ' + token
}

async function postData(url = '', data = {}) {
	// Default options are marked with *
	const response = await fetch(url, {
	  method: 'POST', // *GET, POST, PUT, DELETE, etc.
	  mode: 'cors', // no-cors, *cors, same-origin
	  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	  credentials: 'same-origin', // include, *same-origin, omit
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Token ' + token
		// 'Content-Type': 'application/x-www-form-urlencoded',
	  },
	  redirect: 'follow', // manual, *follow, error
	  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	  body: JSON.stringify(data) // body data type must match "Content-Type" header
	});
	return response.json(); // parses JSON response into native JavaScript objects
  }


const ids = [
    "saved",
    "Project",
    "Collaborator",
    "Status"
]
ids.forEach(element => {
    document.getElementById(element).style.display = 'none';
});


var currentTabUrl="";
chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
if(tab.url.includes("dl.acm.org/doi"))
{
    currentTabUrl=tab.url;
    addPaperToProject("Unsorted",tab.url);
    document.getElementById("saved").style.display = 'block';
    document.getElementById("Project").style.display = 'block';
}
else
{
    ids.forEach(element => {
        document.getElementById(element).style.display = 'none';
    });
}
});

function viewProjects(){
    fetch(serverhost + '/api/projects/', { headers })
        .then(response => response.json())
        .then(data => {
            var ul = document.getElementById("project-list");
            
            data['results'].forEach(element => {
                if(element['name']!="Unsorted")
                {
                    var button = document.createElement("button");
                    button.setAttribute('id',element['name']);
                    button.style.display = 'block';
                    button.onclick = function () { addPaperToProject(element['name'],currentTabUrl,element['id']); };
                    button.innerHTML = element['name'];
                    ul.appendChild(button);
                }
            }); 
        })
}
document.getElementById("view_projects_button").addEventListener("click", viewProjects);


function viewCollaborators(projectID){
    fetch(serverhost + '/api/projects/'+projectID+'/collaborators/', { headers })
        .then(response => response.json())
        .then(data => {
            var ul = document.getElementById("collaborator-list");
            
            data.forEach(element => {
                var button = document.createElement("button");
                button.setAttribute('id',element['name']+element['id']);
                button.style.display = 'block';
                button.onclick = function () { assignCollaboratorToPaper(element['id'],projectID,currentTabUrl); };
                button.innerHTML = element['username'];
                ul.appendChild(button);
            }); 
        })
}

function viewLists(projectID){
    fetch(serverhost + '/api/projects/'+projectID+'/lists/', { headers })
        .then(response => response.json())
        .then(data => {
            var ul = document.getElementById("status-list");
            
            data.forEach(element => {
                var button = document.createElement("button");
                button.setAttribute('id',element['name']+element['id']);
                button.style.display = 'block';
                button.onclick = function () { assignStatusToPaper(element['id'],projectID,currentTabUrl); };
                button.innerHTML = element['name'];
                ul.appendChild(button);
            }); 
        })
}


function addPaperToProject(projectName, paperUrl, projectID = 2){

    var doi = paperUrl.substring(paperUrl.lastIndexOf("doi")+4);
    
    if(projectName!="Unsorted")
    {
        console.log(projectName);
        document.getElementById("Collaborator").style.display = 'block';
        var vcb = document.getElementById("view_collaborators_button");
        vcb.onclick = function () { viewCollaborators(projectID) };

        document.getElementById("Status").style.display = 'block';
        var vsb = document.getElementById("view_status_button");
        vsb.onclick = function () { viewLists(projectID) };
        //add api call for adding paper to project


    }
    else
    {
        postData(serverhost + '/extension/add-paper/', { doi: doi})
        .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
        });
    }
}


function assignCollaboratorToPaper(collaboratorID,projectId,paperUrl)
{
    var doi = paperUrl.substring(paperUrl.lastIndexOf("doi")+4);
    console.log("collaboratorID="+collaboratorID+" projectId="+projectId+" doi="+doi)
}

function assignStatusToPaper(statusID,projectId,paperUrl)
{
    var doi = paperUrl.substring(paperUrl.lastIndexOf("doi")+4);
    console.log("statusID="+statusID+" projectId="+projectId+" doi="+doi)
}
