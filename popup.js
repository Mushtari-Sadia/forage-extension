
const ids = [
    "Test1",
    "Test2",
    "Test3"
]
ids.forEach(element => {
    document.getElementById(element).style.display = 'none';
});

  chrome.tabs.query({active: true, currentWindow: true}, ([tab]) => {
    if(tab.url.includes("dl.acm.org/doi"))
    {
        ids.forEach(element => {
            document.getElementById(element).style.display = 'block';
        });
    }
    else
    {
        ids.forEach(element => {
            document.getElementById(element).style.display = 'none';
        });
    }
  });


  function viewProjects(){
    chrome.runtime.sendMessage(
        //request type variable indicates what content user is requesting (project/collaborators ?)
        {request_type: "project"},
        function(response) {
            result = response.farewell;
            var ul = document.getElementById("project-list");
            var li = document.createElement("li");
            li.setAttribute('id',result);
            li.appendChild(document.createTextNode(result));
            ul.appendChild(li);
            
        });
    
}