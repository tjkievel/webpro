(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`Alimento`,`Transporte`,`Lazer`,`Saude`,`Outros`],t=[],n=[...e],r=new Intl.NumberFormat(`pt-BR`,{style:`currency`,currency:`BRL`}),i=new Intl.DateTimeFormat(`pt-BR`),a=document.querySelector(`#app`);a.innerHTML=`
  <div class="app-shell">
    <aside class="sidebar" aria-label="Resumo financeiro">
      <div class="brand-mark" aria-hidden="true">PD</div>
      <p class="eyebrow">Visao geral</p>
      <h1>Painel de<br>despesas</h1>
      <p class="sidebar-copy">Acompanhe seus gastos de forma simples e organizada.</p>

      <section class="total-card" aria-labelledby="total-label">
        <p id="total-label">Total acumulado</p>
        <strong id="total-value">R$ 0,00</strong>
        <span id="expense-count">0 despesas registradas</span>
      </section>

      <section class="category-summary" aria-labelledby="category-title">
        <div class="section-heading">
          <h2 id="category-title">Por categoria</h2>
          <span class="section-dot" aria-hidden="true"></span>
        </div>
        <ul id="category-list" class="category-list"></ul>
      </section>

      <p class="session-note">Os dados ficam disponíveis somente nesta sessão.</p>
    </aside>

    <main class="content">
      <header class="page-header">
        <div>
          <p class="eyebrow">Controle pessoal</p>
          <h2>Suas despesas</h2>
        </div>
        <span class="live-status"><span aria-hidden="true"></span> Sessao ativa</span>
      </header>

      <section class="form-panel" aria-labelledby="form-title">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">Novo registro</p>
            <h3 id="form-title">Adicionar despesa</h3>
          </div>
          <span class="plus-icon" aria-hidden="true">+</span>
        </div>

        <form id="expense-form" novalidate>
          <div class="form-grid">
            <label class="field field-title">
              <span>Titulo da despesa</span>
              <input id="title" name="title" type="text" placeholder="Ex.: Mercado da semana" required>
            </label>
            <label class="field">
              <span>Valor</span>
              <div class="input-prefix"><span>R$</span><input id="amount" name="amount" type="number" min="0.01" step="0.01" placeholder="0,00" required></div>
            </label>
            <label class="field">
              <span>Data</span>
              <input id="date" name="date" type="date" required>
            </label>
            <label class="field">
              <span>Categoria</span>
              <select id="category" name="category" required></select>
            </label>
          </div>
          <div class="form-actions">
            <p id="form-message" class="form-message" role="status" aria-live="polite"></p>
            <button class="primary-button" type="submit"><span aria-hidden="true">+</span> Adicionar despesa</button>
          </div>
        </form>
      </section>

      <section class="expenses-section" aria-labelledby="list-title">
        <div class="list-heading">
          <div>
            <h3 id="list-title">Despesas recentes</h3>
            <p id="list-description">Seus registros aparecem aqui.</p>
          </div>
          <span id="list-count" class="list-count">0 itens</span>
        </div>
        <div id="expense-list" class="expense-list"></div>
      </section>

      <section class="category-panel" aria-labelledby="new-category-title">
        <div>
          <p class="eyebrow">Personalize seu painel</p>
          <h3 id="new-category-title">Criar categoria</h3>
        </div>
        <form id="category-form" class="category-form" novalidate>
          <label class="sr-only" for="new-category">Nome da nova categoria</label>
          <input id="new-category" name="new-category" type="text" placeholder="Ex.: Casa" required>
          <button class="secondary-button" type="submit">Criar categoria</button>
        </form>
        <p id="category-message" class="form-message" role="status" aria-live="polite"></p>
      </section>
    </main>
  </div>
`;var o=document.querySelector(`#expense-form`),s=document.querySelector(`#category-form`),c=document.querySelector(`#title`),l=document.querySelector(`#amount`),u=document.querySelector(`#date`),d=document.querySelector(`#category`),f=document.querySelector(`#expense-list`),p=document.querySelector(`#category-list`),m=document.querySelector(`#form-message`),h=document.querySelector(`#category-message`),g=new Date().toISOString().slice(0,10);u.value=g;function _(e){return i.format(new Date(`${e}T00:00:00`))}function v(){return crypto.randomUUID?.()??`${Date.now()}-${Math.random()}`}function y(){return n.map(e=>({categoria:e,total:t.filter(t=>t.categoria.toLowerCase()===e.toLowerCase()).reduce((e,t)=>e+t.valor,0)}))}function b(){d.replaceChildren(new Option(`Selecione uma categoria`,``,!0,!0)),n.forEach(e=>d.add(new Option(e,e))),p.replaceChildren(),y().forEach(({categoria:e,total:t})=>{let n=document.createElement(`li`),i=document.createElement(`span`),a=document.createElement(`strong`);i.textContent=e,a.textContent=r.format(t),n.append(i,a),p.append(n)})}function x(){f.replaceChildren();let e=document.querySelector(`#list-count`),n=document.querySelector(`#expense-count`),i=document.querySelector(`#list-description`);if(e.textContent=`${t.length} ${t.length===1?`item`:`itens`}`,n.textContent=`${t.length} ${t.length===1?`despesa registrada`:`despesas registradas`}`,i.textContent=t.length?`Registros adicionados nesta sessao.`:`Seus registros aparecem aqui.`,!t.length){let e=document.createElement(`div`);e.className=`empty-state`,e.innerHTML=`<span class="empty-icon" aria-hidden="true">+</span><strong>Nenhuma despesa ainda</strong><p>Adicione seu primeiro registro usando o formulario acima.</p>`,f.append(e);return}t.slice().reverse().forEach(e=>{let t=document.createElement(`article`);t.className=`expense-item`;let n=document.createElement(`span`);n.className=`expense-icon`,n.textContent=e.titulo.trim().charAt(0).toUpperCase();let i=document.createElement(`div`);i.className=`expense-details`;let a=document.createElement(`strong`);a.textContent=e.titulo;let o=document.createElement(`span`);o.textContent=`${e.categoria} · ${_(e.data)}`,i.append(a,o);let s=document.createElement(`strong`);s.className=`expense-value`,s.textContent=r.format(e.valor),t.append(n,i,s),f.append(t)})}function S(){let e=t.reduce((e,t)=>e+t.valor,0);document.querySelector(`#total-value`).textContent=r.format(e),b(),x()}function C(e,t,n){e.textContent=t,e.className=`form-message ${n}`}o.addEventListener(`submit`,e=>{e.preventDefault();let n=c.value.trim(),r=Number(l.value),i=u.value,a=d.value;if(!n||!r||r<=0||!i||!a){C(m,`Preencha titulo, valor, data e categoria para continuar.`,`error`);return}t.push({id:v(),titulo:n,valor:r,data:i,categoria:a}),o.reset(),u.value=g,C(m,`Despesa adicionada com sucesso.`,`success`),S(),c.focus()}),s.addEventListener(`submit`,e=>{e.preventDefault();let t=document.querySelector(`#new-category`).value.trim(),r=n.some(e=>e.toLowerCase()===t.toLowerCase());if(!t){C(h,`Digite um nome para a categoria.`,`error`);return}if(r){C(h,`Essa categoria ja existe.`,`error`);return}n.push(t),s.reset(),C(h,`Categoria criada com sucesso.`,`success`),S(),d.value=t}),S();