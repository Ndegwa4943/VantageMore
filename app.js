"""(function(){
  const $ = (sel, el=document) => el.querySelector(sel);
  fetch('data/portfolio.json')
    .then(r => r.json())
    .then(data => {
      const mv = `${data.company.mission} ${data.company.vision}`;
      $('#missionVision').textContent = mv;
      $('#aboutCopy').textContent = data.about;

      const sWrap = document.getElementById('servicesList');
      data.services.forEach(s => {
        const div = document.createElement('div');
        div.className = 'service';
        div.innerHTML = `<div><b>${s.title}</b><div class="muted">${s.description}</div></div>`;
        sWrap.appendChild(div);
      });

      const pWrap = document.getElementById('projects');
      data.projects.forEach(p => {
        const card = document.createElement('article');
        card.className = 'card';
        const hero = p.cover || (p.images?.[0]?.src) || 'assets/placeholders/project.jpg';
        card.innerHTML = `
          <img src="${hero}" alt="${p.title}" loading="lazy" />
          <div class="pad">
            <div class="kicker">${p.type}</div>
            <h3 style="margin:6px 0 8px">${p.title}</h3>
            <p class="muted" style="min-height:48px">${p.summary}</p>
            <button class="btn" data-slug="${p.slug}">View</button>
          </div>`;
        pWrap.appendChild(card);
      });

      const cWrap = document.getElementById('clientList');
      data.clients.forEach(c => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.textContent = c;
        cWrap.appendChild(chip);
      });

      const ci = data.contact;
      const phoneLink = `<a href="tel:${ci.phone}">${ci.phone}</a>`;
      const emailLink = `<a href="mailto:${ci.email}">${ci.email}</a>`;
      document.getElementById('contactInfo').innerHTML = `${ci.name} · ${phoneLink} · ${emailLink}`;
      document.getElementById('ig').href = ci.instagram_url || '#';
      document.getElementById('tt').href = ci.tiktok_url || '#';

      if (data.download_pdf){
        document.getElementById('downloadPortfolio').href = data.download_pdf;
      }

      const modal = document.getElementById('projectModal');
      pWrap.addEventListener('click', (e)=>{
        const btn = e.target.closest('button[data-slug]');
        if(!btn) return;
        const proj = data.projects.find(x=>x.slug===btn.dataset.slug);
        if(!proj) return;
        document.getElementById('modalType').textContent = proj.type;
        document.getElementById('modalTitle').textContent = proj.title;
        document.getElementById('modalText').textContent = proj.details || proj.summary || '';
        const firstPhase = proj.phases?.[0] || {};
        document.getElementById('modalPhase').textContent = firstPhase.label || 'Preview';
        document.getElementById('modalImage').src = (firstPhase.images?.[0]) || proj.cover || 'assets/placeholders/project.jpg';
        modal.showModal();
      });

      document.getElementById('year').textContent = new Date().getFullYear();
    })
    .catch(console.error);
})();"""
