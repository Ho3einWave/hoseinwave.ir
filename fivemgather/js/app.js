let submitButton = document.querySelector('.submit-button')
let refreshButton = document.querySelector('.refresh')
let gobackButton = document.querySelector('.go-back')
let serversupButton = document.querySelector('.discord-sup')

let serverData;
let urlRegex;



// This function get all server data and store it in serverData Variable to manipulate html
async function GetInfo() {
    let inputForm = document.querySelector('.info-form input').value;

    urlRegex = /cfx.re\/join\/([a-z0-9]{6})/gm.exec(inputForm);
    console.log(urlRegex);

    var formdata = new FormData();
    formdata.append("code", urlRegex[1]);

    if (urlRegex !== null) {
        let response = await fetch('https://hoseinwave.ir/api/fivem.php', {
            method: 'post',
            body: formdata
        })
        serverData = await response.json()
    }
};

function performData() {
    bannerDiv = document.querySelector('.server-banner img')
    iconDiv = document.querySelector('.server-avatar img')
    projectName = document.querySelector('.project-name')
    projectDescription = document.querySelector('.project-description')
    serverLink = document.querySelector('#serverlink div')
    serverIp = document.querySelector('#serverip div')

    scrpitHook = document.querySelector('.var-scripthook div.var-value')
    serverType = document.querySelector('.var-server div.var-value')
    gameBuild = document.querySelector('.var-enforcegamebuild div.var-value')
    maxClient = document.querySelector('.var-maxclient div.var-value')
    licenseKeyToken = document.querySelector('.var-licensekey div.var-value')

    resourcesDiv = document.querySelector('.resources')
    resourcesCount = document.querySelector('.resources h1')
    playersDiv = document.querySelector('.players')
    playersCount = document.querySelector('.players h1')

    let inputForm = document.querySelector('.info-form input').value;
    let urlRegex = /cfx.re\/join\/([a-z0-9]{6})/gm.exec(inputForm);
    if (serverData.server_data.vars.banner_detail !== undefined) { bannerDiv.src = serverData.server_data.vars.banner_detail } else console.log('Default ICON')
    if (serverData.server_data.icon !== undefined) { iconDiv.src = `data:image/png;base64,${serverData.server_data.icon}` } else console.log('Default ICON')
    if (serverData.server_data.vars.sv_projectName !== undefined) { projectName.textContent = serverData.server_data.vars.sv_projectName } else console.log('Default')
    if (serverData.server_data.vars.sv_projectDesc !== undefined) { projectDescription.textContent = serverData.server_data.vars.sv_projectDesc } else console.log('Default')
    if (urlRegex[1] !== undefined) { serverLink.innerHTML = `cfx.re/join/${urlRegex[1]}` } else console.log('Default')
    if (serverData.ip !== undefined) { serverIp.innerHTML = serverData.ip } else console.log('Default')
    if (serverData.server_data.vars.sv_scriptHookAllowed !== undefined) { scrpitHook.textContent = serverData.server_data.vars.sv_scriptHookAllowed } else console.log('Default')
    if (serverData.server_data.server !== undefined) { serverType.textContent = serverData.server_data.server } else console.log('Default')
    if (serverData.server_data.vars.sv_enforceGameBuild !== undefined) { gameBuild.textContent = serverData.server_data.vars.sv_enforceGameBuild } else console.log('Default')
    if (serverData.server_data.vars.sv_maxClients !== undefined) { maxClient.textContent = serverData.server_data.vars.sv_maxClients } else console.log('Default')
    if (serverData.server_data.vars.sv_licenseKeyToken !== undefined) { licenseKeyToken.textContent = serverData.server_data.vars.sv_licenseKeyToken } else console.log('Default')
    if (serverData.server_data.resources !== undefined) { resourcesCount.textContent = `RESOURCES (${Object.keys(serverData.server_data.resources).length})` }
    if (serverData.players !== undefined) { playersCount.textContent = `PLAYERS (${Object.keys(serverData.players).length})` }
    for (let i of Object.keys(serverData.server_data.resources)) {
        let theElement = document.createElement('div')
        theElement.classList.add('resource')
        theElement.textContent = serverData.server_data.resources[i]
        resourcesDiv.append(theElement)
    }
    for (let i of Object.keys(serverData.players)) {
        let Basediv = document.createElement('div')
        Basediv.classList.add('player')
        let ColorDiv = document.createElement('div')
        ColorDiv.classList.add('player-color')
        if (serverData.players[i].ping >= 130) {
            ColorDiv.style.backgroundColor = '#f03e3e'
        } else if (serverData.players[i].ping >= 50) {
            ColorDiv.style.backgroundColor = '#fff85b'
        } else {
            ColorDiv.style.backgroundColor = '#82c91e'
        }
        let TextH2 = document.createElement('h2')
        TextH2.textContent = `${serverData.players[i].name} - ID : ${serverData.players[i].id} • PING : ${serverData.players[i].ping}`
        Basediv.appendChild(ColorDiv)
        Basediv.appendChild(TextH2)
        playersDiv.appendChild(Basediv)
    }


}


submitButton.addEventListener('click', async() => {
    let initloadout = document.querySelector('.initloadout')
    let infoloadout = document.querySelector('.infoloadout')
    let loading = document.querySelector('.loading')
    let theBox = document.querySelector('.thebox')
    let connectButton = document.querySelector('.ezflex button')
    initloadout.classList.add('hide')
    loading.classList.remove('hide')


    await GetInfo()
    if (serverData.server_data !== null) {
        performData()
        loading.classList.add('hide')
        theBox.style.width = 'auto'
        theBox.style.height = 'auto'
        infoloadout.classList.remove('hide')
        connectButton.addEventListener('click', () => {
            location.href = `fivem://connect/cfx.re/join/${urlRegex[1]}`;
        })
    } else {
        let error = document.createElement('h3')
        let infoForm = document.querySelector('.info-form')
        error.textContent = 'Fail To Load Data From Server :( - Try Again'
        infoForm.appendChild(error)
        loading.classList.add('hide')
        initloadout.classList.remove('hide')
    }

})


refreshButton.addEventListener('click', async() => {
    let playersDiv = document.querySelector('.players')
    playersDiv.innerHTML = ''
    let playerText = document.createElement('h1')
    playerText.textContent = 'PLAYERS (0)'
    playersDiv.appendChild(playerText)
    let resourcesDiv = document.querySelector('.resources')
    resourcesDiv.innerHTML = ''
    let recourceText = document.createElement('h1')
    recourceText.textContent = 'RESOURCES (0)'
    resourcesDiv.appendChild(recourceText)
    await GetInfo()
    performData()
})

gobackButton.addEventListener('click', () => {
    let playersDiv = document.querySelector('.players')
    playersDiv.innerHTML = ''
    let playerText = document.createElement('h1')
    playerText.textContent = 'PLAYERS (0)'
    playersDiv.appendChild(playerText)
    let resourcesDiv = document.querySelector('.resources')
    resourcesDiv.innerHTML = ''
    let recourceText = document.createElement('h1')
    recourceText.textContent = 'RESOURCES (0)'
    resourcesDiv.appendChild(recourceText)

    // change the fucking view
    let initloadout = document.querySelector('.initloadout')
    let infoloadout = document.querySelector('.infoloadout')
    infoloadout.classList.add('hide')
    let theBox = document.querySelector('.thebox')
    theBox.style.width = ''
    theBox.style.height = ''
    initloadout.classList.remove('hide')
})


serversupButton.addEventListener('click', () => {
    location.href = 'https://discord.gg/observers';
})