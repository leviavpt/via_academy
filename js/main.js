// Base de datos de Materias y Carreras
const academicData = [
    {
        area: "Ingeniería",
        icon: "fa-cogs",
        careers: [
            { name: "Ingeniería Civil", subjects: ["Cálculo Diferencial", "Cálculo Integral", "Física I: Mecánica", "Física II: Termodinámica", "Estática", "Dinámica", "Mecánica de Materiales", "Hidráulica", "Resistencia de Materiales", "Análisis Estructural I", "Diseño de Concreto Reforzado"] },
            { name: "Ingeniería Eléctrica", subjects: ["Circuitos Eléctricos I", "Electrónica Analógica", "Señales y Sistemas", "Campos Electromagnéticos", "Sistemas de Potencia", "Control Automático"] },
            { name: "Ingeniería Industrial", subjects: ["Probabilidad y Estadística", "Investigación de Operaciones I", "Control de Calidad", "Ergonomía", "Gestión de Proyectos"] },
            { name: "Ingeniería Mecánica", subjects: ["Termodinámica I", "Transferencia de Calor"] },
            { name: "Ingeniería Química", subjects: ["Balance de Materia y Energía", "Fenómenos de Transporte", "Operaciones Unitarias", "Cinética y Reactores"] },
            { name: "Ciencias de la Computación", subjects: ["Programación I (Python/C++)", "Estructura de Datos", "Bases de Datos", "Algoritmos y Complejidad", "Redes de Computadoras", "Ingeniería de Software"] },
            { name: "Ingeniería Biomédica", subjects: ["Señales Biomédicas", "Biomecánica"] }
        ]
    },
    {
        area: "Ciencias Naturales",
        icon: "fa-leaf",
        careers: [
            { name: "Biología", subjects: ["Biología General I", "Biología General II", "Genética", "Microbiología", "Fisiología Humana", "Bioestadística", "Ecología General", "Biología Molecular"] },
            { name: "Química", subjects: ["Química General I", "Química General II", "Química Orgánica I", "Química Orgánica II", "Química Analítica", "Química Inorgánica", "Fisicoquímica I", "Laboratorio de Orgánica I"] },
            { name: "Física", subjects: ["Electricidad y Magnetismo", "Óptica y Ondas", "Física Moderna", "Mecánica Cuántica I"] },
            { name: "Matemáticas", subjects: ["Álgebra Lineal", "Ecuaciones Diferenciales", "Cálculo Vectorial", "Probabilidad", "Métodos Numéricos"] },
            { name: "Ciencias Ambientales", subjects: ["Química Ambiental", "Gestión de Recursos Naturales"] }
        ]
    },
    {
        area: "Ciencias de la Salud",
        icon: "fa-stethoscope",
        careers: [
            { name: "Enfermería", subjects: ["Fundamentos de Enfermería", "Anatomía y Fisiología I", "Anatomía y Fisiología II", "Farmacología Básica", "Enfermería Médico-Quirúrgica I", "Enfermería Pediátrica", "Salud Mental y Psiquiatría"] },
            { name: "Pre-Medicina", subjects: ["Biología Celular", "Bioquímica I"] },
            { name: "Tecnología Médica", subjects: ["Hematología y Coagulación", "Microbiología Clínica"] },
            { name: "Nutrición", subjects: ["Bioquímica Nutricional", "Evaluación del Estado Nutricional"] },
            { name: "Terapia Física", subjects: ["Kinesiología", "Fisiología del Ejercicio"] }
        ]
    },
    {
        area: "Negocios",
        icon: "fa-briefcase",
        careers: [
            { name: "Administración", subjects: ["Contabilidad Financiera I", "Contabilidad Financiera II", "Estadística para Negocios", "Finanzas Corporativas", "Principios de Marketing", "Comportamiento Organizacional", "Derecho Mercantil"] },
            { name: "Contabilidad", subjects: ["Costos y Presupuestos", "Contabilidad de Costos", "Auditoría I", "Contabilidad Gubernamental"] },
            { name: "Finanzas", subjects: ["Análisis de Inversiones"] },
            { name: "Recursos Humanos", subjects: ["Gestión del Talento Humano"] }
        ]
    },
    {
        area: "Ciencias Sociales",
        icon: "fa-users",
        careers: [
            { name: "Psicología", subjects: ["Psicología General", "Estadística en Ciencias Sociales", "Psicología del Desarrollo", "Psicología Abnormal", "Evaluación Psicológica"] },
            { name: "Educación", subjects: ["Fundamentos de la Educación", "Psicología Educativa"] },
            { name: "Trabajo Social", subjects: ["Métodos de Trabajo Social"] },
            { name: "Comunicación", subjects: ["Redacción Periodística"] }
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    const filtersContainer = document.getElementById("filters-container");
    const careersGrid = document.getElementById("careers-grid");

    // 1. Renderizar Botones de Filtro
    function renderFilters() {
        if (!filtersContainer) return;
        
        filtersContainer.innerHTML = "";
        academicData.forEach((category, index) => {
            const btn = document.createElement("button");
            btn.className = `filter-btn ${index === 0 ? "active" : ""}`;
            btn.innerHTML = `<i class="fa-solid ${category.icon}"></i> ${category.area}`;
            
            btn.addEventListener("click", () => {
                document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                renderCareers(category.area);
            });
            
            filtersContainer.appendChild(btn);
        });
    }

    // 2. Renderizar Tarjetas de Carreras y Materias
    function renderCareers(selectedArea) {
        if (!careersGrid) return;
        
        careersGrid.innerHTML = ""; // Limpiar grid
        const areaData = academicData.find(d => d.area === selectedArea);
        
        if (areaData) {
            areaData.careers.forEach(career => {
                const card = document.createElement("div");
                card.className = "career-card";
                
                const subjectsHtml = (career.subjects || []).map(sub => `<span class="subject-tag">${sub}</span>`).join("");
                
                card.innerHTML = `
                    <div class="career-header">
                        <h3>${career.name}</h3>
                    </div>
                    <div class="career-body">
                        ${subjectsHtml}
                    </div>
                `;
                careersGrid.appendChild(card);
            });
        }
    }

    // 3. Inicializar si existen los contenedores (Específico para index.html)
    if (filtersContainer && careersGrid) {
        renderFilters();
        renderCareers(academicData[0].area);
    }

    // 4. Menú Móvil Toggle (Se ejecuta en TODAS las páginas)
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
});

// ==========================================
    // 5. LÓGICA PARA INSCRIPCIÓN DINÁMICA
    // ==========================================
    const cursoInput = document.getElementById('curso-input');
    const precioInput = document.getElementById('precio-input');
    const cursoInfoText = document.getElementById('curso-info-text');

    // Si estamos en la página de inscripción (si existen estos inputs)
    if (cursoInput && precioInput) {
        // Leer la URL actual
        const urlParams = new URLSearchParams(window.location.search);
        
        // Extraer los datos "curso" y "precio"
        const cursoNombre = urlParams.get('curso');
        const cursoPrecio = urlParams.get('precio');

        if (cursoNombre && cursoPrecio) {
            // Rellenar el formulario
            cursoInput.value = cursoNombre;
            precioInput.value = `$${cursoPrecio} USD`; // Puedes cambiar USD por tu moneda local
            
            // Personalizar el mensaje de bienvenida
            cursoInfoText.innerHTML = `Estás a un paso de potenciar tus habilidades. Completa tus datos para acceder a <strong>${cursoNombre}</strong>.`;
        } else {
            // Mensaje de error por si alguien entra directo a la URL sin venir de un botón
            cursoInfoText.innerHTML = '<span style="color:red;">No se ha seleccionado ningún curso. Por favor, regresa a la galería de cursos.</span>';
            cursoInput.value = "Ninguno seleccionado";
            precioInput.value = "$0.00";
        }
    }

    // ==========================================
    // 6. MENÚ MÓVIL ACCESIBLE (Se ejecuta en TODAS las páginas)
    // ==========================================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
            mobileMenu.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });

        // Cerrar menú al hacer click en un enlace (mobile)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
            });
        });

        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.setAttribute('aria-expanded', 'false');
                mobileMenu.focus();
            }
        });
    }

    // ==========================================
    // 7. VALIDACIÓN DE FORMULARIOS CLIENT-SIDE
    // ==========================================
    function initFormValidation(form) {
        if (!form) return;
        
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Validación en tiempo real
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    validateField(input);
                }
            });
        });

        function validateField(field) {
            const errorMsg = field.parentNode.querySelector('.error-message');
            let isValid = true;
            let message = '';

            // Validar required
            if (field.required && !field.value.trim()) {
                isValid = false;
                message = 'Este campo es obligatorio';
            }
            // Validar email
            else if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
                isValid = false;
                message = 'Ingresa un correo válido';
            }
            // Validar tel
            else if (field.type === 'tel' && field.value && !/^[\d\s\+\-\(\)]{7,}$/.test(field.value)) {
                isValid = false;
                message = 'Ingresa un teléfono válido';
            }
            // Validar URL
            else if (field.type === 'url' && field.value && !/^https?:\/\/.+/.test(field.value)) {
                isValid = false;
                message = 'Ingresa una URL válida (incluye http:// o https://)';
            }

            if (!isValid) {
                field.classList.add('error');
                field.setAttribute('aria-invalid', 'true');
                if (!errorMsg) {
                    const msg = document.createElement('span');
                    msg.className = 'error-message';
                    msg.style.cssText = 'color: var(--secondary); font-size: 0.85rem; margin-top: 0.3rem; display: block;';
                    msg.setAttribute('role', 'alert');
                    msg.textContent = message;
                    field.parentNode.appendChild(msg);
                } else {
                    errorMsg.textContent = message;
                }
            } else {
                field.classList.remove('error');
                field.setAttribute('aria-invalid', 'false');
                if (errorMsg) errorMsg.remove();
            }

            return isValid;
        }

        // Validar todo el formulario al enviar
        form.addEventListener('submit', async (e) => {
            let allValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) allValid = false;
            });

            // Verificar honeypot
            const honeypot = form.querySelector('.honeypot input');
            if (honeypot && honeypot.value) {
                return; // Spam detectado, no enviar (pero no bloquear para no revelar la técnica)
            }

            if (!allValid) {
                e.preventDefault();
                const firstError = form.querySelector('.error');
                if (firstError) firstError.focus();
            } else if (submitBtn) {
                // Estado de carga
                submitBtn.disabled = true;
                submitBtn.dataset.originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<span class="spinner" aria-hidden="true"></span> Enviando...';
                submitBtn.style.position = 'relative';
                
                // El formulario se envía normalmente a Formspree
                // Si quieres usar AJAX, descomenta lo siguiente y comenta el envío normal:
                /*
                e.preventDefault();
                try {
                    const formData = new FormData(form);
                    const response = await fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: { 'Accept': 'application/json' }
                    });
                    if (response.ok) {
                        showToast('¡Mensaje enviado correctamente! Te responderemos pronto.', 'success');
                        form.reset();
                    } else {
                        throw new Error('Error en el envío');
                    }
                } catch (err) {
                    showToast('Error al enviar. Intenta de nuevo o contáctanos por WhatsApp.', 'error');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitBtn.dataset.originalText;
                }
                */
            }
        });
    }

    // Inicializar validación en formularios
    document.querySelectorAll('.custom-form').forEach(form => {
        initFormValidation(form);
    });

    // ==========================================
    // 8. SLIDER DE TESTIMONIOS ACCESIBLE
    // ==========================================
    const sliderTrack = document.querySelector('.slider-track');
    if (sliderTrack) {
        const sliderContainer = sliderTrack.closest('.testimonios-slider');
        
        // Pausar animación al hacer hover/focus
        sliderContainer.addEventListener('mouseenter', () => {
            sliderTrack.style.animationPlayState = 'paused';
        });
        sliderContainer.addEventListener('mouseleave', () => {
            sliderTrack.style.animationPlayState = 'running';
        });
        sliderContainer.addEventListener('focusin', () => {
            sliderTrack.style.animationPlayState = 'paused';
        });
        sliderContainer.addEventListener('focusout', () => {
            sliderTrack.style.animationPlayState = 'running';
        });
    }

    // ==========================================
    // 9. TOAST NOTIFICATIONS (para feedback)
    // ==========================================
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        toast.textContent = message;
        
        const styles = `
            .toast {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                padding: 1rem 2rem;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                z-index: 9999;
                opacity: 0;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
            .toast.show { transform: translateX(-50%) translateY(0); opacity: 1; }
            .toast-success { background: #25d366; }
            .toast-error { background: #ff3366; }
            .toast-info { background: #1800ad; }
            .spinner {
                display: inline-block;
                width: 16px; height: 16px;
                border: 2px solid transparent;
                border-top-color: currentColor;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
                margin-right: 8px;
                vertical-align: middle;
            }
            @keyframes spin { to { transform: rotate(360deg); } }
        `;
        
        if (!document.getElementById('toast-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'toast-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
        
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }