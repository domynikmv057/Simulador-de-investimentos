# Documentação:

## Informações gerais

    Bom eu usei o React js, junto da biblioteca Material UI, eu usei o Material UI nos meus componentes
    de botoes IndexacaoButton.jsx, RendimentoButton.jsx, e nos inputs do meu formulario em Form.jsx,
    tabem usei Material Ui icons, em algumas partes do codigo.
        Eu optei por usar o Material Ui por alguns motivos, o primeiro deles, foi aprender mais sobre
    a biblioteca, ja venho estudando react a um tempo e senti que seria uma boa ideia usalo neste projeto
    pois avia alguns componentes bem semelhantes

    Todos os meus componentes estao comentados explicando as principais caracteristicas do meu codigo
    afim de exclarecer minhas tomadas de decisao, porem irei colocalos aqui tabem, separados por topicos.

## IndexacaoButton.jsx e RendimentoButton.jsx

    IndexacaoButton é meu componente para criar os botoes de alternância, uso eles para fazer a seleção das opções
    Pre, Pos e Fixado, para que o usuário possa escolhe no tipo de indexação que ele deseja.

    Uso o sate [alignment] para armazenar a opção escolhida e enviar essa informação para o componente
    que vai ser usada futuramente para escolher o tipo de simulação.

## Simulation.jsx

    Esse é o componente responsável pela simulação, primeiramente uso um useEffect para
    pegar da api os dados que eu quero, como explicado na parte de IndexacaoButton.jsx
    eu guardava a informação do valor escolhido no botão, e a envio para este componente
    então eu pego essa informação e uso ela para pegar o tipo de simulação escolhido LINHA: 20
    após separa a simulação que eu queria da api eu a salvo em um estado e uso para montar
    os cards da simulação.

## Form.jsx

    Este é meu componente principal, aqui está estruturado todo meu código
    useEffect:
    Começo usando um useEfect para pegar da api os dados do CDI e IPCA, para usá-los nos inputs
    também guardo estes dados no state [ nome ] para que possam ser usados mais tarde na função [ clearForm ]
    guardo essa informação no state [ formValues ] que é o state que eu uso para salvar os valores dos inputs,

    handleInputChange:
    esta função eu uso para mudar e salvar os valores dos meus inputs, e também para verificar se este valor é
    um número ou não, eu salvo o valor do input no state [ formValues ] e caso ele seja um número
    defino o state [ erroLaybel ] para falso, se não for numero defino para verdadeiro.

    handleSubmit:
    esta é a função que define o [ simulationState ] para verdadeiro, o que por sua vez faz com que o componente
    Simulation.jsx seja renderizado.

    validateButton:
    Esta é a função responsável por liberar o botão de Simulação, ela percorre o objeto [ formValues ], verificando
    se os valores dos inputs estão vazios, se estiverem ela retorna 'verdadeiro' o que desabilita o botão, caso
    o input não estiver vazio ela percorre o objeto [ erroLaybel ] verificando se o valor de input dele esta definido
    como verdadeiro( o que aponta que o input tem uma letra), caso seja verdadeiro, a função também retorna verdadeiro
    desabilitando o botão, se nenhuma dessas condições for verdadeira, ele sai do 'for', e retorna falso liberando
    o botão.

    clearForm:
    esta função retesa os valores dos inputs no [ formValues ], [ erroLaybel ] e [ simulationState ]
    limpando o formulário o input de erro, e sumindo com o componente de simulação

    return:
    aqui estão meus inputs, usei o MaterialUI para agilizar o processo de estilização dos componentes

    simulationState:
    aqui é onde eu chamo o componente Simulation.jsx, porem eu uso um ternário para verificar o state
    [ simulationState ], para renderizar ou não o componente, o valor de [ simulationState ] só se torna
    verdadeiro quando clicamos no botão simular, que só é liberado quando todos os inputs são preenchidos.

    helperText:
    Em  helperText uma variável dos meus inputs, uso um ternário, para que ela verifique o input correspondente
    esta com algum erro em [ erroLaybel ] caso esteja ela exibe a mensagem de erro, se não ela não exibe nada.
