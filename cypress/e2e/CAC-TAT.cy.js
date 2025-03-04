describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Bom dia! ', 20)
    cy.get('#firstName')
      .type('Junior')
    cy.get('#lastName')
      .type('Santos')
    cy.get('#email')
      .type('junior.santos@hackermail.com')
    cy.get('#open-text-area')
      .type(longText, { delay: 0 })
    cy.get('div .button').click()
    cy.messageSuccessVisible()

    cy.messageSuccess()
  })

  it('validar que mensagem de sucesso aparece durante 3 segundos', () => {
    const longText = Cypress._.repeat('Bom dia! ', 20)

    cy.clock()
    cy.get('#firstName')
      .type('Junior')
    cy.get('#lastName')
      .type('Santos')
    cy.get('#email')
      .type('junior.santos@hackermail.com')
    cy.get('#open-text-area')
      .type(longText, { delay: 0 })
    cy.get('div .button').click()

    cy.messageSuccessVisible()

    cy.tick(2000)
    cy.get('.success').should('have.css', 'display', 'block')

    cy.tick(3000)
    cy.get('.success').should('not.have.css', 'display', 'block')
  })

  it('preenche os campos obrigatórios e envia o formulário (SEM USAR cy.get)', () => {
    cy.get('#firstName')
      .type('Junior')
    cy.get('#lastName')
      .type('Santos')
    cy.get('#email')
      .type('junior.santos@hackermail,com')
    cy.get('#open-text-area')
      .type('Bom dia!')
    cy.get('div .button').click()
    cy.messageErrorVisible()
    cy.messageError()
  })

  it('exibe mensagem de erro ao submeter o formulário vazio (usando invoke)', () => {
    cy.get('div .button').click()
    cy.messageErrorVisible()

    cy.messageError();
  })

  it('preenche os campos obrigatórios e envia o formulário (SEM USAR cy.get)', () => {
    const longText = Cypress._.repeat('Bom dia! ', 20)
    cy.contains('strong', 'Nome')
      .type('Junior')
    cy.contains('strong', 'Sobrenome')
      .type('Santos')
    cy.contains('strong', 'E-mail')
      .type('junior.santos@hackermail.com')
    cy.contains('strong', 'Como podemos te ajudar?')
      .type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.contains('strong', 'Mensagem enviada com sucesso.')
      .should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário vazio (usando invoke)', () => {
    cy.get('div .button').click()
    cy.messageErrorVisible()

    cy.messageError();
  })

  it('exibe mensagem de erro ao submeter o formulário vazio (validando pela mensagem contida)', () => {
    cy.get('div .button').click()
    cy.messageSuccess();
  })

  it('validar o preenchimento do campo "Telefone" somente por números', () => {
    //Validando que o campo telefone está visível e vazio
    cy.get('#phone')
      .as('telefone')
      .should('be.visible')
      .should('have.value', '')

    //Preenchendo o campo telefone com texto e validando que ainda está vazio
    cy.get('@telefone')
      .type('abcdefgh@#$%;,')
      .should('have.value', '')

    //Preenchendo o campo telefone com números e validando que o campo foi preenchido
    cy.get('@telefone')
      .type('112233445566')
      .should('have.value', '112233445566')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName')
      .type('Junior')
    cy.get('#lastName')
      .type('Santos')
    cy.get('#email')
      .type('junior.santos@hackermail.com')
    cy.get('#open-text-area')
      .type('Bom dia!')
    //O preenchimento do campo "Telefone" não é obrigatório
    cy.get('#phone')
      .should('not.have.attr', 'required')
    //Clique no checkbox telefone
    cy.get('#phone-checkbox').check()
    //O preenchimento do campo "Telefone" agora é obrigatório
    cy.get('div .button').click()
    cy.get('#phone')
      .should('have.attr', 'required')

    cy.messageErrorVisible()

    cy.messageError();
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .should('have.value', '')
      .type('Junior')
      .should('have.value', 'Junior')
    cy.get('#lastName')
      .should('have.value', '')
      .type('Santos')
      .should('have.value', 'Santos')
    cy.get('#email')
      .should('have.value', '')
      .type('junior.santos@hackermail.com')
      .should('have.value', 'junior.santos@hackermail.com')
    cy.get('#phone')
      .should('have.value', '')
      .type('1122334455')
      .should('have.value', '1122334455')

    //Limpando os campos
    cy.get('#firstName')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .clear()
      .should('have.value', '')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {

    cy.fillMandatoryFieldsAndSubmit();
    cy.messageSuccess();

  })

  it('envia o formuário com sucesso usando um comando customizado usando variáveis', () => {

    const data = {
      firstName: 'Robert',
      lastName: 'Santos',
      email: 'robert.santos@santos.com.br',
      text: 'Olá, tudo bem?'
    }

    cy.fillMandatoryFieldsAndSubmit(data);
    cy.messageSuccess();

  })

  it('envia o formuário com sucesso usando um comando customizado usando variáveis e dados default', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.messageSuccess()
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[value="feedback"]')
      .check()
      .should('have.value', 'feedback')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('[type="checkbox"]')
      .check()
    cy.get('[type="checkbox"]')
      .last()
      .uncheck()

    cy.get('[type="checkbox"]')
      .first()
      .should('be.checked')

    cy.get('[type="checkbox"]')
      .last()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/brasil.jpg')
      .should(input => {
        expect(input[0].files[0].name).to.equal('brasil.jpg')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/brasil.jpg', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('brasil.jpg')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('brasil.jpg').as('arquivo')
    cy.get('#file-upload')
      .selectFile('@arquivo')
      .should(input => {
        expect(input[0].files[0].name).to.equal('brasil.jpg')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.get('#title').should('have.text', 'CAC TAT - Política de Privacidade')
  })

  it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('src/privacy.html')
    cy.get('#title').should('have.text', 'CAC TAT - Política de Privacidade')
  })

  it('exibe e oculta as mensagens de erro usando .invoke()', () => {
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'Renato')
      .should('have.value', 'Renato')
  })

  it('atribuindo um id ao botão ENVIAR', () => {

    cy.get('.button[type="submit"]')
      .invoke('attr', 'id', 'enviar')
      .should('have.attr', 'id', 'enviar');

    cy.get('#enviar').click()

    cy.messageErrorVisible()
    cy.messageError()
  })

  it('faz uma requisição HTTP - AULA', () => {
    cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
      .as('getRequest')
      .its('status')
      .should('be.equal', 200)
    cy.get('@getRequest')
      .its('statusText')
      .should('be.equal', 'OK')
    cy.get('@getRequest')
      .its('body')
      .should('include', 'CAC TAT')
  })

  it('faz uma requisição HTTP - Forma Minha', () => {
    cy.request({
      method: 'GET',
      url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
    }).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.statusText).to.equal('OK')
      expect(response.body).to.contain('CAC TAT')
    })
  })

  it('Encontre o gato e deixe-o visível na página - desafio final', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('Alterar o título da página', () => {
    cy.get('#title')
      .should('not.have.text', 'RENATO')
      .invoke('text', 'RENATO')
      .should('have.text', 'RENATO')
  })

  Cypress._.times(10, () => {
    it('testa a página da política de privacidade de forma independente - executando 10 vezes usando Lodash', () => {
      cy.visit('src/privacy.html')
      cy.get('#title').should('have.text', 'CAC TAT - Política de Privacidade')
    })
  })

  
})





