const storage = localStorage; // (leemos) usamos almacenamiento Local

function setUsuarioActual(userObj) {
  storage.setItem('currentUser', JSON.stringify(userObj));
  window.dispatchEvent(new Event('authChanged'));
}

function GetUsuarioActual() {
  const raw = storage.getItem('currentUser');
  try { return raw ? JSON.parse(raw) : null; } catch { return null; }
}

function removerUsuarioActual() {
  storage.removeItem('currentUser');
  window.dispatchEvent(new Event('authChanged'));
}

function escapeHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function GeneraEstadoAuth() {
  const container = document.getElementById('auth-area');
  if (!container) return;
        const usuarioActual = GetUsuarioActual();
  
  if (usuarioActual) 
    {
        container.innerHTML = `
            <div class="auth-left">
                <span class="auth-greeting">Hola, <strong>${escapeHtml(usuarioActual.username)}</strong></span>
            </div>
            <div class="auth-right">
                <button id="logoutBtn" class="auth-btn">Cerrar sesión</button>
            </div> `;

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', () => 
            {
                removerUsuarioActual();
                GeneraEstadoAuth();
            });
    } 
 else 
    {
        container.innerHTML = ` <a class="auth-btn" href="pages/login.html">Login</a>
                                <a class="auth-btn" href="pages/registro.html">Registro</a> `;
    }
}

// Actualizar al cargar y al detectar cambios en storage
document.addEventListener('DOMContentLoaded',GeneraEstadoAuth);

window.addEventListener('storage', (e) => 
    {
        if (e.key === 'currentUser' || e.key === null) GeneraEstadoAuth();
    });
window.addEventListener('authChanged',GeneraEstadoAuth);

