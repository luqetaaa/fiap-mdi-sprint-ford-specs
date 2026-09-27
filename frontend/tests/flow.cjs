const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const { chromium } = require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES
  ? process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES + '/playwright' : 'playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_EXECUTABLE || undefined,
    headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu']
  });
  const context = await browser.newContext({ viewport: { width: 390, height: 920 }, locale: 'pt-BR', timezoneId: 'America/Sao_Paulo' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  // The exported app uses localhost:8080. In isolated CI, forward its actual HTTP
  // requests to the Spring Boot validation server; responses are never mocked.
  if (process.env.API_TARGET) {
    await page.route('http://localhost:8080/**', async route => {
      const response = await route.fetch({ url: route.request().url().replace('http://localhost:8080', process.env.API_TARGET) });
      await route.fulfill({ response, headers: { ...response.headers(), 'access-control-allow-origin': process.env.APP_URL || 'http://localhost:8081' } });
    });
  }
  const out = path.resolve(__dirname, '../../docs/telas');
  fs.mkdirSync(out, { recursive: true });
  const shot = async name => {
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(out, name + '.png'), fullPage: true });
  };
  const email = 'sprint-' + Date.now() + '@example.com';
  const password = 'Sprint3Teste!';
  try {
    await page.goto(process.env.APP_URL || 'http://localhost:8081', { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Entrar', exact: true }).waitFor();
    await shot('01-login');
    await page.getByRole('button', { name: 'Criar uma conta', exact: true }).click();
    await page.getByLabel('Nome', { exact: true }).fill('Lucas');
    await page.getByLabel('E-mail', { exact: true }).fill(email);
    await page.getByLabel('Senha', { exact: true }).fill(password);
    await shot('02-cadastro');
    await page.getByRole('button', { name: 'Criar conta e entrar', exact: true }).click();
    await page.getByText('Olá, Lucas.', { exact: true }).waitFor({ timeout: 20000 });
    await page.waitForFunction(() => document.body.innerText.includes('25'));
    await shot('03-inicio');
    await page.getByRole('button', { name: 'Consultar Ranger Raptor', exact: true }).click();
    await page.getByRole('button', { name: 'Gerar ficha técnica', exact: true }).waitFor();
    await shot('04-pesquisa');
    await page.getByRole('button', { name: 'Personalizar atributos', exact: true }).click();
    const selected = ['Motor', 'Potência', 'Torque', 'Transmissão', 'Tração', 'Central multimídia'];
    for (const field of selected) await page.getByRole('checkbox', { name: field, exact: true }).click();
    assert.equal(await page.getByRole('button', { name: 'Gerar ficha técnica', exact: true }).getAttribute('aria-disabled'), 'true');
    for (const field of selected) await page.getByRole('checkbox', { name: field, exact: true }).click();
    await page.getByRole('button', { name: 'Recolher atributos', exact: true }).click();
    await page.getByRole('button', { name: 'Gerar ficha técnica', exact: true }).click();
    await page.getByText('397 cv', { exact: true }).waitFor();
    await shot('05-ficha-tecnica');
    await page.getByRole('button', { name: 'Voltar', exact: true }).click();
    await page.getByText('Histórico', { exact: true }).click();
    await page.getByRole('button', { name: /Abrir ficha Ranger Raptor/ }).waitFor();
    await shot('06-historico');
    await page.getByRole('button', { name: /Abrir ficha Ranger Raptor/ }).click();
    await page.getByText('397 cv', { exact: true }).waitFor();
    await page.getByRole('button', { name: 'Nova pesquisa', exact: true }).click();
    await page.getByRole('button', { name: 'Gerar ficha técnica', exact: true }).waitFor();
    await page.getByText('Comparar', { exact: true }).click();
    await page.getByText('Compare versões', { exact: true }).waitFor();
    await page.getByText('Comparação com dados demonstrativos do catálogo acadêmico.', { exact: true }).waitFor();
    await shot('07-comparacao');
    await page.getByRole('button', { name: 'Veículo A', exact: true }).click();
    await page.getByLabel('Buscar veículo', { exact: true }).fill('Mustang');
    await page.getByRole('button', { name: /Mustang GT/ }).first().click();
    assert.equal(await page.getByText('488 cv', { exact: true }).count(), 1);
    await page.getByRole('button', { name: 'Fechar seleção', exact: true }).waitFor({ state: 'hidden' });
    await page.getByText('Sobre', { exact: true }).click();
    await page.getByRole('button', { name: 'Sair da conta', exact: true }).waitFor();
    await shot('08-sobre');
    await page.reload({ waitUntil: 'networkidle' });
    await page.getByText('Olá, Lucas.', { exact: true }).waitFor();
    await page.getByText('Sobre', { exact: true }).click();
    await page.getByRole('button', { name: 'Sair da conta', exact: true }).click();
    await page.getByRole('button', { name: 'Entrar', exact: true }).waitFor();
    await page.getByLabel('E-mail', { exact: true }).fill(email);
    await page.getByLabel('Senha', { exact: true }).fill('senha-incorreta');
    await page.getByRole('button', { name: 'Entrar', exact: true }).click();
    await page.getByText('E-mail ou senha inválidos.', { exact: true }).waitFor();
    await page.getByLabel('Senha', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Entrar', exact: true }).click();
    await page.getByText('Olá, Lucas.', { exact: true }).waitFor();
    await page.getByText('Histórico', { exact: true }).click();
    await page.getByRole('button', { name: /Abrir ficha Ranger Raptor/ }).waitFor();
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'Limpar histórico', exact: true }).click();
    await page.getByText('Sua primeira ficha vem aí.', { exact: true }).waitFor();
    assert.deepEqual(errors, []);
    fs.rmSync(path.join(out, "erro-validacao.png"), { force: true });
    console.log('PASS: cadastro, login, pesquisa, seleção vazia, ficha, histórico, reabertura, nova pesquisa, comparação, troca de versão, restauração de sessão, logout, credenciais inválidas e exclusão.');
    fs.writeFileSync(path.join(out, '../resultado-web.json'), JSON.stringify({ success: true, checkedAt: new Date().toISOString(), appVersion: require('../package.json').version, expoSdk: 57, browser: await browser.version(), viewport: '390x920', backend: 'Spring Boot com perfil demo (H2)', pageErrors: errors, screenshots: 8 }, null, 2));
  } catch (error) {
    console.error('UI TEST FAILURE:', error.message);
    console.error((await page.locator('body').innerText()).slice(-6000));
    await page.screenshot({ path: path.resolve(__dirname, '../../docs/telas/erro-validacao.png'), fullPage: true });
    process.exitCode = 1;
  } finally { await browser.close(); }
})();
