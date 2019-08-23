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