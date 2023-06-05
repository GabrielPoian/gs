$(document).ready(function() {
  var totalGastos = 0; // Variável para armazenar a soma dos gastos

  $('#gastosForm').submit(function(event) {
    event.preventDefault();

    var mes = $('#mes').val();
    var gastos = parseFloat($('#gastos').val());

    // Verificar se o campo de gastos foi preenchido
    if (isNaN(gastos)) {
      alert('O campo de gastos é obrigatório.');
      return;
    }

    // Adicionar o valor inserido à lista de gastos
    var gastoItem = '<li class="list-group-item">' + mes + ': R$ ' + gastos.toFixed(2) + ' (conversão em litros: ' + (gastos / 3.5).toFixed(2) + ' litros) <button class="btn btn-link btn-excluir">Excluir</button></li>';
    $('#gastosList').append(gastoItem);

    // Somar o valor inserido ao total dos gastos
    totalGastos += gastos;

    // Calcular a média mensal
    var numGastos = $('#gastosList li').length;
    var media = totalGastos / numGastos;

    // Atualizar o valor da soma dos gastos e média na página
    $('#totalGastos').text(totalGastos.toFixed(2));
    $('#mediaTotal').text(media.toFixed(2));

    // Limpar os campos de entrada de dados
    $('#mes').val('');
    $('#gastos').val('');
  });

  // Adicionar evento de clique aos botões de excluir
  $(document).on('click', '.btn-excluir', function() {
    var listItem = $(this).parent();
    var gastosValue = $(listItem).text().split(':')[1].trim().split(' ')[1];

    // Subtrair o valor excluído do total dos gastos
    totalGastos -= parseFloat(gastosValue);

    // Calcular a média mensal
    var numGastos = $('#gastosList li').length;
    var media = totalGastos / numGastos;

    // Atualizar o valor da soma dos gastos e média na página
    $('#totalGastos').text(totalGastos.toFixed(2));
    $('#mediaTotal').text(media.toFixed(2));

    // Remover o item da lista
    $(listItem).remove();
  });
});
