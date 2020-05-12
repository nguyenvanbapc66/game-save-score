$(document).ready(function() {
  let roundNumber = 0;
  const gameId = window.location.pathname.split('/')[2];

  function getGameData() {
    $.ajax({
      method: 'get',
      url: `/api/games/${gameId}`,
      success: function(data) {
        roundNumber = data.data.rounds.length;
        $('.table').append(`
          <thead>
            <tr>
              <th></th>
              ${data.data.players.map(player => {
                return `<th>${player}</th>`
              }).join('')}
            </tr>
            <tr>
              <th>Sum of Score (${sumOfScore(data.data.rounds).reduce((next, prev) => next + prev)})</th>
              ${sumOfScore(data.data.rounds).map(score => {
                return `<th>${score}</th>`
              })}
            </tr>
          </thead>
          <tbody>
            ${data.data.rounds.map((round, index) => {
              return `
                <tr>
                  <td>Round ${index + 1}</td>
                  <td><input class="form-control" id="${index}-0" type="number" value="${round[0]}" /></td>
                  <td><input class="form-control" id="${index}-1" type="number" value="${round[1]}" /></td>
                  <td><input class="form-control" id="${index}-2" type="number" value="${round[2]}" /></td>
                  <td><input class="form-control" id="${index}-3" type="number" value="${round[3]}" /></td>
                </tr>
              `
            }).join('')}
          </tbody>
        `)
      },
      error: function(err) {

      }
    });
  }

  function sumOfScore(scores) {
    return scores && scores.length ? scores.map(playerScore => playerScore.reduce((prev, next) => prev + next )) : [0, 0, 0, 0];
  }

  $('#addRoundBtn').click(function() {
    $.ajax({
      method: 'put',
      url: `/api/games/${gameId}`,
      data: {
        type: 'add_round'
      },
      success: function(data) {
        $('.table tbody').append(`
          <tr>
            <td>Round ${++roundNumber}</td>
            <td><input class="form-control" id="${roundNumber - 1}-0" type="number" /></td>
            <td><input class="form-control" id="${roundNumber - 1}-1" type="number" /></td>
            <td><input class="form-control" id="${roundNumber - 1}-2" type="number" /></td>
            <td><input class="form-control" id="${roundNumber - 1}-3" type="number" /></td>
          </tr>
        `)
      },
      error: function(err) {
        console.log(err);
      }
    })
  })


  let roundScore = [];
  $('.table').on('change', 'input', function(event) {
    const row = $(this).attr('id').split('-')[0];
    const column = $(this).attr('id').split('-')[1];
    $.ajax({
      method: 'put',
      url: `/api/games/${gameId}`,
      data: {
        value: event.target.value,
        row: row,
        column: column,
        type: 'update_score'
      },
      success: function(data) {
        console.log(data)
      },
      error: function(err) {
        console.log(err);
      }
    })
  })

  getGameData();
})