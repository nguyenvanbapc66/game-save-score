$(document).ready(function() {
    let btnAddRound = document.getElementById('btn-add-round')
    btnAddRound.onclick = addRound

    let url = '/api' + window.location.pathname

    $.ajax({
        url: url,
        method: 'get',
        success: function(result) {
            console.log(result.data[0].players)
            console.log(result.data[0].rounds)
            let lengthRound = result.data[0].rounds.length 

            let players = `
                <th class="table-head-element"></th>
                <th class="table-head-element">${result.data[0].players[0]}</th>
                <th class="table-head-element">${result.data[0].players[1]}</th>
                <th class="table-head-element">${result.data[0].players[2]}</th>
                <th class="table-head-element">${result.data[0].players[3]}</th>
            `

            let round = `
                <tr>
                    <td>
                    Round ${result.data[0].rounds.length}
                    </td>
                    <td>
                    <input type="text" class="table-body-element-input" value="${result.data[0].rounds[lengthRound - 1][0]}" />
                    </td>
                    <td>
                    <input type="text" class="table-body-element-input" value="${result.data[0].rounds[lengthRound - 1][1]}" />
                    </td>
                    <td>
                    <input type="text" class="table-body-element-input" value="${result.data[0].rounds[lengthRound - 1][2]}" />
                    </td>
                    <td>
                    <input type="text" class="table-body-element-input" value="${result.data[0].rounds[lengthRound - 1][3]}" />
                    </td>
                </tr>
            `

            document.getElementById('players').innerHTML = players
            
            $('#round').append(round)
        }
    })
})

async function addRound() {
    let url = '/api' + window.location.pathname
    let data = [0, 0, 0, 0]
    
    $.ajax({
        url: url,
        method: 'put',
        async: false,
        cache: false,
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(result) {
            console.log(result)
        }
    })

    let ajax = await $.ajax({
        url: url,
        method: 'get',
        success: function(result) {
            let lengthRound = result.data[0].rounds.length

            let round = `
                <tr>
                    <td>
                    Round ${result.data[0].rounds.length}
                    </td>
                    <td>
                    <input type="text" class="table-body-element-input" value="${result.data[0].rounds[lengthRound - 1][0]}" />
                    </td>
                    <td>
                    <input type="text" class="table-body-element-input" value="${result.data[0].rounds[lengthRound - 1][1]}" />
                    </td>
                    <td>
                    <input type="text" class="table-body-element-input" value="${result.data[0].rounds[lengthRound - 1][2]}" />
                    </td>
                    <td>
                    <input type="text" class="table-body-element-input" value="${result.data[0].rounds[lengthRound - 1][3]}" />
                    </td>
                </tr>
            `

            $('#round').append(round)
            round = ''
        }
    })
    return ajax
}