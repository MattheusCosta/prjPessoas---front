// Cadastro de pessoas
$(document).on("click","#salvar",function(){
    var prop = document.getElementById('caminho').files[0];
    var nome_imagem = prop.name;
    var extensao_imagem = nome_imagem.split('.').pop().toLowerCase();
    
    if(jQuery.inArray(extensao_imagem,['png','jpg','jpeg']) == -1){
        navigator.notification.alert("imagem invalida");
    }else{
        var form_data = new FormData();
        form_data.append("foto",prop);
        form_data.append("nome",$("#nome").val());
        form_data.append("idade",$("#idade").val());
        form_data.append("endereco",$("#cidade").val());
        form_data.append("sexo",$("input[name='sexo']:checked").val());
        form_data.append("cpf",$("#cpf").val());
        $.ajax({
        url:"https://prjpessoa.000webhostapp.com/cadastro.php",
        method:'POST',
        data:form_data,
        contentType:false,
        cache:false,
        processData:false,
        success:function(data){
          navigator.notification.alert(data);
          location.reload(); 
        }
      });
    }    
});

//Preencher Select com as pessoas

function preencherLista(){
  var itemlista = "";
  $.ajax({
        type:"post",
        url:"https://prjpessoa.000webhostapp.com/exibir.php",
        dataType:'json',

        success: function(data){
            $.each(data.pessoas, function(i, dados){
              itemlista+="<option value='"+dados.codigo+"'>"+dados.nome+"</option>";
            });
            $("#listaPessoas").html(itemlista);
        },
        error: function(data){
             navigator.notification.alert(data);
        }
    });
}

//Preencher Colunas

$(document).on("change","#listaPessoas",function(){
  var parametro ={
    "codigo":$("option:selected",("#listalivros")).val()
  }

  $.ajax({
      type:"post",
      url:"https://prjpessoa.000webhostapp.com/exibirUm.php",
      data:parametro,
      dataType:'json',
      success: function(data){
          $("#codigo").val(data.pessoas.codigo);
          $("#nome").val(data.pessoas.nome);
          $("#idade").val(data.pessoas.idade);
          $("#sexo").val(data.pessoas.sexo);
          if ($('input[name="sexo"]:checked').val() == "feminino") {
            $("#radio").prop("checked", true);
            $("#radio2").prop("checked", false);
          }
          else{
            $("#radio").prop("checked", false);
            $("#radio2").prop("checked", true);
          }
          $("#cidade").val(data.pessoas.cidade);
          $("#cpf").val(data.pessoas.cpf);
          $("#imagem").attr('src',"https://livrosatv.000webhostapp.com/"+data.pessoas.imagem);
      },
      error: function(data){
          navigator.notification.alert(data);
      }
  });
});

// Habilitar e Desabilitar

function habilita(){
  $("#nome").prop("disabled", false);
  $("#idade").prop("disabled", false);
  $("#sexo").prop("disabled", false);
  $("#cidade").prop("disabled", false);
  $("#cpf").prop("disabled", false);
  $("#caminho").prop("disabled", false);
  $("#foto").prop("disabled", false);
  $("#radio").prop("disabled", false);
  $("#radio2").prop("disabled", false);
}
function desabilita(){
  $("#nome").prop("disabled", true);
  $("#idade").prop("disabled", true);
  $("#sexo").prop("disabled", true);
  $("#cidade").prop("disabled", true);
  $("#cpf").prop("disabled", true);
  $("#caminho").prop("disabled", true);
  $("#foto").prop("disabled", true);
  $("#radio").prop("disabled", true);
  $("#radio2").prop("disabled", true);
}

// Cancelar e Novo

$(document).on("click", "#cancelar", function(){
  desabilita();
  $("#salvar").css("visibility","hidden");
});

$(document).on("click", "#cancela", function(){
  desabilita();
  $("#salvarEdit").css("visibility","hidden");
  $("#photo").css("visibility","hidden");
});

$(document).on("click", "#novo", function(){
  habilita();
  $("#salvar").css("visibility","visible");
});

$(document).on("click", "#editar", function(){
  habilita();
  $("#salvarEdit").css("visibility","visible");
  $("#photo").css("visibility","visible");
});