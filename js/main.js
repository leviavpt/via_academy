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