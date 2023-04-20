let btn = document.getElementById('submit');
let form = document.getElementById('form');
let input = document.getElementById('input');
let user_data = document.querySelector('.user_data');
const CLIENT_ID = '3ddcc1fb287d0110b6f0';
const CLIENT_SECRET = '53103024384392d15435459149233477eb23c55e';

btn.onclick = async function (e) {
    e.preventDefault();
    const name = input.value;
    if (name.length > 0) {
        const user = await getUser(name);
        console.log(user);

        if (user.message === 'Not Found') {
            document.querySelector('.main').classList.add('d-none');
            document.querySelector('.not-found').classList.remove('d-none');
        } else {
            const profile = get_profile(user);
            const repo = await get_repo(user);
            show_repo(repo);
            document.querySelector('.not-found').classList.add('d-none');


        }
    }

};

async function getUser(name) {
    let url = await fetch(`https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    const data = await url.json();
    return data;
}

function get_profile(user) {
    user_data.innerHTML = `  <div class="profile_img">
                        <img class="rounded-3" src="${user.avatar_url}" width="280px" height="auto" alt="">
                    </div>
                    <span class="fw-bold d-inline-block mt-2">${user.name}</span>
                    <br>
                    <span class="d-inline-block mt-2">${user.bio}</span>
                    <br>
                    <span>followers: ${user.followers}</span>

                </div>`;

}

async function get_repo(user) {

    repo_list = document.querySelector('.repo_list');
    repo_list.innerHTML='';
    const repos = await fetch(`${user.repos_url}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`);
    const repo_data = await repos.json();
    return repo_data;
}

function show_repo(repo_data) {
    for (repo of repo_data) {
        repo_list.innerHTML += `
             <li class="border border-1 mb-3 rounded-2 p-3">
                                <div class="h4">
                                    <span><a href="${repo.html_url}">${repo.name}</a></span>
                                </div>
                                    <div class="mt-2">
                                        <span class="repo-language-color" style="background-color: #f1e05a"></span>
                                        <div class="rounded-circle d-inline-block"
                                             style="background-color: green;width: 10px;height: 10px;"></div>
                                        <span class="fs-6 text-muted">${repo.language}</span>
                                        <span><svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1"
                                                   width="16" data-view-component="true"
                                                   class="octicon octicon-star d-inline-block mr-2">
    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
</svg></span>
                                    </div>

                            </li>
             `;


    }

}

