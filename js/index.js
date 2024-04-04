
document.addEventListener('DOMContentLoaded',function(){

const fiorm =document.querySelector('form');
fiorm.addEventListener('click',function(evnt){
    evnt.preventDefault();
    newfunct()
});
});


function newfunct(){
    
    const userInput=document.querySelector('#search').value.trim()
    if(!userInput){
        console.error('Empty')
        return;
    }
    
fetch(`https://api.github.com/search/users?q=${userInput}`)
.then(response =>{
    return response.json();
})
.then(data =>{
    usersrs(data.items);
})
.catch(error =>{
    console.error('Issue Detected :',error)
})

}
function usersrs(users){
    const userlist=document.querySelector('#user-list')
    userlist.innerHTML=''

    users.forEach(user => {
        const index=document.createElement('li')
        const name =document.createElement('span')
        const avatar=document.createElement('img')
        const plink=document.createElement('a')

        name.innerHTML=user.login;
        avatar.src=user.avatar_url;
        avatar.alt=`${user.login}'s avatar`;
        

        index.appendChild(name);
        index.appendChild(avatar);
        index.appendChild(plink);
        userlist.appendChild(index);

        index.addEventListener('click',()=>{
            fetch (`https://api.github.com/users/${user.login}/repos`)
            .then(response =>{
                return response.json();
            })
            .then(dta => {
                repositories(dta);
            })
            .catch(error =>{
                console.error('Big Issue:',error)
            })
        })
        
    });
}
function repositories(repos){
    const repolist =document.querySelector('#repos-list')
    repolist.innerHTML=''
    repos.forEach(repo =>{
        const litem =document.createElement('li')
        const namee=document.createElement('span')
        const linke =document.createElement('a');

        namee.innerText=repo.name;
        linke.innerText='View Repository';
        linke.href=repo.html_url;
        linke.target ='_blank';

        litem.appendChild(namee)
        litem.appendChild(linke)
        repolist.appendChild(litem)
    })
}
