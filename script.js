$(document).ready(function() {
  var totalGastos = 0; // Variável para armazenar a soma dos gastos

  // Recuperar os dados do localStorage ao carregar a página
  var gastosSalvos = localStorage.getItem('gastos');
  if (gastosSalvos) {
    $('#gastosList').html(gastosSalvos);
    totalGastos = parseFloat(localStorage.getItem('totalGastos')) || 0;
    var media = parseFloat(localStorage.getItem('media')) || 0;
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

    // Verificar se o valor dos gastos é negativo
    if (gastos < 0) {
      alert('O valor dos gastos não pode ser negativo.');
      return;
    }

    // Verificar se o valor dos gastos excede o limite
    var limiteGastos = 10000; // Defina o limite desejado aqui
    if (gastos > limiteGastos) {
      alert('O valor dos gastos excede o limite permitido.');
      return;
    }

    // Verificar o valor dos gastos e exibir os avisos correspondentes
    if (gastos > 300) {
      alert('Aviso: Se for uma empresa, é recomendado economizar água, pois o valor médio da conta deve ser em torno de R$ 250,00.');
    } else if (gastos > 100) {
      alert('Aviso: Se você mora sozinho, é recomendado economizar mais água, pois o valor médio para uma pessoa deve ser até R$ 85,00 por pessoa.');
    }

    // Adicionar o valor inserido à lista de gastos
    var gastoItem = '<li class="list-group-item" data-gastos="' + gastos + '">' + mes + ': R$ ' + gastos.toFixed(2) + ' <button class="btn btn-link btn-excluir">Excluir</button></li>';
    $('#gastosList').append(gastoItem);

    // Somar o valor inserido ao total dos gastos
    totalGastos += gastos;

    // Calcular a média mensal
    var numGastos = $('#gastosList li').length;
    var media = numGastos > 0 ? totalGastos / numGastos : 0;

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
    var gastos = parseFloat(gastoItem.data('gastos'));
    totalGastos -= gastos;
    var numGastos = $('#gastosList li').length - 1;
    var media = numGastos > 0 ? totalGastos / numGastos : 0;
    gastoItem.remove();
    $('#totalGastos').text(totalGastos.toFixed(2));
    $('#mediaTotal').text(media.toFixed(2));
    localStorage.setItem('gastos', $('#gastosList').html());
    localStorage.setItem('totalGastos', totalGastos);
    localStorage.setItem('media', media);
  });

  // Filtrar a lista de gastos com base no texto digitado
  $('#search').on('input', function() {
    var textoBusca = $(this).val().toLowerCase();
    $('#gastosList li').each(function() {
      var textoItem = $(this).text().toLowerCase();
      if (textoItem.indexOf(textoBusca) !== -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
