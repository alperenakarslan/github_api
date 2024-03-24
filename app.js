// Elementleri Seçme

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lasUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners(){
    githubForm.addEventListener("submit", getData);
    clearLastUsers.addEventListener("click", clearAllSearched);
    document.addEventListener("DOMContentLoaded", getAllSearched);
}

function getData(e){
    let username = nameInput.value.trim();

    if(username === ""){
        alert("Lütfen geçerli bir kullanıcı adı giriniz.");
    }else {
        github.getGithubData(username)
        .then(response => {
            if(response.user.message === "Not Found"){
                // Hata mesajı
                ui.showError("Kullanıcı bulunamadı");
            }else {
                ui.addSearchedUserToUI(username);
                Storage.addSearchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err => ui.showError(err));
    }

    ui.clearInput(); // Input temizleme
    e.preventDefault(); // sayfanın sürekli reload olmasını engelle.
}

function clearAllSearched(){
    // Tüm arananları temizle.
}

function getAllSearched(){
    // Arananları storagedan al ve UI'ya ekle.
}