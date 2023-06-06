$(document).ready(function() {
  var totalGastos = 0; // Variável para armazenar a soma dos gastos

  // Recuperar os dados do localStorage ao carregar a página
  var gastosSalvos = localStorage.getItem('gastos');
  if (gastosSalvos) {
    $('#gastosList').html(gastosSalvos);
    totalGastos = parseFloat(localStorage.getItem('totalGastos'));
    var media = parseFloat(localStorage.getItem('media'));
    $('#totalGastos').text(totalGastos.toFixed(2));
    $('#mediaTotal').text(media.toFixed(2));
  }

  $('#gastosForm').submit(function(event) {
    event.preventDefault();

    var mes = $('#mes').val();
    var gastos = parseFloat($('#gastos').val());

    // Verificar se o campo de gastos foi preenchido
    if (isNaN(gastos)) {
      alert('O campo de gastos é obrigatório.');
      return;
    }

    // Verificar o valor dos gastos e exibir os avisos correspondentes
    if (gastos > 300) {
      alert('Aviso: Se for uma empresa, é recomendado economizar água, pois o valor médio da conta deve ser em torno de R$ 250,00.');
    } else if (gastos > 100) {
      alert('Aviso: Se você mora sozinho, é recomendado economizar mais água, pois o valor médio para uma pessoa deve ser até R$ 85,00.');
    }

    // Adicionar o valor inserido à lista de gastos
    var gastoItem = '<li class="list-group-item">' + mes + ': R$ ' + gastos.toFixed(2) + ' <button class="btn btn-link btn-excluir">Excluir</button></li>';
    $('#gastosList').append(gastoItem);

    // Somar o valor inserido ao total dos gastos
    totalGastos += gastos;

    // Calcular a média mensal
    var numGastos = $('#gastosList li').length;
    var media = totalGastos / numGastos;

    // Atualizar o valor da soma dos gastos e média na página
    $('#totalGastos').text(totalGastos.toFixed(2));
    $('#mediaTotal').text(media.toFixed(2));

    // Atualizar o localStorage com os dados atualizados
    localStorage.setItem('gastos', $('#gastosList').html());
    localStorage.setItem('totalGastos', totalGastos);
    localStorage.setItem('media', media);

    // Limpar os campos de entrada de dados
    $('#mes').val('');
    $('#gastos').val('');
  });

  // Adicionar evento de clique aos botões de excluir gasto
  $('#gastosList').on('click', '.btn-excluir', function() {
    var gastoItem = $(this).parent();
    var gastos = parseFloat(gastoItem.text().split(':')[1].trim());
    totalGastos -= gastos;
    var numGastos = $('#gastosList li').length - 1;
    var media = totalGastos / numGastos;
    gastoItem.remove();
    $('#totalGastos').text(totalGastos.toFixed(2));
    $('#mediaTotal').text(media.toFixed(2));
    localStorage.setItem('gastos', $('#gastosList').html());
    localStorage.setItem('totalGastos', totalGastos);
    localStorage.setItem('media', media);
  });
});
