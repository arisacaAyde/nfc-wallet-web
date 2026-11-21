import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Fingerprint, Nfc, ArrowRightLeft, ChevronDown, BookOpen, Target, Layers, CheckCircle2, Lightbulb, AlertTriangle, TrendingUp, Cpu, Database, Lock, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';import SpotlightCard from './components/SpotlightCard';
import AnimatedNumber from './components/AnimatedNumber';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const scrollRef = useRef(null); // Referencia para el scroll

  // Definimos el orden de las secciones para las flechas
  const secciones = [
    'problema', 'marco', 'metodologia', 
    'arquitectura', 'seguridad-so', 'diagramas', 
    'evidencias', 'verificacion', 'conclusiones'
  ];

    // --- LÓGICA DE LAS FLECHAS DEL TECLADO ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      // 1. Si el modal está abierto, solo permitimos cerrar con ESC
      if (selectedImage) {
        if (e.key === 'Escape') setSelectedImage(null);
        return; 
      }

      // 2. Si el usuario está escribiendo en un input, no hacemos nada
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // 3. SI ES UNA FLECHA, FRENAMOS EL SCROLL NATIVO DEL NAVEGADOR (Esto soluciona el salto)
      if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      let currentIndex = -1;
      let minDistance = Infinity;

      // 4. Buscamos en qué sección estamos
      secciones.forEach((id, index) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Usamos el centro de la pantalla para calcular la distancia real
          const elementCenter = rect.top + rect.height / 2;
          const screenCenter = window.innerHeight / 2;
          const distance = Math.abs(elementCenter - screenCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            currentIndex = index;
          }
        }
      });

      // 5. Lógica para mover a la siguiente sección
      if ((e.key === 'ArrowDown' || e.key === 'ArrowRight') && currentIndex < secciones.length - 1) {
        document.getElementById(secciones[currentIndex + 1])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } 
      // 6. Lógica para mover a la sección anterior
      else if ((e.key === 'ArrowUp' || e.key === 'ArrowLeft') && currentIndex > 0) {
        document.getElementById(secciones[currentIndex - 1])?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-neon-bg text-neon-text relative overflow-hidden font-sans" ref={scrollRef}>
      
      {/* --- FONDO GLOBAL CON LA IMAGEN --- */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/fondo-global.png" 
          alt="Fondo NFC Wallet" 
          className="w-full h-full object-cover opacity-50"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-neon-bg/80 backdrop-blur-[2px]"></div>
      </div>

      {/* --- BARRA DE NAVEGACIÓN FLOTANTE (RUTA DE EXPOSICIÓN) --- */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="flex justify-between items-center px-6 py-3 w-full max-w-6xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-white/10">
          <div className="flex items-center gap-3 cursor-pointer group">
            <img src="/logo.png" alt="NFC Wallet Logo" className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
            <div style={{display: 'none'}} className="w-9 h-9 bg-neon-green rounded-full items-center justify-center"><Nfc size={18} className="text-black" /></div>
            <span className="text-xl font-bold tracking-tight text-white hidden md:block">NFC <span className="text-neon-green">Wallet</span></span>
          </div>
          
          <div className="hidden lg:flex gap-1 text-xs font-medium text-gray-300">
            {[
              { name: 'Problema', id: 'problema' },
              { name: 'Marco', id: 'marco' },
              { name: 'Arquitectura', id: 'arquitectura' },
              { name: 'Diagramas', id: 'diagramas' },
              { name: 'Cierre', id: 'conclusiones' }
            ].map((item, i) => (
              <a key={i} href={`#${item.id}`} className="relative px-3 py-2 rounded-full hover:text-white hover:bg-white/10 transition-all duration-300 group overflow-hidden">
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </div>

          <button className="relative overflow-hidden bg-neon-green text-black font-bold py-2 px-6 rounded-full hover:shadow-[0_0_20px_rgba(0,255,136,0.6)] transition-all duration-300 group">
            <span className="relative z-10 flex items-center gap-2 text-sm">Descargar APK</span>
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </nav>
      </div>

      {/* --- HERO SECTION (INICIO) --- */}
      <main className="relative w-full min-h-[90vh] flex items-center pt-12 pb-12 overflow-hidden z-10">
        <div className="absolute inset-0 w-full h-full z-0">
          <img src="/hero-bg.png" alt="Fondo NFC Wallet" className="w-full h-full object-cover object-[80%_center]" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"; }} />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-neon-bg via-neon-bg/80 to-transparent"></div>
          <div className="absolute bottom-0 w-full h-32 z-10 bg-gradient-to-t from-neon-bg to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-20 flex flex-col lg:flex-row items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex-1 text-center lg:text-left mt-10 lg:mt-0 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-ping"></span> Ruta de Exposición Interactiva
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
              NFC Wallet <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-teal-300">Green Neon</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-lg leading-relaxed mx-auto lg:mx-0 font-medium drop-shadow-md">Una guía interactiva por el desarrollo, la arquitectura y las pruebas de nuestra billetera descentralizada.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Botón 1: Descargar App */}
              <a 
                href="#" // Aquí irá el enlace real a tu APK
                className="group relative flex items-center justify-center gap-2 bg-neon-green text-black font-bold py-4 px-8 rounded-full overflow-hidden transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,136,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2 text-lg">
                  Descargar App <ArrowRightLeft size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                </span>
                <div className="absolute inset-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              </a>
              
              {/* Botón 2: Conoce más (Scroll a Fase 1) */}
              <button 
                onClick={() => {
                  document.getElementById('problema')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="flex items-center justify-center gap-2 border border-white/20 bg-black/40 backdrop-blur-md hover:bg-white/10 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 text-lg"
              >
                Conoce más
              </button>
            </div>
          </motion.div>
          <div className="flex-1 hidden lg:block"></div>
        </div>
      </main>
     
            {/* --- 01. PROBLEMA Y OBJETIVOS --- */}
      <section id="problema" className="max-w-7xl mx-auto px-6 py-24 relative z-10 scroll-mt-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Target size={14} /> 01. Planteamiento
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">El Desafío y Nuestra Solución</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Desde la seguridad móvil hasta la implementación de una billetera descentralizada.</p>
        </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Columna Izquierda (LOS OBJETIVOS) */}
          <motion.div 
            initial={{ opacity: 0, x: -80 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} 
            className="space-y-6 lg:order-1"
          >
            {/* Objetivo General */}
            <div className="bg-neon-card border border-neon-green/20 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green rounded-full blur-[80px] opacity-10"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-neon-green/10 rounded-lg flex items-center justify-center text-neon-green"><Target size={24} /></div>
                <h3 className="text-2xl font-bold text-white">Objetivo General</h3>
              </div>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">Diseñar e implementar una billetera móvil modular por capas para BSC Testnet que coordine almacenamiento protegido, autenticación local, NFC diagnóstico y procesamiento concurrente.</p>
            </div>

            {/* Objetivos Específicos */}
            <div className="bg-neon-card border border-neon-green/20 p-8 rounded-3xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-neon-green/10 rounded-lg flex items-center justify-center text-neon-green"><Layers size={24} /></div>
                <h3 className="text-2xl font-bold text-white">Objetivos Específicos</h3>
              </div>
              <ul className="text-gray-300 text-base md:text-lg space-y-4">
                <li className="flex items-start gap-3"><span className="text-neon-green font-bold mt-1 text-xl">✓</span> Gestión de identidad determinística (BIP-39/44).</li>
                <li className="flex items-start gap-3"><span className="text-neon-green font-bold mt-1 text-xl">✓</span> Bóveda cifrada local con AES-256-GCM y Argon2id.</li>
                <li className="flex items-start gap-3"><span className="text-neon-green font-bold mt-1 text-xl">✓</span> Envíos en Testnet con validación de recibo.</li>
                <li className="flex items-start gap-3"><span className="text-neon-green font-bold mt-1 text-xl">✓</span> Estudio de concurrencia con Isolates (máx. 2 workers).</li>
                <li className="flex items-start gap-3"><span className="text-neon-green font-bold mt-1 text-xl">✓</span> Política de red estricta para WalletConnect (eip155:97).</li>
              </ul>
            </div>
          </motion.div>

          {/* Columna Derecha (EL PROBLEMA) */}
          <motion.div 
            initial={{ opacity: 0, x: 80 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ duration: 1, ease: "easeOut" }} 
            className="space-y-6 lg:order-2"
          >
            <div className="bg-neon-card border border-red-500/20 p-8 rounded-3xl relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500 rounded-full blur-[80px] opacity-10"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center text-red-400"><AlertTriangle size={24} /></div>
                <h3 className="text-2xl font-bold text-white">El Problema</h3>
              </div>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Las billeteras móviles deben gestionar secretos criptográficos, mantener información actualizada desde la red y responder a hardware externo sin comprometer la fluidez de la interfaz. Si la derivación de claves bloquea el hilo principal, la app se congela. Si se descuidan las credenciales, el teléfono se vuelve un vector de ataque.
              </p>
              <div className="bg-black/30 p-5 rounded-xl border border-white/5 mt-4">
                <h4 className="text-white font-bold text-base mb-2">Pregunta de Investigación:</h4>
                <p className="text-sm md:text-base text-gray-400 italic">"¿Cómo desarrollar y evaluar una billetera Android que coordine almacenamiento protegido, autenticación local, NFC de diagnóstico y procesamiento concurrente, sin sacrificar la experiencia de usuario?"</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

            {/* --- 03. MARCO TEÓRICO --- */}
      <section id="marco" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <BookOpen size={14} /> 03. Marco Teórico
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Fundamentos Aplicados</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Los pilares de Sistemas Operativos II, criptografía y blockchain que hacen funcionar a NFC Wallet. Haz clic en cualquier tarjeta para ver el detalle técnico.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Tarjeta 1: Sistemas Operativos */}
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              onClick={() => setSelectedImage('/marco-ciclo-android.png')} 
              className="cursor-pointer bg-neon-card border border-white/5 p-8 rounded-3xl hover:border-neon-green/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500 rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform"><Cpu size={28} /></div>
              <h3 className="text-xl font-bold text-white mb-3">Ciclo de Vida Android</h3>
              <p className="text-sm text-gray-400 mb-4">Gestión de estados (creación, pausa, reanudación) y bloqueo de sesión tras 120s en segundo plano.</p>
              <div className="flex items-center gap-2 text-xs text-neon-green font-bold mt-4"><Maximize2 size={14} /> Clic para ampliar</div>
            </motion.div>
            
            {/* Tarjeta 2: Concurrencia */}
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              onClick={() => setSelectedImage('/marco-isolates.png')} 
              className="cursor-pointer bg-neon-card border border-white/5 p-8 rounded-3xl hover:border-neon-green/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500 rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
              <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform"><Layers size={28} /></div>
              <h3 className="text-xl font-bold text-white mb-3">Hilos e Isolates</h3>
              <p className="text-sm text-gray-400 mb-4">Uso de hilos ligeros (Isolates) de Dart para tareas intensivas de CPU sin bloquear la UI.</p>
              <div className="flex items-center gap-2 text-xs text-neon-green font-bold mt-4"><Maximize2 size={14} /> Clic para ampliar</div>
            </motion.div>

            {/* Tarjeta 3: Criptografía */}
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              onClick={() => setSelectedImage('/marco-boveda.png')} 
              className="cursor-pointer bg-neon-card border border-white/5 p-8 rounded-3xl hover:border-neon-green/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500 rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform"><Lock size={28} /></div>
              <h3 className="text-xl font-bold text-white mb-3">Bóveda Criptográfica</h3>
              <p className="text-sm text-gray-400 mb-4">Cifrado autenticado AES-256-GCM y derivación de claves robusta con Argon2id y Keystore.</p>
              <div className="flex items-center gap-2 text-xs text-neon-green font-bold mt-4"><Maximize2 size={14} /> Clic para ampliar</div>
            </motion.div>

            {/* Tarjeta 4: Blockchain */}
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              onClick={() => setSelectedImage('/marco-red-bsc.png')} 
              className="cursor-pointer bg-neon-card border border-white/5 p-8 rounded-3xl hover:border-neon-green/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform"><Database size={28} /></div>
              <h3 className="text-xl font-bold text-white mb-3">Red BSC Testnet</h3>
              <p className="text-sm text-gray-400 mb-4">Interacción con el ecosistema EVM (Chain ID 97) mediante RPC, firmas digitales y nonces.</p>
              <div className="flex items-center gap-2 text-xs text-neon-green font-bold mt-4"><Maximize2 size={14} /> Clic para ampliar</div>
            </motion.div>

            {/* Tarjeta 5: NFC */}
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              onClick={() => setSelectedImage('/marco-nfc.png')} 
              className="cursor-pointer bg-neon-card border border-white/5 p-8 rounded-3xl hover:border-neon-green/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500 rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform"><Nfc size={28} /></div>
              <h3 className="text-xl font-bold text-white mb-3">Hardware NFC</h3>
              <p className="text-sm text-gray-400 mb-4">Comunicación de proximidad (13.56 MHz). Diagnóstico de tarjetas MIFARE y NTAG sin escritura.</p>
              <div className="flex items-center gap-2 text-xs text-neon-green font-bold mt-4"><Maximize2 size={14} /> Clic para ampliar</div>
            </motion.div>

            {/* Tarjeta 6: Seguridad Móvil */}
            <motion.div 
              whileHover={{ scale: 1.03 }} 
              onClick={() => setSelectedImage('/marco-autenticacion.png')} 
              className="cursor-pointer bg-neon-card border border-white/5 p-8 rounded-3xl hover:border-neon-green/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-500 rounded-full blur-[60px] opacity-10 group-hover:opacity-30 transition-opacity"></div>
              <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 mb-6 group-hover:scale-110 transition-transform"><Shield size={28} /></div>
              <h3 className="text-xl font-bold text-white mb-3">Autenticación Local</h3>
              <p className="text-sm text-gray-400 mb-4">Uso de biometría (huella) o credenciales del sistema Android para el acceso cotidiano.</p>
              <div className="flex items-center gap-2 text-xs text-neon-green font-bold mt-4"><Maximize2 size={14} /> Clic para ampliar</div>
            </motion.div>

        </div>
      </section>

      {/* --- 04. METODOLOGÍA --- */}
      <section id="metodologia" className="border-y border-neon-green/10 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
              <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold px-4 py-1.5 rounded-full mb-4"><TrendingUp size={14} /> 04. Metodología</div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Desarrollo Incremental</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">Se empleó un enfoque de <strong>investigación aplicada y descriptiva</strong>, con un componente experimental para la medición de concurrencia. El desarrollo se ejecutó de manera <strong>incremental e iterativa</strong>.</p>
                            <div className="space-y-6"> {/* Aumentamos el espacio entre fases */}
                {[
                  { fase: 'Fase 1', name: 'Interfaz y Navegación', desc: 'Prototipo Green Neon y Provider.' },
                  { fase: 'Fase 2', name: 'Identidad y Seguridad', desc: 'Bóveda local, biometría y SQLite.' },
                  { fase: 'Fase 3', name: 'Red Blockchain', desc: 'RPC BSC Testnet, tokens BEP-20 y envíos.' },
                  { fase: 'Fase 4', name: 'Laboratorio SO II', desc: 'Isolates, colas FIFO y métricas.' },
                  { fase: 'Fase 5', name: 'Integración Final', desc: 'NFC diagnóstico y WalletConnect.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    
                    {/* Etiqueta de la Fase (Más grande) */}
                    <div className="w-20 pt-1 text-lg font-bold text-neon-green">{item.fase}</div>
                    
                    {/* Contenido de la fase */}
                    <div className="flex-1 border-l-2 border-neon-green/30 pl-6 pb-6 relative">
                      
                      {/* Punto verde (Más grande) */}
                      <div className="absolute w-4 h-4 bg-neon-green rounded-full -left-[9px] top-1.5 shadow-[0_0_10px_rgba(0,255,136,0.8)]"></div>
                      
                      {/* Título (Más grande y blanco) */}
                      <h4 className="text-white font-bold text-xl mb-1">{item.name}</h4>
                      
                      {/* Descripción (Más grande y gris claro) */}
                      <p className="text-base text-gray-400">{item.desc}</p>
                    </div>
                    
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="bg-neon-card border border-neon-green/20 p-8 rounded-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green rounded-full blur-[80px] opacity-10"></div>
               <h3 className="text-2xl font-bold text-white mb-4">Técnicas e Instrumentos</h3>
               <ul className="space-y-3 text-sm text-gray-400">
                 <li>• Revisión documental y análisis estático.</li>
                 <li>• Pruebas unitarias y de widgets en Flutter.</li>
                 <li>• Ensayos físicos con Samsung Galaxy S21 FE.</li>
                 <li>• Medición de tareas sintéticas con isolates.</li>
                 <li>• Observación de NFC sin escritura.</li>
               </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- 05. ARQUITECTURA (DISEÑO MODULAR) --- */}
      <section id="arquitectura" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold px-4 py-1.5 rounded-full mb-4"><Layers size={14} /> 05. Arquitectura</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Diseño Modular por Capas</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">La base estructural de NFC Wallet. Separamos la interfaz, la lógica de negocio, los adaptadores de hardware y la red para garantizar la seguridad y el rendimiento.</p>
        </div>
        
        {/* Tarjetas explicativas de la arquitectura */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-neon-card border border-neon-green/20 p-6 rounded-2xl hover:border-neon-green/50 transition-colors">
            <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center text-neon-green mb-4"><Layers size={24} /></div>
            <h3 className="text-lg font-bold text-white mb-2">Capa de Presentación</h3>
            <p className="text-sm text-gray-400">Construida en Flutter. Utiliza Provider para gestionar el estado y separa los widgets de la lógica de negocio.</p>
          </div>
          <div className="bg-neon-card border border-neon-green/20 p-6 rounded-2xl hover:border-neon-green/50 transition-colors">
            <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center text-neon-green mb-4"><Shield size={24} /></div>
            <h3 className="text-lg font-bold text-white mb-2">Capa de Dominio y Seguridad</h3>
            <p className="text-sm text-gray-400">Contiene las reglas de validación, la firma de transacciones y la bóveda cifrada (AES-GCM + Argon2id).</p>
          </div>
          <div className="bg-neon-card border border-neon-green/20 p-6 rounded-2xl hover:border-neon-green/50 transition-colors">
            <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center text-neon-green mb-4"><Database size={24} /></div>
            <h3 className="text-lg font-bold text-white mb-2">Capa de Infraestructura</h3>
            <p className="text-sm text-gray-400">Adaptadores nativos para NFC (Kotlin), SQLite para persistencia local y JSON-RPC para BSC Testnet.</p>
          </div>
        </div>

        {/* Diagrama Principal de Arquitectura con Animación 3D */}
        <div className="max-w-5xl mx-auto">
          <motion.div 
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }} 
            onClick={() => setSelectedImage('/arquitectura.jpg')} 
            className="cursor-pointer bg-neon-card border border-neon-green/20 rounded-3xl overflow-hidden shadow-2xl group relative"
            style={{ perspective: 1000 }}
          >
            <div className="absolute inset-0 bg-neon-green/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <Maximize2 className="text-black" size={48} />
            </div>
            <div className="p-8 pb-4 bg-black/30 border-b border-white/5 text-center">
              <h3 className="text-2xl font-bold text-white">Diagrama de Componentes y Capas</h3>
              <p className="text-sm text-gray-400">Flutter, Provider, Dominio, Adaptadores y Servicios Externos.</p>
            </div>
            <div className="p-6 bg-black/10 flex justify-center">
              <img src="/arquitectura.jpg" alt="Arquitectura de Capas" className="w-full max-h-[600px] object-contain rounded-xl" onError={(e) => { e.target.src = "https://via.placeholder.com/800x600/0a1c14/00FF88?text=Arquitectura+de+Capas"; }} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- 06. SEGURIDAD Y SO --- */}
      <section id="seguridad-so" className="border-y border-neon-green/10 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold px-4 py-1.5 rounded-full mb-4"><Shield size={14} /> 06. Seguridad y Sistemas Operativos</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Características Técnicas</h2>
            <p className="text-gray-400">Protección de secretos y gestión de recursos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <FeatureCard icon={<Shield size={28} />} title="Bóveda Cifrada" desc="AES-256-GCM y Argon2id protegen tu frase semilla localmente." delay={0.1} />
            <FeatureCard icon={<Fingerprint size={28} />} title="Acceso Biométrico" desc="Desbloqueo rápido con huella o credencial del sistema." delay={0.2} />
            <FeatureCard icon={<Nfc size={28} />} title="Conexión NFC" desc="Diagnóstico de tarjetas NTAG215 y MIFARE para laboratorio." delay={0.3} />
            <FeatureCard icon={<ArrowRightLeft size={28} />} title="Swaps en Testnet" desc="Intercambia tBNB y tokens BEP-20 sin valor real." delay={0.4} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SpotlightCard className="md:col-span-2 p-8 group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <Shield className="text-neon-green mb-4" size={32} />
              <h3 className="text-2xl font-bold text-white mb-2">Bóveda Local AES-256-GCM</h3>
              <p className="text-gray-400 mb-4 max-w-md">Tu frase semilla nunca sale del dispositivo. Utilizamos cifrado autenticado y derivación de contraseña con Argon2id, respaldado por el Android Keystore.</p>
            </SpotlightCard>
            <SpotlightCard className="p-8">
              <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center text-neon-green mb-6"><Cpu size={24} /></div>
              <h3 className="text-xl font-bold text-white mb-2">Isolates y Concurrencia</h3>
              <p className="text-gray-400 text-sm">Procesamiento de tareas de CPU en segundo plano sin bloquear la interfaz. Cola FIFO con máximo de 2 workers.</p>
            </SpotlightCard>
          </div>
        </div>
      </section>

       {/* --- 07. DIAGRAMAS UML --- */}
      <section id="diagramas" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            <Database size={14} /> 07. Modelado Técnico
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Diagramas UML del Sistema</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">El detalle técnico de los flujos, actores y la persistencia de datos. Usa las flechas para navegar.</p>
        </div>

        {/* LLAMADA AL COMPONENTE DEL CARRUSEL UML */}
        <UmlCarousel onImageClick={setSelectedImage} />
      </section>

      {/* --- 08. EVIDENCIAS (INTERFAZ) --- */}
      <section id="evidencias" className="border-y border-neon-green/10 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold px-4 py-1.5 rounded-full mb-4"><CheckCircle2 size={14} /> 08. Evidencias</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Explora la App</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Capturas reales de la interfaz en funcionamiento.</p>
          </div>
          
          {/* Carrusel Automático */}
          <div className="bg-neon-card border border-neon-green/20 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16 shadow-2xl shadow-black/50 relative mb-16">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-green rounded-full blur-[150px] opacity-10 -translate-y-1/2 pointer-events-none"></div>
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 relative z-10">
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Todo desde <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-teal-300">una sola app.</span></h3>
              <p className="text-gray-400 text-lg mb-8 max-w-md">Gestiona tus activos, revisa tu historial y realiza intercambios con una interfaz fluida, rápida y diseñada para la seguridad.</p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center relative z-10"><PhoneCarousel /></div>
          </div>       
        </div>
      </section>

      {/* --- 09. VERIFICACIÓN (TARJETA NFC) --- */}
      <section id="verificacion" className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="bg-neon-card border border-neon-green/20 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl shadow-black/50">
          <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[500px]">
            <img src="/tarjeta-nfc.png" alt="Tarjeta NFC Wallet" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2070&auto=format&fit=crop"; }} />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neon-card hidden lg:block"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-neon-card to-transparent lg:hidden"></div>
          </div>
          <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold px-4 py-1.5 rounded-full mb-4 w-fit"><Nfc size={14} /> 09. Verificación Física</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Seguridad en cada <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-teal-300">transacción NFC.</span></h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">Acerca tu tarjeta NFC Wallet al dispositivo para validar la operación. La tarjeta no almacena tu frase semilla; actúa como un factor físico de autorización para proteger tus fondos.</p>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 py-2 px-4 rounded-full border border-white/10"><Shield size={16} className="text-neon-green" /> Autenticación AES</div>
              <div className="flex items-center gap-2 text-sm text-gray-300 bg-white/5 py-2 px-4 rounded-full border border-white/10"><Fingerprint size={16} className="text-neon-green" /> Biometría</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 10/11. CONCLUSIONES Y RECOMENDACIONES --- */}
      <section id="conclusiones" className="border-t border-neon-green/10 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs font-bold px-4 py-1.5 rounded-full mb-4"><Lightbulb size={14} /> 11. Conclusiones</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Cierre del Proyecto</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-neon-card border border-neon-green/20 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green rounded-full blur-[80px] opacity-10"></div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><CheckCircle2 className="text-neon-green" /> Conclusiones</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2"><span className="text-neon-green font-bold">1.</span> El prototipo demuestra que es técnicamente viable integrar seguridad, blockchain y concurrencia en Android.</li>
                <li className="flex gap-2"><span className="text-neon-green font-bold">2.</span> La bóveda AES-256-GCM protege eficazmente la semilla, pero la autorización fuerte por NFC sigue pendiente de hardware AES.</li>
                <li className="flex gap-2"><span className="text-neon-green font-bold">3.</span> Los Isolates mejoran la respuesta de la interfaz, aunque añaden latencia total por coordinación.</li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-neon-card border border-neon-green/20 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Lightbulb className="text-yellow-400" /> Recomendaciones</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex gap-2"><span className="text-yellow-400 font-bold">→</span> <strong>No usar con activos reales</strong> sin auditoría externa y pruebas de penetración.</li>
                <li className="flex gap-2"><span className="text-yellow-400 font-bold">→</span> Adquirir tarjetas DESFire EV3 o NTAG 424 DNA para validar criptografía AES.</li>
                <li className="flex gap-2"><span className="text-yellow-400 font-bold">→</span> Repetir los ensayos de concurrencia en modo <em>profile</em> con múltiples iteraciones.</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    {/* --- MARQUESINA --- */}
      <div className="py-10 overflow-hidden border-b border-neon-green/10 relative z-10">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6 text-gray-500 font-bold text-xl uppercase tracking-widest">
              <span>Android</span> <span className="text-neon-green">•</span><span>Flutter</span> <span className="text-neon-green">•</span><span>Dart</span> <span className="text-neon-green">•</span><span>BSC Testnet</span> <span className="text-neon-green">•</span><span>Reown WalletKit</span> <span className="text-neon-green">•</span><span>AES-256</span> <span className="text-neon-green">•</span><span>NFC</span> <span className="text-neon-green">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- FAQ --- */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">¿Tienes dudas? <br /><span className="text-neon-green">Nosotros te ayudamos.</span></h2>
            <p className="text-gray-400 mb-8 max-w-md">Explora las respuestas a las preguntas más comunes sobre la seguridad, el uso y el entorno de pruebas de NFC Wallet.</p>
          </div>
          <div className="flex flex-col gap-4">
            <AccordionItem title="¿Es segura mi frase semilla?" content="Totalmente. La frase semilla se cifra localmente usando AES-256-GCM y se deriva con Argon2id. Nunca viaja por la red ni se guarda en texto plano." />
            <AccordionItem title="¿Puedo usar fondos reales?" content="No. Esta es una versión Beta que opera exclusivamente en BSC Testnet (Chain ID 97). Todos los tBNB y tokens BEP-20 son de prueba y no tienen valor monetario." />
            <AccordionItem title="¿Cómo funciona la tarjeta NFC?" content="Actualmente, la tarjeta MIFARE Classic o NTAG215 se utiliza para diagnóstico y vinculación local demostrativa. No almacena la semilla ni autoriza fondos." />
            <AccordionItem title="¿Qué es el procesamiento por Isolates?" content="Flutter y Dart permiten crear hilos de ejecución separados llamados Isolates. Usamos un máximo de 2 workers para procesar tareas pesadas sin congelar la interfaz de usuario." />
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-neon-green/10 bg-black/60 backdrop-blur-lg pt-16 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4"><img src="/logo.png" alt="NFC Wallet" className="w-8 h-8 object-contain" onError={(e) => e.target.style.display = 'none'} /><span className="text-2xl font-bold text-white tracking-tight">NFC <span className="text-neon-green">Wallet</span></span></div>
              <p className="text-gray-400 text-sm max-w-xs mb-6">La billetera descentralizada para Android con autenticación biométrica, autorización NFC y procesamiento concurrente.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Ruta de Exposición</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#problema" className="hover:text-neon-green transition">01. Planteamiento</a></li>
                <li><a href="#marco" className="hover:text-neon-green transition">02. Marco Teórico</a></li>
                <li><a href="#arquitectura" className="hover:text-neon-green transition">03. Arquitectura</a></li>
                <li><a href="#conclusiones" className="hover:text-neon-green transition">04. Conclusiones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Proyecto Académico</h4>
              <p className="text-xs text-gray-400 leading-relaxed mb-4"><strong className="text-gray-300">Sistemas Operativos II</strong><br />Universidad de Aquino Bolivia (UDABOL)<br />Periodo: 2026 - II</p>
              <div className="text-xs text-gray-500 space-y-1"><p>G. Alferez Chirinos</p><p>A. Arisaca Tantani</p><p>M. Illanes Bujalits</p><p>D. Laura Beltran</p><p>A. Huanca Santander</p></div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2026 NFC Wallet. Todos los derechos reservados.</p>
            <p className="text-center md:text-right max-w-md">Prototipo con fines educativos. No constituye una billetera auditada para fondos de valor real.</p>
          </div>
        </div>
      </footer>

            {/* --- BOTÓN FLOTANTE DE WHATSAPP --- */}
      <motion.a 
        href="https://wa.me/5916980980"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-[0_0_30px_rgba(37,211,102,0.5)] flex items-center justify-center cursor-pointer group"
      >
        {/* Tooltip (Mensaje que aparece al pasar el mouse) */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-black text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          ¿Necesitas ayuda? Escríbenos
          {/* Triangulito del globo de texto */}
          <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45"></div>
        </div>

        {/* Icono oficial de WhatsApp */}
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </motion.a>
            {/* MODAL PARA VER IMÁGENES AMPLIADAS */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8" 
          onClick={() => setSelectedImage(null)}
        >
          {/* Contenedor de la imagen */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Botón de cerrar (arriba a la derecha) */}
            <button 
              className="absolute top-0 right-0 md:top-4 md:right-4 z-50 bg-black/50 hover:bg-neon-green hover:text-black text-white p-2 rounded-full transition-all duration-300" 
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>

            {/* Imagen con scroll si es necesario */}
            <div className="w-full h-full overflow-auto flex items-center justify-center">
              <img 
                src={selectedImage} 
                alt="Imagen Ampliada" 
                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-xl border border-neon-green/30 shadow-[0_0_50px_rgba(0,255,136,0.2)]" 
                onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic en la imagen
              />
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// --- COMPONENTES ---
function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: delay }} className="bg-neon-card border border-neon-green/10 p-6 rounded-2xl hover:border-neon-green/40 transition-colors group cursor-default">
      <div className="w-12 h-12 bg-neon-green/10 rounded-xl flex items-center justify-center text-neon-green mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function AccordionItem({ title, content }) {
  return (
    <details className="group bg-neon-card border border-neon-green/10 rounded-xl mb-4 overflow-hidden">
      <summary className="flex justify-between items-center font-bold cursor-pointer list-none p-5 text-white hover:text-neon-green transition-colors"><span>{title}</span><span className="transition group-open:rotate-180"><ChevronDown size={20} /></span></summary>
      <div className="text-gray-400 text-sm p-5 pt-0 border-t border-neon-green/10">{content}</div>
    </details>
  );
}

function PhoneCarousel() {
  const images = [
    { src: "/panel.png", alt: "Panel Principal" },
    { src: "/activos.png", alt: "Mis Activos" },
    { src: "/movimientos.png", alt: "Movimientos" },
    { src: "/nfc.png", alt: "Verificación NFC" },
    { src: "/swap.png", alt: "Intercambio" },
    { src: "/comprobante.png", alt: "Operación Exitosa" }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => { 
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
    }, 4000); // Cambia cada 4 segundos (más lento y elegante)
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-[300px] h-[620px] bg-black rounded-[3rem] border-[12px] border-[#1a1a1a] shadow-[0_0_50px_rgba(0,255,136,0.2)] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-2xl z-30 flex justify-center items-center gap-2">
        <div className="w-10 h-1 bg-gray-600 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
      </div>
      
      <div className="relative w-full h-full">
        {images.map((img, index) => (
          <motion.img 
            key={index} 
            src={img.src} 
            alt={img.alt} 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ 
              opacity: currentIndex === index ? 1 : 0, 
              x: currentIndex === index ? 0 : -50, 
              zIndex: currentIndex === index ? 10 : 0 
            }} 
            transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }} // Animación más suave
            className="absolute inset-0 w-full h-full object-cover" 
            onError={(e) => { e.target.src = `https://via.placeholder.com/300x620/0a1c14/00FF88?text=${img.alt}`; }} 
          />
        ))}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-20 pointer-events-none"></div>
      
      {/* Indicadores de posición (ahora son 6 puntitos) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {images.map((_, idx) => (
          <div key={idx} className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-6 bg-neon-green" : "w-2 bg-gray-600"}`} />
        ))}
      </div>
    </div>
  );
}

// --- COMPONENTE DEL CARRUSEL DE DIAGRAMAS UML ---
function UmlCarousel({ onImageClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Solo los 3 diagramas solicitados
  const diagrams = [
    { 
      src: '/casos-uso.jpg', 
      title: 'Casos de Uso', 
      desc: 'Interacción del Usuario, Sistema Android y BSC Testnet con los procesos de la app.',
      tag: 'Actores y Procesos'
    },
    { 
      src: '/clases.jpg', 
      title: 'Diagrama de Clases', 
      desc: 'Estructura de controladores, servicios y adaptadores de la arquitectura.',
      tag: 'Arquitectura de Software'
    },
    { 
      src: '/datos.jpg', 
      title: 'Modelo de Datos', 
      desc: 'Esquema de las bases SQLite locales para perfiles e historial.',
      tag: 'Persistencia Local'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % diagrams.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + diagrams.length) % diagrams.length);
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      
      {/* Botones de Navegación */}
      <button 
        onClick={prevSlide} 
        className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-neon-green text-white hover:text-black p-3 rounded-full border border-white/10 backdrop-blur-md transition-all duration-300"
      >
        <ChevronLeft size={28} />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-neon-green text-white hover:text-black p-3 rounded-full border border-white/10 backdrop-blur-md transition-all duration-300"
      >
        <ChevronRight size={28} />
      </button>

      {/* Tarjeta del Diagrama Actual */}
      <div className="bg-neon-card border border-neon-green/20 rounded-3xl overflow-hidden shadow-2xl relative">
        
        {/* Texto descriptivo arriba */}
        <div className="p-6 md:p-8 bg-black/40 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-neon-green uppercase tracking-wider mb-2 block">{diagrams[currentIndex].tag}</span>
            <h3 className="text-2xl font-bold text-white">{diagrams[currentIndex].title}</h3>
            <p className="text-sm text-gray-400 mt-1 max-w-2xl">{diagrams[currentIndex].desc}</p>
          </div>
          <div className="flex-shrink-0">
            <span className="bg-neon-green/10 text-neon-green px-4 py-2 rounded-full text-sm font-bold border border-neon-green/20">
              {currentIndex + 1} / {diagrams.length}
            </span>
          </div>
        </div>

        {/* Imagen clickeable */}
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-4 md:p-8 bg-black/20 flex justify-center cursor-pointer group relative"
          onClick={() => onImageClick(diagrams[currentIndex].src)}
        >
          <div className="absolute inset-0 bg-neon-green/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
            <Maximize2 className="text-black" size={48} />
          </div>
          <img 
            src={diagrams[currentIndex].src} 
            alt={diagrams[currentIndex].title} 
            className="max-h-[500px] w-auto object-contain rounded-lg shadow-lg"
            onError={(e) => { e.target.src = "https://via.placeholder.com/800x600/0a1c14/00FF88?text=Diagrama"; }} 
          />
        </motion.div>
      </div>

      {/* Puntitos indicadores (Ahora solo serán 3) */}
      <div className="flex justify-center gap-2 mt-6">
        {diagrams.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentIndex(idx)} 
            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? "w-8 bg-neon-green" : "w-2 bg-gray-600 hover:bg-gray-400"}`} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;